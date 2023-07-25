import React, { useEffect, useState } from "react";

import { getAuthenticatedUser } from "../../lib/auth_hook";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils/constants";
import { UserContext } from "../../utils/contexts";

import Navbar from "../../components/topNav";
import Sidebar from "../../components/linksBar.js";
import Footer from "../../components/footer";
import Layer from "../../components/layer.js";

import Dashboard from "./dashboard";
import Practice from "./practice";
import Tournament from "./tournament";
import Profile from "./profile";
import Playgame from "./playgame";
import Aboutus from "./aboutus";
import Contact from "./contact";

const User = ({ page }) => {
  const naviagor = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  
  useEffect(() => {
    getAuthenticatedUser((res) => {
      const { authenticated, user } = res;
      if (!authenticated) {
        naviagor(APP_ROUTES.SIGN_IN);
        return;
      }
      setUserInfo(user);
    });
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      <Layer />
      <Sidebar />
      <Navbar page={"user"} />
      <main>
        {page === "Profile" && <Profile />}
        {page === "Contact" && <Contact />}
        {page === "Aboutus" && <Aboutus />}
        {page === "Playgame" && <Playgame />}
        {page === "Practice" && <Practice />}
        {page === "Dashboard" && <Dashboard />}
        {page === "Tournament" && <Tournament />}
      </main>
      <Footer />
    </UserContext.Provider>
  );
};

export default User;
