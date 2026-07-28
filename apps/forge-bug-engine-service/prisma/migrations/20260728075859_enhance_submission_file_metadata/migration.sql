/*
  Warnings:

  - Added the required column `displayOrder` to the `SubmissionFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SubmissionFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `SubmissionFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubmissionFile" ADD COLUMN     "displayOrder" INTEGER NOT NULL,
ADD COLUMN     "extension" TEXT,
ADD COLUMN     "isEditable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" "ProgrammingLanguage",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER,
ADD COLUMN     "type" "FileType" NOT NULL;
