import React from "react";
export const Textarea = (props: any) => (
  <textarea
    {...props}
    className={`border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-200 ${props.className || ""}`}
  />
);
