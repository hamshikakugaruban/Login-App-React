import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../register.css"
import { TOKEN, AUTHORIZION } from "./Constants/constant";
import Histroy from "./Constants/History";

class Login extends Component {
  constructor(){
    super()
    this.state = {
      fields:{},
      errors:{}
    }
  }
  handleChange = (e) => {
    let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });
  };

  validate =() => {
    let fields  = this.state.fields
    let errors = {}
    let isValid = true

    if(!fields["email"]){
      isValid = false
      errors["email"]="please enter your email id"
    }
    if(typeof fields["email"] !== "undefined"){
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if(!pattern.test(fields["email"])){
        isValid=false
        errors["email"]="please enter valid email"
      }
    }

    if(!fields["password"]){
      isValid=false
      errors["password"]="please enter your password"
    }
    this.setState({
      errors:errors
    })
  }


  handleSubmit = (event) => {
    const {fields} = this.state
    event.preventDefault();
    if(this.validate()){
      let fields = {};
      fields["email"] = ""
      fields["password"] = ""
      this.setState({
        fields:fields
      })
    }
    axios
      .post("https://gowtham-rest-api-crud.herokuapp.com/login", fields)
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
          <h3>Login</h3>
          <form method="post">
              <lable>Email ID</lable>
              <input type="text" floatingLabelText="Email" name="email" value={this.state.fields.email} onChange={this.handleChange}/>
              <div className="errorMsg">{this.state.errors.email}</div>
              <lable>Password</lable>
              <input type="password" floatingLabelText="Password" name="password" value={this.state.fields.password} onChange={this.handleChange}/>
              <div className="errorMsg">{this.state.errors.password}</div>
              <div className = "but">
              <input type="submit" class="btn btn-primary" value="Login" onClick={this.handleSubmit}/><br/>
                <Link to="/sign-up"> Sign-up</Link>
              </div>
          </form>
      </div>
    </div>
    );
  }
}
export default Login;