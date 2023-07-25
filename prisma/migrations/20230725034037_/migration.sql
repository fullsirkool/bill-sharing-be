-- AlterTable
ALTER TABLE "User" ALTER COLUMN "refresh_token" DROP NOT NULL,
ALTER COLUMN "expired_time" DROP NOT NULL,
ALTER COLUMN "avatar_picture" DROP NOT NULL;
