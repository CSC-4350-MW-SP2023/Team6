import { RootFolderMetaData } from "@prisma/client";
import React, { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {
  add: React.Dispatch<React.SetStateAction<RootFolderMetaData[]>>;
}

const AddFolder: React.FC<Props> = ({ add }) => {
  const { query } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          let folderName = formData.get("newFolder")?.toString() || "";
          folderName = folderName.trim();

          if (!folderName) return;
          const { data } = await axios.post("/api/addrootfolder", {
            folderName,
            ownerId: query.user,
          });

          add(data);
          inputRef.current!.value = "";
        }}
      >
        <input
          type="text"
          className=" border-2"
          name="newFolder"
          ref={inputRef}
        />
        <button type="submit">Add Folder</button>
      </form>
    </div>
  );
};

export default AddFolder;
