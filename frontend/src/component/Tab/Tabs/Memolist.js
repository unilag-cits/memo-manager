// import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import { Button, Container } from "@material-ui/core";
// import Search from "../../Search/Search";
// import PropTypes from "prop-types";
// import TopNav from "./TopNav";
// import MemoTable from "../../MemoTable";

// const styles = (theme) => ({
//   root: {
//     backgroundColor: "green",
//   },
//   bodys: {
//     maxHeight: "100%",
//   },
//   header: {
//     float: "left",
//   },
//   newButton: {
//     float: "right",
//   },
//   search: {
//     float: "right",
//     // backgroundColor: "red",
//     marginTop: "100px",
//   },
//   // table: {
//   //   display: "flex",
//   //   alignContent: "center",
//   //   justifyContent: "center",
//   //   marginTop: "120px",
//   // },
// });

// const Memolist = (props) => {
//   const { classes } = props;
//   return (
//     <>
//       <div className={classes.root}>
//         {/* <TopNav /> */}
//         <div style={{ backgroundColor: "grey" }}>
//           <h2 className={classes}>MEMO LIST</h2>
//           <Button className={classes.newButton}>Add New</Button>
//         </div>
//         <div className={classes.search}>
//           <Search />
//         </div>
//         <div className={classes.table}>
//           <MemoTable />
//         </div>
//       </div>
//     </>
//   );
// };

// Memolist.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Memolist);

import React, { Component } from "react";
import { Button, Container } from "@material-ui/core";
import Search from "../../Search/Search";
import MemoTable from "../../MemoTable";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class Memolist extends Component {
  handleClick = (e) => {
    // console.log("NICE");
    this.props.history.push();
  };
  render() {
    return (
      <>
        <div className="new">
          <h2>MEMO LIST</h2>
          <Button
            // onClick={(e) => this.handleClick(e)}
            style={{ position: "absolute", right: 100, top: 250 }}
          >
            Add New
          </Button>
        </div>
        <div style={{ position: "absolute", right: 100 }}>
          {/* <div className="search"> */}
          <Search />
        </div>
        {/* </div> */}
        <div style={{ marginTop: "80px" }}>
          <MemoTable />
        </div>
      </>
    );
  }
}

export default Memolist;
