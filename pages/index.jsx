import React from "react";
import { GetStaticProps } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import Router from "next/router";

const prisma = new PrismaClient();

export const getStaticProps = async () => {
  const vagas = await prisma.vaga.findMany({
    include: { habilidades: true },
  });

  const props = {
    vagas: vagas.map((vaga) => ({
      ...vaga,
      expiredAt: vaga.expiredAt.toISOString(),
    })),
  };

  return {
    props,
  };
};

export default function Home(props) {
  console.log(props);

  return (
    <>
      <h1>Job Board </h1>

      {props.vagas.map((vaga) => (
        <div
          onClick={() => Router.push("/vaga/[id]", `/vaga/${vaga.id}`)}
          key={vaga.id}
        >
          <p>{vaga.titulo}</p>
          <p>{vaga.descricao}</p>
          <p>{vaga.nomeEmpresa}</p>
          <p>{vaga.local}</p>
          {vaga.habilidades.map((hab) => (
            <div key={hab.id}>
              <p>{hab.nome}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
