import React from "react";
import { Row } from "react-bootstrap";
import ShowGuide from "./modal";

export default function PageTitle({ title }) {
  return (
    <Row>
      <div className="d-flex mt-1">
        <h5 className="page-title">{title}</h5>
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
  );
}
