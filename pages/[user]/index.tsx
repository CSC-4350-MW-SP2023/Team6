import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import prisma from "#/prisma.config";
import { useRouter } from "next/router";
import Index from "#/components/pages/user";
import { userWithRootFolder } from "#/types/types";

const index: NextPage<{
  user: userWithRootFolder;
}> = ({ user }) => {
  return (
    <>
      <Index user={user} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user: userID } = ctx.query as any;

  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    include: {
      rootFolders: true,
    },
  });

  if (!user)
    return {
      notFound: true,
    };

  return {
    props: {
      user,
    },
  };
};

export default index;
