import React from "react";
export const Label = (props: any) => (
  <label {...props} className={`block text-sm font-medium ${props.className || ""}`}>
    {props.children}
  </label>
);
