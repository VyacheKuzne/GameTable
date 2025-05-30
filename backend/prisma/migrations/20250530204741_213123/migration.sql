/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `leftTime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tariffId]` on the table `leftTime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `leftTime_userId_key` ON `leftTime`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `leftTime_tariffId_key` ON `leftTime`(`tariffId`);
