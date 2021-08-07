import { Grid } from "@material-ui/core";
import React from "react";
import { INNER_DIV_WITH_MARGINS } from "../../Utils/patterns";
import "./style.css";

const Footer = () => (
  <div className="footer">
    <div style={INNER_DIV_WITH_MARGINS}>
      <Grid container className="sectionInnerContentMargin">
        <Grid item>
          Website made by <b>Devbox Brasil</b> - Aug/2021
        </Grid>
        <Grid item justifyContent="flex-end">
          <Grid container item></Grid>
        </Grid>
      </Grid>
    </div>
  </div>
);

export default Footer;
