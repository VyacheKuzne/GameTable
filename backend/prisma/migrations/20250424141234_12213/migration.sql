/*
  Warnings:

  - You are about to drop the column `token` on the `turnhistory` table. All the data in the column will be lost.
  - Added the required column `tokenMob` to the `turnhistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `turnhistory` DROP COLUMN `token`,
    ADD COLUMN `tokenMob` VARCHAR(191) NOT NULL;
