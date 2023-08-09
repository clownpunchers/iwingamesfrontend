import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Image, Nav, Navbar, Dropdown } from "react-bootstrap";
import { logout } from "../../../lib/auth_hook";
import { API_URL } from "../../../utils/constants";
import { UserContext } from "../../../utils/contexts";

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
];

export default () => {
  const userInfo = useContext(UserContext);

  return (
    <Navbar expand="md" className="navbar">
      <Navbar.Brand className="px-5" as={Link} to="/">
        <Image src="../assets/img/logo.png" alt="logo" width={70} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="top-nav" />
      <Navbar.Collapse id="top-nav">
        <Nav className="mr-auto">
          {mapdata.map((ele, i) => (
            <Nav.Item key={i} className="">
              {ele.avatar ? (
                <Dropdown>
                  <Dropdown.Toggle>
                    {ele.text} &nbsp; <span>{userInfo.username}</span>
                    <Image
                      src={
                        userInfo.avatar
                          ? `${API_URL}/images/${userInfo.avatar}`
                          : "../assets/img/icons/avatar.png"
                      }
                      className="navbar-avatar"
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
                  <div className="card rounded-0">
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
      </Navbar.Collapse>
    </Navbar>
  );
};
