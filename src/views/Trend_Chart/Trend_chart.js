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
  Button
} from 'reactstrap';
import ReactEcharts from 'echarts-for-react';


class Trend_Chart extends Component {
  render() {
    var trend_details = JSON.parse(localStorage.getItem("Date_Wise_Trend"));
    var Product_Name = localStorage.getItem("Selected_Product_4_Trend");;
    var Selected_Date = localStorage.getItem("Selected_Date_4_Trend");
    var date = new Date();
    var c_month = date.getMonth() + 1;
    var CTDB=[];
    var CTDB_LCL=[];
    var CTDB_UCL=[];
    var FPTB=[];
    var HYS=[];
    var IPF=[];
    var RPF=[];
    var WOTM=[];
    var CTDB_Title="CTDB";
    var FPTB_Title="FPTB";
    var HYS_Title="HYS";
    var IPF_Title="IPF";
    var RPF_Title="RPF";
    var WOTM_Title="WOTM";
    var parameter_time=[];
    
    for(var i=0;i<trend_details.length;i++)
    {
      parameter_time[i]=trend_details[i].ResultTime;
      CTDB[i]=trend_details[i].CTDB_Val;
      CTDB_LCL[i]=trend_details[i].CTDB_Val-3;
      CTDB_UCL[i]=trend_details[i].CTDB_Val+3;
      FPTB[i]=trend_details[i].FPTD_Val;
      HYS[i]=trend_details[i].HYS;
      IPF[i]=trend_details[i].IPF_Val;
      RPF[i]=trend_details[i].RPF_Val;
      WOTM[i]=trend_details[i].WOTM;
    }
    
    const CTDB_Chart=trend_call(parameter_time,CTDB,CTDB_Title);
    const FPTB_Chart=trend_call(parameter_time,FPTB,FPTB_Title);
    const HYS_Chart=trend_call(parameter_time,HYS,HYS_Title);
    const IPF_Chart=trend_call(parameter_time,IPF,IPF_Title);
    const RPF_Chart=trend_call(parameter_time,RPF,RPF_Title);
    const WOTM_Chart=trend_call(parameter_time,WOTM,WOTM_Title);
    
    function trend_call(P_time,P_value,P_Title)
    {
      const parameter_trend = {
        title: {
          text: P_Title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['LCL', 'CL', 'UCL']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: P_time,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'UCL',
            type: 'line',
            data: CTDB_UCL
          },
          {
            name: 'CL',
            type: 'line',
            data: P_value
          },
          {
            name: 'LCL',
            type: 'line',
            data: CTDB_LCL
          }
        ]
      };
      return parameter_trend;
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <h2>Trend Chart - {Product_Name} - {Selected_Date}</h2>
                <Link to="/product_wise"><i className="fa fa-arrow-circle-left"></i> Back</Link>
                <div className="pull-right">
                  Date :- {date.getDate() + "-" + c_month + "-" + date.getFullYear()} &nbsp; &nbsp;
                  Time :- {date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <ReactEcharts
                        option={CTDB_Chart}
                        style={{ height: 350 }}
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <ReactEcharts
                        option={FPTB_Chart}
                        style={{ height: 350 }}
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <ReactEcharts
                        option={HYS_Chart}
                        style={{ height: 350 }}
                      />
                    </div>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <ReactEcharts
                        option={IPF_Chart}
                        style={{ height: 350 }}
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <ReactEcharts
                        option={RPF_Chart}
                        style={{ height: 350 }}
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="4">
                    <div className="chart-wrapper">
                      <ReactEcharts
                        option={WOTM_Chart}
                        style={{ height: 350 }}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Trend_Chart;