import React, { useEffect, useState, useContext } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { UserContext } from "../../../utils/contexts";
import { API_URL } from "../../../utils/constants";
import { Notify } from "../../../utils/notification";
import { Api } from "../../../utils/api";
import PageTitle from "../../../components/pageTitle";
import MenuBar from "../../../components/menubar";

export default function Referrals() {
  const { username, aff_link, affiliate, sup_aff, sub_aff, avatar } =
    useContext(UserContext);

  const [players, setPlayers] = useState([]);
  const [affShare, setAffShare] = useState({});
  const [loading, setLoading] = useState(true);

  const copyLink = () => {
    navigator.clipboard.writeText(aff_link).then(() => {
      Notify("info", "Copied to Clipboard!");
    });
  };

  useEffect(() => {
    Api("/user/getPlayers", { username }, (res) => {
      const { success, data } = res;
      if (success) {
        setLoading(false);
        setPlayers(data);
      }
    });

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

  return (
    <div id="dashboard-page">
      <PageTitle title={`${username}'s Dashboard`} guide={true} />
      <Row className="mb-4">
        <Col md={2} sm={12} className="px-1">
          <div className="avatar-container">
            <img
              className="uploaded_image rounded-circle"
              src={
                avatar
                  ? `${API_URL}/images/${avatar}`
                  : "../assets/img/icons/avatar.png"
              }
              alt="user-avatar"
            />
          </div>
          <Button
            variant="danger"
            className="copylink_btn rounded-0 w-100 mb-3"
            title={aff_link}
          >
            <span>{aff_link}</span>
            <img
              src="../assets/img/icons/copy_icon.svg"
              alt="copy"
              onClick={() => copyLink()}
            ></img>
          </Button>
          <ul className="list-group sideinfo">
            <li className="list-group-item">
              <i className="bi bi-list-ol"></i>
              Your Affiliate Level
              <span>{level}</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-person-fill-up"></i>
              Your Affiliate
              <span>{affiliate}</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-person-heart"></i>
              Your Players
              <span>{pNum}</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-person-lines-fill"></i>
              Super Players
              <span>{supPNum}</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-person-hearts"></i>
              Sub Players
              <span>{subPNum}</span>
            </li>
          </ul>
        </Col>
        <Col md={7} sm={12} className="px-1">
          <div className="table-responsive">
            <Table>
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
            </Table>
          </div>
        </Col>
        <Col md={3} sm={12}>
          <MenuBar />
        </Col>
      </Row>
    </div>
  );
}
