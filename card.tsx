import React from "react";
export const Card = ({ children, className = "" }: any) => (
  <div className={`bg-white shadow rounded-md ${className}`}>{children}</div>
);
export const CardHeader = ({ children }: any) => <div className="p-4 border-b">{children}</div>;
export const CardTitle = ({ children }: any) => <h3 className="text-lg font-semibold">{children}</h3>;
export const CardDescription = ({ children }: any) => (
  <p className="text-sm text-gray-500">{children}</p>
);
export const CardContent = ({ children, className = "" }: any) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
export const CardFooter = ({ children, className = "" }: any) => (
  <div className={`p-4 border-t ${className}`}>{children}</div>
);
