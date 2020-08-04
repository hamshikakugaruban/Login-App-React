import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { TOKEN, AUTHORIZION } from "./Constants/constant";
import Histroy from "./Constants/History";

class Login extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
  };
  handleClick = () => {};
  handleChange = ({ currentTarget: input }) => {
    const user = { ...this.state.user };
    user[input.name] = input.value;
    this.setState({ user });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { user } = this.state;
    console.log(user);

    axios
      .post("https://gowtham-rest-api-crud.herokuapp.com/login", user)
      .then((res) => {
        console.log(res);
        localStorage.setItem(TOKEN, res.data.token);
        localStorage.setItem(AUTHORIZION, res.data.status);
        Histroy.push("/index");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <MuiThemeProvider>
            <div>
              <h3>Login</h3>
              <TextField
                hintText="Enter your Email"
                floatingLabelText="E-mail"
                id="email"
                name="email"
                required
                autoFocus="true"
                value={this.state.user.email}
                onChange={this.handleChange}
              />
              <br />
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                id="password"
                name="password"
                required
                autoFocus="true"
                value={this.state.user.password}
                onChange={this.handleChange}
              />
              <br />
              <RaisedButton
                label="Login"
                primary={true}
                onClick={this.handleSubmit}
              />
              <Link to="/sign-up"> Sign-up</Link>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
export default Login;
