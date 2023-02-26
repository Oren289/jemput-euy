import React, { Fragment } from "react";
import HomePageNav from "../components/HomePageNav";
import Jumbotron from "../components/Jumbotron";

const HomePage = () => {
  return (
    <Fragment>
      <HomePageNav></HomePageNav>
      <Jumbotron></Jumbotron>
    </Fragment>
  );
};

export default HomePage;
