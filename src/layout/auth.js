import React from "react";
import Navbar from "../components/topNav";
import LinksBar from "../components/linksBar";
import Footer from "../components/footer";
import Layer from "../components/layer.js";

const Layout = ({ children }) => {
  return (
    <>
      <Layer />
      <LinksBar />
      <Navbar page={"auth"} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
