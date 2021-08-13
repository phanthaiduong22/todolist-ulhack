import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import callAPI from "../../utils/apiCaller";
import Alert from "../../components/Alert/Alert";
import { Redirect } from "react-router-dom";

// import "./Login.css";
class Login extends Component {
  constructor() {
    super();
    this.state = { username: "", password: "", redirect: "" };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = () => {
    const username = localStorage.getItem("username");
    console.log(username);
    if (username !== null) {
      this.setState({ redirect: "/home" });
    }
  };
  handleChangeEmail(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    let { username, password } = this.state;
    callAPI("/login", "POST", {
      username,
      password,
    })
      .then((response) => {
        window.localStorage.setItem("username", response.data.username);
        this.setState({ redirect: "/home" });
      })
      .catch((e) => {
        this.setState({ error: "Login unsuccessful" });
      });
    event.preventDefault();
  }
  render() {
    let { error, redirect } = this.state;
    let showError = null;
    if (error) showError = <Alert error={error} />;
    if (redirect) {
      this.setState({ redirect: "" });
      return <Redirect to={redirect} />;
    }
    return (
      <Container>
        <Row>
          <form className="block-example border" onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>
            {showError}
            <div className="form-group">
              <label>Email address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleChangeEmail}
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
            <p className="forgot-password text-right">
              Forgot <a href="/">password?</a>
            </p>
          </form>
        </Row>
      </Container>
    );
  }
}

export default Login;
