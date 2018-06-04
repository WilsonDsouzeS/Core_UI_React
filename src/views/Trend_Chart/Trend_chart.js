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
  Button, TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import classnames from 'classnames';
import ReactEcharts from 'echarts-for-react';

class Trend_Chart extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    var Trend_Comes_From = localStorage.getItem("Trend_Comes_From");
    var trend_details = JSON.parse(localStorage.getItem("Date_Wise_Trend"));
    var Product_Name = localStorage.getItem("Selected_Product_4_Trend");
    var Selected_Date = localStorage.getItem("Selected_Date_4_Trend");
    var date = new Date();
    var c_month = date.getMonth() + 1;

    //Mechanical
    var CTDB = [];
    var CTDB_LCL = [];
    var CTDB_UCL = [];

    var FPTD = [];
    var FPTD_LCL = [];
    var FPTD_UCL = [];

    var HYS = [];
    var HYS_LCL = [];
    var HYS_UCL = [];

    var IPF = [];
    var IPF_LCL = [];
    var IPF_UCL = [];

    var RPF = [];
    var RPF_LCL = [];
    var RPF_UCL = [];

    var WOTM = [];
    var WOTM_LCL = [];
    var WOTM_UCL = [];

    var WOTDB = [];
    var WOTDB_LCL = [];
    var WOTDB_UCL = [];

    //Electrical
    var APS1CT = [];
    var APS1CT_LCL = [];
    var APS1CT_UCL = [];

    var APS1WOT = [];
    var APS1WOT_LCL = [];
    var APS1WOT_UCL = [];

    var APS2CT = [];
    var APS2CT_LCL = [];
    var APS2CT_UCL = [];

    var APS2WOT = [];
    var APS2WOT_LCL = [];
    var APS2WOT_UCL = [];

    var APS1Diff_Lin = [];
    var APS1Diff_Lin_LCL = [];
    var APS1Diff_Lin_UCL = [];

    var APS1Int_Lin = [];
    var APS1Int_Lin_LCL = [];
    var APS1Int_Lin_UCL = [];

    var APS2Int_Lin = [];
    var APS2Int_Lin_LCL = [];
    var APS2Int_Lin_UCL = [];

    var Dual_APS_Corr = [];
    var Dual_APS_Corr_LCL = [];
    var Dual_APS_Corr_UCL = [];

    var CTE_Return = [];
    var CTE_Return_LCL = [];
    var CTE_Return_UCL = [];

    var Power_Sup_Voltage = [];
    var Power_Sup_Voltage_LCL = [];
    var Power_Sup_Voltage_UCL = [];


    //Mechanical
    var CTDB_Title = "CTDB";
    var FPTD_Title = "FPTD";
    var HYS_Title = "HYS";
    var IPF_Title = "IPF";
    var RPF_Title = "RPF";
    var WOTM_Title = "WOTM";
    var WOTDB_Title = "WOTDB";

    //Electrical
    var APS1CT_Title = "APS1 CT";
    var APS1WOT_Title = "APS1 WOT";
    var APS2CT_Title = "APS2 CT";
    var APS2WOT_Title = "APS2 WOT";
    var APS1Diff_Lin_Title = "APS1 Diff.Linearity";
    var APS1Int_Lin_Title = "APS1 Int.Linearity";
    var APS2Int_Lin_Title = "APS2 Int.Linearity";
    var Dual_APS_Corr_Title = "Dual APS Correlation";
    var CTE_Return_Title = "CTE Return";
    var Power_Sup_Voltage_Title = "Power Supply Volt";

    var parameter_time = [];

    //Mechanical
    var wotm_lcl = 30;
    var wotm_ucl = 38;
    var wotm_max = wotm_ucl + 20;

    var wotdb_lcl = 0.5;
    var wotdb_ucl = 5;
    var wotdb_max = wotdb_ucl + 20;

    var ipf_lcl = 13;
    var ipf_ucl = 21;
    var ipf_max = ipf_ucl + 20;

    var rpf_lcl = 12;
    var rpf_ucl = 20;
    var rpf_max = rpf_ucl + 20;

    var hys_lcl = 0;
    var hys_ucl = 100;
    var hys_max = hys_ucl + 20;

    var ctdb_lcl = 2.5;
    var ctdb_ucl = 5;
    var ctdb_max = ctdb_ucl + 20;

    var fptd_lcl = 17;
    var fptd_ucl = 21;
    var fptd_max = fptd_ucl + 20;


    //Electrical
    var APS1CT_lcl = 20;
    var APS1CT_ucl = 24;
    var APS1CT_max = APS1CT_ucl + 20;


    var APS1WOT_lcl = 82;
    var APS1WOT_ucl = 86;
    var APS1WOT_max = APS1WOT_ucl + 20;


    var APS2CT_lcl = 9;
    var APS2CT_ucl = 13;
    var APS2CT_max = APS2CT_ucl + 20;


    var APS2WOT_lcl = 40;
    var APS2WOT_ucl = 44;
    var APS2WOT_max = APS2WOT_ucl + 20;


    var APS1Diff_Lin_lcl = -2;
    var APS1Diff_Lin_ucl = 2;
    var APS1Diff_Lin_max = APS1Diff_Lin_ucl + 20;


    var APS1Int_Lin_lcl = -1;
    var APS1Int_Lin_ucl = 1;
    var APS1Int_Lin_max = APS1Int_Lin_ucl + 20;


    var APS2Int_Lin_lcl = -1;
    var APS2Int_Lin_ucl = 1;
    var APS2Int_Lin_max = APS2Int_Lin_ucl + 20;


    var Dual_APS_Corr_lcl = -2;
    var Dual_APS_Corr_ucl = 2;
    var Dual_APS_Corr_max = Dual_APS_Corr_ucl + 20;


    var CTE_Return_lcl = -1;
    var CTE_Return_ucl = 1;
    var CTE_Return_max = CTE_Return_ucl + 20;


    var Power_Sup_Voltage_lcl = 4.5;
    var Power_Sup_Voltage_ucl = 5.5;
    var Power_Sup_Voltage_max = Power_Sup_Voltage_ucl + 20;



    for (var i = 0; i < trend_details.length; i++) {
      //Time
      parameter_time[i] = trend_details[i].ResultTime;

      //Mechanical
      CTDB[i] = trend_details[i].CTDB_Val;
      CTDB_LCL[i] = ctdb_lcl;
      CTDB_UCL[i] = ctdb_ucl;

      FPTD[i] = trend_details[i].FPTD_Val;
      FPTD_LCL[i] = fptd_lcl;
      FPTD_UCL[i] = fptd_ucl;

      HYS[i] = trend_details[i].HYS;
      HYS_LCL[i] = hys_lcl;
      HYS_UCL[i] = hys_ucl;

      IPF[i] = trend_details[i].IPF_Val;
      IPF_LCL[i] = ipf_lcl;
      IPF_UCL[i] = ipf_ucl;

      RPF[i] = trend_details[i].RPF_Val;
      RPF_LCL[i] = rpf_lcl;
      RPF_UCL[i] = rpf_ucl;

      WOTM[i] = trend_details[i].WOTM;
      WOTM_LCL[i] = wotm_lcl;
      WOTM_UCL[i] = wotm_ucl;

      WOTDB[i] = trend_details[i].WOTDB;
      WOTDB_LCL[i] = wotdb_lcl;
      WOTDB_UCL[i] = wotdb_ucl;


      //Electrical
      APS1CT[i] = trend_details[i].APS1CT;
      APS1CT_LCL[i] = APS1CT_lcl;
      APS1CT_UCL[i] = APS1CT_ucl;

      APS1WOT[i] = trend_details[i].APS1WOT;
      APS1WOT_LCL[i] = APS1WOT_lcl;
      APS1WOT_UCL[i] = APS1WOT_ucl;

      APS2CT[i] = trend_details[i].APS2CT;
      APS2CT_LCL[i] = APS2CT_lcl;
      APS2CT_UCL[i] = APS2CT_ucl;

      APS2WOT[i] = trend_details[i].APS2WOT;
      APS2WOT_LCL[i] = APS2WOT_lcl;
      APS2WOT_UCL[i] = APS2WOT_ucl;

      APS1Diff_Lin[i] = trend_details[i].APS1DiffLin;
      APS1Diff_Lin_LCL[i] = APS1Diff_Lin_lcl;
      APS1Diff_Lin_UCL[i] = APS1Diff_Lin_ucl;

      APS1Int_Lin[i] = trend_details[i].APS1IntLin;
      APS1Int_Lin_LCL[i] = APS1Int_Lin_lcl;
      APS1Int_Lin_UCL[i] = APS1Int_Lin_ucl;

      APS2Int_Lin[i] = trend_details[i].APS2IntLin;
      APS2Int_Lin_LCL[i] = APS2Int_Lin_lcl;
      APS2Int_Lin_UCL[i] = APS2Int_Lin_ucl;

      Dual_APS_Corr[i] = trend_details[i].DAPSCorr;
      Dual_APS_Corr_LCL[i] = Dual_APS_Corr_lcl;
      Dual_APS_Corr_UCL[i] = Dual_APS_Corr_ucl;

      CTE_Return[i] = trend_details[i].CTEReturn;
      CTE_Return_LCL[i] = CTE_Return_lcl;
      CTE_Return_UCL[i] = CTE_Return_ucl;

      Power_Sup_Voltage[i] = trend_details[i].PSVolt;
      Power_Sup_Voltage_LCL[i] = Power_Sup_Voltage_lcl;
      Power_Sup_Voltage_UCL[i] = Power_Sup_Voltage_ucl;

    }


    //Electrical
    const CTDB_Chart = trend_call(parameter_time, CTDB, CTDB_Title, CTDB_LCL, CTDB_UCL, ctdb_max);
    const FPTB_Chart = trend_call(parameter_time, FPTD, FPTD_Title, FPTD_LCL, FPTD_UCL, fptd_max);
    const HYS_Chart = trend_call(parameter_time, HYS, HYS_Title, HYS_LCL, HYS_UCL, hys_max);
    const IPF_Chart = trend_call(parameter_time, IPF, IPF_Title, IPF_LCL, IPF_UCL, ipf_max);
    const RPF_Chart = trend_call(parameter_time, RPF, RPF_Title, RPF_LCL, RPF_UCL, rpf_max);
    const WOTM_Chart = trend_call(parameter_time, WOTM, WOTM_Title, WOTM_LCL, WOTM_UCL, wotm_max);
    const WOTDB_Chart = trend_call(parameter_time, WOTDB, WOTDB_Title, WOTDB_LCL, WOTDB_UCL, wotdb_max);


    //Mechanical
    const APS1CT_Chart = trend_call(parameter_time, APS1CT, APS1CT_Title, APS1CT_LCL, APS1CT_UCL, APS1CT_max);
    const APS1WOT_Chart = trend_call(parameter_time, APS1WOT, APS1WOT_Title, APS1WOT_LCL, APS1WOT_UCL, APS1WOT_max);
    const APS2CT_Chart = trend_call(parameter_time, APS2CT, APS2CT_Title, APS2CT_LCL, APS2CT_UCL, APS2CT_max);
    const APS2WOT_Chart = trend_call(parameter_time, APS2WOT, APS2WOT_Title, APS2WOT_LCL, APS2WOT_UCL, APS2WOT_max);
    const APS1Diff_Lin_Chart = trend_call(parameter_time, APS1Diff_Lin, APS1Diff_Lin_Title, APS1Diff_Lin_LCL, APS1Diff_Lin_UCL, APS1Diff_Lin_max);
    const APS1Int_Lin_Chart = trend_call(parameter_time, APS1Int_Lin, APS1Int_Lin_Title, APS1Int_Lin_LCL, APS1Int_Lin_UCL, APS1Int_Lin_max);
    const APS2Int_Lin_Chart = trend_call(parameter_time, APS2Int_Lin, APS2Int_Lin_Title, APS2Int_Lin_LCL, APS2Int_Lin_UCL, APS2Int_Lin_max);
    const Dual_APS_Corr_Chart = trend_call(parameter_time, Dual_APS_Corr, Dual_APS_Corr_Title, Dual_APS_Corr_LCL, Dual_APS_Corr_UCL, Dual_APS_Corr_max);
    const CTE_Return_Chart = trend_call(parameter_time, CTE_Return, CTE_Return_Title, CTE_Return_LCL, CTE_Return_UCL, CTE_Return_max);
    const Power_Sup_Voltage_Chart = trend_call(parameter_time, Power_Sup_Voltage, Power_Sup_Voltage_Title, Power_Sup_Voltage_LCL, Power_Sup_Voltage_UCL, Power_Sup_Voltage_max);

    const test_chart_val = JSON.stringify(APS1CT_Chart);
    console.log(JSON.stringify(APS1CT_Chart));

    function trend_call(P_time, P_value, P_Title, P_LCL, P_UCL, P_max) {
      const Mechanical_Parameter_Trend = {
        title: {
          text: P_Title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['LCL', 'CL', 'UCL'],
          x: 'right'
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
          max: P_max
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
      return Mechanical_Parameter_Trend;
    }


    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <h2>{Product_Name} - Parameters Trend as on {Selected_Date}</h2>
                {Trend_Comes_From == "overall_status" && (<Link to="/overall_status"><i className="fa fa-arrow-circle-left"></i> Back</Link>)}
                {Trend_Comes_From == "product_wise" && (<Link to="/product_wise"><i className="fa fa-arrow-circle-left"></i> Back</Link>)}
                <div className="pull-right">
                  Date :- {date.getDate() + "-" + c_month + "-" + date.getFullYear()} &nbsp; &nbsp;
                  Time :- {date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" lg="12">
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}>
                          Mechanical
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }}>
                          Electrical
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={IPF_Chart}
                                style={{ height: 280, width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={RPF_Chart}
                                style={{ height: 280, width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={HYS_Chart}
                                style={{ height: 280, width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={FPTB_Chart}
                                style={{ height: 280, width:369 }}
                              />
                            </div>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={WOTM_Chart}
                                style={{ height: 280, width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={CTDB_Chart}
                                style={{ height: 280, width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={WOTDB_Chart}
                                style={{ height: 280, width:369 }}
                              />
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={APS1CT_Chart}
                                style={{ height: 280,width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={APS1WOT_Chart}
                                style={{ height: 280,width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={APS2CT_Chart}
                                style={{ height: 280,width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={APS2WOT_Chart}
                                style={{ height: 280,width:369 }}
                              />
                            </div>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={APS1Diff_Lin_Chart}
                                style={{ height: 280,width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={APS1Int_Lin_Chart}
                                style={{ height: 280,width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={APS2Int_Lin_Chart}
                                style={{ height: 280,width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={Dual_APS_Corr_Chart}
                                style={{ height: 280,width:369 }}
                              />
                            </div>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={CTE_Return_Chart}
                                style={{ height: 280,width:369 }}
                              />
                            </div>
                          </Col>
                          <Col xs="12" lg="3">
                            <div className="chart-wrapper">
                              <ReactEcharts
                                option={Power_Sup_Voltage_Chart}
                                style={{ height: 280, width:369 }}
                              />
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
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