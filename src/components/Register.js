import React, { Component } from "react";
import {  Link } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Histroy from './Constants/History';
import axios from 'axios'

export default class Register extends Component {
    state={
        name:'',
        email:'',
        password:''
    }

    onChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        this.setState({
            [name]:value
        })
    }

    onSubmit=()=>{
        const {name,email,password}=this.state;
        const data={
            name: name,
            email: email,
            password: password,
    }
console.log('ggggggggg')
let url='https://gowtham-rest-api-crud.herokuapp.com/register';
axios.post(url, data)
.then(res => {
   console.log(res)
   Histroy.push('/')
   window.location.reload()
},error=>{
console.log(error)
})
console.log(data)
}
    

  render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <MuiThemeProvider>
            <h3>Sign Up</h3>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              id="name"
              name="name"
              required
              autoFocus="true"
              value={this.state.name}
              onChange={this.onChange}
            />
            <br />
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              id="Email"
              name="email"
              required
              autoFocus="true"
              value={this.state.email}
              onChange={this.onChange}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              id="password"
              name="password"
              required
              autoFocus="true"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <RaisedButton label="Register" primary={true} onClick={this.onSubmit}  />
            <Link to="/sign-in">    Sign-in</Link> 
          
        </MuiThemeProvider>
        </div>
        </div>
        );
        
    }
    
    
}
