import AddFolder from "#/components/common/AddFolder";
import RootFolder from "#/components/common/RootFolder";
import { userWithRootFolder } from "#/types/types";
import React, { useState } from "react";

interface Props {
  user: userWithRootFolder;
}

const index: React.FC<Props> = ({ user }) => {
  const [rootFolder, setRootFolders] = useState(user.rootFolders);
  return (
    <div className="">
      <AddFolder add={setRootFolders} />
      <div>
        {rootFolder.map((folder) => (
          <RootFolder key={folder.path} folder={folder} />
        ))}
      </div>
    </div>
  );
};

export default index;
