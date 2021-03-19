import React, { Component } from "react";
import { logout } from "../action/userAction";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  handleLogout = (e) => {
    e.preventDefault();
    return (
      this.props.logout,
      this.props.history.push(`${process.env.REACT_APP_URL}/signin`)
    );
  };

  render() {
    return (
      <>
        <Button onClick={(e) => this.handleLogout(e)} href="/signin">
          Logout
        </Button>
      </>
    );
  }
}

export default connect(null, { logout })(Logout);
