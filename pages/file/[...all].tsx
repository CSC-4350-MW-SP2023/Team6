import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import File from "#/components/pages/File";
import { useRouter } from "next/router";

const file: NextPage<{ path: string }> = ({ path }) => {
  return (
    <>
      <File filePath={path} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //@ts-ignore
  const path = ctx.query.all.join("/");

  if (!path)
    return {
      notFound: true,
    };

  return {
    props: {
      path,
    },
  };
};
export default file;
