import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
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
  Progress,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button
} from 'reactstrap';


const availability = {
  labels: [
    'Availability'
  ],
  datasets: [{
    data: [60, 40],
    backgroundColor: [
      '#FF6384'
    ],
    hoverBackgroundColor: [
      '#FF6384'
    ]
  }]
};

const quality = {
  labels: [
    'Quality'
  ],
  datasets: [{
    data: [95, 5],
    backgroundColor: [
      '#4BC0C0'
    ],
    hoverBackgroundColor: [
      '#4BC0C0'
    ]
  }]
};

const performance = {
  labels: [
    'Performance'
  ],
  datasets: [{
    data: [60, 40],
    backgroundColor: [
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FFCE56'
    ]
  }]
};

const oee = {
  labels: [
    'OEE'
  ],
  datasets: [{
    data: [77, 23],
    backgroundColor: [
      '#36A2EB'
    ],
    hoverBackgroundColor: [
      '#36A2EB'
    ]
  }]
};
class Machine_Details extends Component {
  /* nav_to_dashboard() {
      console.log("navigate to dashboard");
  } */
  render() {
    var Machine_Id = localStorage.getItem("Machine_Id");
    var Status = localStorage.getItem("Status");
    var Current_Unit = localStorage.getItem("Current_Unit");
    var Target_Unit = localStorage.getItem("Quality_Target");
    var Product = localStorage.getItem("Product");
    var Station = localStorage.getItem("Station");
    var Shift = localStorage.getItem("Shift");
    var Part_No = localStorage.getItem("Part_No");
    var Order_No = localStorage.getItem("Order_No");
    var Progress_Percent = Math.floor((Current_Unit / Target_Unit) * 100);
    var date = new Date();
    var c_month = date.getMonth() + 1;
    var Available_Time = localStorage.getItem("Available_Time");
    var Running_Time = localStorage.getItem("Running_Time");
    var Good_Parts = localStorage.getItem("Good_Parts");
    var Rejected_Parts = localStorage.getItem("Rejected_Parts");
    var Production_Capacity = localStorage.getItem("Production_Capacity");    
    var Is_Machine_Id = false;
    /* if(Machine_Id==null)
    {Is_Machine_Id=true;}
      console.log(Is_Machine_Id); */ // navigate to dashboard
    return (
      <div className="animated fadeIn">

        <Row>
          <Col xs="12" lg="12">
            <h1>Real-Time Production Data</h1>
            <Card>
              <CardHeader>
                <h3>{Machine_Id}</h3>
                <Link to="/machines"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                <div className="pull-right">
                  Date :- {date.getDate() + "-" + c_month + "-" + date.getFullYear()} &nbsp; &nbsp;
                  Time :- {date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}
                </div>

              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" lg="4">
                    <div className="text-center">{Current_Unit} / {Target_Unit} Units</div>
                    <Progress multi>
                      <Progress bar animated color="success" value={Progress_Percent}>{Progress_Percent}%</Progress>
                    </Progress>
                    <div className="text-center">&nbsp;</div>
                    <Table responsive striped>
                      <tbody>
                        <tr>
                          <th>Product</th>
                          <th>Station</th>
                          <th>Shift</th>
                          <th>Part#</th>
                          <th>Order#</th>
                        </tr>
                        <tr>
                          <td>{Product}</td>
                          <td>{Station}</td>
                          <td>{Shift}</td>
                          <td>{Part_No}</td>
                          <td>{Order_No}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Doughnut data={availability} />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Doughnut data={quality} />
                    </div>
                  </Col>
                  </Row>
                  <Row>
                  <Col xs="12" lg="2">
                  <CardBody>
                      <Button outline color="primary" size="lg">Machine Status<br />
                        <br /><i className="fa fa-microchip fa-lg fa-4x"></i><br /><br />{Status}</Button>
                    </CardBody>
                  </Col>
                  <Col xs="12" lg="2">
                    <CardBody>
                      <Button outline color="primary" size="lg">Production Capacity<br />{Production_Capacity} Units/Shift </Button>
                    </CardBody>
                    <CardBody>
                      <Button outline color="primary" size="lg">&nbsp;Actual Production &nbsp;<br />{Target_Unit} Units/Shift </Button>
                    </CardBody>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Doughnut data={performance} />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <Doughnut data={oee} />
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs="12" sm="3" className="text-center">
                    <CardBody>
                      <Button outline color="primary" size="lg">Available Time<br />{Available_Time}</Button>
                    </CardBody>
                    <CardBody>
                      <Button outline color="primary" size="lg">Running Time <br /> {Running_Time}</Button>
                    </CardBody>
                  </Col>
                  <Col xs="12" sm="3" className="text-center">
                    <CardBody>
                      <Button outline color="primary" size="lg">Goal <br /> {Target_Unit} Units Shift</Button>
                    </CardBody>
                    <CardBody>
                      <Button outline color="primary" size="lg">Produced Unit <br /> {Current_Unit} Units</Button>
                    </CardBody>
                  </Col>
                  <Col xs="12" sm="3" className="text-center">
                    <CardBody>
                      <Button outline color="primary" size="lg">Good Parts <br /> {Good_Parts} Units Shift</Button>
                    </CardBody>
                    <CardBody>
                      <Button outline color="primary" size="lg">Rejected Parts <br /> {Rejected_Parts}</Button>
                    </CardBody>
                  </Col>
                  <Col xs="12" sm="3" className="text-center">
                    <CardBody>
                      <Link to="/trend_chart">
                        <Button outline color="primary" size="lg">Trend Chart <br /> <i className="fa fa-line-chart fa-lg fa-2x"></i></Button>
                      </Link>
                    </CardBody>
                    <CardBody>
                      <Link to="/dashboard">
                        <Button outline color="primary" size="lg">Dashbaord  <br /> <i className="fa fa-home fa-lg fa-2x"></i></Button>
                      </Link>
                    </CardBody>
                  </Col>
                </Row>
                <hr />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Machine_Details;