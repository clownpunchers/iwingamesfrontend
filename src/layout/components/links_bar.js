import React, { useState } from "react";
import { Link } from "react-router-dom";

const data = {
  left: [
    {
      link: "",
      icon: <i className="bi bi-twitter"></i>,
      class: "",
    },
    {
      link: "",
      icon: <i className="bi bi-instagram"></i>,
      class: "",
    },
    {
      link: "",
      icon: <i className="bi bi-linkedin"></i>,
      class: "",
    },
    {
      link: "",
      icon: <i className="bi bi-facebook"></i>,
    },
    {
      link: "",
      text: "Home",
    },
  ],

  right: [
    {
      link: "/contact",
      text: "Contact",
    },
    {
      link: "",
      text: "Help",
    },
    {
      link: "",
      text: "Setting",
    },
    {
      link: "",
      text: "Home",
    },
  ],
};

export default () => {
  return (
    <aside className="links-bar">
      <ul className="left">
        {data.left.map((ele, i) => (
          <li className={ele.class} key={i}>
            <Link to={ele.link}>{ele.icon}</Link>
          </li>
        ))}
        <li>
          <div className="dot"></div>
          <div className="left-divider"></div>
        </li>
        <li className="rotate">
          <Link to=""> Follow Us </Link>
        </li>
      </ul>

      <ul className="right">
        {data.right.map((ele, i) => (
          <li className="mb-4 rotate" key={i}>
            <Link to={ele.link}>{ele.text}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
