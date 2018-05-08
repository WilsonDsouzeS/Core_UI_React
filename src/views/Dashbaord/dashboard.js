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
  localStorage.removeItem("Overall_Product_API_Responce");
  localStorage.removeItem("Last_7_Days_API_Responce");
  localStorage.removeItem("Title_Key");
  localStorage.removeItem("Title_Value");
  localStorage.removeItem("Product_Status");
  localStorage.removeItem("Product_Name");
  localStorage.removeItem("Product_wise_overall");
  localStorage.removeItem("Selected_Date_4_Trend");
  localStorage.removeItem("Selected_Product_4_Trend");
  localStorage.removeItem("Date_Wise_Trend");
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

// Bar chart for Historical Data
const cardChartData2 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      //label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98]
    }
  ],
  legend: {
    display: false
  }
};

const cardChartOpts2 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false,
      barPercentage: 0.6,
    }],
    yAxes: [{
      display: false,
    }]
  }
}

export default class Dashboard extends Component {
  render() {
    localStorage.removeItem("Machine_Id");
    localStorage.removeItem("Status");    
    localStorage.removeItem("Current_Unit");
    localStorage.removeItem("Quality_Target"); 
    localStorage.removeItem("Product");
    localStorage.removeItem("Station");
    localStorage.removeItem("Shift"); 
    localStorage.removeItem("Part_No");
    localStorage.removeItem("Order_No");
    localStorage.removeItem("Available_Time");
    localStorage.removeItem("Running_Time"); 
    localStorage.removeItem("Good_Parts");
    localStorage.removeItem("Rejected_Parts");
    localStorage.removeItem("Production_Capacity"); 
    localStorage.removeItem("Overall_Product_API_Responce");
    localStorage.removeItem("Last_7_Days_API_Responce");
    localStorage.removeItem("Title_Key");
    localStorage.removeItem("Title_Value");
    localStorage.removeItem("Product_Status");
    localStorage.removeItem("Product_Name");
    localStorage.removeItem("Product_wise_overall");
    localStorage.removeItem("Selected_Date_4_Trend");
    localStorage.removeItem("Selected_Product_4_Trend");
    localStorage.removeItem("Date_Wise_Trend");
    localStorage.removeItem("Failure_Trend_Data");
    localStorage.removeItem("Trend_Comes_From");
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
          <Col xs="12" sm="12" lg="3">
            <Link to="/historical_main">
              <Card className="text-white bg-warning">
                <CardBody className="pb-0">
                  <h4 className="mb-0">Historical</h4>
                  <p>Analysis and Reporting</p>
                </CardBody>
                <div className="chart-wrapper px-3" style={{ height: '70px' }}>
                  <Bar data={cardChartData2} options={cardChartOpts2} height={70} />
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
};
