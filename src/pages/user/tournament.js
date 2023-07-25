import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Api } from "../../utils/api";

import Pagenav from "../../components/filterNav";
import BottomNav from "../../components/bottomNav";
import MenuBar from "../../components/menubar";
import PaginatedItems from "../../components/paginate";
import ShowGuide from "../../components/modal";

const Tournament = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [dbs, setDbs] = useState([]);

  useEffect(() => {
    setLoading(true);
    Api("/user/getTours", null, (res) => {
      const { success, data } = res;
      if (success) {
        setTours(data);
        setDbs(data);
      }
      setLoading(false);
    });
  }, []);

  const setType = (opt) => {
    if (opt === "all") {
      setTours(dbs);
    } else {
      const filteredGames = dbs.filter((game) => game.type === opt);
      setTours(filteredGames);
    }
  };

  return (
    <>
      <Row>
        <div className="d-flex mt-1">
          <h5 className="page-title">Tournaments</h5>
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
        <Col lg={9}>
          <Pagenav setType={setType} />
          <Row className="mt-2 game-list">
            {loading ? (
              <h6 className="mt-2">Loading...</h6>
            ) : tours.length === 0 ? (
              <h6 className="mt-2">No Tournaments found...</h6>
            ) : (
              <PaginatedItems items={tours} />
            )}
          </Row>
        </Col>
        <Col md={3} className="px-1">
          <MenuBar />
        </Col>
      </Row>
      <BottomNav />
    </>
  );
};

export default Tournament;
