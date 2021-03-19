// import React from "react";
// import PropTypes from "prop-types";
// import { Container } from "@material-ui/core";
// import { withStyles } from "@material-ui/core/styles";

// const styles = (theme) => ({
//   Navbar: {
//     fontSize: "20px",
//   },
// });

// const NavBar = (props) => {
//   const { classes } = props;
//   return (
//     <div className="navstyle">
//       <Container className={classes.Navbar}>
//         <h2>{process.env.REACT_APP_NAME}</h2>
//       </Container>
//     </div>
//   );
// };

// NavBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(NavBar);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  Navbar: {
    fontSize: "20px",
    backgroundColor: "red",
  },
});

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      // <>
      <div
        style={{
          backgroundColor: "#02456B",
          color: "#fff",
          padding: "2%",
          fontSize: "25px",
          fontWeight: "10%",
        }}
      >
        <Container>
          <div>{process.env.REACT_APP_NAME}</div>
        </Container>
      </div>
      // </>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
