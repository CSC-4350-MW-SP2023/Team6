import Link from "next/link";
import React from "react";

interface Props {
  path: string;
  file?: boolean;
}

const FolderNavigation: React.FC<Props> = ({ path, file }) => {
  const paths = path.split("/");
  return (
    <div className="flex my-8">
      {paths.map((el, index) => (
        <div key={index}>
          <span>
            <Link
              href={
                index == 0
                  ? `/${paths.slice(0, 1)}`
                  : `/folder/${paths.slice(0, index + 1).join("/")}`
              }
              className={`${
                index == paths.length - 1 && !file
                  ? "font-semibold"
                  : "text-gray-500 hover:text-black"
              } underline`}
            >
              {index == 0 ? "Home" : el}
            </Link>
          </span>
          <span className="text-black">
            {paths.length - 1 != index ? " /" : ""} &nbsp;
          </span>
        </div>
      ))}
    </div>
  );
};

export default FolderNavigation;
