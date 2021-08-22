import React, { useCallback, useEffect, useState } from "react";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";

import { IApplicationState } from "../../store/root-reducer";
import { INNER_DIV_WITH_MARGINS, THEME_RED } from "../../Utils/patterns";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { getTeamMemberByEmail } from "../../services/team-service";
import { ITeamMember } from "../../store/team/types";
import { setUserComplementaryData } from "../../store/firebase/actions";
import Moment from "react-moment";
import ManageTeam from "./../../components/dashboard/manage-team/index";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";
import ManagePortfolio from "./../../components/dashboard/manage-portfolio/index";

const PageDashboard = () => {
  const userState = useSelector((state: IApplicationState) => state.user);
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();

  const [teammate, setTeammate] = useState<ITeamMember>();

  useEffect(() => {
    if (
      !!userState.user &&
      userState.isLoggedIn &&
      !!userState.user.email &&
      userState.user.email.length > 0
    ) {
      //Request to teammate data
      getTeamMemberByEmail(userState.user.email).then((response) => {
        setTeammate(response.data);
      });
    }
  }, []);

  useEffect(() => {
    if (!!teammate) {
      dispatch(setUserComplementaryData(teammate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teammate]);

  return (
    <div className="section loginPage">
      {!userState.isLoggedIn && <Redirect push to="/login" />}
      <div style={INNER_DIV_WITH_MARGINS}>
        <Grid container className="parentContainer">
          <Grid item container>
            <Grid
              container
              item
              className="profileContainer"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid item xs={12} sm={2} style={{ textAlign: "center" }}>
                {!!teammate &&
                !!teammate.picture &&
                teammate.picture.length > 0 ? (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img
                    src={teammate.picture}
                    className="dashboardUserPicture"
                    alt={`${teammate.firstName}'s picture`}
                  />
                ) : (
                  <AccountCircleIcon
                    style={{ fontSize: 150, color: "#d8d8d8" }}
                  />
                )}
              </Grid>
              <Grid item className="profileInfoSection" xs={12} sm={2}>
                {!!userState.user &&
                !!userState.user.displayName &&
                userState.user.displayName.length > 0 ? (
                  <span>
                    <b>NAME</b>
                    <br />
                    {userState.user.displayName}
                  </span>
                ) : (
                  <CircularProgress
                    style={{
                      color: THEME_RED,
                    }}
                  />
                )}
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                className="profileInfoDivider"
              />
              <Grid item className="profileInfoSection" xs={12} sm={2}>
                {!!teammate &&
                !!teammate.mainRole &&
                teammate.mainRole.length > 0 ? (
                  <span>
                    <b>ROLE</b>
                    <br />
                    {teammate.mainRole}
                  </span>
                ) : (
                  <CircularProgress
                    style={{
                      color: THEME_RED,
                    }}
                  />
                )}
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                className="profileInfoDivider"
              />
              <Grid item className="profileInfoSection" xs={12} sm={2}>
                {!!teammate && !!teammate.memberSince ? (
                  <span>
                    <b>MEMBER SINCE</b>
                    <br />
                    <Moment format="YYYY, MMM">{teammate.memberSince}</Moment>
                  </span>
                ) : (
                  <CircularProgress
                    style={{
                      color: THEME_RED,
                    }}
                  />
                )}
              </Grid>
            </Grid>

            <Grid
              container
              item
              alignItems="center"
              justifyContent="center"
              spacing={3}
              style={{ marginTop: "8px" }}
            >
              <Grid item justifyContent="center" xs={12} sm={6}>
                <Link to={`${url}/team`} style={{ textDecoration: "none" }}>
                  <div className="buttonStyle">Manage Team</div>
                </Link>
              </Grid>
              <Grid item justifyContent="center" xs={12} sm={6}>
                <Link
                  to={`${url}/portfolio`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="buttonStyle">Manage Portfolio</div>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route exact path={path}>
                <h3>Hey! Welcome to your dashboard!</h3>
              </Route>
              <Route path={`${path}/team`}>
                <ManageTeam />
              </Route>
              <Route path={`${path}/portfolio`}>
                <ManagePortfolio />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PageDashboard;
