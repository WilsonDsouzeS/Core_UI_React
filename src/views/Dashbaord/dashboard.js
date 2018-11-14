import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from 'react-router';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle
} from 'reactstrap';

import { Bar, Line } from 'react-chartjs-2';
const brandInfo = '#63c2de';

function onChartReady(echarts) {
  console.log(echarts);
};

// Line Chart for Real time
const cardChartData1 = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      //label: 'My Machines',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ],
};

const cardChartOpts1 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent',
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false,
        min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
        max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
      }
    }],
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}

export default class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="3">
            <Link to="/machines">
              <Card className="text-white bg-info">
                <CardBody className="pb-0">
                  <h4 className="mb-0">Real-Time</h4>
                  <p>Live Monitoring and Diagnostics</p>
                </CardBody>
                <div className="chart-wrapper px-3" style={{ height: '70px' }}>
                  <Line data={cardChartData1} options={cardChartOpts1} height={70} />
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
};
