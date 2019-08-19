import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import "../App.css";
import "antd/dist/antd.css";
import { Input, Row, Col, Button, Card } from "antd";
import { moviesRegistered, deleteMovie } from "./UserFunctions";
import { Link, withRouter } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      moviesRegistered: null
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    moviesRegistered().then(res => {
      if (res) {
        const response = res;
        this.setState({
          moviesRegistered: response
        });
      }
    });

    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    });
  }

  render() {
    const gridStyle = {
      width: "25%",
      textAlign: "center"
    };
    return (
      <div>
        <div>
          <Col span={2} />
          <Col span={22}> </Col>
        </div>
        <div>
          <Col span={2} />
          <Col span={21}>
            <Card title="Lista de peliculas">
              {this.state.moviesRegistered
                ? this.state.moviesRegistered.map((item, index) => {
                    return (
                      <Card.Grid style={gridStyle}>
                        {" "}
                        <p>Nombre de la pelicula: {item.tittle}</p>
                        <p>Director: {item.director_name}</p>
                        <p>Inicio de exhibicion {item.date.firstDate}</p>
                        <p>Fin de exhibicion {item.date.secondDate}</p>
                        <p>Duracion: {item.time}</p>
                        <p>ID: {item._id}</p>
                        <Button
                          onClick={() => {
                            deleteMovie(item._id).then(res => {
                              if (res) {
                                moviesRegistered().then(res => {
                                  if (res) {
                                    const response = res;
                                    this.setState({
                                      moviesRegistered: response
                                    });
                                  }
                                });
                              }
                            });
                          }}
                        >
                          Borrar
                        </Button>
                        <Link to="/edit/movie">
                          <Button
                            onClick={() => {
                              localStorage.setItem("idMovie", item._id);
                            }}
                          >
                            Editar
                          </Button>
                        </Link>
                      </Card.Grid>
                    );
                  })
                : null}
            </Card>
          </Col>
          <Col span={1} />
        </div>
      </div>
    );
  }
}

export default Profile;
