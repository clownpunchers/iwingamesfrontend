import React, { useState } from "react";
import { Api } from "../utils/api";
import { Notify } from "../utils/notification";

export default function StatusBtn({ status, id, table }) {
  const [state, setState] = useState(status);

  const updateRow = (val) => {
    let field = "status";
    Api("/admin/updateRow", { table, id, field, val }, (res) => {
      const { success } = res;
      if (success) {
        Notify("info", "Updated!");
        setState(state === 1 ? 0 : 1);
      }
    });
  };
  return (
    <div>
      {state === 1 ? (
        <span
          className="badge bg-label-primary me-1"
          onClick={() => updateRow(0)}
        >
          Active
        </span>
      ) : state === 3 ? null : (
        <span
          className="badge bg-label-danger me-1"
          onClick={() => updateRow(1)}
        >
          Blocked
        </span>
      )}
    </div>
  );
}
