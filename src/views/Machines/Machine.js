import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row, Table } from 'reactstrap';

class Machines extends Component {
  constructor() {
    super();
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: false,
      accordion: [false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
    };
  }
  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Total Stations
                <div className="card-header-actions">
                </div>
              </CardHeader>
              <CardBody>
                <div id="accordion">
                  <Card>
                    <CardHeader id="headingOne">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                        <h5 className="m-0 p-0">Red-50-4004 | L494</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                        <Row>
                        <Col xs="12" lg="4">
                          <div className="chart-wrapper">
                          <center><Link to="/real_time_trend_chart">
                              <Button outline color="primary" size="lg">CHaVS </Button>
                            </Link></center>
                          </div>
                        </Col>
                        <Col xs="12" lg="4">
                          <div className="chart-wrapper">
                          <center><Link to="/real_time_trend_chart">
                              <Button outline color="primary" size="lg">NGSM Delivery Position </Button>
                            </Link></center>
                          </div>
                        </Col>
                        <Col xs="12" lg="4">
                          <div className="chart-wrapper">
                          <center><Link to="/real_time_trend_chart">
                              <Button outline color="primary" size="lg">Footwell Illumination </Button>
                            </Link></center>
                          </div>
                        </Col>
                        </Row>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader id="headingTwo">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                        <h5 className="m-0 p-0">Red-50-4023 | L405</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                      <CardBody>
                      <Row>
                        <Col xs="12" lg="4">
                          <div className="chart-wrapper">
                          <center><Link to="/real_time_trend_chart">
                              <Button outline color="primary" size="lg">Delivery To FA1 </Button>
                            </Link></center>
                          </div>
                        </Col>
                        <Col xs="12" lg="4">
                          <div className="chart-wrapper">
                          <center><Link to="/real_time_trend_chart">
                              <Button outline color="primary" size="lg">NGSM Delivery Position </Button>
                            </Link></center>
                          </div>
                        </Col>
                        <Col xs="12" lg="4">
                          <div className="chart-wrapper">
                          <center><Link to="/real_time_trend_chart">
                              <Button outline color="primary" size="lg">Map Pocket Heater Mat </Button>
                            </Link></center>
                          </div>
                        </Col>
                        </Row>
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
/* 
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
var mqtt = require('mqtt');
var host = 'ws://192.168.20.144:9093/mqtt';
var client = mqtt.connect(host);
var subscribed_data;
client.on('connect', function () {
  client.subscribe("production_line");
}); */
/*class TableRow extends React.Component {
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
/*return (
    <tr>
      <td ><Link to="/machine_details"><span id={each_data.m_id} onClick={this.handleClick.bind(this, each_data)}>{each_data.m_id}</span></Link></td>
      <td><span id={each_data.operation}>{each_data.operation}</span></td>
      <td ><span id={each_data.status}>{each_data.status}</span></td>
      <td>{each_data.current_unit}</td>
      <td>{each_data.quality_target}</td>
    </tr>
  );
}
}*/
export default Machines;