import React, { useEffect, useState } from "react";
import Status_btn from "../../components/status_btn";
import Action_btn from "../../components/action_btn";
import { Api } from "../../../../utils/api";

export default function Tour({ show }) {
  const table = "tours";
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api("/admin/getTours", null, (res) => {
      const { success, data } = res;
      if (success) setLoading(false);
      setTours(data);
    });
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div style={{ float: "right" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => show(false)}
            >
              Create Tournaments
            </button>
          </div>
          <h5>Tournaments: {tours.length}</h5>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table" id={table + "-table"}>
            <thead className="table-dark">
              <tr>
                <th>
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th>Title</th>
                <th>Game</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {loading ? (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={5}>
                    Loading...
                  </td>
                </tr>
              ) : tours.length > 0 ? (
                tours.map((tour, i) => (
                  <tr key={i} id={"row-" + i}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{tour.title}</td>
                    <td>{tour.game}</td>
                    <td>
                      <Status_btn
                        status={tour.status}
                        table={table}
                        id={tour.id}
                      />
                    </td>
                    <td>
                      <Action_btn id={tour.id} table={table} row={i} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={5}>
                    No Tournaments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
