-- CreateTable
CREATE TABLE `Armor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `defense` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weapon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `damage` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mob` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `health` INTEGER NOT NULL,
    `attack` INTEGER NOT NULL,
    `defense` INTEGER NOT NULL,
    `speed` INTEGER NOT NULL,
    `weaponId` INTEGER NULL,
    `armorId` INTEGER NULL,
    `manevr` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Mob_armorId_fkey`(`armorId`),
    INDEX `Mob_weaponId_fkey`(`weaponId`),
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
CREATE TABLE `turnhistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `x` INTEGER NOT NULL,
    `y` INTEGER NOT NULL,
    `idSession` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idMob` INTEGER NULL,
    `idOwner` INTEGER NOT NULL,
    `tokenMob` VARCHAR(191) NOT NULL,
    `isOverMove` BOOLEAN NULL,

    UNIQUE INDEX `turnhistory_tokenMob_key`(`tokenMob`),
    PRIMARY KEY (`id`)
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
    `idTariff` INTEGER NULL,
    `idSession` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_nickname_key`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chatMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `idSession` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tariff` (
    `idTariff` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'avtive',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idTariff`)
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

-- AddForeignKey
ALTER TABLE `mob` ADD CONSTRAINT `Mob_armorId_fkey` FOREIGN KEY (`armorId`) REFERENCES `Armor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mob` ADD CONSTRAINT `Mob_weaponId_fkey` FOREIGN KEY (`weaponId`) REFERENCES `Weapon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurnOrder` ADD CONSTRAINT `TurnOrder_mobId_fkey` FOREIGN KEY (`mobId`) REFERENCES `mob`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turnhistory` ADD CONSTRAINT `turnhistory_idSession_fkey` FOREIGN KEY (`idSession`) REFERENCES `GameHub`(`token`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turnhistory` ADD CONSTRAINT `turnhistory_idMob_fkey` FOREIGN KEY (`idMob`) REFERENCES `mob`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turnhistory` ADD CONSTRAINT `turnhistory_idOwner_fkey` FOREIGN KEY (`idOwner`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_idTariff_fkey` FOREIGN KEY (`idTariff`) REFERENCES `Tariff`(`idTariff`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_idSession_fkey` FOREIGN KEY (`idSession`) REFERENCES `GameHub`(`token`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chatMessage` ADD CONSTRAINT `chatMessage_idSession_fkey` FOREIGN KEY (`idSession`) REFERENCES `GameHub`(`token`) ON DELETE SET NULL ON UPDATE CASCADE;
