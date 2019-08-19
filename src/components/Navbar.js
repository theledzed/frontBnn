import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
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
import jwt_decode from "jwt-decode";

class Navbar extends Component {
  state = {
    userAdmin: null
  };

  componentWillMount() {
    const token = localStorage.usertoken ? localStorage.usertoken : null;
    const decoded = token === null ? {} : jwt_decode(token);

    this.setState({
      userAdmin: decoded.userAdmin
    });
  }
  logOut = e => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
  };

  render() {
    const loginRegLink = (
      <div className="nav-bar">
        <ul>
          <li>
            <Link to="/">
              {" "}
              <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
            </Link>
          </li>
          <li>
            <Link to="/login">
              {" "}
              <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
            </Link>
          </li>
          <li>
            <Link to="/register">
              {" "}
              <Icon type="user-add" style={{ color: "rgba(0,0,0,.25)" }} />
            </Link>
          </li>
        </ul>
      </div>
    );

    const userLink = (
      <div className="nav-bar">
        <ul>
          {this.state.userAdmin === true ? (
            <li>
              <Link to="/profile">
                {" "}
                <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
              </Link>
            </li>
          ) : null}
          <li>
            <Link to="/addmovies">
              {" "}
              <Icon type="plus" style={{ color: "rgba(0,0,0,.25)" }} />
            </Link>
          </li>
          <li>
            <a href="" onClick={this.logOut}>
              {" "}
              <Icon type="import" style={{ color: "rgba(0,0,0,.25)" }} />
            </a>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="main--container">
        <div>{localStorage.usertoken ? userLink : loginRegLink}</div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
