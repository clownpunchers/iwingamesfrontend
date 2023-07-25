import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Image, Nav, Navbar, Dropdown } from "react-bootstrap";
import { logout } from "../lib/auth_hook";
import { API_URL } from "../utils/constants";
import { UserContext } from "../utils/contexts";

const mapdata = [
  {
    text: "welcome ",
    avatar: "../assets/img/icons/avatar.png",
    link: "/profile",
  },
  {
    stutasBar: true,
    link: "/dashboard",
  },
  {
    text: "Tournaments",
    link: "/tournament",
    class: "rounded-btn",
  },
  {
    text: "Games",
    link: "/practice",
    class: "rounded-btn",
  },
  {
    icon: <i className="bi bi-bell"></i>,
    link: "",
    class: "",
  },
];

const Topnav = ({ page }) => {
  const userInfo = useContext(UserContext);

  return (
    <Navbar expand="md" className="topnav">
      <Navbar.Brand className="px-5" as={Link} to="/">
        <Image src="../assets/img/logo.png" alt="logo" width={70} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="top-nav" />
      <Navbar.Collapse id="top-nav">
        {page !== "auth" ? (
          <Nav className="">
            {mapdata.map((ele, i) => (
              <Nav.Item key={i} className="">
                {ele.avatar ? (
                  <Dropdown>
                    <Dropdown.Toggle>
                      {ele.text}{" "}
                      <span className="color-acitve text-uppercase">
                        {userInfo.username}
                      </span>
                      <Image
                        src={`${API_URL}/images/${userInfo.avatar}`}
                        className="topnav-avatar"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item href="/admin">Admin page</Dropdown.Item>
                      <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : ele.icon ? (
                  <Nav.Link as={Link} to={ele.link} className={ele.class}>
                    {ele.icon}
                  </Nav.Link>
                ) : ele.stutasBar ? (
                  <Nav.Link as={Link} to={ele.link} className={ele.class}>
                    <div className="card">
                      <div className="card-body">Some Informations for Tim</div>
                    </div>
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to={ele.link} className={ele.class}>
                    {ele.text}
                  </Nav.Link>
                )}
              </Nav.Item>
            ))}
          </Nav>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Topnav;
