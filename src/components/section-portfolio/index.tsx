import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

import "@fontsource/roboto";
import Slider from "react-slick";
import { v4 as uuid } from "uuid";

import { INNER_DIV_WITH_MARGINS, THEME_RED } from "../../Utils/patterns";
import { IPortfolioItem } from "./../../store/portfolio/types";
import * as portfolioService from "./../../services/portfolio-service";

import portfolioJSON from "./../../data/portfolio.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import CustomTooltip from "../tooltip";

const SectionPortfolio = () => {
  const [portfolio, setPortfolio] = useState<IPortfolioItem[]>([]);

  useEffect(() => {
    if (Boolean(process.env.REACT_APP_USE_API)) getDataFromAPI();
    else getDataFromLocalJSON();
  }, []);

  const getDataFromAPI = () => {
    const requestPortfolio = async () => {
      return await portfolioService.getCompletePortfolio();
    };

    requestPortfolio().then((r) => {
      setPortfolio(r.data);
    });
  };

  const getDataFromLocalJSON = () => {
    setPortfolio(portfolioJSON);
  };

  const carouselSettings = {
    className: "portfolioContainer",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    centerMode: true,
    centerPadding: "60px",
    pauseOnHover: true,
    variableWidth: true,
    adaptiveHeight: true,
    rows: 1,
  };

  const renderSliderPortfolio = () => (
    <Slider
      {...carouselSettings}
      className="sectionInnerContentMargin sliderPortfolioVisibility"
    >
      {portfolio.map((item) => {
        return renderPortfolioCard(item);
      })}
    </Slider>
  );

  const renderStaticPortfolio = () => {
    return (
      <Grid
        container
        spacing={3}
        className="staticPortfolioVisibility sectionInnerContentMargin"
        justifyContent="center"
        style={{ marginLeft: "1px" }}
      >
        {portfolio.map((item: IPortfolioItem) => {
          return (
            <Grid item xs={12} key={uuid()}>
              <CustomTooltip
                canShow={!!item.description && item.description.length > 0}
                title="About:"
                content={<>{item.description}</>}
              >
                <a href={item.storeUrl}>
                  <img
                    src={item.highlightImg}
                    key={uuid()}
                    className="portfolioImgStatic staticPortfolioVisibility"
                    alt={`Baner of the game ${item.name}`}
                  />
                </a>
              </CustomTooltip>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const renderPortfolioCard = (portfolio: IPortfolioItem) => (
    <h3 key={uuid()}>
      <a
        href={
          portfolio.storeUrl && portfolio.storeUrl.length > 0
            ? portfolio.storeUrl
            : "#"
        }
        target="_blank"
      >
        <img src={portfolio.highlightImg} className="portfolioImgSlider" />
      </a>
    </h3>
  );

  const circularProgressStyle = {
    color: THEME_RED,
  };

  return (
    <div className="section portfolioSection" id="section-portfolio">
      <div style={INNER_DIV_WITH_MARGINS}>
        <Grid container className="sectionInnerContentMargin">
          <Typography variant="h2" className="sectionTitle textWhite">
            Our Portfolio
          </Typography>
        </Grid>
        {!!portfolio && portfolio.length > 0 ? (
          <>
            {renderStaticPortfolio()}
            {renderSliderPortfolio()})
          </>
        ) : (
          <Grid container justifyContent="center">
            <CircularProgress style={circularProgressStyle} />
          </Grid>
        )}
      </div>
    </div>
  );
};

export default SectionPortfolio;
