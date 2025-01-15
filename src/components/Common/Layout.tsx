import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex app_container">
      <Sidebar />
      <div className="flex-1 bg-gray-50 overflow-y-auto ">{children}</div>
    </div>
  );
};

export default Layout;
