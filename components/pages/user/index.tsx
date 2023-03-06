import AddFolder from "#/components/common/AddFolder";
import RootFolder from "#/components/common/RootFolder";
import UserAboutSection from "#/components/common/UserAboutSection";
import UserNavBar from "#/components/common/UserNavBar";
import { userWithRootFolder } from "#/types/types";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import { Pencil } from "#/components/common/icons";
import UserComponent from "#/components/common/UserComponent";

interface Props {
  user: userWithRootFolder;
}

const Index: React.FC<Props> = ({ user }) => {
  const [rootFolder, setRootFolders] = useState(user.rootFolders);
  const loggedUser = useUser();
  const router = useRouter();
  const userID = router.query.user!;

  // return (
  //   <div className="">
  //     <h1 className="">{user.name}</h1>
  //     <UserNavBar />
  //     <UserAboutSection content={user.profileDescription} />
  //     {loggedUser?.user_metadata.provider_id &&
  //       loggedUser.user_metadata.provider_id == userID && (
  //         <AddFolder add={setRootFolders} />
  //       )}
  //     <div>
  //       {rootFolder.map((folder) => (
  //         <RootFolder key={folder.path} folder={folder} />
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div>
      {/* Secondary nav bar */}
      <div>
        <UserNavBar />
      </div>

      <section className="flex space-x-4 items-center my-8 relative">
        <div>
          <Image
            src={"/defaultuser.svg"}
            width={80}
            height={80}
            alt={"user"}
            className="rounded-full"
          ></Image>
        </div>
        <div className="text-sm">
          <div className="text-lg font-semibold">{user.name}</div>
          <div className="pl-2">
            <div>Savannah College of Art & Design</div>
            <div>Atlanta, GA</div>
          </div>
        </div>
        <UserComponent>
          <div className="absolute right-4 top-0 cursor-pointer">
            <Pencil />
          </div>
        </UserComponent>
      </section>
      <section className="m-8">
        <div className=" flex flex-col space-y-2 relative border p-4 rounded">
          <label className="absolute font-semibold -top-[0.9rem] bg-white px-2 left-4">
            About Me
          </label>
        </div>
      </section>
      <section>
        <h3>Pinned</h3>

        <div className="flex flex-col-reverse">
          {rootFolder.map((folder) => (
            <RootFolder key={folder.path} folder={folder} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
