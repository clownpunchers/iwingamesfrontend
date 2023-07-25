import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

const mapdata = [
  {
    text: "Home",
    type: "button",
    link: "",
  },

  {
    text: "OUR PARTNERS",
    type: "button",
    link: "",
  },
  {
    text: "Affiliates",
    type: "button",
    link: "",
  },
  {
    text: "CHARITIES",
    type: "button",
    link: "",
  },
  {
    text: "SPONSORS",
    type: "button",
    link: "",
  },
  {
    text: "SPECIAL FEATURES",
    type: "button",
    link: "",
  },
  {
    text: "TOURNAMENT RULES",
    type: "button",
    link: "",
  },
  {
    text: "LEGAL",
    type: "button",
    link: "",
  },
  {
    text: "FUTURE FEATURES",
    type: "button",
    link: "",
  },
  {
    text: "About Us",
    type: "button",
    link: "/aboutus",
  },
];

function BottomNav() {
  return (
    <Row>
      <Col lg={12} className="px-1 mt-1">
        <Navbar className="page-nav mb-1" expand="lg">
          <Navbar.Toggle aria-controls="nav-3" />
          <Navbar.Collapse id="nav-3">
            <Nav className="me-auto">
              {mapdata.map((ele, i) => (
                <li
                  className="nav-item"
                  key={i}
                  onClick={(e) => {
                    const navItems = document.querySelectorAll(".nav-item");
                    navItems.forEach((item) => item.classList.remove("active"));
                    e.target.parentNode.classList.add("active");
                  }}
                >
                  <Nav.Link href={ele.link}>{ele.text}</Nav.Link>
                </li>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
}

export default BottomNav;
