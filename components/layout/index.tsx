import React from "react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const Index: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div className="max-w-[1150px] mx-auto px-4 py-4">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Index;
