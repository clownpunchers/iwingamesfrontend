import React, { useContext, useState } from "react";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { UserContext } from "../../../utils/contexts";

import PageTitle from "../../../components/pageTitle";
import General from "../../../components/profile/general";
import Friends from "../../../components/profile/friends";
import Rewards from "../../../components/profile/rewards";
import MenuBar from "../../../components/menubar";

export default function Profile() {
  const userInfo = useContext(UserContext);
  const [tab, setTab] = useState("general");
  const [editPage, setEditPage] = useState(false);

  const activeBtn = (e, tabname) => {
    const btns = document.querySelectorAll(".tab-btns .btn");
    btns.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");
    setTab(tabname);
  };

  return (
    <div id="profile-page">
      <PageTitle title={"Profile"} />
      <Row>
        <Col md={9} sm={12} className="px-1">
          <Row>
            <Col md={8} sm={12}>
              <ButtonGroup className="tab-btns">
                <Button
                  variant="danger"
                  onClick={(e) => {
                    activeBtn(e, "general");
                  }}
                  className="active"
                >
                  General
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    activeBtn(e, "rewards");
                  }}
                >
                  Rewards
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    activeBtn(e, "friends");
                  }}
                >
                  Friends
                </Button>
              </ButtonGroup>
            </Col>
            {tab === "general" ? (
              <Col md={4} sm={12} className="ctrl-btns">
                <ButtonGroup>
                  <Button
                    variant="danger"
                    className="edit-btn"
                    onClick={() => setEditPage(true)}
                  >
                    {editPage ? "Save" : "Edit"} Profile &nbsp;
                    {editPage ? (
                      <i className="bi bi-save"></i>
                    ) : (
                      <i className="bi bi-pencil-square"></i>
                    )}
                  </Button>
                  {editPage ? (
                    <Button
                      variant="danger"
                      className="reset-btn"
                      onClick={() => setEditPage(false)}
                    >
                      Reset
                    </Button>
                  ) : null}
                  &nbsp; &nbsp;
                </ButtonGroup>
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={9} className="px-1">
          {tab === "general" ? (
            <General userInfo={userInfo} editPage={editPage} />
          ) : tab === "rewards" ? (
            <Rewards />
          ) : (
            <Friends />
          )}
        </Col>
        <Col md={3} sm={12}>
          <MenuBar />
        </Col>
      </Row>
    </div>
  );
}
