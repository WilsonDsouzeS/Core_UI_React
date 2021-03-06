import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
  Table
} from 'reactstrap';

import {Bar, Line} from 'react-chartjs-2';

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

// Card Chart 1
const cardChartData1 = {
  labels: ['Mac-001', 'Mac-002', 'Mac-003', 'Mac-004', 'Mac-005', 'Mac-006', 'Mac-007'],
  datasets: [
    {
      label: 'My Machines',
      backgroundColor: brandDanger,
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

class Dashboard extends Component {
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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
          <Link to="/machines">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <h4 className="mb-0">6</h4>
                <p>Total Machines</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{height:'70px'}}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
              </div>
            </Card>
            </Link>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard;