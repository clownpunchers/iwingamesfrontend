import React, { useContext, useState } from "react";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { UserContext } from "../../../../utils/contexts";

import PageTitle from "../../components/page_title";
import MenuBar from "../../components/menu_bar";
import BottomNav from "../../components/bottom_nav";

import General from "./general";
import Friends from "./friends";
import Rewards from "./rewards";

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
          <Row className="mt-4">
            {tab === "general" ? (
              <General userInfo={userInfo} editPage={editPage} />
            ) : tab === "rewards" ? (
              <Rewards />
            ) : (
              <Friends />
            )}
          </Row>
        </Col>
        <Col lg={3} md={12} className="px-1">
          <MenuBar />
        </Col>
      </Row>
      <BottomNav />
    </div>
  );
}
