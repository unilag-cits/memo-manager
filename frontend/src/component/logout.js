import React, { Component } from "react";
import { logout } from "../action/userAction";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  handleLogout = (e) => {
    e.preventDefault();
    // return (
    this.props.logout();
    // this.props.history.push(`${process.env.REACT_APP_URL}`);
    // );
  };

  render() {
    return (
      <>
        <Button onClick={(e) => this.handleLogout(e)} href="">
          Logout
        </Button>
      </>
    );
  }
}

export default withRouter(connect(null, { logout })(Logout));
