import dynamic from "next/dynamic";
import React, { useState } from "react";
import ImageFile from "./ImageFile";

const PDFPage = dynamic(() => import("#/components/common/PDFRender"), {
  ssr: false,
});

interface Props {
  fileType: string;
  path: string;
}

const FileRender: React.FC<Props> = ({ fileType, path }) => {
  if (fileType == "pdf") {
    return <PDFPage path={path} />;
  }

  if (["jpg", "png"].includes(fileType)) {
    return <ImageFile url={path} />;
  }

  return <div className=""></div>;
};

export default FileRender;
