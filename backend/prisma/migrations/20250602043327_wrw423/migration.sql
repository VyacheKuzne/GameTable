-- CreateTable
CREATE TABLE `Armor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `defense` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `creatorId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weapon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `damage` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `creatorId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leftTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `tariffId` INTEGER NULL,

    UNIQUE INDEX `leftTime_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mob` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `health` INTEGER NOT NULL,
    `speed` INTEGER NOT NULL,
    `weaponId` INTEGER NULL,
    `armorId` INTEGER NULL,
    `titulid` INTEGER NULL,
    `creatorId` INTEGER NULL,
    `manevr` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Mob_armorId_fkey`(`armorId`),
    INDEX `Mob_weaponId_fkey`(`weaponId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `titul` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TurnOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `turnIndex` INTEGER NOT NULL,
    `mobId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TurnOrder_mobId_key`(`mobId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mobsOnTable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `x` INTEGER NOT NULL,
    `y` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `healthMax` INTEGER NOT NULL,
    `healthNow` INTEGER NOT NULL,
    `psih` INTEGER NOT NULL DEFAULT 100,
    `idSession` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idMob` INTEGER NULL,
    `idOwner` INTEGER NOT NULL,
    `tokenMob` VARCHAR(191) NOT NULL,
    `isOverMove` BOOLEAN NULL,
    `willToLive` INTEGER NULL DEFAULT 80,
    `status` VARCHAR(191) NOT NULL DEFAULT 'alive',

    UNIQUE INDEX `mobsOnTable_tokenMob_key`(`tokenMob`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chatMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `idSession` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `senderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tariff` (
    `idTariff` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'avtive',
    `createrId` INTEGER NOT NULL,
    `availableMobs` INTEGER NOT NULL,
    `availableTime` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tariff_name_key`(`name`),
    PRIMARY KEY (`idTariff`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `secondname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `yandexId` VARCHAR(191) NULL,
    `idTariff` INTEGER NULL,
    `avatar` VARCHAR(191) NULL,
    `createdSessionId` VARCHAR(191) NULL,
    `idSession` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_nickname_key`(`nickname`),
    UNIQUE INDEX `User_yandexId_key`(`yandexId`),
    UNIQUE INDEX `User_createdSessionId_key`(`createdSessionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameHub` (
    `idSession` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAT` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GameHub_token_key`(`token`),
    PRIMARY KEY (`idSession`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill` (
    `idSkill` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `timeout` INTEGER NOT NULL,
    `damageMin` INTEGER NOT NULL,
    `damageMax` INTEGER NOT NULL,
    `range` INTEGER NOT NULL,
    `mobId` INTEGER NULL,
    `creatorId` INTEGER NULL,

    UNIQUE INDEX `skill_name_key`(`name`),
    PRIMARY KEY (`idSkill`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchasedTariffs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `tariffId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `priceAtPurchase` INTEGER NOT NULL,

    UNIQUE INDEX `purchasedTariffs_userId_tariffId_createdAt_key`(`userId`, `tariffId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Armor` ADD CONSTRAINT `Armor_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Weapon` ADD CONSTRAINT `Weapon_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leftTime` ADD CONSTRAINT `leftTime_tariffId_fkey` FOREIGN KEY (`tariffId`) REFERENCES `Tariff`(`idTariff`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leftTime` ADD CONSTRAINT `leftTime_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mob` ADD CONSTRAINT `Mob_armorId_fkey` FOREIGN KEY (`armorId`) REFERENCES `Armor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mob` ADD CONSTRAINT `Mob_weaponId_fkey` FOREIGN KEY (`weaponId`) REFERENCES `Weapon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mob` ADD CONSTRAINT `mob_titulid_fkey` FOREIGN KEY (`titulid`) REFERENCES `titul`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mob` ADD CONSTRAINT `mob_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurnOrder` ADD CONSTRAINT `TurnOrder_mobId_fkey` FOREIGN KEY (`mobId`) REFERENCES `mob`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mobsOnTable` ADD CONSTRAINT `mobsOnTable_idSession_fkey` FOREIGN KEY (`idSession`) REFERENCES `GameHub`(`token`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mobsOnTable` ADD CONSTRAINT `mobsOnTable_idMob_fkey` FOREIGN KEY (`idMob`) REFERENCES `mob`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mobsOnTable` ADD CONSTRAINT `mobsOnTable_idOwner_fkey` FOREIGN KEY (`idOwner`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chatMessage` ADD CONSTRAINT `chatMessage_idSession_fkey` FOREIGN KEY (`idSession`) REFERENCES `GameHub`(`token`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chatMessage` ADD CONSTRAINT `chatMessage_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tariff` ADD CONSTRAINT `Tariff_createrId_fkey` FOREIGN KEY (`createrId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_idTariff_fkey` FOREIGN KEY (`idTariff`) REFERENCES `Tariff`(`idTariff`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_idSession_fkey` FOREIGN KEY (`idSession`) REFERENCES `GameHub`(`token`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_mobId_fkey` FOREIGN KEY (`mobId`) REFERENCES `mob`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchasedTariffs` ADD CONSTRAINT `purchasedTariffs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchasedTariffs` ADD CONSTRAINT `purchasedTariffs_tariffId_fkey` FOREIGN KEY (`tariffId`) REFERENCES `Tariff`(`idTariff`) ON DELETE RESTRICT ON UPDATE CASCADE;
