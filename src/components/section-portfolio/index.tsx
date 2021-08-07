import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";

import "@fontsource/roboto";
import Slider from "react-slick";
import { v4 as uuid } from "uuid";

import {
  INNER_DIV_WITH_MARGINS,
  MOBILE_BREAKPOINT,
} from "../../Utils/patterns";
import portfolioJSON from "../../data/portfolio.json";
import { IPortfolioItem } from "./../../store/portfolio/types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

const SectionPortfolio = () => {
  const [portfolio, setPortfolio] = useState<IPortfolioItem[]>([]);

  useEffect(() => {
    const port: IPortfolioItem[] = portfolioJSON.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        highlightImg: item.highlightImg,
        imgs: item.imgs,
        storeUrl: item.storeUrl,
        otherUrls: item.otherUrls,
      };
    });
    setPortfolio(port);
  }, []);

  var carouselSettings = {
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
              <a href={item.storeUrl}>
                <img
                  src={item.highlightImg}
                  key={uuid()}
                  className="portfolioImgStatic staticPortfolioVisibility"
                  alt={`Baner of the game ${item.name}`}
                />
              </a>
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

  return (
    <div className="section portfolioSection" id="section-portfolio">
      <div style={INNER_DIV_WITH_MARGINS}>
        <Grid container className="sectionInnerContentMargin">
          <Typography variant="h2" className="sectionTitle textWhite">
            Our Portfolio
          </Typography>
        </Grid>
        {renderStaticPortfolio()}
        {renderSliderPortfolio()}
      </div>
    </div>
  );
};

export default SectionPortfolio;
