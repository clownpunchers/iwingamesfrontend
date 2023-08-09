import React from "react";
import { InputGroup, Form } from "react-bootstrap";

function SearchBox() {
  return (

    <InputGroup className="mb-3 searchbox">
      <Form.Control
        placeholder="Search"
        aria-label="Search"
        aria-describedby="searchbox-icon"
      />
      <InputGroup.Text id="searchbox-icon">
        <i className="bi bi-search"></i>
      </InputGroup.Text>
    </InputGroup>

  );
}

export default SearchBox;
