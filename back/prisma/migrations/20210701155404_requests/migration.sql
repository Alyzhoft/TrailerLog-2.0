/*
  Warnings:

  - You are about to drop the column `dock` on the `Requests` table. All the data in the column will be lost.
  - Added the required column `spotNumber` to the `Requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailerLocation` to the `Requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requests" DROP COLUMN "dock",
ADD COLUMN     "spotNumber" TEXT NOT NULL,
ADD COLUMN     "trailerLocation" "TrailerLocation" NOT NULL;
