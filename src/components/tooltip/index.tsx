import React, { useState } from "react";

import { Tooltip, Typography, withStyles } from "@material-ui/core";
import "@fontsource/roboto";
import { THEME_RED } from "../../Utils/patterns";

interface IProps {
  title?: string;
  content: JSX.Element;
  canShow: boolean;
  children: JSX.Element;
}

const CustomTooltip = (props: IProps) => {
  const [canShowTooltip, setCanShowTooltip] = useState<boolean>(props.canShow);

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: THEME_RED,
      color: "white",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
    },
  }))(Tooltip);

  const renderComponent = () => {
    if (canShowTooltip) {
      return (
        <HtmlTooltip
          interactive
          arrow
          title={
            <React.Fragment>
              {props.title && (
                <Typography color="inherit">
                  <b>{props.title}</b>
                </Typography>
              )}
              {props.content}
            </React.Fragment>
          }
        >
          {props.children}
        </HtmlTooltip>
      );
    } else {
      return props.children;
    }
  };

  return renderComponent();
};

export default CustomTooltip;
