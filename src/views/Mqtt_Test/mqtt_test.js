import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {  Input } from 'reactstrap';

class Mqtt_Test extends Component {
  render() {
    var mqtt = require('mqtt');
    
    var host = 'ws://192.168.20.144:9093/mqtt';
    var client = mqtt.connect(host);
    
    client.on('connect', function() {
        client.subscribe("production_line/#");
    });
    var subscribed_data;
    client.on('message', function(topic, payload, packet) {
      if(topic=="production_line")
      {
      subscribed_data= payload.toString();  
      console.log(subscribed_data);  
      var recieved_data = document.getElementById("sub_data");
      if(recieved_data!=null)
      recieved_data.value = subscribed_data;
      else
      client.unsubscribe("production_line/#");
      }
      if(topic=="production_line/001")
      {
      subscribed_data= payload.toString();   
      console.log(subscribed_data);  
      var recieved_data = document.getElementById("sub_data1");
      if(recieved_data!=null)
      recieved_data.value = subscribed_data;
      }
    });
    return (
      <div className="animated fadeIn">
          <h4>MQTT Testing...</h4>
          <Input type="text" id="sub_data"/>
          <Input type="text" id="sub_data1"/>
      </div>
    )
    client.unsubscribe("production_line/#");
  }
}

export default Mqtt_Test;