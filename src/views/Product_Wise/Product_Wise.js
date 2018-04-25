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

function onChartReady(echarts) {
  console.log('echart is ready');
};
function onChartClick(param, echarts) {
  console.log(param);
  localStorage.setItem("Selected_Date_4_Trend", param.name);
  localStorage.setItem("Selected_Product_4_Trend", param.seriesName);
  var present_data = JSON.parse(localStorage.getItem("Product_wise_overall"));
  console.log(present_data);
  var new_array = present_data.filter(
    function (el) {
      return el.ResultDate == param.name;
    });
  console.log(new_array);
  localStorage.setItem("Date_Wise_Trend", JSON.stringify(new_array));
  window.location = '/#/trend_Chart';
};
export default class Product_Wise extends Component {
  constructor(props) {
    super(props);
    this.state1 = JSON.parse(localStorage.getItem("Product_wise_overall"));
    this.state = {
      overall_bar: false,
      last_7_bar: false
    };
    this.toggle_overall_bar = this.toggle_overall_bar.bind(this);
    this.toggle_last_7_bar = this.toggle_last_7_bar.bind(this);
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

  render() {
    var Title_Key = localStorage.getItem("Product_Name");
    var Title_Value = localStorage.getItem("Product_Status");
    var color_depends_status;
    if (Title_Value == "Pass")
      color_depends_status = ['Green'];
    else
      color_depends_status = ['Red'];
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
          if (series_data2[j][k].ProductName == Title_Key)
            series_data_product1 = series_data_product1.concat(series_data2[j][k].PassCnt);
          if (series_data2[j][k].ProductName == null)
            series_data_product1 = series_data_product1.concat("0");
        }
      }
      else if (Title_Value == "Fail") {
        for (var k = 0; k < series_data2[j].length; k++) {
          if (series_data2[j][k].ProductName == Title_Key)
            series_data_product1 = series_data_product1.concat(series_data2[j][k].FailCnt);
          if (series_data2[j][k].ProductName == null)
            series_data_product1 = series_data_product1.concat("0");
        }
      }
    }
    console.log(legend_data2);
    console.log(series_data_product1);

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
    const bar_product_day_wise = {
      //backgroundColor: '#eee',
      legend: {
        data: legend_data2,
        y: 'bottom'
      },
      tooltip: {},
      xAxis: {
        data: legend_data2,
        axisPointer: {
          type: 'shadow'
        },
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
          name: Title_Key,
          type: 'bar',
          data: series_data_product1,
          color: color_depends_status,
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [
              [{ type: 'min' }, { type: 'max' }]
            ]
          }
        }
      ]
    };

    let onEvents = {
      'click': onChartClick
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <Link to="/overall_status"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                <strong>{Title_Key} - {Title_Value}</strong>
                <div className="card-actions">
                  <a onClick={this.toggle_overall_bar}>
                    <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Product Name</th>
                      <th>Product No</th>
                      <th>Serial No</th>
                      <th>Barcode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state1.map((data, i) => <TableRow key={i} data={data} />)}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <Modal isOpen={this.state.overall_bar} toggle={this.toggle_overall_bar}
              className={'modal-lg ' + this.props.className}>
              <ModalHeader toggle={this.toggle_overall_bar}>
                <strong>{Title_Key} - {Title_Value}</strong>
              </ModalHeader>
              <ModalBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Product Name</th>
                      <th>Product No</th>
                      <th>Serial No</th>
                      <th>Barcode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state1.map((data, i) => <TableRow key={i} data={data} />)}
                  </tbody>
                </Table>
              </ModalBody>
            </Modal>
          </Col>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <Link to="/overall_status"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                <strong>{Title_Key} - {Title_Value}</strong>
                <div className="card-actions">
                  <a onClick={this.toggle_last_7_bar}>
                    <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <ReactEcharts
                  option={bar_product_day_wise}
                  style={{ height: 350 }}
                  onChartReady={onChartReady}
                  onEvents={onEvents} />
              </CardBody>
            </Card>
            <Modal isOpen={this.state.last_7_bar} toggle={this.toggle_last_7_bar}
              className={'modal-lg ' + this.props.className}>
              <ModalHeader toggle={this.toggle_last_7_bar}>
                <strong>{Title_Key} - {Title_Value}</strong>
              </ModalHeader>
              <ModalBody>
                <ReactEcharts
                  option={bar_product_day_wise}
                  style={{ height: 350 }}
                  onChartReady={onChartReady}
                  onEvents={onEvents} />
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}
class TableRow extends React.Component {
  render() {
    var Product_wise_all_data = this.props;
    return (
      <tr>
        <td >{Product_wise_all_data.data.ResultDate}</td>
        <td >{Product_wise_all_data.data.ResultTime}</td>
        <td >{Product_wise_all_data.data.ProductName}</td>
        <td >{Product_wise_all_data.data.ProductNo}</td>
        <td >{Product_wise_all_data.data.SerialNo}</td>
        <td >{Product_wise_all_data.data.Barcode}</td>
      </tr >
    );
  }
}