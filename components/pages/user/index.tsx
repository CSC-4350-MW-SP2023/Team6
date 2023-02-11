import AddFolder from "#/components/common/AddFolder";
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
          <div>{folder.name}</div>
        ))}
      </div>
    </div>
  );
};

export default index;
