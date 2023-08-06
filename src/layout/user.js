import React from "react";
import LinksBar from "../components/linksBar";
import Footer from "../components/footer";
import Layer from "../components/layer.js";

const Layout = ({ children }) => {
  return (
    <div id="user-section">
      <Layer />
      <LinksBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
