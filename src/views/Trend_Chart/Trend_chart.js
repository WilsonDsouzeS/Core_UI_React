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
    var Trend_Comes_From = localStorage.getItem("Trend_Comes_From");
    var trend_details = JSON.parse(localStorage.getItem("Date_Wise_Trend"));
    var Product_Name = localStorage.getItem("Selected_Product_4_Trend");
    var Selected_Date = localStorage.getItem("Selected_Date_4_Trend");
    var date = new Date();
    var c_month = date.getMonth() + 1;
    var CTDB=[];
    var CTDB_LCL=[];
    var CTDB_UCL=[];

    var FPTD=[];
    var FPTD_LCL=[];
    var FPTD_UCL=[];

    var HYS=[];
    var HYS_LCL=[];
    var HYS_UCL=[];

    var IPF=[];
    var IPF_LCL=[];
    var IPF_UCL=[];

    var RPF=[];
    var RPF_LCL=[];
    var RPF_UCL=[];

    var WOTM=[];
    var WOTM_LCL=[];
    var WOTM_UCL=[];

    var CTDB_Title="CTDB";
    var FPTD_Title="FPTD";
    var HYS_Title="HYS";
    var IPF_Title="IPF";
    var RPF_Title="RPF";
    var WOTM_Title="WOTM";
    var parameter_time=[];

    var wotm_lcl=20;
    var wotm_ucl=40;

    var ipf_lcl=-5;
    var ipf_ucl=30;

    var rpf_lcl=-5;
    var rpf_ucl=30;

    var hys_lcl=75;
    var hys_ucl=100;

    var ctdb_lcl=-2;
    var ctdb_ucl=10;

    var fptd_lcl=10;
    var fptd_ucl=30;

    
    for(var i=0;i<trend_details.length;i++)
    {
      parameter_time[i]=trend_details[i].ResultTime;
      CTDB[i]=trend_details[i].CTDB_Val;
      CTDB_LCL[i]=ctdb_lcl;
      CTDB_UCL[i]=ctdb_ucl;

      FPTD[i]=trend_details[i].FPTD_Val;
      FPTD_LCL[i]=fptd_lcl;
      FPTD_UCL[i]=fptd_ucl;

      HYS[i]=trend_details[i].HYS;
      HYS_LCL[i]=hys_lcl;
      HYS_UCL[i]=hys_ucl;

      IPF[i]=trend_details[i].IPF_Val;
      IPF_LCL[i]=ipf_lcl;
      IPF_UCL[i]=ipf_ucl;

      RPF[i]=trend_details[i].RPF_Val;
      RPF_LCL[i]=rpf_lcl;
      RPF_UCL[i]=rpf_ucl;

      WOTM[i]=trend_details[i].WOTM; 
      WOTM_LCL[i]=wotm_lcl;
      WOTM_UCL[i]=wotm_ucl;

    }
    
    const CTDB_Chart=trend_call(parameter_time,CTDB,CTDB_Title,CTDB_LCL,CTDB_UCL);
    const FPTB_Chart=trend_call(parameter_time,FPTD,FPTD_Title,FPTD_LCL,FPTD_UCL);
    const HYS_Chart=trend_call(parameter_time,HYS,HYS_Title,HYS_LCL,HYS_UCL);
    const IPF_Chart=trend_call(parameter_time,IPF,IPF_Title,IPF_LCL,IPF_UCL);
    const RPF_Chart=trend_call(parameter_time,RPF,RPF_Title,RPF_LCL,RPF_UCL);
    const WOTM_Chart=trend_call(parameter_time,WOTM,WOTM_Title,WOTM_LCL,WOTM_UCL);
    
    function trend_call(P_time,P_value,P_Title,P_LCL,P_UCL)
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
            name: 'LCL',
            type: 'line',
            smooth: true,
            data: P_LCL
          },
          {
            name: 'CL',
            type: 'line',
            smooth: true,
            data: P_value
          },
          {
            name: 'UCL',
            type: 'line',
            smooth: true,
            data: P_UCL
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
                <h2>{Product_Name} - Parameters Trend as on {Selected_Date}</h2>
                {Trend_Comes_From=="overall_status" && (<Link to="/overall_status"><i className="fa fa-arrow-circle-left"></i> Back</Link>)}
                {Trend_Comes_From=="product_wise" && (<Link to="/product_wise"><i className="fa fa-arrow-circle-left"></i> Back</Link>)}
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