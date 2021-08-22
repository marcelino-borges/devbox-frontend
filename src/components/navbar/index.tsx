import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { Divider, Grid, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import logo from "../../imgs/logo_80px.png";
import { INNER_DIV_WITH_MARGINS, THEME_RED } from "../../Utils/patterns";
import { signOut as firebaseSignOut } from "../../services/firebase-service";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../store/root-reducer";
import {
  clearAuthenticatedUser,
  setAuthenticatedUser,
} from "../../store/firebase/actions";
import firebase from "firebase";
import { IFirebaseUser } from "../../store/firebase/types";

const menuStyle = {
  color: THEME_RED,
};

const dividerStyle = {
  marginTop: "15px",
  marginBottom: "15px",
};

const Navbar = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: IApplicationState) => state.user);
  const location = useLocation();

  const [showingSubNavbar, setShowingSubNavbar] = useState<boolean>(false);

  const logOut = () => {
    firebaseSignOut();
    dispatch(clearAuthenticatedUser());
  };

  useEffect(() => {
    const firebaseCurrentUser: firebase.User | null =
      firebase.auth().currentUser;

    if (!!firebaseCurrentUser && firebaseCurrentUser !== null) {
      const user: IFirebaseUser = {
        email: firebaseCurrentUser.email || "",
        displayName: firebaseCurrentUser.displayName,
        phoneNumber: firebaseCurrentUser.phoneNumber,
        photoURL: firebaseCurrentUser.photoURL,
        refreshToken: firebaseCurrentUser.refreshToken,
        uid: firebaseCurrentUser.uid,
        emailVerified: firebaseCurrentUser.emailVerified,
        isAnonymous: firebaseCurrentUser.isAnonymous,
      };

      dispatch(setAuthenticatedUser(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderUserMenu = (
    cssClass: string,
    onClickWhenLoggedIn?: CallableFunction
  ) => {
    if (!userState.isLoggedIn) {
      return (
        <Link to="/login" className={cssClass}>
          Sign In
        </Link>
      );
    } else {
      if (!location.pathname.includes("/dashboard")) {
        return (
          <Link
            to="/dashboard"
            className={cssClass}
            onClick={() => {
              if (!!onClickWhenLoggedIn) onClickWhenLoggedIn();
            }}
          >
            Dashboard
          </Link>
        );
      } else {
        return (
          <Link
            to="/"
            className={cssClass}
            onClick={() => {
              if (!!onClickWhenLoggedIn) onClickWhenLoggedIn();
              logOut();
            }}
          >
            Sign out
          </Link>
        );
      }
    }
  };

  return (
    <div className="navbar">
      <div style={INNER_DIV_WITH_MARGINS}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Link to="/">
              <img src={logo} className="logo" alt="Devbox logo" />
            </Link>
          </Grid>
          <Grid item className="menu">
            <a href="/#section-whatWeDo" className="link">
              What we do
            </a>
            <a href="/#section-portfolio" className="link">
              Portfolio
            </a>
            <a href="/#section-aboutus" className="link">
              About us
            </a>
            <a href="/#section-contactus" className="link">
              Contact
            </a>
            {renderUserMenu("link")}

            {/* {!userState.isLoggedIn ? (
              <Link to="/login" className="link">
                Sign In
              </Link>
            ) :
              {location.pathname !== "/dashboard" ? <Link to="/dashboard" className="link">
                Dashboard
              </Link> : <Link to="/" className="link" onClick={logOut}>
              Sign out
            </Link>}
            } */}
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

      {/* MOBILE - DROPDOWN SUBMENU */}
      <div className={showingSubNavbar ? "subNavbar" : "hidden"}>
        <Grid container spacing={1}>
          <Grid item style={{ width: "100%" }}>
            <a
              href="/#section-whatWeDo"
              className="subLink"
              onClick={() => {
                setShowingSubNavbar(false);
              }}
            >
              What we do
            </a>
            <Divider style={dividerStyle} />
            <a
              href="/#section-portfolio"
              className="subLink"
              onClick={() => {
                setShowingSubNavbar(false);
              }}
            >
              Portfolio
            </a>
            <Divider style={dividerStyle} />
            <a
              href="/#section-aboutus"
              className="subLink"
              onClick={() => {
                setShowingSubNavbar(false);
              }}
            >
              About us
            </a>
            <Divider style={dividerStyle} />
            <a
              href="/#section-contactus"
              className="subLink"
              onClick={() => {
                setShowingSubNavbar(false);
              }}
            >
              Contact
            </a>
            <Divider style={dividerStyle} />

            {renderUserMenu("subLink")}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Navbar;
