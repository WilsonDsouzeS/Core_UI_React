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
  constructor() {
    super();
    this.state = {
       data: 
       [
          {
             "id":1,
             "name":"Foo",
             "age":"20"
          },
          {
             "id":2,
             "name":"Bar",
             "age":"30"
          },
          {
             "id":3,
             "name":"Baz",
             "age":"40"
          }
       ]
    }
 }
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
              <Table responsive striped>
               <tbody>
                  {this.state.data.map((person, i) => <TableRow key = {i} 
                     data = {person} />)}
               </tbody>
              </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
class TableRow extends React.Component {
  render() {
    var each_data=this.props.data;
    console.log(each_data);   
    if(this.props.data.id==1)
    {
      console.log("1");
    }
     return (
        <tr>
           <td>{this.props.data.id}</td>
           <td>{this.props.data.name}</td>
           <td>{this.props.data.age}</td>
        </tr>
     );
  }
}
export default Machine_Details;