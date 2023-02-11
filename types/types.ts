import { RootFolderMetaData, User } from "@prisma/client";

export type userWithRootFolder = User & {
  rootFolders: RootFolderMetaData[];
};
