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

class Landing extends Component {
  render() {
    return (
      <div>
        <Col span={2} />
        <Col span={20}>
          <div>
            <hi className="formRegisterMoviesLa">Bienvenido </hi>
            <Col span={10}>
              <Link to="/login">
                {" "}
                <Button className="formRegisterMoviesLa"> Iniciar sesion </Button>
              </Link>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Link to="/register">
                {" "}
                <Button className="formRegisterMoviesLa"> Registrarse</Button>
              </Link>
            </Col>
          </div>
        </Col>
        <Col span={2} />
      </div>
    );
  }
}

export default Landing;
