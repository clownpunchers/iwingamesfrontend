import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Signin from "./pages/auth/signin";
import Signup from "./pages/auth/signup";

import User from "./pages/user/";
import Admin from "./pages/admin/";

import Notfound from "./pages/error/404.js";
import Error from "./pages/error/500.js";

import "react-notifications/lib/notifications.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "popper.js";
import "jquery";

import "./App.scss";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Signin />}
          />
          <Route
            exact
            path="/signin"
            element={<Signin />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup />}
          />
          <Route
            exact
            path="/invite/:id"
            element={<Signup invitedBy={true} />}
          />

          <Route exact
            path="/practice"
            element={<User page={"Practice"} />}
          />
          <Route
            exact
            path="/tournament"
            element={<User page={"Tournament"} />}
          />
          <Route
            exact
            path="/gameplay"
            element={<User page={"Playgame"} />}
          />
          <Route
            exact
            path="/profile"
            element={<User page={"Profile"} />}
          />
          <Route
            exact
            path="/dashboard"
            element={<User page={"Dashboard"} />}
          />
          <Route
            exact
            path="/contact"
            element={<User page={"Contact"} />}
          />
          <Route
            exact
            path="/aboutus"
            element={<User page={"Aboutus"} />}
          />

          <Route
            exact
            path="/admin"
            element={<Admin page={"Aboutus"} />}
          />

          <Route
            exact
            path="/error"
            element={<Error />}
          />
          <Route
            exact
            path="*" element={<Notfound />}
          />

        </Routes>
      </BrowserRouter>
      <NotificationContainer />
    </>
  );
};

export default App;
