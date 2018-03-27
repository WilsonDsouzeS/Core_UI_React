import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Input, Row, Col, Button } from 'reactstrap';
const mqtt = require('mqtt');
const host = 'ws://192.168.20.144:9093/mqtt';
const client = mqtt.connect(host);
class Mqtt_Test extends Component {
  pub_fun() {
    var pub_topic = document.getElementById("pub_topic").value;
    var pub_msg = document.getElementById("pub_message").value;
    client.publish(pub_topic, pub_msg);
  }
  render() {
    client.on('connect', function () {
      console.log("Client Connected..!");
      client.subscribe("production_line/#");
      console.log("Subscribed Success..!");
    });
    var subscribed_data;
    client.on('message', function (topic, payload, packet) {
      if (topic == "production_line") {
        subscribed_data = payload.toString();
        console.log(subscribed_data);
        var recieved_data = document.getElementById("sub_data");
        var recieved_data_all = document.getElementById("sub_all_data");
        if (recieved_data != null) {
          recieved_data.value = subscribed_data;
          recieved_data_all.value = subscribed_data;
        }
        else
          client.unsubscribe("production_line/#");
      }
      if (topic == "production_line/001") {
        subscribed_data = payload.toString();
        console.log(subscribed_data);
        var recieved_data = document.getElementById("sub_data1");
        var recieved_data_all = document.getElementById("sub_all_data");        
        if (recieved_data != null) {
        recieved_data.value = subscribed_data;
        recieved_data_all.value = subscribed_data;
        }

      }
    });
    return (
      <div className="animated fadeIn">
       <h4> Subscribed Topic & Messages</h4>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <Input type="text" value="Topic : production_line" disabled />
            <Input type="textarea" id="sub_data" />
          </Col>
          <Col xs="12" sm="6" lg="4">
            <Input type="text" value=" Topic : production_line/001" disabled />
            <Input type="textarea" id="sub_data1" />
          </Col>
          <Col xs="12" sm="6" lg="4">
            <Input type="text" value="Topic : production_line/#" disabled />
            <Input type="textarea" id="sub_all_data" />
          </Col>
        </Row>
        <br/>
        <h4>  Publish Topic & Messages</h4>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <Input type="text" id="pub_topic" placeholder="Type Topic.." />
            <Input type="textarea" id="pub_message" placeholder="Type message.." /><br />
            <center><Button color="primary" onClick={this.pub_fun}><i className="fa fa-check"></i>{'\u00A0'}Publish</Button></center>
          </Col>
        </Row>
      </div>
    )
    client.unsubscribe("production_line/#");
  }
}

export default Mqtt_Test;