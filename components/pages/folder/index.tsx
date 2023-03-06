import File from "#/components/common/File";
import FolderComponent from "#/components/common/Folder";
import FolderNavigation from "#/components/common/FolderNavigation";
import { IFolder } from "#/types/types";
import { FolderMetaData } from "@prisma/client";
import { useUser } from "@supabase/auth-helpers-react";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import FolderFeatures from "./FolderFeatures";

interface Props {
  folder: IFolder;
}

const index: React.FC<Props> = ({ folder }) => {
  const [folderMetadata, setFolderMetadata] = useState<FolderMetaData[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const parentFolder = useRef(
    folder.path.substring(0, folder.path.lastIndexOf("/"))
  );
  const user = useUser();
  const router = useRouter();
  const param = router.query.all as string[];
  const path = param.join("/");
  const pathId = path.substring(0, path.indexOf("/"));

  useEffect(() => {
    setFolderMetadata(folder.folders);
    parentFolder.current = folder.path.substring(
      0,
      folder.path.lastIndexOf("/")
    );

    setFiles(folder.files);
  }, [folder.folders]);

  return (
    <div className="">
      <FolderNavigation path={folder.path} />

      <h2>{folder.name}</h2>

      <FolderFeatures
        folder={folder}
        setFolderMetadata={setFolderMetadata}
        user={user}
        pathId={pathId}
        setFiles={setFiles}
      />
      <div>
        {folderMetadata.map((data) => (
          <FolderComponent folder={data} />
        ))}
        {files.map((file) => (
          <File url={file} />
        ))}
      </div>
    </div>
  );
};

export default index;
