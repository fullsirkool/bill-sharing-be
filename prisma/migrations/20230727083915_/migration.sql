/*
  Warnings:

  - You are about to drop the column `activated` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVATED', 'INACTIVATED', 'PENDING');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activated",
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'INACTIVATED',
ALTER COLUMN "gender" DROP NOT NULL;
