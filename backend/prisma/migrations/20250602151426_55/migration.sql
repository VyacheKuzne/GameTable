/*
  Warnings:

  - Added the required column `updateAT` to the `GameHub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gamehub` ADD COLUMN `updateAT` DATETIME(3) NOT NULL;
