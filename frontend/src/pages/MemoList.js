import React, { Component } from "react";
import NavBar from "../component/NavBar";
import SimpleTabs from "../component/Tab/MenuTabs";
import Search from "../component/Search/Search";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

export class MusicUpload extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <SimpleTabs />
      </div>
    );
  }
}

export default MusicUpload;
