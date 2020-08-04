import React, { Component } from 'react';
import{Link} from 'react-router-dom'
import axios from 'axios';
import {Table,Divider} from 'antd';
import {EditFilled,DeleteOutlined} from '@ant-design/icons';
import {TOKEN} from './Constants/constant';
import Add from "./Add"
import Navbar from './Navbar'

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            toDashboard: false,
            isLoading: false,
            url :'https://gowtham-rest-api-crud.herokuapp.com/employees',
            token : localStorage.getItem(TOKEN),
            type:'add',
            editData:{},
            editStatus:false
        };
    }

    componentDidMount() {
        this.getAllEmployee()
    }

    getAllEmployee=()=>{
        const {url,token}=this.state;
        axios.get(url , { params: { token:token}})
        .then(response => {
            console.log(response)
            const employees = response.data.data.employees;
            this.setState({ employees });
        })
        .catch(error => {
            this.setState({ toDashboard: true });
            console.log(error);
        });
    }


   
    editEmploee=(data)=>{
        console.log(data);
        this.setState({
            editData:{
                data:data,
            type:'edit',
            visible:true
            } ,
            editStatus:false
        })
    }
    updateEditMode=()=>{
        this.setState({
            editData:{},

        })
        this.getAllEmployee()
    }
    delete=(id)=>{
        let config = {
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` }
        }
        axios.delete(`https://gowtham-rest-api-crud.herokuapp.com/employees/${id}`,config).then(res=>{
        this.setState({   
        })
        this.getAllEmployee()
        console.log("Successfuly deleted")
        alert("Succesfuly deleted")
            })    
    }
    
    render() {
        const {id}=this.state
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Emp_id',
            dataIndex: 'emp_id',
            key: 'address',
          },
          {
            title: 'Address',
            dataIndex: 'location',
            key: 'address',
          },
          {
            title: 'Action',
            key: 'action',
            render:(record)=>(
              <span><EditFilled onClick={this.editEmploee.bind(this,record)} />
              <Divider type='vertical'/>
              <DeleteOutlined onClick={this.delete.bind(this,record.id)} />
              </span>
            )
          },
        ];
        const {employees,editData}=this.state;
        console.log(editData)


        return (
            <div>
                <Navbar/>
                <div id="wrapper" style={{width:'100%',marginTop:'60px'}}>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="ml-auto"><Add edit={editData} reload={this.getAllEmployee} reSet={this.updateEditMode}/></li>
                            </ol>
                            <div>
                                <div className="navbar-brand"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;Employees List
                                </div>
                                <div className="card-body">
                                  <Table columns={columns} dataSource={employees}/>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        );
    }
}