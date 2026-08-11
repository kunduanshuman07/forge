-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ENGINEER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'ENGINEER';
