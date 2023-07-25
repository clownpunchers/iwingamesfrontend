import React, { useState } from "react";
import Tours from "./tours";
import AddTour from "./add";

export default function Prize() {
  const [show, setShow] = useState(true);
  return <>{show ? <Tours show={setShow} /> : <AddTour show={setShow} />}</>;
}
