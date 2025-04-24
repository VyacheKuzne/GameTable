/*
  Warnings:

  - A unique constraint covering the columns `[tokenMob]` on the table `turnhistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `turnhistory_tokenMob_key` ON `turnhistory`(`tokenMob`);
