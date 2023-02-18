import { RootFolderMetaData } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  folder: RootFolderMetaData;
}

const RootFolder: React.FC<Props> = ({ folder }) => {
  return (
    <Link href={`folder?path=${folder.path}`}>
      <div
        className={`px-8 py-4 text-gray-50 bg-gray-400 rounded shadow hover:shadow-xl my-2 transition-all`}
      >
        <div>{folder.name}</div>
        {/* In future the description is going to come from the db */}
        <div className="text-sm indent-4 text-gray-200">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores at
          optio ab autem? Consequuntur ea est eos culpa, consequatur at, aperiam
          atque quae doloremque ut ad reprehenderit autem similique laborum?
        </div>
      </div>
    </Link>
  );
};

export default RootFolder;
