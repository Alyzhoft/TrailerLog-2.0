/*
  Warnings:

  - Added the required column `requestType` to the `Requests` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('IN', 'OUT');

-- AlterTable
ALTER TABLE "Requests" ADD COLUMN     "requestType" "RequestType" NOT NULL;
