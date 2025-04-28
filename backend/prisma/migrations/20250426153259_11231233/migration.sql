/*
  Warnings:

  - A unique constraint covering the columns `[createdSessionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdSessionId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_createdSessionId_key` ON `User`(`createdSessionId`);
