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

class Machines extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-server"></i> Total Machines
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Machine ID</th>
                    <th>Operation</th>
                    <th>Status</th>
                    <th>Accepted Parts Per Shift</th>
                    <th>Target Parts</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td><Link to="/machine_details">Machine-001</Link></td>
                    <td>Bush Assembly</td>
                    <td>
                      <Badge color="success">Running</Badge>
                    </td>
                    <td>330</td>
                    <td>350</td>
                  </tr>
                  <tr>
                    <td>Machine-002</td>
                    <td>Bearing Assembly</td>
                    <td>
                      <Badge color="success">Running</Badge>
                    </td>
                    <td>300</td>
                    <td>320</td>
                  </tr>
                  <tr>
                    <td>Machine-003</td>
                    <td>Dowel Assembly</td>
                    <td>
                      <Badge color="info">Disturbance Over Change</Badge>
                    </td>
                    <td>250</td>
                    <td>350</td>
                  </tr>
                  <tr>
                    <td>Machine-004</td>
                    <td>Screw Assembly</td>
                    <td>
                      <Badge color="danger">Disturbance Not Coded</Badge>
                    </td>
                    <td>150</td>
                    <td>300</td>
                  </tr>
                  <tr>
                    <td>Machine-005</td>
                    <td>O-Ring Assembly</td>
                    <td>
                      <Badge color="success">Running</Badge>
                    </td>
                    <td>330</td>
                    <td>350</td>
                  </tr>
                  <tr>
                    <td>Machine-006</td>
                    <td>EOLT</td>
                    <td>
                      <Badge color="secondary">Not Running</Badge>
                    </td>
                    <td>0</td>
                    <td>400</td>
                  </tr>
                  <tr>
                    <td>Machine-007</td>
                    <td>Bush Assembly</td>
                    <td>
                      <Badge color="success">Running</Badge>
                    </td>
                    <td>330</td>
                    <td>350</td>
                  </tr>
                  <tr>
                    <td>Machine-008</td>
                    <td>Dowel Assembly</td>
                    <td>
                      <Badge color="info">Disturbance Over Change</Badge>
                    </td>
                    <td>330</td>
                    <td>350</td>
                  </tr>
                  <tr>
                    <td>Machine-009</td>
                    <td>Bush Assembly</td>
                    <td>
                      <Badge color="success">Running</Badge>
                    </td>
                    <td>330</td>
                    <td>350</td>
                  </tr>
                  <tr>
                    <td>Machine-010</td>
                    <td>EOLT</td>
                    <td>
                      <Badge color="danger">Disturbance Not Coded</Badge>
                    </td>
                    <td>200</td>
                    <td>350</td>
                  </tr>
                  </tbody>
                </Table>
                {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                </Pagination> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Machines;