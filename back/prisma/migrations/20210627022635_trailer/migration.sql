/*
  Warnings:

  - Added the required column `spotNumber` to the `Trailer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `trailerLocation` on the `Trailer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TrailerLocation" AS ENUM ('PRIMARY', 'SECONDARY', 'RVAC', 'RMAN');

-- AlterTable
ALTER TABLE "Trailer" ADD COLUMN     "spotNumber" TEXT NOT NULL,
DROP COLUMN "trailerLocation",
ADD COLUMN     "trailerLocation" "TrailerLocation" NOT NULL;
