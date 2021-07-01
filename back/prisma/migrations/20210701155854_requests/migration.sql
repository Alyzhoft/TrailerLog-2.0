/*
  Warnings:

  - You are about to drop the column `spotNumber` on the `Requests` table. All the data in the column will be lost.
  - You are about to drop the column `trailerLocation` on the `Requests` table. All the data in the column will be lost.
  - The `inTrailerLocation` column on the `Requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Requests" DROP COLUMN "spotNumber",
DROP COLUMN "trailerLocation",
ADD COLUMN     "inSpotNumber" TEXT,
ADD COLUMN     "outSpotNumber" TEXT,
ADD COLUMN     "outTrailerLocation" "TrailerLocation",
DROP COLUMN "inTrailerLocation",
ADD COLUMN     "inTrailerLocation" "TrailerLocation";
