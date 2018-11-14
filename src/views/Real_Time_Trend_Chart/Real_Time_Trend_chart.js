import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Progress
} from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
   
   
const option1 = {
  tooltip : {
      formatter: "{a} <br/>{b} : {c}%"
  },
  series: [
      {
          name: 'test',
          type: 'gauge',
          min: 40,
          max: 79,
          detail: {formatter:'{value}%'},
          data: [{value: 60, name: ''}]
      }
  ]
}
  option1.series[0].data[0].value = 60;

   
  const option2 = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    series: [
        {
            name: '1',
            type: 'gauge',
            min: 0,
            max: 100,
            detail: {formatter:'{value}%'},
            data: [{value: 20, name: ''}]
        }
    ]
  }
    option2.series[0].data[0].value = 20;


       
const option3 = {
  tooltip : {
      formatter: "{a} <br/>{b} : {c}%"
  },
  series: [
      {
          name: '2',
          type: 'gauge',
          min: 25,
          max: 45,
          detail: {formatter:'{value}%'},
          data: [{value: 40, name: ''}]
      }
  ]
}
  option3.series[0].data[0].value = 40;


     
const option4 = {
  tooltip : {
      formatter: "{a} <br/>{b} : {c}%"
  },
  series: [
      {
          name: '3',
          type: 'gauge',
          min: 40,
          max: 79,
          detail: {formatter:'{value}%'},
          data: [{value: 60, name: ''}]
      }
  ]
}
  option4.series[0].data[0].value = 60;


     
const option5 = {
  tooltip : {
      formatter: "{a} <br/>{b} : {c}%"
  },
  
  series: [
      {
          name: '4',
          type: 'gauge',
          min: 0,
          max: 100,
          detail: {formatter:'{value}%'},
          data: [{value: 20, name: ''}]
      }
  ]
}
  option5.series[0].data[0].value = 20;


     
const option6 = {
  tooltip : {
      formatter: "{a} <br/>{b} : {c}%"
  },
  
  series: [
      {
          name: '5',
          type: 'gauge',
          min: 25,
          max: 45,
          detail: {formatter:'{value}%'},
          data: [{value: 40, name: ''}]
      }
  ]
}
  option6.series[0].data[0].value = 40;



class Trend_Chart extends Component {
  render() {
    var Machine_Id = localStorage.getItem("Machine_Id");
    var date = new Date();
    var c_month = date.getMonth() + 1;
    return (
      <div className="animated fadeIn">

        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <h2>Detailed View - CHaVS</h2>
                <Link to="/machines"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                <div className="pull-right">
                  Date :- {date.getDate() + "-" + c_month + "-" + date.getFullYear()} &nbsp; &nbsp;
                  Time :- {date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                    <ReactEcharts
                                option={option1}
                                style={{ height: 280, width: 500 }}
                              />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                    <ReactEcharts
                                option={option2}
                                style={{ height: 280, width: 500 }}
                              />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                    <ReactEcharts
                                option={option3}
                                style={{ height: 280, width: 500 }}
                              />
                    </div>
                  </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                    <ReactEcharts
                                option={option4}
                                style={{ height: 280, width: 500 }}
                              />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                    <ReactEcharts
                                option={option5}
                                style={{ height: 280, width: 500 }}
                              />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                    <ReactEcharts
                                option={option6}
                                style={{ height: 280, width: 500 }}
                              />
                    </div>
                  </Col>
                </Row>
                <br/>
                <br/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Trend_Chart;