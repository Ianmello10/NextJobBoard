-- CreateTable
CREATE TABLE "Vaga" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeEmpresa" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "expiredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Habilidades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_HabilidadesToVaga" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_HabilidadesToVaga_A_fkey" FOREIGN KEY ("A") REFERENCES "Habilidades" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_HabilidadesToVaga_B_fkey" FOREIGN KEY ("B") REFERENCES "Vaga" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_HabilidadesToVaga_AB_unique" ON "_HabilidadesToVaga"("A", "B");

-- CreateIndex
CREATE INDEX "_HabilidadesToVaga_B_index" ON "_HabilidadesToVaga"("B");
