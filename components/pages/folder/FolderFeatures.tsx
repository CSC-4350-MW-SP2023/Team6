import { AddFileIcon, NewFolderIcon } from "#/components/common/icons";
import Input from "#/components/common/Input";
import { IFolder } from "#/types/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { User } from "@supabase/supabase-js";
import axios from "axios";
import React, { useRef, useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";

interface Props {
  user: User | null;
  pathId: string;
  setFolderMetadata: React.Dispatch<React.SetStateAction<any[]>>;
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  folder: IFolder;
}

const FolderFeatures: React.FC<Props> = ({
  user,
  pathId,
  setFolderMetadata,
  folder,
  setFiles,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = useSupabaseClient();
  const [inputState, setInputState] = useState(false);

  return (
    <div className="">
      {user && user.user_metadata.provider_id == pathId && (
        <AnimateSharedLayout>
          <motion.div layout className="flex items-center space-x-4 h-[5rem]">
            <form
              key={1}
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
              className="flex space-x-2 items-center"
            >
              <div
                key={"1"}
                className="text-gray-400  select-none   "
                onClick={() => setInputState((prev) => !prev)}
              >
                <NewFolderIcon />
              </div>
              {inputState && (
                <div key={"2"}>
                  <Input placeholder="Add Folder" type="text" ref={inputRef} />
                </div>
              )}
            </form>
            <motion.label
              layout
              key={2}
              className="cursor-pointer block  rounded text-gray-400"
            >
              <AddFileIcon />
              <input
                onChange={async (e) => {
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
                className="hidden"
                type="file"
                ref={fileRef}
                id=""
              />
            </motion.label>
          </motion.div>
        </AnimateSharedLayout>
      )}
    </div>
  );
};

export default FolderFeatures;
