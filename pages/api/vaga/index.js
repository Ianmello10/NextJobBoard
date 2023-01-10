import { NextApiRequest, NextApiResponse } from "next";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { titulo, descricao, nomeEmpresa, local, habilidades } = req.body;

  const data = await prisma.vaga.create({
    data: {
      descricao,
      titulo,
      nomeEmpresa,
      local,

      habilidades: {
        create: habilidades.map((habilidades) => ({ nome: habilidades })),
      },
    },
  });

  res.json(data);
}
