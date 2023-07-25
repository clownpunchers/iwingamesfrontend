import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { adminSideBarMenu } from "../utils/maps";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SideNav expanded={isVisible} onToggle={handleToggle}>
      <Toggle onClick={handleToggle} />
      <Nav defaultSelected="dashboard">
        {adminSideBarMenu.map((ele, i) => (
          <NavItem eventKey={ele.link} key={i}>
            <NavIcon>{ele.icon}</NavIcon>
            <NavText>
              <Link to={ele.link}>{ele.title}</Link>
            </NavText>
          </NavItem>
        ))}
      </Nav>
    </SideNav>
  );
};

export default AdminSideBar;
