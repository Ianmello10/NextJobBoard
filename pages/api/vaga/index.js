import { NextApiRequest, NextApiResponse } from "next";

import { Prisma, PrismaClient } from "@prisma/client";

import hmacSHA512 from 'crypto-js/hmac-sha512';


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

 



const checkAndDeleteExpiredVagas = async () => { 
   


  const threeMonthsAgo = new Date(new Date().getTime() - 3 * 30 * 24 * 60 * 60 * 1000)

  const expiredVagas = await prisma.vaga.findMany({
    where: {
      expiredAt: { lte: new Date(new Date().getTime() - 10000) },
    },
  });

  expiredVagas.forEach(async (vaga) => {
    await prisma.vaga.delete({
      where: {
        id: vaga.id,
      },
    });
  });
}

 checkAndDeleteExpiredVagas();  