import React, { useState, useEffect } from "react";
import { getAuthenticatedUser } from "../../lib/auth_hook";
import { APP_ROUTES } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/admin";

import Conf from "./pages/conf";
import User from "./pages/user/";
import Game from "./pages/game/";
import Tour from "./pages/tour/";
import Prize from "./pages/prize/";

export default function Admin({ page }) {
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
      {page === "config" && <Conf />}
      {page === "users" && <User />}
      {page === "games" && <Game />}
      {page === "tours" && <Tour />}
      {page === "prizes" && <Prize />}
    </Layout>
  );
}
