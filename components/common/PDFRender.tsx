import { PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";

interface Props {
  path: string;
}

const PDFRender: React.FC<Props> = ({ path }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    console.log("loaded");
    setNumPages(numPages);
  }
  return (
    <div className=" w-full overflow-hidden flex justify-center mt-20">
      <iframe
        src={path}
        className="absolute"
        // sandbox=""
        height={"900px"}
        width={"800px"}
      />
      {/* <div>
        <PDFViewer>
          <Document file={path} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </PDFViewer>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div> */}
    </div>
  );
};

export default PDFRender;
