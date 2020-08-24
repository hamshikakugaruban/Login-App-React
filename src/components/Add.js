import React, { Component } from "react";
import { Label, Input, Button } from "reactstrap";
import "../App.css";
import axios from "axios";
import { TOKEN } from "./Constants/constant";
import "../register.css"

class Add extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    emp_id: "",
    location: "",
    visible: false,
    type: "add",
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.edit.type === "edit")
      this.setState({
        visible: nextProps.edit.visible,
        id: nextProps.edit.data.id,
        name: nextProps.edit.data.name,
        email: nextProps.edit.data.email,
        emp_id: nextProps.edit.data.emp_id,
        location: nextProps.edit.data.location,
        type: nextProps.edit.type,
      });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      type: "add",
      name: "",
      email: "",
      emp_id: "",
      location: "",
    });
    this.props.reSet();
  };

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  
  onSubmit = (e) => {
    const { name, email, emp_id, location, type, id } = this.state;
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    };
    if (type === "add") {
      const data = {
        name: name,
        email: email,
        emp_id: emp_id,
        location: location,
        company: "auxenta",
        phone: "457",
      };
      console.log(data);

      axios
        .post("https://gowtham-rest-api-crud.herokuapp.com/employees",data, config)
        .then((res) => {
          console.log(res);
          this.setState({
            visible: false,
            name: "",
            email: "",
            emp_id: "",
            location: "",
          });
          this.props.reSet();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const data = {
        name: name,
        email: email,
        emp_id: emp_id,
        location: location,
        company: "auxenta",
        phone: "457",
      };
      console.log(data);
      axios
        .put(`https://gowtham-rest-api-crud.herokuapp.com/employees/${id}`, data, config)
        .then((res) => {
          console.log(res);
          this.setState({
            visible: false,
            name: "",
            email: "",
            emp_id: "",
            location: "",
          });
          this.props.reSet();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const { name, email, emp_id, location, type } = this.state;
    return (
      <>
        <div className="auth-wrapper">
        <div className="add">
            <h3>{type === "add" ? "Add-Employee" : ""}</h3>
            <form className="form">
                  <Label>Name</Label>
                  <Input type="text" name="name" id="name" value={name} onChange={this.onChange} placeholder="Enter ur Name"/><br/>
                  <Label>Email</Label>
                  <Input type="email" name="email" id="email" placeholder="Enter ur Email" value={email} onChange={this.onChange}/><br/>
                  <Label>Emp_id</Label>
                  <Input type="number" name="emp_id" id="emp_id" placeholder="Enter ur emp_id" value={emp_id} onChange={this.onChange}/><br/>
                  <Label>Address</Label>
                  <Input type="location" name="location" id="location" placeholder="Enter ur Address" value={location} onChange={this.onChange}/><br/>
                  <br/>
              <Button className = "btn btn-success" onClick={this.onSubmit}>Submit</Button>
               &nbsp;
              <Button className="btn btn-danger" onClick={this.handleCancel}>Cancel</Button>
            </form>
            </div>
            </div>
      </>
    );
  }
}

export default Add;
