import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactEcharts from 'echarts-for-react';
import { browserHistory } from 'react-router';
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import axios from 'axios';

var legend_data = [];
var series_data = [];
var api_result = false;
var pie_getOption = {};
var bar_getoption = {};
var last_7_days = [];
var pass_data = [];
var fail_data = [];
var api_result1 = false;
var Overall_Status;
var Overall_Status_Date;
var status_val;


function onChartClick(param, echarts) {
  console.log(param);
  if (param.componentSubType == "pie") {
    Overall_Status = param.name;
    localStorage.setItem("Title_Key", param.seriesName);
    localStorage.setItem("Title_Value", param.name);
    if (Overall_Status == "Pass")
      status_val = 1;
    else if (Overall_Status == "Fail")
      status_val = 0;
    axios.get('http://192.168.20.26:5000/resultdetails/' + status_val)
      .then(function (response) {
        console.log(response.data.data);
        localStorage.setItem("Overall_status_API_Responce", JSON.stringify(response.data.data));
      })
      .then(function () {
        window.location = '/#/overall_status';
      });
  }
  else if (param.componentSubType == "bar") {
    var Day_Wise_Status="Day_Wise_Status";
    localStorage.setItem("Title_Key", Day_Wise_Status);
    localStorage.setItem("Title_Value", param.seriesName);
    Overall_Status = param.seriesName;
    Overall_Status_Date = param.name;
    if (Overall_Status_Date)
      var parsing_date = Overall_Status_Date.split('-');
    var parsed_date = parsing_date[2] + parsing_date[1] + parsing_date[0];
    if (Overall_Status == "Pass")
      status_val = 1;
    else if (Overall_Status == "Fail")
      status_val = 0;
    axios.get('http://192.168.20.26:5000/resultdetails/' + status_val + "/" + parsed_date)
      .then(function (response) {
        console.log(response.data.data);
        localStorage.setItem("Overall_status_API_Responce", JSON.stringify(response.data.data));
      })
      .then(function () {
        window.location = '/#/overall_status';
      });
  }
};

function onChartReady(echarts) {
  localStorage.removeItem("Overall_status_API_Responce");
  localStorage.removeItem("Title_Key");
  localStorage.removeItem("Title_Value");
  console.log('echart is ready');
};
var mount_data = true;
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pie: false,
      bar: false
    };
    this.toggle_pie = this.toggle_pie.bind(this);
    this.toggle_bar = this.toggle_bar.bind(this);
    this.onload_overall_chart_data = this.onload_overall_chart_data.bind(this);
    this.onload_weekly_chart_data = this.onload_weekly_chart_data.bind(this);
  }
  toggle_pie() {
    this.setState({
      pie: !this.state.pie,
    });
  }
  toggle_bar() {
    this.setState({
      bar: !this.state.bar,
    });
  }

  componentWillMount() {
    this.onload_overall_chart_data()
    this.onload_weekly_chart_data()
  }
  onload_overall_chart_data() {
    if (mount_data) {
      console.log("Overall status");
      axios.get('http://192.168.20.26:5000/summary')
        .then(function (response) {
          var result = response.data.data;
          for (var i = 0; i < result.length; i++) {
            legend_data[i] = result[i].Result;
            series_data[i] = {};
            series_data[i].value = result[i].Count;
            series_data[i].name = result[i].Result;
            api_result = true;
          }
        })
        .then(function () {
          pie_getOption = {
            title: {
              //text: 'Overall Status',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              //orient: 'vertical',
              //left: 'left',
              y: 'bottom',
              data: legend_data
            },
            series: [
              {
                name: 'Overall_Status',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: series_data,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0
                    //shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          console.log(pie_getOption);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  onload_weekly_chart_data() {
    if (mount_data) {
      axios.get('http://192.168.20.26:5000/datewiseresult')
        .then(function (response) {
          var result = response.data.data;
          console.log(result);
          for (var i = 0; i < result.length; i++) {
            last_7_days[i] = result[i].ResultDate;
            pass_data[i] = result[i].PassCnt;
            fail_data[i] = result[i].FailCnt;
            api_result1 = true;
          }
        })
        .then(function () {
          var itemStyle = {
            normal: {
            },
            emphasis: {
              barBorderWidth: 2,
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(25,60,85,92)'
            }
          };

          bar_getoption = {
            //backgroundColor: '#eee',
            legend: {
              data: ['Fail', 'Pass'],
              y: 'bottom'
            },
            tooltip: {},
            xAxis: {
              data: last_7_days,
              name: 'X Axis',
              silent: false,
              axisLine: { onZero: true },
              splitLine: { show: false },
              splitArea: { show: false }
            },
            yAxis: {
              inverse: false,
              splitArea: { show: false }
            },
            grid: {
              left: 100
            },
            series: [
              {
                name: 'Pass',
                type: 'bar',
                stack: 'two',
                itemStyle: itemStyle,
                data: pass_data
              },
              {
                name: 'Fail',
                type: 'bar',
                stack: 'two',
                itemStyle: itemStyle,
                data: fail_data
              }
            ]
          };
          console.log(bar_getoption);
        })
        .then(function () {
          mount_data = false;
          window.location.href = "#";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/overall_status" />;
    }
    let onEvents = {
      'click': onChartClick
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="4">
            <Card>
              <CardHeader>
                Overall Status
                <div className="card-actions">
                  <a onClick={this.toggle_pie}>
                    <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                {mount_data && (<div className="text-center" style={{ height: 190 }}><div className="text-center" style={{ marginTop: 150 }}><i className="fa fa-spinner fa-lg fa-spin fa-3x"></i></div></div>)}
                {!mount_data && (<ReactEcharts
                  option={pie_getOption}
                  style={{ height: 350 }}
                  onChartReady={onChartReady}
                  onEvents={onEvents} />)}
              </CardBody>
            </Card>
            <Modal isOpen={this.state.pie} toggle={this.toggle_pie}
              className={'modal-lg ' + this.props.className}>
              <ModalHeader toggle={this.toggle_pie}>Overall Status</ModalHeader>
              <ModalBody>
                <ReactEcharts
                  option={pie_getOption}
                  style={{ height: 600 }}
                  onChartReady={onChartReady}
                  onEvents={onEvents} />
              </ModalBody>
            </Modal>
          </Col>
          <Col xs="12" sm="12" lg="8">
            <Card>
              <CardHeader>
                Weekly Status
                <div className="card-actions">
                  <a onClick={this.toggle_bar}>
                    <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                {mount_data && (<div className="text-center" style={{ height: 190 }}><div className="text-center" style={{ marginTop: 150 }}><i className="fa fa-spinner fa-lg fa-spin fa-3x"></i></div></div>)}
                {!mount_data && (<ReactEcharts
                  option={bar_getoption}
                  style={{ height: 350 }}
                  onChartReady={onChartReady}
                  onEvents={onEvents} />)}
              </CardBody>
            </Card>
            <Modal isOpen={this.state.bar} toggle={this.toggle_bar}
              className={'modal-lg ' + this.props.className}>
              <ModalHeader toggle={this.toggle_bar}>Weekly Status</ModalHeader>
              <ModalBody>
                <ReactEcharts
                  option={bar_getoption}
                  style={{ height: 600 }}
                  onChartReady={onChartReady}
                  onEvents={onEvents} />
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
};
