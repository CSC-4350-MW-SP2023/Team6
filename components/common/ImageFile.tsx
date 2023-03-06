import React from "react";
import Image from "next/image";

interface Props {
  url: string;
}

const ImageFile: React.FC<Props> = ({ url }) => {
  return (
    <div>
      <div className=" flex justify-center overflow-hidden mt-20">
        <Image src={url} alt="" height={600} width={600} />
      </div>
    </div>
  );
};

export default ImageFile;
