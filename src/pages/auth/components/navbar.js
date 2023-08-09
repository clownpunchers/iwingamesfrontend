import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Image, Nav, Navbar } from "react-bootstrap";
import { UserContext } from "../../../utils/contexts";

const mapdata = [
  {
    text: "Sign In",
    link: "/signin",
    class: "rounded-btn",
  },
  {
    text: "Sign Up",
    link: "/signup",
    class: "rounded-btn",
  },
];

export default () => {
  const userInfo = useContext(UserContext);

  return (
    <Navbar expand="md" className="navbar">
      <Navbar.Brand className="px-5" as={Link} to="/">
        <Image src="../assets/img/logo.png" alt="logo" width={70} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="auth-nav" />
      <Navbar.Collapse id="auth-nav" className="justify-content-end">
        <Nav className="me-5">
          {mapdata.map((ele, i) => (
            <Nav.Item key={i} className="">
              <Nav.Link as={Link} to={ele.link} className={ele.class}>
                {ele.text}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
