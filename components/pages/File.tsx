import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { IframeHTMLAttributes } from "react";
import FileRender from "#/components/common/FileRender";
import FolderNavigation from "#/components/common/FolderNavigation";
import dynamic from "next/dynamic";
import UserComponent from "../common/UserComponent";

interface Props {
  filePath: string;
}

const File: React.FC<Props> = ({ filePath }) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { publicUrl } = supabase.storage
    .from("files")
    .getPublicUrl(filePath, {}).data;

  const parentFolder = [...(router.query.all! as string[])]
    .slice(0, -1)
    .join("/");
  const fileName = [...(router.query.all! as string[])].pop() as string;
  const fileType = fileName.replace(/.*\./, "");

  return (
    <div className="">
      <FolderNavigation path={parentFolder} file={true} />
      <div className="flex items-center justify-between">
        <h2 className="my-8">{fileName}</h2>
        <div className="flex space-x-4">
          <UserComponent>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </UserComponent>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </div>
      </div>

      <FileRender fileType={fileType} path={publicUrl} />
    </div>
  );
};

export default File;
