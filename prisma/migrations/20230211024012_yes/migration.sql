-- CreateTable
CREATE TABLE "RootFolderMetaData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RootFolderMetaData_id_key" ON "RootFolderMetaData"("id");

-- AddForeignKey
ALTER TABLE "RootFolderMetaData" ADD CONSTRAINT "RootFolderMetaData_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
