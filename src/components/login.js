import React, { Component } from "react";
import { login } from "./UserFunctions";
import { throws } from "assert";
import "antd/dist/antd.css";
import "../App.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker
} from "antd";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
      if (res) {
        this.props.history.push("/addmovies");
      }
    });
  };

  render() {
    return (
      <div>
        <Col span={8} />
        <Col span={8}>
          <form className="formRegisterMovies" onSubmit={this.onSubmit}>
            <h1>Iniciar Sesion</h1>
            <div>
              {" "}
              <label>Email</label>
              <Input
                value={this.state.email}
                onChange={e => {
                  this.setState({
                    email: e.target.value
                  });
                }}
              />
            </div>
            <div>
              {" "}
              <label>password</label>
              <Input
                value={this.state.password}
                onChange={e => {
                  this.setState({
                    password: e.target.value
                  });
                }}
              />
            </div>
            <br/>
            <Button onClick={this.onSubmit} type="primary">Sign in</Button>
          </form>
        </Col>
        <Col span={8} />
      </div>
    );
  }
}

export default Login;
