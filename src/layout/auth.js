import React from "react";
import LinksBar from "./components/links_bar";
import Footer from "./components/footer";
import Layer from "./components/bg_layer.js";

const Layout = ({ children }) => {
  return (
    <div id="auth-section">
      <Layer />
      <LinksBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
