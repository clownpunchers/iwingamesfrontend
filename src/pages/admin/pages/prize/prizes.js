import React, { useEffect, useState } from "react";
import ActionBtn from "../../../../components/actionBtn";
import StatusBtn from "../../../../components/statusBtn";
import { Api } from "../../../../utils/api";
import { API_URL } from "../../../../utils/constants";

export default function Prizes({ show }) {
  const table = "prizes";
  const [loading, setLoding] = useState(true);
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    Api("/admin/getPrizes", null, (res) => {
      const { success, data } = res;
      if (success) setLoding(false);
      setPrizes(data);
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
              Add New prize
            </button>
          </div>
          <h5>prizes: {prizes.length}</h5>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table" id={table + "-table"}>
            <thead className="table-dark">
              <tr>
                <th>
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th>Title</th>
                <th>Value</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Summary</th>
                <th>Expire</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {loading ? (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={9}>
                    Loading...
                  </td>
                </tr>
              ) : prizes.length > 0 ? (
                prizes.map((prize, i) => (
                  <tr key={i} id={"row-" + i}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{prize.title}</td>
                    <td>{prize.value}</td>
                    <td>{prize.quantity}</td>
                    <td className="pos-re">
                      {prize.image}
                      <img
                        className="previewImg"
                        src={`${API_URL}/images/${prize.image}`}
                        alt="preview"
                      />
                    </td>
                    <td>{prize.summary}</td>
                    <td>{new Date(prize.expire).toLocaleDateString()}</td>
                    <td>
                      <StatusBtn
                        status={prize.status}
                        table={table}
                        id={prize.id}
                      />
                    </td>
                    <td>
                      <ActionBtn id={prize.id} table={table} row={i} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={9}>
                    No prize found
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
