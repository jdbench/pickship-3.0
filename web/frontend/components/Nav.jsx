import React, { useState, useCallback } from "react";
import { NavLink as Link } from "react-router-dom";
import { TextField } from "@shopify/polaris";
import { MobileHamburgerMajor, MobileCancelMajor } from "@shopify/polaris-icons";

export default function Nav() {
  const [isHover, setIsHover] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const onMouseEnter = () => {
    if (window.innerWidth > 650) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 650) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };



  let activeStyle = {
    textDecoration: "none",
    background: "var(--p-action-primary)",
    color: "#ffffff",
    padding: "15px 45px",
    title:{
      textDecoration: "none",
      background: "var(--p-action-primary)",
      color: "#ffffff",
      padding: "15px 45px",
    }
  };

  let inactiveStyle = {
    textDecoration: "none",
    color: "black",
    padding: "15px 45px",
    flex: "auto",
    title:{
      textDecoration: "none",
      color: "black",
      padding: "15px 45px",
    }
  };

  let hoverStyle = {
    backgroundColor: isHover ? "var(--p-action-primary-hover)" : "lightgray",
  };

  return (
    <nav>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? 'MoblieCancelMajor':'MobileHamburgerMajor'} />
      </div>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          padding: "0px 0px 0px 0px",
          justifyContent: "center",
        }}
        className={click ? 'nav-menu active':'nav-menu'}
      >
        <li>
          <Link
            onClick={closeMobileMenu}
            to={"/"}
            style={({ isActive }) => (isActive ? activeStyle.title : inactiveStyle.title)}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            onClick={closeMobileMenu}
            to={"/products"}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            onClick={closeMobileMenu}
            to={"/locations"}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Locations
          </Link>
        </li>
        <li>
          <Link
            onClick={closeMobileMenu}
            to={"/picklists"}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Picklists
          </Link>
        </li>
      </ul>
    </nav>
  );
}
