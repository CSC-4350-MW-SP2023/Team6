import { RootFolderMetaData } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  folder: RootFolderMetaData;
}

const RootFolder: React.FC<Props> = ({ folder }) => {
  return (
    <Link href={`folder?path=${folder.path}`}>
      <div>{folder.name}</div>
    </Link>
  );
};

export default RootFolder;
