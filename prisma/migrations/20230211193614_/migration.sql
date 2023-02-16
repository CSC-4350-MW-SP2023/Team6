/*
  Warnings:

  - You are about to drop the column `userId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `RootFolderMetaData` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_userId_fkey";

-- DropForeignKey
ALTER TABLE "RootFolderMetaData" DROP CONSTRAINT "RootFolderMetaData_folderId_fkey";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "userId",
ADD COLUMN     "rootFolderMetaDataId" TEXT;

-- AlterTable
ALTER TABLE "RootFolderMetaData" DROP COLUMN "folderId";

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_rootFolderMetaDataId_fkey" FOREIGN KEY ("rootFolderMetaDataId") REFERENCES "RootFolderMetaData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
