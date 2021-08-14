import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import callAPI from "../../utils/apiCaller";
import Alert from "../../components/Alert/Alert";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      rePassword: "",
      error: "",
      redirect: "",
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeRePassword = this.handleChangeRePassword.bind(this);
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
  }
  componentDidMount = () => {
    const username = localStorage.getItem("username");
    if (username !== null) {
      this.setState({ redirect: "/home" });
    }
  };
  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleChangeRePassword(event) {
    this.setState({ rePassword: event.target.value });
  }
  handleSubmitRegister(event) {
    let { username, password, rePassword } = this.state;
    if (password !== rePassword) {
      this.setState({ error: "Invalid username or password" });
      event.preventDefault();
      return;
    }
    callAPI("/account/register", "POST", {
      username,
      password,
    })
      .then((response) => {
        this.setState({ redirect: "/login" });
      })
      .catch((e) => {
        this.setState({ error: "Register unsuccessful" });
      });
    event.preventDefault();
  }
  render() {
    let { error, redirect } = this.state;
    let showError = null;
    if (error) showError = <Alert error={error} />;
    if (redirect) {
      this.setState({ redirect: "" });
      return <Redirect to={redirect} replace />;
    }
    return (
      <Container>
        <Row>
          <form
            className="block-example border rounded-3 p-5	"
            onSubmit={this.handleSubmitRegister}
          >
            <h3>Register</h3>
            {showError}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.handleChangeUsername}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
            </div>

            <div className="form-group">
              <label>Re-password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Retype password"
                value={this.state.rePassword}
                onChange={this.handleChangeRePassword}
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="forgot-password text-right mt-3">
              Forgot <a href="/">password?</a>
            </p>
          </form>
        </Row>
      </Container>
    );
  }
}

export default Register;
