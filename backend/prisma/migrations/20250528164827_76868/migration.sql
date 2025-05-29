-- DropForeignKey
ALTER TABLE `skill` DROP FOREIGN KEY `skill_mobId_fkey`;

-- DropIndex
DROP INDEX `skill_mobId_fkey` ON `skill`;

-- AlterTable
ALTER TABLE `skill` MODIFY `mobId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_mobId_fkey` FOREIGN KEY (`mobId`) REFERENCES `mob`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
