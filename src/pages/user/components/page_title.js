import React from "react";
import { Row, Col } from "react-bootstrap";
import ShowGuide from "../../../components/_modal";

export default function PageTitle({ title, guide }) {
  return (
    <Row className="page-title">
      <Col md={9} className="px-1">
        <div className="d-flex">
          <h5>{title}</h5>
          {guide ? (
            <ShowGuide
              buttonClass="help-btn ms-auto"
              className="help-modal"
              buttonText="How to play ?"
              modalTitle="How to play ?"
              modalBody="some contents here..."
              closeButtonLabel="Close"
              understoodButtonLabel="Got it!"
            />
          ) : null}
        </div>
      </Col>
    </Row>
  );
}
