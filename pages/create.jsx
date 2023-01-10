import { Inter } from "@next/font/google";
import { Router } from "next/router";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [nomeEmpresa, setNomeEmpresa] = useState();
  const [local, setLocal] = useState();
  const [tipoDeContrato, setTipoDeContrato] = useState();
  const [habilidades, setHabilidades] = useState([]);

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const body = {
        titulo,
        descricao,
        nomeEmpresa,
        local,
        habilidades,
      };

      await fetch(`/api/vaga`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      alert("sucesso");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Cadastrar vagaa</h1>

      <form onSubmit={submitData}>
        <label htmlFor="titulo">Titulo</label>
        <input
          name="titulo"
          autoFocus
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label  htmlFor="nomeEmpresa">Nome da empresa</label>
        <input
          name="nomeEmpresa"
          autoFocus
          onChange={(e) => setNomeEmpresa(e.target.value)}
        />

        <label  htmlFor="local">Local:</label>
        <input
          name="local"
          autoFocus
          onChange={(e) => setLocal(e.target.value)}
        />

        <label  htmlFor="habilidades">Hab</label>
        <select
          multiple
          name="habilidades"
          value={habilidades}
          onChange={(e) =>
            setHabilidades(
              Array.from(e.target.selectedOptions).map((option) => option.value)
            )
          }
        >
          <option value="teste1">teste 1</option>
          <option value="teste2">teste 2</option>
          <option value="teste3">teste 3</option>
        </select>

      

        <label  htmlFor="descricao">Descricao</label>

        <input
          name="descricao"
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}
