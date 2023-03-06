import React from "react";

interface Props {
  content: string;
}

const UserAboutSection: React.FC<Props> = ({ content }) => {
  if (!content) return <></>;

  return (
    <div className="border-2 px-4 py-2 rounded shadow-sm bg-gray-50 bg-opacity-70">
      <h2>About</h2>
      <p>{content}</p>
    </div>
  );
};

export default UserAboutSection;
