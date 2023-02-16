/*
  Warnings:

  - You are about to drop the column `id` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `rootFolderMetaDataId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `RootFolderMetaData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path]` on the table `RootFolderMetaData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `Folder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folderId` to the `RootFolderMetaData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `RootFolderMetaData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_rootFolderMetaDataId_fkey";

-- DropForeignKey
ALTER TABLE "FolderMetaData" DROP CONSTRAINT "FolderMetaData_folderId_fkey";

-- DropIndex
DROP INDEX "Folder_id_key";

-- DropIndex
DROP INDEX "RootFolderMetaData_id_key";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "id",
DROP COLUMN "rootFolderMetaDataId",
ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RootFolderMetaData" DROP COLUMN "id",
ADD COLUMN     "folderId" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_path_key" ON "Folder"("path");

-- CreateIndex
CREATE UNIQUE INDEX "RootFolderMetaData_path_key" ON "RootFolderMetaData"("path");

-- AddForeignKey
ALTER TABLE "RootFolderMetaData" ADD CONSTRAINT "RootFolderMetaData_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("path") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderMetaData" ADD CONSTRAINT "FolderMetaData_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("path") ON DELETE RESTRICT ON UPDATE CASCADE;
