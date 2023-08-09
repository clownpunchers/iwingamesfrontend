import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuthenticatedUser } from "../../lib/auth_hook";
import { APP_ROUTES } from "../../utils/constants";
import { AdminContext } from "../../utils/contexts";

import Layout from "../../layout/admin";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dash/";
import Conf from "./pages/conf/";
import User from "./pages/user/_index";
import Game from "./pages/game/";
import Tour from "./pages/tour/";
import Prize from "./pages/prize/";
import Report from "./pages/report/";

export default function Admin() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState("dashboard");
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
      <AdminContext.Provider value={user}>
        <Sidebar setPage={setPage} />
        <main>
          <Navbar />
          <div className="page-content">
            {page === "dashboard" && <Dashboard />}
            {page === "config" && <Conf />}
            {page === "users" && <User />}
            {page === "tours" && <Game />}
            {page === "games" && <Tour />}
            {page === "prizes" && <Prize />}
            {page === "reports" && <Report />}
          </div>
        </main>
      </AdminContext.Provider>
    </Layout>
  );
}
