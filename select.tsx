import React from "react";

export const Select = ({ value, onValueChange, children }: any) => (
  <select
    value={value}
    onChange={(e) => onValueChange?.(e.target.value)}
    className="border rounded-md px-3 py-2 w-full"
  >
    {children}
  </select>
);
export const SelectTrigger = ({ children }: any) => <>{children}</>;
export const SelectValue = ({ placeholder }: any) => <span>{placeholder}</span>;
export const SelectContent = ({ children }: any) => <>{children}</>;
export const SelectItem = ({ value, children }: any) => (
  <option value={value}>{children}</option>
);
