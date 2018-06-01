import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactEcharts from 'echarts-for-react';
import { browserHistory } from 'react-router';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import axios from 'axios';

var legend_data = [];
var series_data = [];
var api_result = false;
var pie_getOption = {};
var bar_getoption = {};
var twenty_four_chart_Option = {};
var last_7_days = [];
var pass_data = [];
var fail_data = [];
var api_result1 = false;
var Overall_Status;
var Overall_Status_Date;
var status_val;
var data_24_hrs;

function onChartClick(param, echarts) {
  if (param.name == "Fail" || param.seriesName == "Fail") {
    axios.get('http://192.168.20.26:5000/resultdetails/0')
      .then(function (response) {
        console.log(response.data.data);
        localStorage.setItem("Failure_Trend_Data", JSON.stringify(response.data.data));
      });
  }
  if (param.componentSubType == "pie") {
    Overall_Status = param.name;
    localStorage.setItem("Title_Key", param.seriesName);
    localStorage.setItem("Title_Value", param.name);
    if (Overall_Status == "Pass")
      status_val = 1;
    else if (Overall_Status == "Fail")
      status_val = 0;
    axios.get('http://192.168.20.26:5000/productwiseCnt/' + status_val)
      .then(function (response) {
        localStorage.setItem("Overall_Product_API_Responce", JSON.stringify(response.data.data));
      })
      .then(function () {
        axios.get('http://192.168.20.26:5000/datewiseproductresult')
          .then(function (response) {
            console.log(response);
            localStorage.setItem("Last_7_Days_API_Responce", JSON.stringify(response.data.data));
          })
          .then(function () {
            window.location = '/#/overall_status';
          });
      });
  }
  else if (param.componentSubType == "bar") {
    var Day_Wise_Status = "Day_Wise_Status";
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
    axios.get('http://192.168.20.26:5000/productwiseCnt/' + status_val)
      .then(function (response) {
        console.log(response.data.data);
        localStorage.setItem("Overall_Product_API_Responce", JSON.stringify(response.data.data));
      })
      .then(function () {
        axios.get('http://192.168.20.26:5000/datewiseproductresult')
          .then(function (response) {
            console.log(response);
            localStorage.setItem("Last_7_Days_API_Responce", JSON.stringify(response.data.data));
          })
          .then(function () {
            window.location = '/#/overall_status';
          });
      });
  }
};

function onChartReady(echarts) {
  console.log(echarts);
};
var output = true;
var hours_24_hr = [];
hours_24_hr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
var hours_24_pass = [];
hours_24_pass = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
var hours_24_fail = [];
hours_24_fail = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
export default class Historical_Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pie: false,
      bar: false,
      mount_data: true,
      data_24_hrs: false,
      daily_24_hours_trend: false,
    };
    this.toggle_pie = this.toggle_pie.bind(this);
    this.toggle_bar = this.toggle_bar.bind(this);
    this.toggle_24_hours_trend = this.toggle_24_hours_trend.bind(this);
    this.onload_overall_chart_data = this.onload_overall_chart_data.bind(this);
    this.onload_weekly_chart_data = this.onload_weekly_chart_data.bind(this);
    this.onload_24_hrs_chart = this.onload_24_hrs_chart.bind(this);

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
  toggle_24_hours_trend() {
    this.setState({
      daily_24_hours_trend: !this.state.daily_24_hours_trend,
    });
  }

  componentWillMount() {
    this.onload_overall_chart_data()
    this.onload_weekly_chart_data()
    this.onload_24_hrs_chart()
  }

  onload_24_hrs_chart() {
    if (this.state.mount_data) {
      var vm = this;
      axios.get('http://192.168.20.26:5000/currDtResultCount')
        .then(function (response) {
          console.log(response);
          if (response.data.message == 404) {
            vm.setState({
              data_24_hrs: !vm.state.data_24_hrs
            });
            console.log(vm.state.data_24_hrs);
          }
          else {
            var result = response.data.data;
            for (var i = 0; i < result.length; i++) {
              for (var j = 0; j < 24; j++) {
                if (hours_24_hr[j] == result[i].Hour) {
                  hours_24_pass[j] = result[i].PassCnt;
                  hours_24_fail[j] = result[i].FailCnt;
                }
              }
            }
          }
          console.log(hours_24_pass);
          console.log(hours_24_fail);
        })
        .then(function () {
          twenty_four_chart_Option = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Pass_Count', 'Fail_Count']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: hours_24_hr
              //data: ["12AM", "01AM", "02AM", "03AM", "04AM", "05AM", "06AM", "07AM", "08AM", "09AM", "10AM", "11AM", "12PM", "01PM", "02PM", "03PM", "04PM", "05PM", "06PM", "07PM", "08PM", "09PM", "10PM", "11PM", "12PM"]
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                name: 'Pass_Count',
                type: 'line',
                smooth: true,
                color: "Green",
                data: hours_24_pass
                //data: ['7', '8', '8', '6', '7', '9', '5', '6', '11', '7', '8', '6', '5', '7', '8', '5', '6', '7', '5', '7', '11', '5', '7', '11', '15']
              },
              {
                name: 'Fail_Count',
                type: 'line',
                smooth: true,
                color: "Red",
                data: hours_24_fail
                //data: ['0', '0', '0', '1', '2', '0', '4', '0', '2', '2', '3', '0', '1', '0', '0', '1', '2', '0', '3', '0', '0', '4', '0', '3', '0']
              }
            ]
          };
        });
    }
  }
  onload_overall_chart_data() {
    if (this.state.mount_data) {
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
                color: ['red', 'green'],
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
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  onload_weekly_chart_data() {
    if (this.state.mount_data) {
      axios.get('http://192.168.20.26:5000/datewiseresult')
        .then(function (response) {
          var result = response.data.data;
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
                color: ['Green'],
                data: pass_data
              },
              {
                name: 'Fail',
                type: 'bar',
                stack: 'two',
                itemStyle: itemStyle,
                color: ['red'],
                data: fail_data
              }
            ]
          };
        })
        .then(function () {
          output = false;
        })
        .catch(function (error) {
          console.log(error);
        });
      setTimeout(() => {
        if (!output) {
          this.setState({
            mount_data: !this.state.mount_data
          });
        }
      }, 200);
    }
    setTimeout(() => {
      this.componentWillMount();
    }, 5000);
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
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Link to="/dashboard"><i className="fa fa-arrow-circle-left"></i> Back</Link>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" sm="12" lg="4">
                    <Card>
                      <CardHeader>
                        <strong>Test Results: Overall</strong>
                        <div className="card-actions">
                          <a onClick={this.toggle_pie}>
                            <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                          </a>
                        </div>
                      </CardHeader>
                      <CardBody>
                        {this.state.mount_data && (<div className="text-center" style={{ height: 190 }}><div className="text-center" style={{ marginTop: 150 }}><i className="fa fa-spinner fa-lg fa-spin fa-3x"></i></div></div>)}
                        {!this.state.mount_data && (<ReactEcharts
                          option={pie_getOption}
                          style={{ height: 350 }}
                          onChartReady={onChartReady}
                          onEvents={onEvents} />)}
                      </CardBody>
                    </Card>
                    <Modal isOpen={this.state.pie} toggle={this.toggle_pie}
                      className={'modal-lg ' + this.props.className}>
                      <ModalHeader toggle={this.toggle_pie}><strong>Test Results: Overall</strong></ModalHeader>
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
                        <strong>Test Results (Last 7 Days)</strong>
                        <div className="card-actions">
                          <a onClick={this.toggle_bar}>
                            <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                          </a>
                        </div>
                      </CardHeader>
                      <CardBody>
                        {this.state.mount_data && (<div className="text-center" style={{ height: 190 }}><div className="text-center" style={{ marginTop: 150 }}><i className="fa fa-spinner fa-lg fa-spin fa-3x"></i></div></div>)}
                        {!this.state.mount_data && (<ReactEcharts
                          option={bar_getoption}
                          style={{ height: 350 }}
                          onChartReady={onChartReady}
                          onEvents={onEvents} />)}
                      </CardBody>
                    </Card>
                    <Modal isOpen={this.state.bar} toggle={this.toggle_bar}
                      className={'modal-lg ' + this.props.className}>
                      <ModalHeader toggle={this.toggle_bar}><strong>Test Results (Last 7 Days)</strong></ModalHeader>
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
                <br />
                <Row>
                  <Col xs="12" sm="12" lg="12">
                    <Card>
                      <CardHeader>
                        <strong>24 Hours Trend</strong>
                        <div className="card-actions">
                          <a onClick={this.toggle_24_hours_trend}>
                            <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                          </a>
                        </div>
                      </CardHeader>
                      <CardBody>
                      {this.state.data_24_hrs && (<div className="text-center">No Records Found</div>)}
                        {this.state.mount_data && (<div className="text-center" style={{ height: 190 }}><div className="text-center" style={{ marginTop: 150 }}><i className="fa fa-spinner fa-lg fa-spin fa-3x"></i></div></div>)}
                        {!this.state.data_24_hrs && !this.state.mount_data && (<ReactEcharts
                          option={twenty_four_chart_Option}
                          style={{ height: 350 }}
                          onChartReady={onChartReady}
                          onEvents={onEvents} />)}
                      </CardBody>
                    </Card>
                    <Modal isOpen={this.state.daily_24_hours_trend} toggle={this.toggle_24_hours_trend}
                      className={'modal-lg ' + this.props.className}>
                      <ModalHeader toggle={this.toggle_24_hours_trend}><strong>24 Hours Trend</strong></ModalHeader>
                      <ModalBody>
                        <ReactEcharts
                          option={twenty_four_chart_Option}
                          style={{ height: 600 }}
                          onChartReady={onChartReady}
                          onEvents={onEvents} />
                      </ModalBody>
                    </Modal>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};