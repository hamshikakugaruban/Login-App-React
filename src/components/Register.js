import React, { Component } from "react";
import { Link } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import Histroy from "./Constants/History";
import axios from "axios";
import  "../register.css";

export default class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = () => {
    const { name, email, password } = this.state;
    const data = {
      name: name,
      email: email,
      password: password,
    };
    let url = "https://gowtham-rest-api-crud.herokuapp.com/register";
    axios.post(url, data).then(
      (res) => {
        console.log(res);
        Histroy.push("/");
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(data);
  };

  render() {
    return (
      <div className="auth-wrapper">
        <div className="col">
          <MuiThemeProvider>
            <h3>Sign Up</h3>
                <TextField floatingLabelText="Username" id="name" name="name" value={this.state.name} onChange={this.onChange}/><br/>
                <TextField floatingLabelText="Email" id="Email" name="email" value={this.state.email} onChange={this.onChange}/><br/>
                <TextField type="password" floatingLabelText="Password" id="password" name="password" value={this.state.password} onChange={this.onChange}/><br/>
            <div className = "but">
                <button type="button" class="btn btn-primary" onClick={this.onSubmit}> Register </button>
                <Link to="/sign-in"> Sign-in</Link>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
