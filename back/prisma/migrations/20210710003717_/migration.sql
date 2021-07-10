-- AlterTable
ALTER TABLE "Spots" ADD COLUMN     "trailerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Spots" ADD FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
