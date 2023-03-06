import { RootFolderMetaData } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  folder: RootFolderMetaData;
}

const RootFolder: React.FC<Props> = ({ folder }) => {
  return (
    <Link href={`/folder/${folder.path}`}>
      <div
        className={`px-8 py-4 text-gray-50 bg-gray-500 rounded shadow hover:shadow-xl my-2 transition-all`}
      >
        <div className="text-xl">{folder.name}</div>
        {/* In future the description is going to come from the db */}
        <div className="text-sm indent-4 h-[3rem]">
          <p className="line-clamp-3 text-gray-200 ">{folder.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default RootFolder;
