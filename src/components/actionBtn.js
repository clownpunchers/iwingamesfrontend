import React from "react";
import { Link } from "react-router-dom";
import { Notify } from "../utils/notification";
import { Api } from "../utils/api";
import $ from "jquery";

export default function ActionBtn({ id, table, row }) {
  const delRow = (id, table, row) => {
    Api(
      `/admin/delRow`,
      {
        id,
        table,
      },
      (res) => {
        $(`#${table}-table #row-${row}`).remove();
        Notify("success", "Deleted");
      }
    );
  };

  return (
    <>
      <div className="dropdown">
        <button
          type="button"
          className="btn p-0 dropdown-toggle hide-arrow"
          data-bs-toggle="dropdown"
        >
          <i className="bx bx-dots-vertical-rounded"></i>
        </button>
        <div className="dropdown-menu">
          <Link className="dropdown-item">
            <i className="bx bx-edit-alt me-1"></i> Edit
          </Link>
          <Link
            className="dropdown-item"
            onClick={(e) => delRow(id, table, row)}
          >
            <i className="bx bx-trash me-1"></i> Delete
          </Link>
        </div>
      </div>
    </>
  );
}
