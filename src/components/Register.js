import React, { Component } from "react";
import { Link } from "react-router-dom";
import Histroy from "./Constants/History";
import axios from "axios";
import  "../register.css";

class Register extends Component {
  constructor(){
    super();
    this.state = {
      fields : {},
      errors : {}
    }
  } 

  onChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    })
  };

  validate = () =>{
    let fields  = this.state.fields
    let errors = {}
    let isValid = true

    if(!fields["name"]){
      isValid = false
      errors["name"]="please enter your name"
    }
    if(typeof fields["name"] !== "undefined"){
      if(!fields["name"].match(/^[a-zA-Z ]*$/)){
        isValid=false
        errors["name"]="please enter characters"
      }
    }

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
    // if(typeof fields["password"] !== "undefined"){
    //   if(!fields["password"].match(/^.*(?=.{4,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)){
    //     isValid=false
    //     errors["password"]="please enter valid password"

    //   }
    // }

    this.setState({
      errors:errors
    })
  }

  onSubmit = e => {
    const {fields} = this.state
    e.preventDefault();
    if(this.validate()){
      let fields = {};
      fields["name"] = ""
      fields["email"]=""
      fields["password"] = ""
      
      this.setState({
        fields:fields
      })
    }

    axios.post("https://gowtham-rest-api-crud.herokuapp.com/register", fields).then(
      (res) => {
        console.log(res);
        Histroy.push("/");
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(fields);
  };

  render() {
    return (
      <div className="auth-wrapper">
        <div className="col">
            <h3>Sign Up</h3>
            <form method="post">
                <label>UserName</label>
                <input type ="text" floatingLabelText="Username" name="name" value={this.state.fields.name} onChange={this.onChange}/>
                <div className="errorMsg">{this.state.errors.name}</div>
                <lable>Email ID</lable>
                <input type="text" floatingLabelText="Email" name="email" value={this.state.fields.email} onChange={this.onChange}/>
                <div className="errorMsg">{this.state.errors.email}</div>
                <lable>Password</lable>
                <input type="password" floatingLabelText="Password" name="password" value={this.state.fields.password} onChange={this.onChange}/>
                <div className="errorMsg">{this.state.errors.password}</div>
                <div className = "but">
                <input type="submit" class="btn btn-primary" value="Register" onClick={this.onSubmit}/><br/>
                  <Link to="/sign-in"> Sign-in</Link>
                </div>
            </form>
        </div>
      </div>
    );
  }
}

export default Register
