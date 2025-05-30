/*
  Warnings:

  - Added the required column `senderId` to the `chatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chatmessage` ADD COLUMN `senderId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `chatMessage` ADD CONSTRAINT `chatMessage_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
