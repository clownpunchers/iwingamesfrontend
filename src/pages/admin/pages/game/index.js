import React, { useState } from "react";
import Games from "./games";
import AddGame from "./add";

export default function Game() {
  const [show, setShow] = useState(true);
  return <>{show ? <Games show={setShow} /> : <AddGame show={setShow} />}</>;
}
