import AddFolder from "#/components/common/AddFolder";
import RootFolder from "#/components/common/RootFolder";
import { userWithRootFolder } from "#/types/types";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {
  user: userWithRootFolder;
}

const Index: React.FC<Props> = ({ user }) => {
  const [rootFolder, setRootFolders] = useState(user.rootFolders);
  const loggedUser = useUser();
  const router = useRouter();
  const userID = router.query.user!;

  return (
    <div className="">
      <div className="my-2 font-semibold text-xl">{user.name}</div>

      {loggedUser?.user_metadata.provider_id &&
        loggedUser.user_metadata.provider_id == userID && (
          <AddFolder add={setRootFolders} />
        )}
      <div>
        {rootFolder.map((folder) => (
          <RootFolder key={folder.path} folder={folder} />
        ))}
      </div>
    </div>
  );
};

export default Index;
