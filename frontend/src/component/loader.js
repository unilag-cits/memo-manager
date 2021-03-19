import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { HashLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, connect } from "react-redux";
import { hideLoader } from "../action/loading";
import { withStyles } from "@material-ui/core/styles";
// import { hideModal } from "../actions/modal";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderCenter: {
    margin: "20%",
    // maxHeight: "100%",
  },
});

const SuspenseLoading = (props) => {
  const { classes } = props;
  const loading = useSelector((state) => state.loading.loading);
  const user = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (user === true) {
      if (!loading) return null;
      setTimeout(() => {
        props.hideLoader();
      }, 5000);
    }
  });

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
          >
            {/* <div className="loader d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3"> */}
            <div className={classes.loaderCenter}>
              {/* <div className="d-flex align-items-center flex-column px-4"> */}
              <div className={classes.loader}>
                <HashLoader color={"#0773d8"} loading={true} />
              </div>
              {/* <div className="text-muted font-size-xl text-dark text-center pt-3"> */}
              <div className={classes.loader}>
                <span className="font-size-lg d-block text-dark">
                  Your request is loading
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

SuspenseLoading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  withStyles(styles)(connect(null, { hideLoader })(SuspenseLoading))
);
