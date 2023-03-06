/* eslint-disable */

import React, { forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>(function (props, ref) {
  return (
    <div className="">
      <input
        type="text"
        className=" border-2 px-2 py-2 w-[18rem] text-gray-500 focus:outline-gray-500 rounded my-4"
        ref={ref}
        {...props}
      />
    </div>
  );
});

/* eslint-enable */

export default Input;
