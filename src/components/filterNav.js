import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Api } from "../utils/api";
import SearchBox from "./searchBox";

function Pagenav({ setType }) {
  const [types, setTypes] = useState([]);
  const activeBtn = (e) => {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => item.classList.remove("active"));
    e.target.parentNode.classList.add("active");
  };
  useEffect(() => {
    Api("/user/getCategories", null, (res) => {
      const { success, data } = res;
      if (success) setTypes(data);
    });
  }, []);

  return (
    <Row>
      <Col md={9} sm={12} className="px-1">
        <Navbar className="page-nav" expand="lg">
          <Navbar.Toggle aria-controls="filter-nav" />
          <Navbar.Collapse id="filter-nav">
            <Nav className="">
              {types.map((ele, i) => (
                <li
                  className={
                    "nav-item " + (ele.value === "all" ? "active" : "")
                  }
                  key={i}
                >
                  <Nav.Link
                    onClick={(e) => {
                      setType(ele.value);
                      activeBtn(e);
                    }}
                  >
                    {ele.index}
                  </Nav.Link>
                </li>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
      <Col md={3} sm={12} className="px-1">
        <SearchBox />
      </Col>
    </Row>
  );
}

export default Pagenav;
