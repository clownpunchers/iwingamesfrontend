import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { getAuthenticatedUser } from "../lib/auth_hook";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../utils/constants";
import SideNavBar from "../components/adminSideBar";
import Modals from "../components/modal";

const Layout = ({ children }) => {
  const naviagor = useNavigate();
  useEffect(() => {
    getAuthenticatedUser((res) => {
      const { authenticated, user } = res;
      if (!authenticated) {
        naviagor(APP_ROUTES.SIGN_IN);
        return;
      }
    });
  }, []);

  return (
    <div id="admin-section">
      <Container fluid>
        <SideNavBar />
        <main>{children}</main>
      </Container>
      <Modals />
    </div>
  );
};

export default Layout;
