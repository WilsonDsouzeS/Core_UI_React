import React, { Component } from 'react';

class Over_all_status extends Component {
 
  render() {
    var Overall_Status = localStorage.getItem("overall_status");
    return (
      <div className="animated fadeIn">
          <h1>{Overall_Status}</h1>
      </div>
    );
  }
}
export default Over_all_status;
