import React, { forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => {
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

export default Input;
