import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Api } from "../../../utils/api";

import Pagenav from "../components/filter_nav";
import BottomNav from "../components/bottom_nav";
import MenuBar from "../components/menu_bar";
import PaginatedItems from "../components/paginate";
import PageTitle from "../components/page_title";

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
        <Col lg={3} md={12} className="px-1">
          <MenuBar />
        </Col>
      </Row>
      <BottomNav />
    </>
  );
};

export default Practice;
