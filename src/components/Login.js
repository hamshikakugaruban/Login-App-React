import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../register.css"

import { TOKEN, AUTHORIZION } from "./Constants/constant";
import Histroy from "./Constants/History";

class Login extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
  };
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
        <div className="col">
          <MuiThemeProvider>
            <div>
              <h3>Login</h3>
              <TextField floatingLabelText="E-mail" id="email" name="email" value={this.state.user.email} onChange={this.handleChange}/><br/>
              <TextField type="password" floatingLabelText="Password" id="password" name="password" value={this.state.user.password} onChange={this.handleChange}/><br/>
              <div className = "but">
                <button type="button" class="btn btn-primary" onClick={this.handleSubmit}> Login </button>
                <Link to="/sign-up"> Sign-up</Link>
              </div>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
export default Login;
