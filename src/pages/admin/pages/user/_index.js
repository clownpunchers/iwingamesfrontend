import React, { useState } from "react";
import List from "./list";
import Add from "./add";
import Edit from "./edit.js";

export default () => {
  const [page, setPage] = useState("list");
  return (
    <>{page === "list" ? <List /> : page === "add" ? <Add /> : <Edit />}</>
  );
};
