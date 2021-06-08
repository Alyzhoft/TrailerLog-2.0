/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Trailer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trailerNumber" VARCHAR(255) NOT NULL,
    "carrier" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "trailerLocation" TEXT NOT NULL,
    "comments" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "out" TEXT,
    "inCarrier" TEXT,
    "inTrailerNumber" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedTime" TIMESTAMP(3),
    "urgent" BOOLEAN NOT NULL DEFAULT false,
    "dock" TEXT,
    "outTrailerNumber" TEXT,
    "outCarrier" TEXT,
    "special" TEXT,
    "outCategory" TEXT,
    "inTrailerLocation" TEXT,
    "trailerId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Requests.trailerId_unique" ON "Requests"("trailerId");

-- AddForeignKey
ALTER TABLE "Requests" ADD FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
