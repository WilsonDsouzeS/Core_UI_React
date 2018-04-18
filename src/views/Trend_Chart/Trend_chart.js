import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button
} from 'reactstrap';

const line1 = {
  labels: ["5:21:04 PM", "5:23:26 PM", "5:24:28 PM", "5:25:36 PM", "5:29:22 PM", "5:32:32 PM", "5:33:42 PM", "5:34:46 PM", "5:35:40 PM"],
  datasets: [
    {
      label: 'Initial Pedal Force (IPF)',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'red',
      borderColor: 'red',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'red',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'red',
      pointHoverBorderColor: 'yellow',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: ["10.857043", "10.481001", "10.751901", "11.147494", "11.630361", "11.180514", "11.302845", "11.927189", "11.418894"]
    }
  ]
};

const line2 = {
  labels: ["5:21:04 PM", "5:23:26 PM", "5:24:28 PM", "5:25:36 PM", "5:29:22 PM", "5:32:32 PM", "5:33:42 PM", "5:34:46 PM", "5:35:40 PM"],
  datasets: [
    {
      label: 'Return Pedal Force (RPF)',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: ["10.060160", "9.845402", "9.351310", "9.957244", "10.555960", "10.294806", "10.108658", "10.569289", "10.607703"]
    }
  ]
};
const line3 = {
  labels: ["5:21:04 PM", "5:23:26 PM", "5:24:28 PM", "5:25:36 PM", "5:29:22 PM", "5:32:32 PM", "5:33:42 PM", "5:34:46 PM", "5:35:40 PM"],
  datasets: [
    {
      label: 'Hysteresis',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'Brown',
      borderColor: 'Brown',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'Brown',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'Brown',
      pointHoverBorderColor: 'Yellow',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data:  ["92.743795", "92.215388", "92.261011", "90.172768", "93.775623", "92.674902", "92.514120", "91.015296", "93.370864"]
    }
  ]
};
const line4 = {
  labels: ["5:21:04 PM", "5:23:26 PM", "5:24:28 PM", "5:25:36 PM", "5:29:22 PM", "5:32:32 PM", "5:33:42 PM", "5:34:46 PM", "5:35:40 PM"],
  datasets: [
    {
      label: 'Kickdown Initiation Force (WOTM)',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'Lightgreen',
      borderColor: 'Lightgreen',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'Lightgreen',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'Lightgreen',
      pointHoverBorderColor: 'Yellow',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: ["38.597729", "38.918159", "40.579848", "40.468514", "39.205140", "39.142284", "39.362714", "40.066956", "39.349364"]
    }
  ]
};
const line5 = {
  labels: ["5:21:04 PM", "5:23:26 PM", "5:24:28 PM", "5:25:36 PM", "5:29:22 PM", "5:32:32 PM", "5:33:42 PM", "5:34:46 PM", "5:35:40 PM"],
  datasets: [
    {
      label: 'CTDB deg',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'Blue',
      borderColor: 'Blue',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'Blue',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'Blue',
      pointHoverBorderColor: 'Yellow',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: ["0.862714", "1.049143", "1.091571", "0.861429", "0.861429", "0.968143", "0.938571", "0.984857", "0.851143"]
    }
  ]
};
const line6 = {
  labels: ["5:21:04 PM", "5:23:26 PM", "5:24:28 PM", "5:25:36 PM", "5:29:22 PM", "5:32:32 PM", "5:33:42 PM", "5:34:46 PM", "5:35:40 PM"],
  datasets: [
    {
      label: 'WOTDB deg',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'Green',
      borderColor: 'Green',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'Green',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'Green',
      pointHoverBorderColor: 'Yellow',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: ["-0.106714", "-0.096429", "-0.126000", "0.095143", "-0.084857", "-0.064286", "-0.077143", "-0.081000", "-0.095143"]
    }
  ]
};
const line7 = {
  labels: ["5:21:04 PM", "5:23:26 PM", "5:24:28 PM", "5:25:36 PM", "5:29:22 PM", "5:32:32 PM", "5:33:42 PM", "5:34:46 PM", "5:35:40 PM"],
  datasets: [
    {
      label: 'APS1CT',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'Violet',
      borderColor: 'Violet',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'Violet',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'Violet',
      pointHoverBorderColor: 'black',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: ["10.125177", "10.125833", "10.095708", "10.213582", "10.127146", "10.126490", "10.068198", "10.213582", "10.154645"]
    }
  ]
};
const line8 = {
  labels: ["5:21:04 PM", "5:23:26 PM", "5:24:28 PM", "5:25:36 PM", "5:29:22 PM", "5:32:32 PM", "5:33:42 PM", "5:34:46 PM", "5:35:40 PM"],
  datasets: [
    {
      label: 'APS2CT',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'Yellow',
      borderColor: 'Yellow',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'Yellow',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'Yellow',
      pointHoverBorderColor: 'Red',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: ["9.943554", "9.914082", "10.061443", "9.972380", "9.942910", "9.914082", "10.032621", "10.000553", "10.002499"]
    }
  ]
};
const line9 = {
  labels: ["5:21:04 PM", "5:23:26 PM", "5:24:28 PM", "5:25:36 PM", "5:29:22 PM", "5:32:32 PM", "5:33:42 PM", "5:34:46 PM", "5:35:40 PM"],
  datasets: [
    {
      label: 'APS1WOT',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'black',
      borderColor: 'black',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'black',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'black',
      pointHoverBorderColor: 'white',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: ["88.798838", "87.937398", "87.477219", "88.410740", "88.058600", "87.568114", "88.355876", "88.513107", "88.289554"],
      data: ["10", "87.937398", "87.477219", "88.410740", "88.058600", "87.568114", "88.355876", "88.513107", "88.289554"]
    }
  ]
};
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
                <h2>Trend Chart - {Machine_Id}</h2>
                <Link to="/overall_status"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                <div className="pull-right">
                  Date :- {date.getDate() + "-" + c_month + "-" + date.getFullYear()} &nbsp; &nbsp;
                  Time :- {date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Line data={line1}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Line data={line2}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Line data={line3}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Line data={line4}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Line data={line5}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Line data={line6}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Line data={line7}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Line data={line8}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Line data={line9}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Trend_Chart;