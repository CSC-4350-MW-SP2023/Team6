import React from "react";
import type { NextPage } from "next";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Error from "next/error";
import Input from "#/components/common/Input";
import { Plus } from "#/components/common/icons";
import axios from "axios";

const Page: NextPage = () => {
  const router = useRouter();
  const user = useUser();

  if (!user) return <Error statusCode={404} />;
  return (
    <div>
      <section className="my-8">
        <h2>New Folder</h2>
      </section>
      <section>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const folderName = formData.get("folderName");
            const description = formData.get("description");

            await axios.post("/api/addrootfolder", {
              folderName,
              description,
            });

            router.push({
              pathname: `/folder/${user.user_metadata.provider_id}/${folderName}`,
              query: {
                user: user.user_metadata.provider_id,
              },
            });
          }}
        >
          <Input
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                event.preventDefault();
              }
            }}
            name="folderName"
            autoComplete="off"
            placeholder="Folder Name"
            required
            min="3"
          />
          <textarea
            className="border-2 rounded min-h-[10rem] w-[80%] px-2 py-2"
            placeholder="Description..."
            name="description"
          />

          <div className="my-2 text-gray-700  px-4">
            <ul>
              <li>All files uploaded here will be seen on the root.</li>
              <li>Uploading a folder will act as a root</li>
            </ul>
          </div>
          <div className="border-2  rounded w-[80%] my-4 h-[30rem] mx-auto p-2">
            <div className="border-2 h-full rounded flex flex-col justify-center items-center text-gray-700 border-dashed">
              <Plus />
              <span>Drag And Drop</span>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded hover:shadow transition-all bg-gray-300"
          >
            Save
          </button>
        </form>
      </section>
    </div>
  );
};

export default Page;
