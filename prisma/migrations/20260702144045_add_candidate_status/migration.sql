-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('pending', 'active', 'suspended', 'inactive');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activatedAt" TIMESTAMP(3),
ADD COLUMN     "status" "CandidateStatus" NOT NULL DEFAULT 'pending';
