import React from "react";
import Modals from "../components/_modal";

const Layout = ({ children }) => {
  return (
    <div id="admin-section">
      {children}
      <Modals />
    </div>
  );
};

export default Layout;
