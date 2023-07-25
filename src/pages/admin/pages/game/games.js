import React, { useEffect, useState } from "react";
import StatusBtn from "../../../../components/statusBtn";
import ActionBtns from "../../../../components/actionBtn";
import { Api } from "../../../../utils/api";
import { API_URL } from "../../../../utils/constants";

export default function Games({ show }) {
  const table = "games";
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api("/admin/getGames", null, (res) => {
      const { success, data } = res;
      if (success) setLoading(false);
      setGames(data);
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
              Add New Game
            </button>
          </div>
          <h5>Games: {games.length}</h5>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table" id={table + "-table"}>
            <thead className="table-dark">
              <tr>
                <th>
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th>Name</th>
                <th>Alias</th>
                <th>Image</th>
                <th>Summary</th>
                <th>File</th>
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
              ) : games.length > 0 ? (
                games.map((game, i) => (
                  <tr key={i} id={"row-" + i}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{game.name}</td>
                    <td>{game.alias}</td>
                    <td className="pos-re">
                      {game.image}
                      <img
                        className="previewImg"
                        src={`${API_URL}/images/${game.image}`}
                        alt="preview"
                      />
                    </td>
                    <td className="ellipsis">
                      <span>{game.summary}</span>
                    </td>
                    <td>{game.filename}</td>
                    <td>
                      <StatusBtn
                        status={game.status}
                        table={table}
                        id={game.id}
                      />
                    </td>
                    <td>
                      <ActionBtns id={game.id} table={table} row={i} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={9}>
                    No Game found
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
