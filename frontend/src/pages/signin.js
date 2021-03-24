import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signin } from "../action/userAction";
import { Alert } from "@material-ui/lab";
import { showLoader, hideLoader } from "../action/loading";
import { Card } from "@material-ui/core";
import { clearErrors } from "../action/errorActions";
import { Redirect } from "react-router-dom";
import "../css/login.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffId: "",
      msg: null,
      redirect: false,
      formErrors: {
        staffId: "",
        password: "",
      },
      setFormErrorMessage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signin: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // if authenticated redirect
    if (isAuthenticated === true) {
      // this.props.history.push(`${process.env.REACT_APP_URL}/memolist`);
      window.location.href = `${process.env.REACT_APP_URL}/memolist`;
      // this.setState({ redirect: true });
      this.props.hideLoader();
      this.SendRedirect();
    }
  }

  SendRedirect = () => {
    this.props.clearErrors();
  };

  handleSubmit(e) {
    e.preventDefault();

    const { staffId, password } = this.state;

    const user = {
      staffId,
      password,
    };

    // Attempt to login
    this.props.signin(user);
    // this.props.showLoader();
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "staffId":
        formErrors.staffId =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  }

  render() {
    const { formErrors } = this.state;
    if (this.state.redirect) {
      console.log("Redirect");
    }
    return (
      <>
        <div className="columns sign-in">
          <div className="wrapper">
            <div className="custom-flex-col">
              <div className="custom-flex-col welcome">
                <div className="app-name">E-MEMO MANAGER</div>
                <div>Welcome back!</div>
              </div>
              <Card className="form-wrappers">
                <form className="form" onSubmit={this.handleSubmit}>
                  <div
                    style={{
                      paddingBottom: "10px",
                      paddingLeft: "6px",
                      paddingRight: "6px",
                    }}
                  >
                    {this.state.msg ? (
                      <Alert severity="error">{this.state.msg}</Alert>
                    ) : null}
                  </div>
                  <div className="emails">
                    <input
                      type="text"
                      name="staffId"
                      placeholder="Staff ID"
                      className="emails"
                      onChange={this.handleChange}
                    />
                  </div>
                  {formErrors.staffId.length > 0 && (
                    <span className="errorMessage">{formErrors.staffId}</span>
                  )}

                  <div className="passwords">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="passwords"
                      onChange={this.handleChange}
                    />
                  </div>
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}

                  <div>
                    <button className="submit">Submit</button>
                  </div>
                </form>
              </Card>

              <div className="custom-flex-row links">
                <div>Forgot Password?</div>
                <div>
                  <strong>Get Started</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {
  signin,
  clearErrors,
  showLoader,
  hideLoader,
})(Signin);
