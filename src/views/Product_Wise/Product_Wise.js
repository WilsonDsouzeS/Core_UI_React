import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TablePagination } from 'react-pagination-table';
import {
  Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Collapse, Button, Fade, Modal, ModalHeader,
  ModalBody, ModalFooter
} from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

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
  var Trend_Comes_From = "product_wise"
  localStorage.setItem("Trend_Comes_From", Trend_Comes_From);
  window.location = '/#/trend_Chart1';
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
    console.log(this.state1);
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
    for (var i = 0; i < Last_7_Days_API_Responce.length; i++) {
      legend_data2[i] = Last_7_Days_API_Responce[i][0];
      series_data2[i] = Last_7_Days_API_Responce[i][1][0];
    }
    var product_list = [];
    var final_data = [];
    for (var p = 0; p < series_data2.length; p++) {
      for (var q = 0; q < series_data2[p].length; q++) {
        product_list = product_list.concat(series_data2[p][q].ProductKey);   //Changing Name to Key
        product_list = product_list.filter(function (e) { return e });  //Excludes Null
        product_list = product_list.filter(function (item, index, inputArray) {
          return inputArray.indexOf(item) == index;
        });
      }
    }

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
              series_data_product_each = series_data_product_each.concat(series_data2[j][k].FailCnt);
            else if (series_data2[j][k].ProductKey == null)
              series_data_product_each = series_data_product_each.concat("0");
            final_data[r] = series_data_product_each;
          }
        }
      }
      if (product_list[r] == Title_Key) {
        var very_final_data = final_data[r];
      }
    }

    console.log(product_list);
    console.log(final_data);
    console.log(Last_7_Days_API_Responce);
    console.log(legend_data2);
    console.log(very_final_data);

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
          data: very_final_data,
          color: color_depends_status
        }
      ]
    };

    let onEvents = {
      'click': onChartClick
    };   
    var columns = [{
      dataField: 'ResultDate',
      text: 'Date'
    }, {
      dataField: 'ResultTime',
      text: 'Time'
    }, {
      dataField: 'ProductName',
      text: 'Product Name'
    }, {
      dataField: 'ProductNo',
      text: 'Product No'
    }, {
      dataField: 'SerialNo',
      text: 'Serial No'
    }, {
      dataField: 'Barcode',
      text: 'Barcode'
    }];
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <Link to="/overall_status"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                <strong>Part ({Title_Key}):  {Title_Value} Result Details</strong>
                <div className="card-actions">
                  <a onClick={this.toggle_overall_bar}>
                    <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <BootstrapTable keyField='ResultTime' data={this.state1} columns={columns} pagination={paginationFactory()} />
              </CardBody>
            </Card>
            <Modal isOpen={this.state.overall_bar} toggle={this.toggle_overall_bar}
              className={'modal-lg ' + this.props.className}>
              <ModalHeader toggle={this.toggle_overall_bar}>
                <strong>Part ({Title_Key}):  {Title_Value} Result Details</strong>
              </ModalHeader>
              <ModalBody>
              <BootstrapTable keyField='ResultTime' data={this.state1} columns={columns} pagination={paginationFactory()} />
              </ModalBody>
            </Modal>
          </Col>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <Link to="/overall_status"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                <strong>Part ({Title_Key}):  {Title_Value} Result Details</strong>
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
                <strong>Part ({Title_Key}):  {Title_Value} Result Details</strong>
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