import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import '../App.css';
import axios from "axios";
import {TOKEN} from './Constants/constant';
import {Modal} from 'antd';


class Add extends Component {
    state={
        id:'',
        name:'',
        email:'',
        emp_id:'',
        location:'',
        visible:false,
        type:'add',
        editData:{},
    }
    componentDidMount(){
      console.log(this.props.edit)
    }

    componentWillReceiveProps(nextProps){
      console.log(nextProps)
      if(nextProps.edit.type === 'edit')
      this.setState({
            visible:nextProps.edit.visible,
            id:nextProps.edit.data.id,
            name:nextProps.edit.data.name,
            email:nextProps.edit.data.email,
            emp_id:nextProps.edit.data.emp_id,
            location:nextProps.edit.data.location,
            type:nextProps.edit.type
      })
    }
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };

      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      type:'add',
      name:'',
      email:'',
      emp_id:'',
      location:'',
    });
    this.props.reSet();
  };


        onChange=(e)=>{
          const name=e.target.name;
          const value= e.target.value;
          this.setState({
              [name]:value
          })
        }
    onSubmit=(e)=>{
      const {name,email,emp_id,location,type,id}=this.state;
      let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` }
      }
      if(type === 'add'){
        const data={
          name:name,
          email:email,
          emp_id:emp_id,
          location:location,
          company:"auxenta",
          phone:"457"
      }
console.log(data)

  axios
    .post('https://gowtham-rest-api-crud.herokuapp.com/employees', data,config)
    .then(res => {
      console.log(res);
      this.setState({
        visible:false,
        name:'',
        email:'',
        emp_id:'',
        location:'',
      })
      this.props.reSet();
    })
    .catch(error => {
      console.log(error);
    });
        }else{
          const data={
            name:name,
            email:email,
            emp_id:emp_id,
            location:location,
            company:"auxenta",
            phone:"457"
        }
console.log(data)

  axios
    .put(`https://gowtham-rest-api-crud.herokuapp.com/employees/${id}`, data,config)
    .then(res => {
      console.log(res);
     this.setState({
       visible:false,
       name:'',
       email:'',
       emp_id:'',
       location:'',
     })
     this.props.reSet();
    })
    .catch(error => {
      console.log(error);
      // alert("There is an error in API call....");
    });
        }
        
    }

  

  render() {
    const {name,email,emp_id,location,type}=this.state;
    return (
       <>
      <Button type="primary" onClick={this.showModal}>
         Add Employee
        </Button>
        <Modal
          title={false}
          visible={this.state.visible}
          footer={false}
          handleCancel={this.handleCancel}
        >
           <Container className="App">
    <h2>{type === 'add'? 'Add Employee':"Edit Employee"}</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.onChange}
                placeholder="Enter ur Name"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label >emp_id</Label>
              <Input
                type="number"
                name="emp_id"
                id="emp_id"
                placeholder="Enter ur emp_id"
                value={emp_id}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label >Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter ur Email"
                value={email}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label >Location</Label>
              <Input
                type="location"
                name="location"
                id="location"
                placeholder="Enter ur Location"
                value={location}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Button onClick={this.onSubmit}>Submit</Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick={this.handleCancel}>Cancel</Button>
        </Form>
      </Container>
        </Modal>
     </>
    );
  }
}

export default Add;