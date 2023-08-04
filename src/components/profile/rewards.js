import React, { useEffect, useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Api } from "../../utils/api";
import { Notify } from "../../utils/notification";
import { API_URL } from "../../utils/constants";

export default function Rewards() {
  const [prizes, setPrizes] = useState([]);
  useEffect(() => {
    Api("/user/getPrizes", {}, (res) => {
      const { success, data } = res;
      if (!success) Notify("error", "server error");
      setPrizes(data);
    });
  }, []);
  return (
    <Row className="px-2">
      {prizes.map((ele, i) => (
        <Col md={3} key={i} className="mb-3 px-0">
          <div className="thumbnail">
            <Image
              src={`${API_URL}/images/${ele.img}`}
              className="hover-img"
              alt="prize-image"
              fluid
            />
            <Button className={"mt-2 play-btn"} variant="danger">
              {ele.title}
            </Button>
            <div className="tip">{ele.summary}</div>
          </div>
        </Col>
      ))}
    </Row>
  );
}
