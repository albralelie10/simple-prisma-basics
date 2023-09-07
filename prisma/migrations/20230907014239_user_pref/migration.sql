/*
  Warnings:

  - You are about to drop the column `userId` on the `UserConfiguration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userConfigurationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserConfiguration` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `UserConfiguration` DROP FOREIGN KEY `UserConfiguration_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `userConfigurationId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserConfiguration` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `User_userConfigurationId_key` ON `User`(`userConfigurationId`);

-- CreateIndex
CREATE UNIQUE INDEX `UserConfiguration_id_key` ON `UserConfiguration`(`id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userConfigurationId_fkey` FOREIGN KEY (`userConfigurationId`) REFERENCES `UserConfiguration`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
