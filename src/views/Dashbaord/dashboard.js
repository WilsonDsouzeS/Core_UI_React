import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactEcharts from 'echarts-for-react';
import {browserHistory} from 'react-router';
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

const pie_getOption = {
  title: {
    //text: 'Overall Status',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    //orient: 'vertical',
    //left: 'left',
    y: 'bottom',
    data: ['Pass', 'Fail']
  },
  series: [
    {
      name: 'Overall_Status',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 7, name: 'Pass' },
        { value: 5, name: 'Fail' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0
          //shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

function onChartClick(param, echarts) {
  console.log(param.name);
  localStorage.setItem("overall_status", param.name);
  window.location = '/#/overall_status';
};

function onChartReady(echarts) {
  localStorage.removeItem("overall_status");
  console.log('echart is ready');
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/overall_status" />;
    }
    let onEvents = {
      'click': onChartClick
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="4">
            <Card>
              <CardHeader>
                Overall Status
          <div className="card-actions">
                  <a onClick={this.toggle}>
                    <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                  <ReactEcharts
                    option={pie_getOption}
                    style={{ height: 350 }}
                    onChartReady={onChartReady}
                    onEvents={onEvents} />
              </CardBody>
            </Card>
            <Modal isOpen={this.state.modal} toggle={this.toggle}
              className={'modal-lg ' + this.props.className}>
              <ModalHeader toggle={this.toggle}>Overall Status</ModalHeader>
              <ModalBody>
                 <ReactEcharts
                    option={pie_getOption}
                    style={{ height: 600 }}
                    onChartReady={onChartReady}
                    onEvents={onEvents} />
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
};
