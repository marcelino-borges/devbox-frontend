import React, { useCallback, useEffect } from "react";
import "@fontsource/roboto";

import { INNER_DIV_WITH_MARGINS, THEME_RED } from "../../Utils/patterns";
import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";

const PageNotFound = () => {
  return (
    <div className="section pageNotFoundSection">
      <div style={INNER_DIV_WITH_MARGINS}>
        <h1>404 - NOT FOUND</h1>
        The page you were trying to access doesn't exist.
      </div>
    </div>
  );
};

export default PageNotFound;
