/*
  Warnings:

  - A unique constraint covering the columns `[trailerId]` on the table `Spots` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Spots_trailerId_unique" ON "Spots"("trailerId");
