import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MenuBar from "../components/menu_bar";
import BottomNav from "../components/bottom_nav";
import PageTitle from "../components/page_title";

const Playgame = () => {
  const [url, seturl] = useState();
  const [name, setname] = useState();
  useEffect(() => {
    const { url, name } = JSON.parse(localStorage.getItem("selected_game"));

    setname(name);
    seturl(url);
  }, []);

  return (
    <>
      <PageTitle title={name} guide={true} />
      <Row>
        <Col md={9} className="">
          <iframe
            className="w-100 h-100"
            title="gamer"
            width={300}
            height={200}
            frameBorder={0}
            scrolling="no"
            src={url}
          />
        </Col>
        <Col lg={3} md={12} className="px-1">
          <MenuBar />
        </Col>
      </Row>
      <BottomNav />
    </>
  );
};

export default Playgame;
