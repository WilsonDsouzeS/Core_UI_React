import React, { Component } from 'react';
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
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

class Machine_Details extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <Col xs="12" lg="12">
          <h1>Real-Time Production Data</h1>
          <h2>Machine-001</h2>
            <Card>
              <CardHeader>
                <Link to="/machines"><i className="fa fa-arrow-circle-left"></i> Back</Link>
              </CardHeader>
              <CardBody>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Machine_Details;