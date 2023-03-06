import { Plus } from "#/components/common/icons";
import RootFolder from "#/components/common/RootFolder";
import UserComponent from "#/components/common/UserComponent";
import UserNavBar from "#/components/common/UserNavBar";
import getUser from "#/misc/getUser";
import { userWithRootFolder } from "#/types/types";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  user: userWithRootFolder;
}

const AllFolders: React.FC<Props> = ({ user }) => {
  // return (
  //   <div className="">
  //     <h1>{user.name}</h1>
  //     <div>Folders</div>
  //     {user.rootFolders.map((folder) => (
  //       <RootFolder folder={folder} />
  //     ))}
  //   </div>
  // );

  const router = useRouter();
  const loggedUser = useUser();
  const userId = router.query.user as string;

  return (
    <div>
      <div>
        <UserNavBar />
      </div>

      <section className="my-8">
        <h2>{user.name}</h2>
      </section>
      <UserComponent>
        <section>
          <Link
            href={{
              pathname: "/newfolder",
            }}
            className="hover:shadow-xl transition-all shadow bg-gray-400 px-2 py-2 rounded flex w-fit"
          >
            <span>
              <Plus />
            </span>
            <span>New folder</span>
          </Link>
        </section>
      </UserComponent>
      <section className="my-8 flex flex-col-reverse">
        {user.rootFolders.map((folder) => (
          <RootFolder key={folder.path} folder={folder} />
        ))}
      </section>
    </div>
  );
};

export default AllFolders;
