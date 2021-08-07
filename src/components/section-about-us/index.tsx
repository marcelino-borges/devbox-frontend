import React, { useEffect, useState } from "react";

import { Grid, Paper, Typography } from "@material-ui/core";
import "@fontsource/roboto";
import { v4 as uuid } from "uuid";

import { ITeamMember } from "./../../store/team/types";
import { INNER_DIV_WITH_MARGINS, THEME_BLACK } from "../../Utils/patterns";
import CustomTooltip from "./../tooltip/index";

import teamJSON from "../../data/team.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

const SectionAboutUs = () => {
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);

  useEffect(() => {
    const members: ITeamMember[] = teamJSON.map((item) => {
      return {
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        mainRole: item.mainRole,
        secondaryRoles: item.secondaryRoles,
        memberSince: new Date(item.memberSince),
        picture: item.picture,
      };
    });
    setTeamMembers(members);
  }, [teamJSON]);

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
      key={uuid()}
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
            {teamMember.memberSince.toLocaleDateString()}
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
          {teamMembers &&
            teamMembers.length > 0 &&
            teamMembers.map((member) => renderTeamMemberCard(member))}
        </Grid>
      </div>
    </div>
  );
};

export default SectionAboutUs;
