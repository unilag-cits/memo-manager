import React, { Component } from "react";
import { Alert } from "@material-ui/lab";
import { signup } from "../action/userAction";
import PropTypes from "prop-types";
import "../css/register.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearErrors } from "../action/errorActions";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffId: "",
      password: "",
      msg: "",
      redirect: false,
      formErrors: {
        staffId: "",
        password: "",
      },
    };
  }

  static propType = {
    signup: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // if authenticated redirect
    if (isAuthenticated === true) {
      this.SendRedirect();
    }
  }

  SendRedirect = () => {
    this.props.clearErrors();
  };

  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "staffId":
        formErrors.staffId =
          value.length < 6 ? "minimum of 6 characters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { staffId, password } = this.state;

    const user = {
      staffId,
      password,
    };

    this.props.signup(user);
  };

  render() {
    const { formErrors, redirect } = this.state;
    // if(redirect) {
    //   return <Redirect to='/loading' />
    // }
    // console.log(this.state.redirect)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Add user</h2>
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
          <div className="email">
            <label htmlFor="staffId">Staff Id: </label>
            <input
              type="text"
              name="staffId"
              placeholder="staffId"
              className="email"
              onChange={this.handleChange}
            />
          </div>
          {formErrors.staffId.length > 0 && (
            <span className="errorMessage">{formErrors.staffId}</span>
          )}

          {/* <div className="email">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="email"
              onChange={this.handleChange}
            />
          </div>
          {formErrors.email.length > 0 && (
            <span className="errorMessage">{formErrors.email}</span>
          )} */}

          <div className="password">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="password"
              onChange={this.handleChange}
            />
          </div>
          {formErrors.password.length > 0 && (
            <span className="errorMessage">{formErrors.password}</span>
          )}

          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { signup, clearErrors })(Signup);
