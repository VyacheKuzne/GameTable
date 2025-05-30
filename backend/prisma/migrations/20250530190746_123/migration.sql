/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tariff` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `armor` ADD COLUMN `creatorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `skill` ADD COLUMN `creatorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `weapon` ADD COLUMN `creatorId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tariff_name_key` ON `Tariff`(`name`);

-- AddForeignKey
ALTER TABLE `Armor` ADD CONSTRAINT `Armor_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Weapon` ADD CONSTRAINT `Weapon_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
