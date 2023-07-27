/*
  Warnings:

  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "UserStatus";
