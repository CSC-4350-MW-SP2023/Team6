import React from "react";

interface Props {
  children: React.ReactNode;
}

const Index: React.FC<Props> = ({ children }) => {
  return <div className="max-w-[1150px] mx-auto px-4 py-4">{children}</div>;
};

export default Index;
