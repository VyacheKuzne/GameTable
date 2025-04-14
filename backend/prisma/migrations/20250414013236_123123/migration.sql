/*
  Warnings:

  - Added the required column `idTariff` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `idTariff` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Tariff` (
    `idTariff` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idTariff`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_idTariff_fkey` FOREIGN KEY (`idTariff`) REFERENCES `Tariff`(`idTariff`) ON DELETE RESTRICT ON UPDATE CASCADE;
