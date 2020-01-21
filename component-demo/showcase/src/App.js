import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Data from "./shared/Data.json";
import SampleScoreCard from "./Components/ScoreCard.js";

class App extends Component {
  render() {
    return (
        <SampleScoreCard scoreCardData={Data} />
    );
  }
}

export default App;
