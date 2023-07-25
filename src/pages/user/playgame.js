import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MenuBar from "../../components/menubar";
import BottomNav from "../../components/bottomNav";
import ShowGuide from "../../components/modal";

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
      <Row>
        <div className="d-flex mt-1">
          <h5 className="page-title">{name}</h5>
          <ShowGuide
            buttonClass="help-btn ms-auto"
            className="help-modal"
            buttonText="How to play"
            modalTitle="How to play"
            modalBody="some contents here..."
            closeButtonLabel="Close"
            understoodButtonLabel="Got it!"
          />
        </div>
      </Row>
      <Row>
        <Col md={9} className="px-1">
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
        <Col md={3} className="px-1">
          <MenuBar />
        </Col>
      </Row>
      <BottomNav />
    </>
  );
};

export default Playgame;
