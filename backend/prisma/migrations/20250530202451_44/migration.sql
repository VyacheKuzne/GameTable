-- CreateTable
CREATE TABLE `leftTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `tariffId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `leftTime` ADD CONSTRAINT `leftTime_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leftTime` ADD CONSTRAINT `leftTime_tariffId_fkey` FOREIGN KEY (`tariffId`) REFERENCES `Tariff`(`idTariff`) ON DELETE SET NULL ON UPDATE CASCADE;
