import React from "react";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStaticPaths({ params }) {
  // Use a data source (e.g. an API) to fetch the paths

  async function fetchFromApi() {
    const vagas = await prisma.vaga.findMany();

    const filterVagas = vagas.map((vaga) => {
      const { expiredAt, ...filterVagas } = vaga;

      return filterVagas;
    });

    return filterVagas.map((vaga) => `/vaga/${vaga.id}`);
  }

  const paths = await fetchFromApi();
  // Return the paths as an object with the `params` key
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const vaga = await prisma.vaga.findUnique({
    where: {
      id: params.id,
    },
  });

  const { expiredAt, ...filterVagas } = vaga;

  return {
    props: filterVagas,
  };
};

export default function Vaga(props) {
  return (
    <>
      <h1>Vaga</h1>
      <p>{props.titulo}</p>
      <p>{props.descricao}</p>
    </>
  );
}
