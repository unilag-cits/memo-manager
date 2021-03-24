import React, { useState, Suspense, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import MuiTheme from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  useLocation,
} from "react-router-dom";
import store from "./store";
import { showLoader, hideLoader } from "./action/loading";

// Component
import NavBar from "./component/NavBar";
import Modal from "./component/modal";

// action
import { loadUser } from "./action/userAction";
import PrivateRoute from "./protect/protectRoutes";
// pages
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import MemoList from "./pages/MemoList";
import SuspenseLoading from "./component/loader";

const Routes = (props) => {
  const location = useLocation();
  const loading = useSelector((state) => state.loading.loading);

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.6,
  };

  useEffect(() => {
    props.showLoader();
    setTimeout(() => {
      props.hideLoader();
    }, 5000);
  }, []);

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        {loading ? (
          <SuspenseLoading />
        ) : (
          <>
            <Suspense fallback={<SuspenseLoading />}>
              <Modal />
              <Switch>
                <Redirect exact from="/" to={`${process.env.REACT_APP_URL}`} />
              </Switch>
              <Route
                path={[
                  `${process.env.REACT_APP_URL}`,
                  `${process.env.REACT_APP_URL}/memolist`,
                  `${process.env.REACT_APP_URL}/signup`,
                ]}
              >
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Switch location={location} key={location.pathname}>
                    <Route
                      exact
                      path={`${process.env.REACT_APP_URL}`}
                      component={Signin}
                    />
                  </Switch>
                </motion.div>
              </Route>
              <Route
                path={[
                  `${process.env.REACT_APP_URL}`,
                  `${process.env.REACT_APP_URL}/memolist`,
                  `${process.env.REACT_APP_URL}/signup`,
                ]}
              >
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Switch location={location} key={location.pathname}>
                    {/* <Route
                      exact
                      path={`${process.env.REACT_APP_URL}`}
                      component={Signin}
                    /> */}
                    <PrivateRoute
                      exact
                      path={`${process.env.REACT_APP_URL}/memolist`}
                      component={MemoList}
                    />
                    <Route
                      exact
                      path={`${process.env.REACT_APP_URL}/signup`}
                      component={Signup}
                    />
                  </Switch>
                </motion.div>
              </Route>
            </Suspense>
          </>
        )}
      </AnimatePresence>
      </ThemeProvider>
  );
};

export default connect(null, { showLoader, hideLoader })(Routes);
