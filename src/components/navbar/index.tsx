import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Divider, Grid, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import logo from "../../imgs/logo_80px.png";
import { INNER_DIV_WITH_MARGINS, THEME_RED } from "../../Utils/patterns";

import "./style.css";
import { LaptopWindows } from "@material-ui/icons";

const menuStyle = {
  color: THEME_RED,
};

const dividerStyle = {
  marginTop: "15px",
  marginBottom: "15px",
};

const Navbar = () => {
  const [showingSubNavbar, setShowingSubNavbar] = useState<boolean>(false);

  return (
    <div className="navbar">
      <div style={INNER_DIV_WITH_MARGINS}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Link to="/">
              <img src={logo} className="logo" />
            </Link>
          </Grid>
          <Grid item spacing={3} className="menu">
            <a href="#section-whatWeDo" className="link">
              What we do
            </a>
            <a href="#section-portfolio" className="link">
              Portfolio
            </a>
            <a href="#section-aboutus" className="link">
              About us
            </a>
            <a href="#section-contactus" className="link">
              Contact
            </a>
          </Grid>
          <Grid item className="menuVisibility">
            <IconButton
              className="menuIconButton"
              onClick={() => {
                setShowingSubNavbar(!showingSubNavbar);
              }}
            >
              <MenuIcon fontSize="large" style={menuStyle} />
            </IconButton>
          </Grid>
        </Grid>
      </div>

      <div className={showingSubNavbar ? "subNavbar" : "hidden"}>
        <Grid container spacing={1}>
          <Grid item style={{ width: "100%" }}>
            <a
              href="#section-whatWeDo"
              className="subLink"
              onClick={() => {
                setShowingSubNavbar(false);
              }}
            >
              What we do
            </a>
            <Divider style={dividerStyle} />
            <a
              href="#section-portfolio"
              className="subLink"
              onClick={() => {
                setShowingSubNavbar(false);
              }}
            >
              Portfolio
            </a>
            <Divider style={dividerStyle} />
            <a
              href="#section-aboutus"
              className="subLink"
              onClick={() => {
                setShowingSubNavbar(false);
              }}
            >
              About us
            </a>
            <Divider style={dividerStyle} />
            <a
              href="#section-contactus"
              className="subLink"
              onClick={() => {
                setShowingSubNavbar(false);
              }}
            >
              Contact
            </a>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Navbar;
