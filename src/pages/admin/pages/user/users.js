import React, { useEffect, useState } from "react";
import StatusBtn from "../../../../components/statusBtn";
import ActionBtns from "../../../../components/actionBtn";
import { Api } from "../../../../utils/api";

export default function Users() {
  const table = "users";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api("/admin/getUsers", null, (res) => {
      const { success, data } = res;
      if (success) setLoading(false);
      setUsers(data);
    });
  }, []);

  return (
    <div className="card">
      <h5 className="card-header">Users: {users.length}</h5>
      <div className="table-responsive text-nowrap">
        <table className="table" id={table + "-table"}>
          <thead className="table-dark">
            <tr>
              <th>
                <input className="form-check-input" type="checkbox" />
              </th>
              <th>Name</th>
              <th>Affilate</th>
              <th>Link</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {loading ? (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={6}>
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user, i) => {
                if (user.status !== 3) {
                  return (
                    <tr key={i} id={"row-" + i}>
                      <td>
                        <input className="form-check-input" type="checkbox" />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.affiliate ? user.affiliate : "Origin User"}</td>
                      <td>{user.aff_link}</td>
                      <td>
                        <StatusBtn
                          status={user.status}
                          table={table}
                          id={user.id}
                        />
                      </td>
                      <td>
                        <ActionBtns id={user.id} table={table} row={i} />
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={6}>
                  No Users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
