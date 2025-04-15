-- CreateTable
CREATE TABLE `GameHub` (
    `idSession` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updateAT` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idSession`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
