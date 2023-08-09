import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { sidebar_menu } from "../../../utils/maps";

export default ({ setPage }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SideNav expanded={isVisible} onToggle={handleToggle}>
      <Toggle onClick={handleToggle} />
      <Nav defaultSelected="dashboard">
        {sidebar_menu.map((ele, i) => (
          <NavItem
            key={i}
            eventKey={ele.link}
            onClick={() => setPage(ele.link)}
          >
            <NavIcon>{ele.icon}</NavIcon>
            <NavText>{ele.title}</NavText>
          </NavItem>
        ))}
      </Nav>
    </SideNav>
  );
};
