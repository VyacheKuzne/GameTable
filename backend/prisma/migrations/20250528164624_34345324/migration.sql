/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `skill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `damageMax` to the `skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `damageMin` to the `skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobId` to the `skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `range` to the `skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeout` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mobsontable` MODIFY `willToLive` INTEGER NULL DEFAULT 80;

-- AlterTable
ALTER TABLE `skill` ADD COLUMN `damageMax` INTEGER NOT NULL,
    ADD COLUMN `damageMin` INTEGER NOT NULL,
    ADD COLUMN `mobId` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `range` INTEGER NOT NULL,
    ADD COLUMN `timeout` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `skill_name_key` ON `skill`(`name`);

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_mobId_fkey` FOREIGN KEY (`mobId`) REFERENCES `mob`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
