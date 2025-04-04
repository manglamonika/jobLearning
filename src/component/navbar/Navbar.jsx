import React, { useState } from "react";
import "./navbar.css";
import boy from "../../assets/react.svg";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={boy} alt="pic" />
      </div>

      <div className={`items ${isOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <h2>HOME</h2>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <h2>ABOUT US</h2>
        </NavLink>

        <NavLink
          to="/port"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <h2>CONTACT US</h2>
        </NavLink>
        <NavLink
          to="/Jobs"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          {" "}
          <h2>JOBS</h2>
        </NavLink>
      </div>

      <div className="hamburger" onClick={toggle}>
        <div className={`bck ${isOpen ? "rotate-top" : ""}`}></div>
        <div className={`bck ${isOpen ? "fade-out" : ""}`}></div>
        <div className={`bck ${isOpen ? "rotate-bottom" : ""}`}></div>
      </div>
    </div>
  );
}

export default Navbar;