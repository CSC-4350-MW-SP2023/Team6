import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { userWithRootFolder } from "#/types/types";
import AllFolders from "#/components/pages/user/AllFolders";
import prisma from "#/prisma.config";

const page: NextPage<{ user: userWithRootFolder }> = ({ user }) => {
  return (
    <>
      <AllFolders user={user} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const userId = query.user as string;

  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      rootFolders: true,
    },
  });

  return {
    props: { user: userData },
  };
};

export default page;
