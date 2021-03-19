import React, { useState, Suspense, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import store from "./store";
import { showLoader, hideLoader } from "./action/loading";

// Component
import NavBar from "./component/NavBar";

import Modal from "./component/modal";

// action
import { loadUser } from "./action/userAction";

// pages
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import MemoList from "./pages/MemoList";
import SuspenseLoading from "./component/loader";

const Routes = (props) => {
  const loading = useSelector((state) => state.loading.loading);

  useEffect(() => {
    props.showLoader();
    setTimeout(() => {
      props.hideLoader();
    }, 5000);
  }, []);

  return (
    <div>
      {loading ? (
        <SuspenseLoading />
      ) : (
        <>
          <Suspense fallback={<SuspenseLoading />}>
            <Modal />
            {/* <Provider store={store}> */}
            <Switch>
              <Redirect exact from="/" to={`${process.env.REACT_APP_URL}`} />
            </Switch>
            <Switch>
              <Route
                exact
                path={`${process.env.REACT_APP_URL}`}
                component={Signin}
              />
              <Route
                exact
                path={`${process.env.REACT_APP_URL}/memo-list`}
                component={MemoList}
              />
              <Route
                exact
                path={`${process.env.REACT_APP_URL}/signup`}
                component={Signup}
              />
            </Switch>
            {/* </Provider> */}
          </Suspense>
        </>
      )}
    </div>
  );
};

export default connect(null, { showLoader, hideLoader })(Routes);
