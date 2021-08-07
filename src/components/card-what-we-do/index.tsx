import React from "react";

import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import "@fontsource/roboto";

import { v4 as uuid } from "uuid";

import "./style.css";

interface IProp {
  title: string;
  content: string;
  icon?: JSX.Element;
}

const CardWhatWeDo = (props: IProp) => {
  return (
    <Card className="whatWeDoCard" key={uuid()} elevation={3}>
      <CardContent style={{ height: "100%" }}>
        <Grid container>
          {props.icon || ""}
          <Typography variant="h5" className="whatWeDoCardTitle">
            {props.title}
          </Typography>
        </Grid>
        <Grid container alignContent="center" alignItems="center">
          <Typography>{props.content}</Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardWhatWeDo;
