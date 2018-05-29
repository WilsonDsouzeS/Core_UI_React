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
            "m_id": "MUT-11",
            "operation": "EOLT",
            "status": "xxxx",
            "current_unit": "300",
            "quality_target": "350",
            "product":"Pedal",
            "shift": "1",
            "part_no":"403285",
            "order_no":"21751",
            "available_time":"420 Min",
            "good_parts":"280",
            "running_time":"240 Min",
            "rejected_parts":"20",
            "production_capacity":"400"
          },
          {
            "m_id": "MUT-12",
            "operation": "EOLT",
            "status": "xxxx",
            "current_unit": "732",
            "quality_target": "1400",
            "product":"Pedal",
            "shift": "2",
            "part_no":"403285",
            "order_no":"21752",
            "available_time":"1500 Min",
            "good_parts":"702",
            "running_time":"800 Min",
            "rejected_parts":"30",
            "production_capacity":"1500"
          },
          {
            "m_id": "MUT-13",
            "operation": "EOLT",
            "status": "xxxx",
            "current_unit": "50",
            "quality_target": "150",
            "product":"Pedal",
            "shift": "3",
            "part_no":"403285",
            "order_no":"21753",
            "available_time":"300 Min",
            "good_parts":"49",
            "running_time":"100 Min",
            "rejected_parts":"1",
            "production_capacity":"190"
          },
          {
            "m_id": "MUT-14",
            "operation": "EOLT",
            "status": "xxxx",
            "current_unit": "35",
            "quality_target": "350",
            "product":"Pedal",
            "shift": "3",
            "part_no":"403285",
            "order_no":"21754",
            "available_time":"420 Min",
            "good_parts":"35",
            "running_time":"40 Min",
            "rejected_parts":"0",
            "production_capacity":"400"
          },
          {
            "m_id": "MUT-15",
            "operation": "EOLT",
            "status": "xxxx",
            "current_unit": "1000",
            "quality_target": "3500",
            "product":"Pedal",
            "shift": "2",
            "part_no":"403285",
            "order_no":"21755",
            "available_time":"4200 Min",
            "good_parts":"960",
            "running_time":"2400 Min",
            "rejected_parts":"40",
            "production_capacity":"3900"
          },
          {
            "m_id": "MUT-16",
            "operation": "EOLT",
            "status": "xxxx",
            "current_unit": "3000",
            "quality_target": "3500",
            "product":"Pedal",
            "shift": "1",
            "part_no":"403285",
            "order_no":"21756",
            "available_time":"4000 Min",
            "good_parts":"2960",
            "running_time":"2400 Min",
            "rejected_parts":"40",
            "production_capacity":"4000"
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
                    {this.state.data.map((data, i) => <TableRow key={i} data={data} />)}
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
/* var mqtt = require('mqtt');
var host = 'ws://192.168.20.144:9093/mqtt';
var client = mqtt.connect(host);
var subscribed_data;
client.on('connect', function () {
  client.subscribe("production_line");
}); */
class TableRow extends React.Component {
  handleClick(mac_details, e) {
    localStorage.setItem("Machine_Id",mac_details.m_id);
    localStorage.setItem("Status",mac_details.status);
    localStorage.setItem("Current_Unit",mac_details.current_unit);
    localStorage.setItem("Quality_Target",mac_details.quality_target);
    localStorage.setItem("Product",mac_details.product);
    localStorage.setItem("Station",mac_details.operation);
    localStorage.setItem("Shift",mac_details.shift);
    localStorage.setItem("Part_No",mac_details.part_no);
    localStorage.setItem("Order_No",mac_details.order_no);
    localStorage.setItem("Available_Time",mac_details.available_time);
    localStorage.setItem("Running_Time",mac_details.running_time);
    localStorage.setItem("Good_Parts",mac_details.good_parts);
    localStorage.setItem("Rejected_Parts",mac_details.rejected_parts);   
    localStorage.setItem("Production_Capacity",mac_details.production_capacity);  
    //client.unsubscribe("production_line");     
  }
  render() {
    
    var each_data = this.props.data;
    var myStyle;
    /* client.on('message', function (topic, payload, packet) {
      if (topic == "production_line") {
        subscribed_data = JSON.parse(payload.toString());
      }
      var Mac_Id = document.getElementById(each_data.m_id).innerHTML;
      var Operation_Val = document.getElementById(each_data.operation);
      var Status_Val = document.getElementById(each_data.status);      
      if (Mac_Id == subscribed_data.m_id) {
        console.log(subscribed_data);
        Operation_Val.innerHTML = "";
        Operation_Val.innerHTML = subscribed_data.operation;
        Status_Val.innerHTML = "";
        Status_Val.innerHTML = subscribed_data.status;
      }
    }); */
  return (
      <tr>
        <td ><Link to="/machine_details"><span id={each_data.m_id} onClick={this.handleClick.bind(this, each_data)}>{each_data.m_id}</span></Link></td>
        <td><span id={each_data.operation}>{each_data.operation}</span></td>
        <td ><span id={each_data.status}>{each_data.status}</span></td>
        <td>{each_data.current_unit}</td>
        <td>{each_data.quality_target}</td>
      </tr>
    );
  }
}
export default Machines;