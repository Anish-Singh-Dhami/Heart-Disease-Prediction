import { Header } from "@/components/Header";
import React from "react";

type LayoutProp = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProp) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-700">
      <Header />
      {children}
    </div>
  );
};
export { Layout };
