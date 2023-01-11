import { Inter } from "@next/font/google";
import { Router } from "next/router";
import { useState } from "react";
import { MultiSelect } from "@mantine/core";

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
      <h1>Cadastrar vagaa12453</h1>

      <form onSubmit={submitData}>
        <label htmlFor="titulo">Titulo</label>
        <input
          name="titulo"
          autoFocus
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label htmlFor="nomeEmpresa">Nome da empresa</label>
        <input
          name="nomeEmpresa"
          autoFocus
          onChange={(e) => setNomeEmpresa(e.target.value)}
        />

        <label htmlFor="local">Local:</label>
        <input
          name="local"
          autoFocus
          onChange={(e) => setLocal(e.target.value)}
        />

        <label htmlFor="habilidades">Hab</label>

        <MultiSelect
          data={[
            "React",
            "Angular",
            "Svelte",
            "Vue",
            "Riot",
            "Next.js",
            "Blitz.js",
          ]}
          value={habilidades}
          onChange={setHabilidades}
          label="Your favorite frameworks/libraries"
          placeholder="Pick all that you like"
          searchable
          nothingFound="Nothing found"
        />

        <label htmlFor="descricao">Descricao</label>

        <input
          name="descricao"
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}
