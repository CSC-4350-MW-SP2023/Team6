import supabase from "#/supabase.client";
import { IFolder } from "#/types/types";
import { Folder, FolderMetaData } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  folder: IFolder;
}

const index: React.FC<Props> = ({ folder }) => {
  const [folderMetadata, setFolderMetadata] = useState<FolderMetaData[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const parentFolder = useRef(
    folder.path.substring(0, folder.path.lastIndexOf("/"))
  );
  const fileRef = useRef<HTMLInputElement>(null);

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
      {folder.path.split("/").length >= 3 && (
        <Link
          className="flex items-center space-x-4"
          href={`/folder?path=${parentFolder.current}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>

          <span>{parentFolder.current}</span>
        </Link>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const folderName = inputRef.current!.value.trim();
          inputRef.current!.value = "";

          if (!folderName) return;

          // call the api and add a new folder
          const { data } = await axios.post("/api/addfolder", {
            folderName,
            ownerId: "satvik",
            path: `${folder.path}/${folderName}`,
            parent: folder.path,
          });

          setFolderMetadata(data);
        }}
      >
        <input type="text" ref={inputRef} className="border-2" />
        <button type="submit">New Folder</button>
      </form>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const files = fileRef.current!.files;

          if (!files || !files.length) return;

          //@ts-ignore
          const file = [...files][0] as File;

          // save the file in supabse

          const { data, error } = await supabase.storage
            .from("files")
            .upload(`${folder.path}/${file.name}`, file);

          if (error) {
            return;
          }
          // save the link in the folder

          await axios.post("/api/addfile", {
            parent: folder.path,
            file: data.path,
          });

          setFiles((prev) => [...prev, data.path]);
          fileRef.current!.value = "";
        }}
      >
        <input type="file" ref={fileRef} id="" />
        <button>Add file</button>
      </form>
      <div>
        {folderMetadata.map((data) => (
          <Link href={`/folder?path=${data.path}`} key={data.path}>
            {data.name}
          </Link>
        ))}
        {files.map((file) => (
          <div>{file.split("/").at(-1)}</div>
        ))}
      </div>
    </div>
  );
};

export default index;
