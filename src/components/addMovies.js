import React, { PureComponent } from "react";
import "../index.css";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
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
  DatePicker,
  TimePicker
} from "antd";
import { registerMovie } from "./UserFunctions";
import moment from "moment";
import Recaptcha from "react-recaptcha";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { RangePicker } = DatePicker;

class Dashboard extends PureComponent {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    movieTitle: "",
    name_director: "",
    date: "",
    duration: "",
    token: "",
    register: true
  };

  selectTime = (time, timeString) => {
    this.setState({ duration: timeString });
  };

  onSubmit = e => {
    e.preventDefault();

    const movie = {
      tittle: this.state.movieTitle,
      director_name: this.state.name_director,
      date: this.state.date,
      time: this.state.duration,
      captchaToken: this.state.token
    };

    registerMovie(movie).then(res => {
      if (res) {
        console.log("res", res);
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  verifyCallback = r => {
    this.setState({ token: r, register: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    const rangeConfig = {
      rules: [{ type: "array", required: true, message: "Please select time!" }]
    };

    return (
      <div>
        <Col span={5} />
        <Col span={14}>
          <Form
            className="formRegisterMovies"
            {...formItemLayout}
            onSubmit={this.onSubmit}
          >
            <h1>Nueva Pelicula</h1>

            <Form.Item label={<span>Titulo</span>}>
              {getFieldDecorator("nickname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  onChange={e => {
                    this.setState({
                      movieTitle: e.target.value
                    });
                  }}
                />
              )}
            </Form.Item>

            <Form.Item label={<span>Director</span>}>
              {getFieldDecorator("director", {
                rules: [
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  onChange={e => {
                    this.setState({
                      name_director: e.target.value
                    });
                  }}
                />
              )}
            </Form.Item>
            <Form.Item label="RangePicker">
              {getFieldDecorator("range-picker", rangeConfig)(
                <RangePicker
                  onChange={(e, b) => {
                    this.setState({
                      date: {
                        firstDate: b[0],
                        secondDate: b[1]
                      }
                    });
                  }}
                />
              )}
            </Form.Item>
            <Form.Item label="Duracion">
              {getFieldDecorator("timer")(
                <TimePicker
                  onChange={this.selectTime}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                  value={this.state.time}
                />
              )}
            </Form.Item>
            <Form.Item label="Captcha">
              <Recaptcha
                sitekey="6Lc1S7MUAAAAAENV-52AdNHRsLJ0jdeuyneE1PzD"
                render="explicit"
                verifyCallback={this.verifyCallback}
              />
              ,
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button
                  disabled={this.state.register}
                  onClick={this.onSubmit}
                  type="primary"
                  htmlType="submit"
                >
                  Register
                </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={5} />
      </div>
    );
  }
}

let WrappedDashboard = Form.create()(Dashboard);

export default WrappedDashboard;
