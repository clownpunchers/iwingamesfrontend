import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default () => {
  const [adUrl, setAdUrl] = useState(
    "//www.profitabledisplaynetwork.com/watchnew?key=dfb94e6dfb8eee4fafd231cfe6551041&_=" +
      Date.now()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAdUrl((adUrl) => adUrl.replace(/_=\d+/, "_=" + Date.now()));
    }, 7500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="footer">
      <Row>
        <Col>
          {/* <iframe
            src={adUrl}
            frameBorder="0"
            scrolling="no"
            width=""
            height=""
            title="banner ads"
          /> */}
          <img src="../assets/img/icons/1.png" alt="ads" />
        </Col>
        <Col>
          {/* <iframe
            src={adUrl}
            frameBorder="0"
            scrolling="no"
            width=""
            height=""
            title="banner ads"
          /> */}
          <img src="../assets/img/icons/2.png" alt="ads" />
        </Col>
      </Row>
    </div>
  );
};
