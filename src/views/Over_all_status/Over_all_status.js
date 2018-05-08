import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Collapsible from 'react-collapsible';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Collapse, Button, Fade, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
var status;

function onChartReady(echarts) {
  console.log('echart is ready');
};

var last_7_days_product_wise = {};
export default class Over_all_status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overall_bar: false,
      last_7_bar: false,
      heatmap_fail: false,
      fail_param: true
    };
    this.toggle_overall_bar = this.toggle_overall_bar.bind(this);
    this.toggle_last_7_bar = this.toggle_last_7_bar.bind(this);
    this.toggle_heatmap_fail = this.toggle_heatmap_fail.bind(this);
    this.onChartClick = this.onChartClick.bind(this);
  }
  toggle_overall_bar() {
    this.setState({
      overall_bar: !this.state.overall_bar,
    });
  }

  toggle_last_7_bar() {
    this.setState({
      last_7_bar: !this.state.last_7_bar,
    });
  }

  toggle_heatmap_fail() {
    this.setState({
      heatmap_fail: !this.state.heatmap_fail,
    });
  }

  onChartClick(param, echarts) {
    localStorage.setItem("Product_Status", param.seriesName);
    localStorage.setItem("Product_Name", param.name);
    if (param.seriesName == "Fail" || param.seriesName == "Pass") {
      console.log(param);
      if (param.seriesName == "Pass")
        status = 1;
      else if (param.seriesName == "Fail") {
        status = 0;
        this.setState({
          fail_param: !this.state.fail_param,
        });
      }
      axios.get('http://192.168.20.26:5000/resultdetails/' + status)
        .then(function (response) {
          console.log(response.data.data);
          var fulldata = response.data.data;
          var new_array = fulldata.filter(
            function (el) {
              return el.ProductNo == param.name
            });
          console.log(new_array);
          localStorage.setItem("Product_wise_overall", JSON.stringify(new_array));
        })
        .then(function () {
          if (param.seriesName == "Fail")
            window.location = '/#/overall_status';
          else
            window.location = '/#/product_wise';
        });
    }
    else {
      console.log(param);
      var Title_Value = localStorage.getItem("Title_Value");
      if (Title_Value == "Pass")
        status = 1;
      else if (Title_Value == "Fail") {
        status = 0;
        return false;
      }
      localStorage.setItem("Selected_Date_4_Trend", param.name);
      localStorage.setItem("Selected_Product_4_Trend", param.seriesName);
      axios.get('http://192.168.20.26:5000/resultdetails/' + status)
        .then(function (response) {
          console.log(response.data.data);
          var fulldata = response.data.data;
          var new_array = fulldata.filter(
            function (el) {
              return el.ProductNo == param.seriesName && el.ResultDate == param.name
            });
          console.log(new_array);
          localStorage.setItem("Date_Wise_Trend", JSON.stringify(new_array));
        })
        .then(function () {
          window.location = '/#/trend_Chart';
        });
    }
  }


  render() {
    //Pass or Fail
    var Product_Name = localStorage.getItem("Product_Name");
    var Title_Value = localStorage.getItem("Title_Value");
    var color_depends_status;
    var color_pass = ['#61FC63', '#029A05', '#41DC96', '#2DF5A9', '#82F52D', '#71B340'];
    var color_fail = ['#DE5234', '#C70039', '#FA6C2F', '#FA4E2F', '#FC260D', '#F81F67'];
    var color_based_status = [];
    if (Title_Value == "Pass")
      color_depends_status = ['Green'];
    else
      color_depends_status = ['Red'];


    //Heat Map
    var Overall_Product_API_Responce = JSON.parse(localStorage.getItem("Overall_Product_API_Responce"));


    //Overall_Product_Wise

    var Overall_Product_API_Responce = JSON.parse(localStorage.getItem("Overall_Product_API_Responce"));
    var legend_data1 = [];
    var series_data1 = [];
    for (var i = 0; i < Overall_Product_API_Responce.length; i++) {
      legend_data1[i] = Overall_Product_API_Responce[i].ProductID;
      series_data1[i] = {};
      series_data1[i].value = Overall_Product_API_Responce[i].Count;
      series_data1[i].name = Overall_Product_API_Responce[i].ProductID;
    }


    var itemStyle = {
      normal: {
      },
      emphasis: {
        barBorderWidth: 5,
        shadowBlur: 20,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(25,60,85,92)'
      }
    };

    const bar_product_wise = {
      //backgroundColor: '#eee',
      legend: {
        data: legend_data1,
        y: 'bottom'
      },
      tooltip: {},
      xAxis: {
        silent: false,
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {
        data: legend_data1,
        inverse: false,
        splitArea: { show: false },
      },
      grid: {
        left: 100
      },
      series: [
        {
          name: Title_Value,
          type: 'bar',
          itemStyle: itemStyle,
          color: color_depends_status,
          data: series_data1
        }
      ]
    };

    //Last 7 Days

    var Last_7_Days_API_Responce = JSON.parse(localStorage.getItem("Last_7_Days_API_Responce"));
    var legend_data2 = [];
    var series_data2 = [];
    var product_list = [];
    var series_data = [];
    var series_data_list = [];
    var final_data = [];
    for (var i = 0; i < Last_7_Days_API_Responce.length; i++) {
      legend_data2[i] = Last_7_Days_API_Responce[i][0];
      series_data2[i] = Last_7_Days_API_Responce[i][1][0];
    }
    for (var p = 0; p < series_data2.length; p++) {
      for (var q = 0; q < series_data2[p].length; q++) {
        product_list = product_list.concat(series_data2[p][q].ProductKey);   //Changing Name to Key
        product_list = product_list.filter(function (e) { return e });  //Excludes Null
        product_list = product_list.filter(function (item, index, inputArray) {
          return inputArray.indexOf(item) == index;
        });
      }
    }
    console.log(product_list);

    for (var r = 0; r < product_list.length; r++) {
      var series_data_product_each = [0, 0, 0, 0, 0, 0, 0];
      for (var j = 0; j < series_data2.length; j++) {
        if (Title_Value == "Pass") {
          for (var k = 0; k < series_data2[j].length; k++) {
            if (series_data2[j][k].ProductKey == product_list[r])
              series_data_product_each[j] = series_data2[j][k].PassCnt;
            //series_data_product_each = series_data_product_each.concat(series_data2[j][k].PassCnt);
            else if (series_data2[j][k].ProductKey == null)
              series_data_product_each[j] = 0;
            final_data[r] = series_data_product_each;
          }
        }
        else if (Title_Value == "Fail") {
          for (var k = 0; k < series_data2[j].length; k++) {
            if (series_data2[j][k].ProductKey == product_list[r])
              series_data_product_each[j] = series_data2[j][k].FailCnt;
            //series_data_product_each = series_data_product_each.concat(series_data2[j][k].FailCnt);
            else if (series_data2[j][k].ProductKey == null)
              series_data_product_each[j] = 0;
            final_data[r] = series_data_product_each;
          }
        }
      }
    }
    console.log(final_data);
    for (var l = 0; l < product_list.length; l++) {
      if (Title_Value == "Pass")
        color_based_status[l] = color_pass[l];
      else
        color_based_status[l] = color_fail[l];
      series_data[l] = {};
      series_data[l].name = product_list[l];
      series_data[l].type = "bar";
      series_data[l].data = final_data[l];
      series_data[l].color = color_based_status[l];
      /*  series_data[l].markPoint = {
         data: [
           { type: 'max' },
           { type: 'min' }
         ]
       } */
      series_data_list = series_data_list.concat(series_data[l]);
    }
    console.log(series_data2);
    console.log(series_data_list);
    const last_7_days_product_wise = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: product_list
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: legend_data2
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: series_data_list
    };

    var Failure_Trend_Data = JSON.parse(localStorage.getItem("Failure_Trend_Data"));

    // Trend for failure secnario
    console.log(Product_Name);
    console.log(Failure_Trend_Data);
    if (Product_Name != null && Failure_Trend_Data != null) {
      var new_array = Failure_Trend_Data.filter(
        function (el) {
          return el.ProductNo == Product_Name
        });
        console.log(new_array);
      var CTDB = [];
      var CTDB_LCL = [];
      var CTDB_UCL = [];

      var FPTD = [];
      var FPTD_LCL = [];
      var FPTD_UCL = [];

      var HYS = [];
      var HYS_LCL = [];
      var HYS_UCL = [];

      var IPF = [];
      var IPF_LCL = [];
      var IPF_UCL = [];

      var RPF = [];
      var RPF_LCL = [];
      var RPF_UCL = [];

      var WOTM = [];
      var WOTM_LCL = [];
      var WOTM_UCL = [];

      var CTDB_Title = "CTDB";
      var FPTD_Title = "FPTD";
      var HYS_Title = "HYS";
      var IPF_Title = "IPF";
      var RPF_Title = "RPF";
      var WOTM_Title = "WOTM";
      var parameter_time = [];
      var CTDB_Chart;
      var FPTB_Chart;
      var HYS_Chart;
      var IPF_Chart;
      var RPF_Chart;
      var WOTM_Chart;

      var wotm_lcl = 20;
      var wotm_ucl = 40;

      var ipf_lcl = 20;
      var ipf_ucl = 30;

      var rpf_lcl = -5;
      var rpf_ucl = 30;

      var hys_lcl = 75;
      var hys_ucl = 100;

      var ctdb_lcl = -2;
      var ctdb_ucl = 10;

      var fptd_lcl = 10;
      var fptd_ucl = 30;

      for (var i = 0; i < new_array.length; i++) {
        parameter_time[i] = new_array[i].ResultDate;
        CTDB[i] = new_array[i].CTDB_Val;
        CTDB_LCL[i] = ctdb_lcl;
        CTDB_UCL[i] = ctdb_ucl;

        FPTD[i] = new_array[i].FPTD_Val;
        FPTD_LCL[i] = fptd_lcl;
        FPTD_UCL[i] = fptd_ucl;

        HYS[i] = new_array[i].HYS;
        HYS_LCL[i] = hys_lcl;
        HYS_UCL[i] = hys_ucl;

        IPF[i] = new_array[i].IPF_Val;
        IPF_LCL[i] = ipf_lcl;
        IPF_UCL[i] = ipf_ucl;

        RPF[i] = new_array[i].RPF_Val;
        RPF_LCL[i] = rpf_lcl;
        RPF_UCL[i] = rpf_ucl;

        WOTM[i] = new_array[i].WOTM;
        WOTM_LCL[i] = wotm_lcl;
        WOTM_UCL[i] = wotm_ucl;
      }

      CTDB_Chart = trend_call(parameter_time, CTDB, CTDB_Title, CTDB_LCL, CTDB_UCL);
      FPTB_Chart = trend_call(parameter_time, FPTD, FPTD_Title, FPTD_LCL, FPTD_UCL);
      HYS_Chart = trend_call(parameter_time, HYS, HYS_Title, HYS_LCL, HYS_UCL);
      IPF_Chart = trend_call(parameter_time, IPF, IPF_Title, IPF_LCL, IPF_UCL);
      RPF_Chart = trend_call(parameter_time, RPF, RPF_Title, RPF_LCL, RPF_UCL);
      WOTM_Chart = trend_call(parameter_time, WOTM, WOTM_Title, WOTM_LCL, WOTM_UCL);
    }

    function trend_call(P_time, P_value, P_Title, P_LCL, P_UCL) {
      const parameter_trend = {
        title: {
          text: P_Title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['LCL', 'CL', 'UCL']
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
          data: P_time,
        },
        yAxis: {
          type: 'value',
          min: -10,
          max: 100
        },
        series: [
          {
            name: 'LCL',
            type: 'line',
            smooth: true,
            data: P_LCL
          },
          {
            name: 'CL',
            type: 'line',
            smooth: true,
            data: P_value
          },
          {
            name: 'UCL',
            type: 'line',
            smooth: true,
            data: P_UCL
          }
        ]
      };
      return parameter_trend;
    }
    let onEvents = {
      'click': this.onChartClick
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="4">
            <Card>
              <CardHeader>
                <Link to="/dashboard"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                <strong>{Title_Value} Results: Part Wise</strong>
                <div className="card-actions">
                  <a onClick={this.toggle_overall_bar}>
                    <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <ReactEcharts
                  option={bar_product_wise}
                  style={{ height: 350 }}
                  onChartReady={onChartReady}
                  onEvents={onEvents} />
              </CardBody>
            </Card>
            <Modal isOpen={this.state.overall_bar} toggle={this.toggle_overall_bar}
              className={'modal-lg ' + this.props.className}>
              <ModalHeader toggle={this.toggle_overall_bar}>
                <strong>{Title_Value} Results: Part Wise</strong>
              </ModalHeader>
              <ModalBody>
                <ReactEcharts
                  option={bar_product_wise}
                  style={{ height: 600 }}
                  onChartReady={onChartReady}
                  onEvents={onEvents} />
              </ModalBody>
            </Modal>
          </Col>
          <Col xs="12" lg="8">
            <Card>
              <CardHeader>
                <Link to="/dashboard"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                <strong>{Title_Value} Results: Part Wise (Last 7 Days)</strong>
                <div className="card-actions">
                  <a onClick={this.toggle_last_7_bar}>
                    <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <ReactEcharts
                  option={last_7_days_product_wise}
                  style={{ height: 350 }}
                  onChartReady={onChartReady}
                  onEvents={onEvents} />
              </CardBody>
            </Card>
            <Modal isOpen={this.state.last_7_bar} toggle={this.toggle_last_7_bar}
              className={'modal-lg ' + this.props.className}>
              <ModalHeader toggle={this.toggle_last_7_bar}>
                <strong>{Title_Value} Results: Part Wise (Last 7 Days)</strong>
              </ModalHeader>
              <ModalBody>
                <ReactEcharts
                  option={last_7_days_product_wise}
                  style={{ height: 600 }}
                  onChartReady={onChartReady}
                  onEvents={onEvents} />
              </ModalBody>
            </Modal>
          </Col>
        </Row>
        <Row>
          {!this.state.fail_param && (
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <strong>{Product_Name}</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="12" lg="4">
                      <div className="chart-wrapper">
                        <ReactEcharts
                          option={CTDB_Chart}
                          style={{ height: 350 }}
                        />
                      </div>
                    </Col>
                    <Col xs="12" lg="4">
                      <div className="chart-wrapper">
                        <ReactEcharts
                          option={FPTB_Chart}
                          style={{ height: 350 }}
                        />
                      </div>
                    </Col>
                    <Col xs="12" lg="4">
                      <div className="chart-wrapper">
                        <ReactEcharts
                          option={HYS_Chart}
                          style={{ height: 350 }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs="12" lg="4">
                      <div className="chart-wrapper">
                        <ReactEcharts
                          option={IPF_Chart}
                          style={{ height: 350 }}
                        />
                      </div>
                    </Col>
                    <Col xs="12" lg="4">
                      <div className="chart-wrapper">
                        <ReactEcharts
                          option={RPF_Chart}
                          style={{ height: 350 }}
                        />
                      </div>
                    </Col>
                    <Col xs="12" lg="4">
                      <div className="chart-wrapper">
                        <ReactEcharts
                          option={WOTM_Chart}
                          style={{ height: 350 }}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>)}
        </Row>
      </div>
    );
  }
}