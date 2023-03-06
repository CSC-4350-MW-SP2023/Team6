import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {}

const Li: React.FC<{
  children: string;
  url: { pathname: string; query: any };
  active: boolean;
}> = ({ children, url, active }) => {
  return (
    <li>
      {active ? (
        <Link href={url} className="bg-gray-300 px-2  rounded">
          {children}
        </Link>
      ) : (
        <Link
          href={url}
          className=" px-2 transition-all hover:bg-gray-200  cursor-pointer rounded  duration-400 hover:shadow-lg "
        >
          {children}
        </Link>
      )}
    </li>
  );
};

const UserNavBar: React.FC<Props> = () => {
  const router = useRouter();
  const user = router.query.user as string;
  const path = router.asPath.split("/").slice(2)[0];

  return (
    <div className="my-4">
      <ul className="flex space-x-4 border-b-2 px-2 mx-4">
        <Li
          url={{
            pathname: "/[user]",
            query: {
              user,
            },
          }}
          active={!path}
        >
          Profile
        </Li>
        <Li
          url={{
            pathname: "/[user]/allfolders",
            query: {
              user,
            },
          }}
          active={path == "allfolders"}
        >
          Folders
        </Li>
        <Li
          url={{
            pathname: "/[user]/socials",
            query: {
              user,
            },
          }}
          active={path == "socials"}
        >
          Socials
        </Li>
      </ul>
    </div>
  );
};

export default UserNavBar;
