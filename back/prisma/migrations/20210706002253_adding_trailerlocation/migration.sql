/*
  Warnings:

  - The `outTrailerLocation` column on the `Requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `inTrailerLocation` column on the `Requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `trailerLocation` on the `Trailer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Requests" DROP COLUMN "outTrailerLocation",
ADD COLUMN     "outTrailerLocation" TEXT,
DROP COLUMN "inTrailerLocation",
ADD COLUMN     "inTrailerLocation" TEXT;

-- AlterTable
ALTER TABLE "Trailer" DROP COLUMN "trailerLocation",
ADD COLUMN     "trailerLocation" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TrailerLocation";

-- CreateTable
CREATE TABLE "TrailerLocation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lot" BOOLEAN DEFAULT false,
    "dock" BOOLEAN DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spots" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "spot" TEXT NOT NULL,
    "trailerLocationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Spots" ADD FOREIGN KEY ("trailerLocationId") REFERENCES "TrailerLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
