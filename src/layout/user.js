import React from "react";
import LinksBar from "./components/links_bar";
import Layer from "./components/bg_layer.js";
import Footer from "./components/footer";

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
