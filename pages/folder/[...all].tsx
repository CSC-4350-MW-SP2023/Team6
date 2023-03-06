import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import prisma from "#/prisma.config";
import Folder from "#/components/pages/folder";
import { IFolder } from "#/types/types";

const folder: NextPage<any> = ({ folder }) => {
  return (
    <>
      <Folder folder={folder as IFolder} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let params = ctx.query.all as string[];
  let path = params.join("/");

  if (!path)
    return {
      notFound: true,
    };

  const folder = await prisma.folder.findUnique({
    where: {
      path,
    },
    include: {
      folders: true,
      RootFolderMetaData: true,
    },
  });

  if (!folder)
    return {
      notFound: true,
    };

  return {
    props: {
      folder,
    },
  };
};

export default folder;
