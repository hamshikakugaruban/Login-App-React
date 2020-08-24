import React, { Component } from "react";
import axios from "axios";
import { Table } from "antd";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { TOKEN } from "./Constants/constant";
import Add from "./Add";
import Navbar from "./Navbar";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      url: "https://gowtham-rest-api-crud.herokuapp.com/employees",
      token: localStorage.getItem(TOKEN),
      type: "add",
      editData: {},
      editStatus: false,
    };
  }

  componentDidMount() {
    this.getAllEmployee();
  }

  getAllEmployee = () => {
    const { url, token } = this.state;
    axios
      .get(url, { params: { token: token } })
      .then((response) => {
        console.log(response);
        const employees = response.data.data.employees;
        this.setState({ employees });
      })
      .catch((error) => {
        this.setState({ toDashboard: true });
        console.log(error);
      });
  };

  editEmploee = (data) => {
    console.log(data);
    this.setState({
      editData: {
        data: data,
        type: "edit",
        visible: true,
      },
      editStatus: false,
    });
  };

  updateEditMode = () => {
    this.setState({
      editData: {},
    });
    this.getAllEmployee();
  };

  delete = (id) => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    };
    axios
      .delete(
        `https://gowtham-rest-api-crud.herokuapp.com/employees/${id}`,
        config
      )
      .then((res) => {
        this.setState({});
        this.getAllEmployee();
      });
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Emp_Id",
        dataIndex: "emp_id",
        key: "emp_id",
      },
      {
        title: "Address",
        dataIndex: "location",
        key: "address",
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <span>
            <EditFilled onClick={this.editEmploee.bind(this, record)} /> 
            &nbsp;&nbsp;
            <DeleteOutlined onClick={this.delete.bind(this, record.id)} />
          </span>
        ),
      },
    ];
    const { employees, editData } = this.state;
    console.log(editData);

    return (
      <div>
        <Navbar/>
            <Add edit={editData} reload={this.getAllEmployee} reSet={this.updateEditMode}/>
              <h3>
                  &nbsp;&nbsp;Employees List
                  <Table columns={columns} dataSource={employees} />
              </h3>
      </div>
    );
  }
}
