-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_idTariff_fkey`;

-- DropIndex
DROP INDEX `User_idTariff_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `idTariff` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_idTariff_fkey` FOREIGN KEY (`idTariff`) REFERENCES `Tariff`(`idTariff`) ON DELETE SET NULL ON UPDATE CASCADE;
