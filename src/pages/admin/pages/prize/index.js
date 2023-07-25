import React, { useState } from "react";
import Prizes from "./prizes";
import AddPrize from "./add";

export default function Prize() {
  const [show, setShow] = useState(true);
  return <>{show ? <Prizes show={setShow} /> : <AddPrize show={setShow} />}</>;
}
