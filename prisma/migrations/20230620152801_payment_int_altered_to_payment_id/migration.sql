/*
  Warnings:

  - You are about to drop the column `paymentInt` on the `payments` table. All the data in the column will be lost.
  - Added the required column `payment_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payments` DROP COLUMN `paymentInt`,
    ADD COLUMN `payment_id` VARCHAR(191) NOT NULL;
