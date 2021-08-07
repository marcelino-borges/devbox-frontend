import React from "react";

import ScrollToTop from "react-scroll-up";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import banner from "../../imgs/banner-thinking-outside-the-box.jpg";

import SectionWhatWeDo from "../../components/section-what-we-do/index";
import SectionPortfolio from "../../components/section-portfolio";
import SectionAboutUs from "./../../components/section-about-us/index";
import SectionContact from "./../../components/section-contact/index";
import Footer from "./../../components/footer/index";

import "./style.css";

const Home = () => {
  const scrollUpIconStyle = {
    fontSize: 40,
    color: "#fff",
    marginTop: "4px",
    marginLeft: "4.5px",
  };

  return (
    <div>
      <img
        src={banner}
        className="banner"
        alt="Banner with the slogan of Devbox: Thinking outside the box"
      />
      <SectionWhatWeDo />
      <SectionPortfolio />
      <SectionAboutUs />
      <SectionContact />
      <Footer />
      <ScrollToTop showUnder={160}>
        <div className="scrollUpDiv">
          <ArrowDropUpIcon style={scrollUpIconStyle} />
        </div>
      </ScrollToTop>
    </div>
  );
};

export default Home;
