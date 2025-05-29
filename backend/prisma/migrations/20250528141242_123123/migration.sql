/*
  Warnings:

  - You are about to drop the column `weight` on the `armor` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `weapon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `armor` DROP COLUMN `weight`;

-- AlterTable
ALTER TABLE `weapon` DROP COLUMN `weight`;
