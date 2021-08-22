import React, { useEffect, useState } from "react";

import { Grid, Paper, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import "@fontsource/roboto";
import { v4 as uuid } from "uuid";
import Moment from "react-moment";

import { ITeamMember } from "./../../store/team/types";
import {
  INNER_DIV_WITH_MARGINS,
  THEME_BLACK,
  THEME_RED,
} from "../../Utils/patterns";
import CustomTooltip from "./../tooltip/index";
import * as teamService from "./../../services/team-service";

import teamJSON from "../../data/team.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeamMembersRequest } from "./../../store/team/actions";
import { IApplicationState } from "../../store/root-reducer";

const SectionAboutUs = () => {
  const dispatch = useDispatch();
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);
  const stateTeam = useSelector((state: IApplicationState) => state.team);

  useEffect(() => {
    if (Boolean(process.env.REACT_APP_USE_API)) {
      getDataFromAPI();
    } else {
      getDataFromLocalJSON();
    }
  }, []);

  useEffect(() => {
    if (!!stateTeam.teamMembers && stateTeam.teamMembers.length > 0) {
      setTeamMembers(stateTeam.teamMembers);
    }
  }, [stateTeam.teamMembers]);

  const getDataFromAPI = () => {
    dispatch(getTeamMembersRequest());
    // const requestTeam = async () => {
    //   return await teamService.getTeamMembers();
    // };

    // requestTeam().then((r) => {
    //   setTeamMembers(r.data);
    // });
  };

  const getDataFromLocalJSON = () => {
    // setTeamMembers();
    // teamJSON.map((member) => {
    //   return {
    //     id: member.id,
    //     firstName: member.firstName,
    //     lastName: member.lastName,
    //     mainRole: member.mainRole,
    //     email: member.email,
    //     secondaryRoles: member.secondaryRoles,
    //     memberSince: new Date(member.memberSince),
    //     picture: member.picture,
    //   };
    // })
  };

  const concatenateRoleSeparator = (
    currentIndex: number,
    lastIndex: number
  ) => {
    if (currentIndex <= lastIndex - 2) return ", ";
    else if (currentIndex <= lastIndex - 1) return " and ";
    else return ".";
  };

  const renderTeamMemberCard = (teamMember: ITeamMember) => (
    <Grid
      item
      md={4}
      sm={6}
      xs={12}
      key={teamMember._id}
      style={{ textAlign: "center" }}
    >
      <CustomTooltip
        canShow={
          (teamMember.secondaryRoles && teamMember.secondaryRoles.length > 0) ||
          (teamMember.memberSince !== undefined &&
            teamMember.memberSince !== null)
        }
        title={
          teamMember.secondaryRoles && teamMember.secondaryRoles.length > 0
            ? "I also play a role as:"
            : ""
        }
        content={
          <>
            {teamMember.secondaryRoles.map((role, index) => (
              <>
                {index !== 0 ? role.toLowerCase() : role}
                {concatenateRoleSeparator(
                  index,
                  teamMember.secondaryRoles.length - 1
                )}
              </>
            ))}
            <Typography color="inherit">
              <b>I'm here since: </b>
            </Typography>
            <Moment format="YYYY, MMM">{teamMember.memberSince}</Moment>
          </>
        }
      >
        <img
          src={teamMember.picture}
          className="teamPicture"
          alt={`Avatar of ${teamMember.firstName} ${teamMember.lastName}`}
        />
      </CustomTooltip>
      <div style={{ color: THEME_BLACK }}>
        <b>{`${teamMember.firstName.toUpperCase()} ${teamMember.lastName.toUpperCase()}`}</b>
      </div>
      <div style={{ color: "black" }}>{teamMember.mainRole}</div>
    </Grid>
  );

  const circularProgressStyle = {
    color: THEME_RED,
  };

  return (
    <div className="section aboutUsSection" id="section-aboutus">
      <div style={INNER_DIV_WITH_MARGINS}>
        <Grid container className="sectionInnerContentMargin">
          <Grid item>
            <Typography variant="h2" className="sectionTitle textBlack">
              About Us
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          spacing={3}
          className="sectionInnerContentMargin"
        >
          {!teamMembers || teamMembers.length === 0 ? (
            <CircularProgress style={circularProgressStyle} />
          ) : (
            teamMembers.map((member) => renderTeamMemberCard(member))
          )}
        </Grid>
      </div>
    </div>
  );
};

export default SectionAboutUs;
