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
  Collapse, Button, Fade
} from 'reactstrap';

export default class Over_all_status extends Component {
  constructor() {
    super();
    this.state = JSON.parse(localStorage.getItem("Overall_status_API_Responce"));
  }

  render() {
    var Title_Key = localStorage.getItem("Title_Key");
    var Title_Value = localStorage.getItem("Title_Value");
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>{Title_Key} - {Title_Value}</strong>
                <div className="card-actions">
                  <Link to="/trend_Chart">
                    <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                  </Link>
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
                    {this.state.map((data, i) => <TableRow key={i} data={data} />)}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
class TableRow extends React.Component {
  render() {
    var Overall_status_API_Responce = this.props;
    console.log(Overall_status_API_Responce);
    return (
      <tr>
        <td >{Overall_status_API_Responce.data.ResultDate}</td>
        <td >{Overall_status_API_Responce.data.ResultTime}</td>
        <td >{Overall_status_API_Responce.data.ProductName}</td>
        <td >{Overall_status_API_Responce.data.ProductNo}</td>
        <td >{Overall_status_API_Responce.data.SerialNo}</td>
        <td >{Overall_status_API_Responce.data.Barcode}</td>
      </tr >
    );
  }
}