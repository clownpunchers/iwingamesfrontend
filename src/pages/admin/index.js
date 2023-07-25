import React from "react";
import { useSelector } from "react-redux";

import Conf from "./pages/conf";
import User from "./pages/user/";
import Game from "./pages/game/";
import Tour from "./pages/tour/";
import Prize from "./pages/prize/";

import Layout from "../../layout/admin";

export default function Admin() {
  const selectedItem = useSelector((state) => state.admin.selectedItem);
  return (
    <Layout>
      {selectedItem === "config" && <Conf />}
      {selectedItem === "users" && <User />}
      {selectedItem === "games" && <Game />}
      {selectedItem === "tours" && <Tour />}
      {selectedItem === "prizes" && <Prize />}
    </Layout>
  );
}
