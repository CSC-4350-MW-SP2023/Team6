import {
  Folder,
  FolderMetaData,
  RootFolderMetaData,
  User,
} from "@prisma/client";

export type userWithRootFolder = User & {
  rootFolders: RootFolderMetaData[];
};

export type IFolder = Folder & {
  RootFolderMetaData: RootFolderMetaData[];
  folders: FolderMetaData[];
};
