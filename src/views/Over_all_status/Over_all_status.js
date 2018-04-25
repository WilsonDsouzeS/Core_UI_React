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
    console.log(param);
    localStorage.setItem("Product_Status", param.seriesName);
    localStorage.setItem("Product_Name", param.name);
    if (param.seriesName == "Fail" || param.seriesName == "Pass") {
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
              return el.ProductName == param.name
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
              return el.ProductName == param.seriesName
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
    var color_depends_status1;
    var color_depends_status2;
    if (Title_Value == "Pass") {
      color_depends_status = ['Green'];
      color_depends_status1 = ['Cyan'];
      color_depends_status2 = ['Blue'];
    }
    else {
      color_depends_status = ['Red'];
      color_depends_status1 = ['#DE5234'];
      color_depends_status2 = ['#C70039'];
    }

    //Heat Map
    var Overall_Product_API_Responce = JSON.parse(localStorage.getItem("Overall_Product_API_Responce"));


    //Overall_Product_Wise

    var Overall_Product_API_Responce = JSON.parse(localStorage.getItem("Overall_Product_API_Responce"));
    var legend_data1 = [];
    var series_data1 = [];
    for (var i = 0; i < Overall_Product_API_Responce.length; i++) {
      legend_data1[i] = Overall_Product_API_Responce[i].ProductName;
      series_data1[i] = {};
      series_data1[i].value = Overall_Product_API_Responce[i].Count;
      series_data1[i].name = Overall_Product_API_Responce[i].ProductName;
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
        name: 'X Axis',
        silent: false,
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {
        data: legend_data1,
        inverse: false,
        splitArea: { show: false }
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
    var series_data_product1 = [];
    var series_data_product2 = [];
    for (var i = 0; i < Last_7_Days_API_Responce.length; i++) {
      legend_data2[i] = Last_7_Days_API_Responce[i][0];
      series_data2[i] = Last_7_Days_API_Responce[i][1][0];
    }
    for (var j = 0; j < series_data2.length; j++) {
      if (Title_Value == "Pass") {
        for (var k = 0; k < series_data2[j].length; k++) {
          if (series_data2[j][k].ProductName == "Product1")
            series_data_product1 = series_data_product1.concat(series_data2[j][k].PassCnt);
          if (series_data2[j][k].ProductName == "Product2")
            series_data_product2 = series_data_product2.concat(series_data2[j][k].PassCnt);
          if (series_data2[j][k].ProductName == null) {
            series_data_product1 = series_data_product1.concat("0");
            series_data_product2 = series_data_product2.concat("0");
          }
        }
      }
      else if (Title_Value == "Fail") {
        for (var k = 0; k < series_data2[j].length; k++) {
          if (series_data2[j][k].ProductName == "Product1")
            series_data_product1 = series_data_product1.concat(series_data2[j][k].FailCnt);
          if (series_data2[j][k].ProductName == "Product2")
            series_data_product2 = series_data_product2.concat(series_data2[j][k].FailCnt);
          if (series_data2[j][k].ProductName == null) {
            series_data_product1 = series_data_product1.concat("0");
            series_data_product2 = series_data_product2.concat("0");
          }
        }
      }
    }
    console.log(legend_data2);
    console.log(series_data_product1);
    console.log(series_data_product2);
    const last_7_days_product_wise = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Product1', 'Product2']
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
      series: [
        {
          name: 'Product1',
          type: 'bar',
          data: series_data_product1,
          color: color_depends_status1,
          markPoint: {
            data: [
              { type: 'max' },
              { type: 'min' }
            ]
          }
        },
        {
          name: 'Product2',
          type: 'bar',
          data: series_data_product2,
          color: color_depends_status2,
          markPoint: {
            data: [
              { type: 'max' },
              { type: 'min' }
            ]
          }
        }
      ]
    };

    var Heat_Map_Option;
    if (Product_Name != null) {
      // Heat Map for failure secnario
      var heat_map_data = JSON.parse(localStorage.getItem("Heat_Map_Data"));
      var new_array = heat_map_data.filter(
        function (el) {
          return el.ProductName == Product_Name
        });
      var product_date = [];
      var product_data = [];
      var product_data1 = []
      for (j = 0; j < 6; j++) {
        for (var i = 0; i < new_array.length; i++) {
          product_date[i] = new_array[i].ResultDate;
          if (j == 0) {
            var val = new_array[i].IPF_Result;
            var result_data;
            if (val == "Pass")
              result_data = 2
            else if (val == "Fail")
              result_data = 1
          }
          else if (j == 1) {
            var val = new_array[i].RPF_Result;
            var result_data;
            if (val == "Pass")
              result_data = 2
            else if (val == "Fail")
              result_data = 1
          }
          else if (j == 2) {
            var val = new_array[i].CTDB_Result;
            var result_data;
            if (val == "Pass")
              result_data = 2
            else if (val == "Fail")
              result_data = 1
          }
          else if (j == 3) {
            var val = new_array[i].FPTD_Result;
            var result_data;
            if (val == "Pass")
              result_data = 2
            else if (val == "Fail")
              result_data = 1
          }
          else if (j == 4) {
            var val = new_array[i].WOTM_Result;
            var result_data;
            if (val == "Pass")
              result_data = 2
            else if (val == "Fail")
              result_data = 1
          }
          else if (j == 5) {
            var val = new_array[i].HYS_Result;
            var result_data;
            if (val == "Pass")
              result_data = 2
            else if (val == "Fail")
              result_data = 1
          }
          product_data[i] = [j, i, result_data];
          product_data1 = product_data1.concat([product_data[i]]);
        }
      }
      var parameters = ['IPF', 'RPF', 'CTDB', 'FPTD', 'WOTM', 'HYS'];
      console.log(product_data1);
      product_data1 = product_data1.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
      });

      Heat_Map_Option = {
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '50%',
          y: '10%'
        },
        xAxis: {
          type: 'category',
          data: product_date,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: parameters,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 1,
          max: 2,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          color: ['green', 'red']
        },
        series: [{
          name: Product_Name,
          type: 'heatmap',
          data: product_data1,
          color: ['pink', 'purple'],
          label: {
            normal: {
              show: false
            }
          }
        }]
      };
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
                <strong>Product Wise - {Title_Value}</strong>
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
                <strong>Product Wise - {Title_Value}</strong>
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
                <strong>Last 7 Days Product Wise - {Title_Value}</strong>
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
                <strong>Product Wise - {Title_Value}</strong>
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
                  <strong>{Product_Name} - {Title_Value}</strong>
                  <div className="card-actions">
                    <a onClick={this.toggle_heatmap_fail}>
                      <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                    </a>
                  </div>
                </CardHeader>
                <CardBody>
                  <ReactEcharts
                    option={Heat_Map_Option}
                    style={{ height: 350 }}
                    onChartReady={onChartReady}
                    onEvents={onEvents} />
                </CardBody>
              </Card>
              <Modal isOpen={this.state.heatmap_fail} toggle={this.toggle_heatmap_fail}
                className={'modal-lg ' + this.props.className}>
                <ModalHeader toggle={this.toggle_heatmap_fail}>
                  <strong>Product Wise - {Title_Value}</strong>
                </ModalHeader>
                <ModalBody>
                  <ReactEcharts
                    option={Heat_Map_Option}
                    style={{ height: 600 }}
                    onChartReady={onChartReady}
                    onEvents={onEvents} />
                </ModalBody>
              </Modal>
            </Col>)}
        </Row>
      </div>
    );
  }
}