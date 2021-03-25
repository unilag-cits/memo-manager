import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Avatar, Button, Collapse } from "@material-ui/core";
import avatar from "../images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Logout from "../component/logout";

const styles = (theme) => ({
  Navbar: {
    fontSize: "20px",
    backgroundColor: "red",
  },
});

class NavBar extends Component {
  state = {
    open: false,
    anchorEl: null,
  };

  handleOpen = (e) => {
    this.setState({ open: !this.state.open });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes } = this.props;
<<<<<<< HEAD
    console.log(this.state.open);
=======
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
    return (
      <div
        style={{
          backgroundColor: "#02456B",
          color: "#fff",
          padding: "2%",
          fontSize: "25px",
          fontWeight: "10%",
        }}
      >
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{process.env.REACT_APP_NAME}</div>
          <div style={{ display: "flex" }}>
            <div>
              <Avatar alt="Remy Sharp" src={avatar} />
            </div>
            <Button onClick={(e) => this.handleClick(e)}>
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.open}
              keepMounted
<<<<<<< HEAD
              open={Boolean(this.state.open)}
=======
              open={Boolean(this.state.anchorEl)}
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <Logout />
              </MenuItem>
            </Menu>
            {/* )} */}
          </div>
        </Container>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
