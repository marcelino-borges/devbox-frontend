import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { Build, SportsEsports, PhoneIphone } from "@material-ui/icons";

import "@fontsource/roboto";
import { v4 as uuid } from "uuid";

import { INNER_DIV_WITH_MARGINS, THEME_RED } from "../../Utils/patterns";
import CardWhatWeDo from "../card-what-we-do/index";

import "./style.css";

const SectionWhatWeDo = () => {
  const iconStyle = {
    fontSize: 40,
    marginTop: "-3px",
    marginRight: "15px",
    color: THEME_RED,
  };

  return (
    <div className="section whatWeDoSection" id="section-whatWeDo">
      <div style={INNER_DIV_WITH_MARGINS}>
        <Grid container className="sectionInnerContentMargin">
          <Typography variant="h2" className="sectionTitle textBlack">
            What we do
          </Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid item sm={4} xs={12}>
            <CardWhatWeDo
              title="Technology"
              content="We make your dream come true through technology."
              icon={<Build style={iconStyle} />}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <CardWhatWeDo
              title="Games"
              content="We create high quality games, exactly as you idealized."
              icon={<SportsEsports style={iconStyle} />}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <CardWhatWeDo
              title="Apps"
              content="We create mobile multiplatform apps."
              icon={<PhoneIphone style={iconStyle} />}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SectionWhatWeDo;
