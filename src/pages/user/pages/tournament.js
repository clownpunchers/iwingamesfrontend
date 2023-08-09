import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Api } from "../../../utils/api";

import Pagenav from "../components/filter_nav";
import BottomNav from "../components/bottom_nav";
import MenuBar from "../components/menu_bar";
import PaginatedItems from "../components/paginate";
import PageTitle from "../components/page_title";

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
      <PageTitle title={"Tournament"} guide={true} />
      <Row>
        <Col lg={9} md={12}>
          <Pagenav setType={setType} />
          <Row className="paginate-container">
            {loading ? (
              <h6 className="mt-2">Loading...</h6>
            ) : tours.length === 0 ? (
              <h6 className="mt-2">No Tournaments found...</h6>
            ) : (
              <PaginatedItems items={tours} />
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

export default Tournament;
