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
  constructor() {
    super();
    this.state = {
       data: 
       [
          {
             "m_id":"Machine-001",
             "operation":"Bush Assembly",
             "status":"Running",
             "accepted_target":"300",
             "quality_target":"350"
          },
          {
            "m_id":"Machine-002",
            "operation":"Bearing Assembly",
            "status":"Running",
            "accepted_target":"300",
            "quality_target":"350"
          },
          {
            "m_id":"Machine-003",
            "operation":"Dowel Assembly",
            "status":"Disturbance Over Change",
            "accepted_target":"300",
            "quality_target":"350"
          },
          {
            "m_id":"Machine-004",
            "operation":"Screw Assembly",
            "status":"Disturbance Not Coded",
            "accepted_target":"300",
            "quality_target":"350"
          },
          {
            "m_id":"Machine-005",
            "operation":"O-Ring Assembly",
            "status":"Running",
            "accepted_target":"300",
            "quality_target":"350"
          },
          {
            "m_id":"Machine-006",
            "operation":"EOLT",
            "status":"Not Running",
            "accepted_target":"300",
            "quality_target":"350"
          }
       ]
    }
 }
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
                  {this.state.data.map((data, i) => <TableRow key = {i} data = {data} />)}
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
var mqtt = require('mqtt');
var host = 'ws://192.168.20.144:9093/mqtt';
var client = mqtt.connect(host);

client.on('connect', function() {
    client.subscribe("production_line");
});
var subscribed_data; 
class TableRow extends React.Component {
  render() {
    var each_data=this.props.data;  
    var myStyle;    
    client.on('message', function(topic, payload, packet) {
      if(topic=="production_line")
      {
      subscribed_data= JSON.parse(payload.toString());  
      }
      var Mac_Id = document.getElementById(each_data.m_id).innerHTML;
      var Status_Val = document.getElementById(each_data.operation);
      if(Mac_Id==subscribed_data.m_id)
      {
        console.log(subscribed_data);
        Status_Val.innerHTML="";
        Status_Val.innerHTML=subscribed_data.operation;
        myStyle="secondary";
      }
    }); 
    if(this.props.data.status=="Running")
    {
      myStyle="success";
    }
    else if(this.props.data.status=="Disturbance Over Change")
    {
      myStyle="info";
    }
    else if(this.props.data.status=="Disturbance Not Coded")
    {
      myStyle="danger";
    }
    else if(this.props.data.status=="Not Running")
    {
      myStyle="secondary";
    }
     return (     
        <tr>
          <td ><Link to="/machine_details"><span id={each_data.m_id}>{each_data.m_id}</span></Link></td>
          <td><span id={each_data.operation}>{each_data.operation}</span></td>
          <td ><Badge color={myStyle}>{each_data.status}</Badge></td>
          <td>{each_data.accepted_target}</td>
          <td>{each_data.quality_target}</td>
        </tr>
     );
  }
}
export default Machines;