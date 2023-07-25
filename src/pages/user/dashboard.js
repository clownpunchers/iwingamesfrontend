import React, { useEffect, useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { UserContext } from "../../utils/contexts";
import { Notify } from "../../utils/notification";
import { API_URL } from "../../utils/constants";
import { Api } from "../../utils/api";
import ShowGuide from "../../components/modal";

const Dashboard = () => {
  const userInfo = useContext(UserContext);

  const { username, aff_link, affiliate, sup_aff, sub_aff, avatar } = userInfo;
  const [players, setPlayers] = useState([]);
  const [affShare, setAffShare] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api(
      "/user/getPlayers",
      {
        username,
      },
      (res) => {
        const { success, data } = res;
        if (success) {
          setLoading(false);
          setPlayers(data);
        }
      }
    );

    Api("/user/getAffShare", null, (res) => {
      const { success, data } = res;
      if (success) setAffShare(data[0]);
    });
  }, []);

  const spent = 1000;
  const share =
    affiliate === ""
      ? affShare.aff_shr
      : sup_aff === ""
      ? affShare.sup_shr
      : sub_aff === ""
      ? affShare.sub_shr
      : 0;
  const level =
    affiliate === "" ? 1 : sup_aff === "" ? 2 : sub_aff === "" ? 3 : 0;
  const pNum = players.filter((ele) => ele.affiliate === username).length;
  const supPNum = players.filter((ele) => ele.sup_aff === username).length;
  const subPNum = players.filter((ele) => ele.sub_aff === username).length;

  const getShare = (p) => {
    const shared =
      p.affiliate === username
        ? share
        : p.sup_aff === username
        ? affShare.aff_shr - affShare.sup_shr
        : p.sub_aff === username
        ? affShare.sup_shr - affShare.sub_shr
        : 0;
    return shared;
  };
  const copyLink = () => {
    navigator.clipboard.writeText(aff_link).then(() => {
      Notify("info", "Copied to Clipboard!");
    });
  };

  return (
    <Row className="mt-5 mb-5">
      <Col md={4} className="mb-md-0 mb-4">
        <div className="card mb-4 bg-iwin">
          <h5 className="card-header">Your Infos</h5>
          <div className="card-body">
            <div className="d-flex align-items-start align-items-sm-center gap-4">
              <img
                src={
                  avatar
                    ? `${API_URL}/images/${avatar}`
                    : "../assets/img/icons/trophies-icon-1.pngavatar.png"
                }
                alt="not found"
                className="d-block rounded"
                height="100"
                width="100"
              />
              <div>
                <button
                  className="rounded-btn me-2 mb-4 w-100 px-4"
                  onClick={() => copyLink()}
                >
                  {aff_link}
                </button>
                <p className="text-light mb-0 ">Click button to copy link.</p>
              </div>
            </div>
          </div>

          <hr className="my-0" />

          <div className="card-body">
            <ul className="p-0 m-0">
              <li className="d-flex mb-4 pb-1">
                <div className="avatar flex-shrink-0 me-3">
                  <img
                    src="../assets/img/icons/trophies-icon-1.png"
                    alt="User"
                    className="rounded"
                  />
                </div>
                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div className="me-2">
                    <h6 className="mb-0">Your Affiliate Level</h6>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <h6 className="mb-0">{level} </h6>
                    <span className="text-muted">({share + "%"})</span>
                  </div>
                </div>
              </li>
              <li className="d-flex mb-4 pb-1">
                <div className="avatar flex-shrink-0 me-3">
                  <img
                    src="../assets/img/icons/trophies-icon-2.png"
                    alt="User"
                    className="rounded"
                  />
                </div>
                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div className="me-2">
                    <h6 className="mb-0">Your Affiliate</h6>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <h6 className="mb-0">{affiliate ? affiliate : "None"}</h6>
                    <span className="text-muted"></span>
                  </div>
                </div>
              </li>

              <li className="d-flex mb-4 pb-1">
                <div className="avatar flex-shrink-0 me-3">
                  <img
                    src="../assets/img/icons/trophies-icon-3.png"
                    alt="User"
                    className="rounded"
                  />
                </div>
                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div className="me-2">
                    <h6 className="mb-0">Your Players</h6>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <h6 className="mb-0">{pNum}</h6>
                    <span className="text-muted"></span>
                  </div>
                </div>
              </li>
              <li className="d-flex mb-4 pb-1">
                <div className="avatar flex-shrink-0 me-3">
                  <img
                    src="../assets/img/icons/trophies-icon-4.png"
                    alt="User"
                    className="rounded"
                  />
                </div>
                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div className="me-2">
                    <h6 className="mb-0">Your Super Players</h6>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <h6 className="mb-0">{supPNum}</h6>
                    <span className="text-muted"></span>
                  </div>
                </div>
              </li>
              <li className="d-flex">
                <div className="avatar flex-shrink-0 me-3">
                  <img
                    src="../assets/img/icons/trophies-icon-1.png"
                    alt="User"
                    className="rounded"
                  />
                </div>
                <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div className="me-2">
                    <h6 className="mb-0">Your Sub Players</h6>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <h6 className="mb-0">{subPNum}</h6>
                    <span className="text-muted"></span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Col>
      <Col md={8} className="mb-md-0 mb-4">
        <div className="card bg-iwin">
          <div className="card-header mt-4">
            <div style={{ float: "right" }}>
              <ShowGuide
                buttonClass="rounded-btn px-4 w-100"
                className="help-modal"
                buttonText="Invite person"
                modalTitle="Invite person"
                modalBody="some contents here..."
                closeButtonLabel="Close"
                understoodButtonLabel="Got it!"
              />
            </div>
            <h5>Total Players: {players.length}</h5>
          </div>
          <div className="table-responsive text-">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th>Player</th>
                  <th>Share</th>
                  <th>Expenditure</th>
                  <th>Ad Views</th>
                  <th>Income</th>
                  <th>Affiliates</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {loading ? (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan={5}>
                      Loading...
                    </td>
                  </tr>
                ) : players.length > 0 ? (
                  players.map((player, i) => (
                    <tr key={i}>
                      <td>
                        <strong>{player.username}</strong>
                      </td>
                      <td>{getShare(player)}%</td>
                      <td>${spent}</td>
                      <td>
                        {player.clickCounts} *{" "}
                        <span className="small">$0.01</span>
                      </td>
                      <td>
                        $
                        {(spent * getShare(player)) / 100 +
                          (player.clickCounts * 0.01 * getShare(player)) / 100}
                      </td>
                      <td>
                        <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                          {player.sub_aff ? (
                            <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title={
                                player.sub_aff === username
                                  ? "You"
                                  : player.sub_aff
                              }
                            >
                              <img
                                src="../assets/img/avatars/avatar.jpg"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </li>
                          ) : null}
                          {player.sup_aff ? (
                            <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title={
                                player.sup_aff === username
                                  ? "You"
                                  : player.sup_aff
                              }
                            >
                              <img
                                src="../assets/img/avatars/avatar.jpg"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </li>
                          ) : null}
                          {player.affiliate ? (
                            <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title={
                                player.affiliate === username
                                  ? "You"
                                  : player.affiliate
                              }
                            >
                              <img
                                src="../assets/img/avatars/avatar.jpg"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </li>
                          ) : null}
                        </ul>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan={6}>
                      No User found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;
