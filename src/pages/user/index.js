import React, { useEffect, useState } from "react";
import { getAuthenticatedUser } from "../../lib/auth_hook";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils/constants";
import { UserContext } from "../../utils/contexts";

import Layout from "../../layout/user";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import Practice from "./pages/practice";
import Tournament from "./pages/tournament";
import Profile from "./pages/profile/index";
import Playgame from "./pages/game";
import Aboutus from "./pages/about";
import Contact from "./pages/contact";

const User = ({ page }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuthenticatedUser((res) => {
      const { authenticated, user } = res;
      if (authenticated) {
        setAuthenticated(authenticated);
        setUser(user);
      } else {
        navigate(APP_ROUTES.SIGN_IN);
      }
    });
  }, []);

  if (!authenticated) {
    return null;
  }

  return (
    <Layout>
      <UserContext.Provider value={user}>
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
      </UserContext.Provider>
    </Layout>
  );
};

export default User;
