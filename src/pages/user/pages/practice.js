import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Api } from "../../../utils/api";

import Pagenav from "../../../components/filterNav";
import BottomNav from "../../../components/bottomNav";
import MenuBar from "../../../components/menubar";
import PaginatedItems from "../../../components/paginate";
import ShowGuide from "../../../components/modal";
import PageTitle from "../../../components/pageTitle";

const Practice = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [dbs, setDbs] = useState([]);

  useEffect(() => {
    setLoading(true);
    Api("/user/getGames", null, (res) => {
      const { success, data } = res;
      if (success) {
        setGames(data);
        setDbs(data);
      }
      setLoading(false);
    });
  }, []);

  const setType = (opt) => {
    if (opt === "all") {
      setGames(dbs);
    } else {
      const filteredGames = dbs.filter((game) => game.type === opt);
      setGames(filteredGames);
    }
  };

  return (
    <>
      <PageTitle title={"practice"} guide={true} />
      <Row>
        <Col lg={9} md={12}>
          <Pagenav setType={setType} page={"practice"} />
          <Row className="paginate-container">
            {loading ? (
              <h6 className="mt-2">Loading...</h6>
            ) : games.length === 0 ? (
              <h6 className="mt-2">No Games...</h6>
            ) : (
              <PaginatedItems items={games} />
            )}
          </Row>
        </Col>
        <Col lg={3} md={12}>
          <MenuBar />
        </Col>
      </Row>
      <BottomNav />
    </>
  );
};

export default Practice;
