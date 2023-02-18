import { RootFolderMetaData } from "@prisma/client";
import React, { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Input from "./Input";

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
        <Input
          type="text"
          placeholder="Add Folder"
          name="newFolder"
          ref={inputRef}
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default AddFolder;
