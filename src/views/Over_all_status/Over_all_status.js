import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Collapsible from 'react-collapsible';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Collapse, Button, Fade, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
import classnames from 'classnames';
import axios from 'axios';
var status;

function onChartReady(echarts) {
  console.log('echart is ready');
};

var last_7_days_product_wise = {};
export default class Over_all_status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overall_bar: false,
      last_7_bar: false,
      heatmap_fail: false,
      fail_param: true,
      activeTab: '1'
    };
    this.toggle_tab = this.toggle_tab.bind(this);
    this.toggle_overall_bar = this.toggle_overall_bar.bind(this);
    this.toggle_last_7_bar = this.toggle_last_7_bar.bind(this);
    this.toggle_heatmap_fail = this.toggle_heatmap_fail.bind(this);
    this.onChartClick = this.onChartClick.bind(this);
  }
  toggle_overall_bar() {
    this.setState({
      overall_bar: !this.state.overall_bar,
    });
  }

  toggle_last_7_bar() {
    this.setState({
      last_7_bar: !this.state.last_7_bar,
    });
  }

  toggle_heatmap_fail() {
    this.setState({
      heatmap_fail: !this.state.heatmap_fail,
    });
  }

  toggle_tab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onChartClick(param, echarts) {
    localStorage.setItem("Product_Status", param.seriesName);
    localStorage.setItem("Product_Name", param.name);
    if (param.seriesName == "Fail" || param.seriesName == "Pass") {
      console.log(param);
      if (param.seriesName == "Pass")
        status = 1;
      else if (param.seriesName == "Fail") {
        status = 0;
        this.setState({
          fail_param: !this.state.fail_param,
        });
      }
      axios.get('http://192.168.20.26:5000/resultdetails/' + status)
        .then(function (response) {
          console.log(response.data.data);
          var fulldata = response.data.data;
          var new_array = fulldata.filter(
            function (el) {
              return el.ProductNo == param.name
            });
          console.log(new_array);
          localStorage.setItem("Product_wise_overall", JSON.stringify(new_array));
        })
        .then(function () {
          if (param.seriesName == "Fail")
            window.location = '/#/overall_status';
          else
            window.location = '/#/product_wise';
        });
    }
    else {
      console.log(param);
      var Title_Value = localStorage.getItem("Title_Value");
      if (Title_Value == "Pass")
        status = 1;
      else if (Title_Value == "Fail") {
        status = 0;
        return false;
      }
      localStorage.setItem("Selected_Date_4_Trend", param.name);
      localStorage.setItem("Selected_Product_4_Trend", param.seriesName);
      axios.get('http://192.168.20.26:5000/resultdetails/' + status)
        .then(function (response) {
          console.log(response.data.data);
          var fulldata = response.data.data;
          var new_array = fulldata.filter(
            function (el) {
              return el.ProductNo == param.seriesName && el.ResultDate == param.name
            });
          console.log(new_array);
          localStorage.setItem("Date_Wise_Trend", JSON.stringify(new_array));
        })
        .then(function () {
          var Trend_Comes_From = "overall_status"
          localStorage.setItem("Trend_Comes_From", Trend_Comes_From);
          window.location = '/#/trend_Chart';
        });
    }
  }


  render() {
    //Pass or Fail
    var Product_Name = localStorage.getItem("Product_Name");
    var Title_Value = localStorage.getItem("Title_Value");
    var color_depends_status;
    var color_pass = ['#61FC63', '#029A05', '#41DC96', '#2DF5A9', '#82F52D', '#71B340'];
    var color_fail = ['#DE5234', '#C70039', '#FA6C2F', '#FA4E2F', '#FC260D', '#F81F67'];
    var color_based_status = [];
    if (Title_Value == "Pass")
      color_depends_status = ['Green'];
    else
      color_depends_status = ['Red'];


    //Heat Map
    var Overall_Product_API_Responce = JSON.parse(localStorage.getItem("Overall_Product_API_Responce"));


    //Overall_Product_Wise

    var Overall_Product_API_Responce = JSON.parse(localStorage.getItem("Overall_Product_API_Responce"));
    var legend_data1 = [];
    var series_data1 = [];
    for (var i = 0; i < Overall_Product_API_Responce.length; i++) {
      legend_data1[i] = Overall_Product_API_Responce[i].ProductID;
      series_data1[i] = {};
      series_data1[i].value = Overall_Product_API_Responce[i].Count;
      series_data1[i].name = Overall_Product_API_Responce[i].ProductID;
    }


    var itemStyle = {
      normal: {
      },
      emphasis: {
        barBorderWidth: 5,
        shadowBlur: 20,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(25,60,85,92)'
      }
    };

    const bar_product_wise = {
      //backgroundColor: '#eee',
      legend: {
        data: legend_data1,
        y: 'bottom'
      },
      tooltip: {},
      xAxis: {
        silent: false,
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {
        data: legend_data1,
        inverse: false,
        splitArea: { show: false },
      },
      grid: {
        left: 100
      },
      series: [
        {
          name: Title_Value,
          type: 'bar',
          itemStyle: itemStyle,
          color: color_depends_status,
          data: series_data1
        }
      ]
    };

    //Last 7 Days

    var Last_7_Days_API_Responce = JSON.parse(localStorage.getItem("Last_7_Days_API_Responce"));
    var legend_data2 = [];
    var series_data2 = [];
    var product_list = [];
    var series_data = [];
    var series_data_list = [];
    var final_data = [];
    for (var i = 0; i < Last_7_Days_API_Responce.length; i++) {
      legend_data2[i] = Last_7_Days_API_Responce[i][0];
      series_data2[i] = Last_7_Days_API_Responce[i][1][0];
    }
    for (var p = 0; p < series_data2.length; p++) {
      for (var q = 0; q < series_data2[p].length; q++) {
        product_list = product_list.concat(series_data2[p][q].ProductKey);   //Changing Name to Key
        product_list = product_list.filter(function (e) { return e });  //Excludes Null
        product_list = product_list.filter(function (item, index, inputArray) {
          return inputArray.indexOf(item) == index;
        });
      }
    }
    console.log(product_list);

    for (var r = 0; r < product_list.length; r++) {
      var series_data_product_each = [0, 0, 0, 0, 0, 0, 0];
      for (var j = 0; j < series_data2.length; j++) {
        if (Title_Value == "Pass") {
          for (var k = 0; k < series_data2[j].length; k++) {
            if (series_data2[j][k].ProductKey == product_list[r])
              series_data_product_each[j] = series_data2[j][k].PassCnt;
            //series_data_product_each = series_data_product_each.concat(series_data2[j][k].PassCnt);
            else if (series_data2[j][k].ProductKey == null)
              series_data_product_each[j] = 0;
            final_data[r] = series_data_product_each;
          }
        }
        else if (Title_Value == "Fail") {
          for (var k = 0; k < series_data2[j].length; k++) {
            if (series_data2[j][k].ProductKey == product_list[r])
              series_data_product_each[j] = series_data2[j][k].FailCnt;
            //series_data_product_each = series_data_product_each.concat(series_data2[j][k].FailCnt);
            else if (series_data2[j][k].ProductKey == null)
              series_data_product_each[j] = 0;
            final_data[r] = series_data_product_each;
          }
        }
      }
    }
    console.log(final_data);
    for (var l = 0; l < product_list.length; l++) {
      if (Title_Value == "Pass")
        color_based_status[l] = color_pass[l];
      else
        color_based_status[l] = color_fail[l];
      series_data[l] = {};
      series_data[l].name = product_list[l];
      series_data[l].type = "bar";
      series_data[l].data = final_data[l];
      series_data[l].color = color_based_status[l];
      /*  series_data[l].markPoint = {
         data: [
           { type: 'max' },
           { type: 'min' }
         ]
       } */
      series_data_list = series_data_list.concat(series_data[l]);
    }
    console.log(series_data2);
    console.log(series_data_list);
    const last_7_days_product_wise = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: product_list
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: legend_data2
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: series_data_list
    };

    var Failure_Trend_Data = JSON.parse(localStorage.getItem("Failure_Trend_Data"));

    // Trend for failure secnario
    console.log(Product_Name);
    console.log(Failure_Trend_Data);
    if (Product_Name != null && Failure_Trend_Data != null) {
      var new_array = Failure_Trend_Data.filter(
        function (el) {
          return el.ProductNo == Product_Name
        });
      console.log(new_array);

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
      var Power_Sup_Voltage_Title = "Power Supply Voltage";

      var parameter_time = [];

      //Mechanical
      var CTDB_Chart;
      var FPTB_Chart;
      var HYS_Chart;
      var IPF_Chart;
      var RPF_Chart;
      var WOTM_Chart;
      var WOTDB_Chart;


      //Electrical
      var APS1CT_Chart;
      var APS1WOT_Chart;
      var APS2CT_Chart;
      var APS2WOT_Chart;
      var APS1Diff_Lin_Chart;
      var APS1Int_Lin_Chart;
      var APS2Int_Lin_Chart;
      var Dual_APS_Corr_Chart;
      var CTE_Return_Chart;
      var Power_Sup_Voltage_Chart;

      //Mechanical
      var wotm_lcl = 30;
      var wotm_ucl = 38;

      var wotdb_lcl = 0.5;
      var wotdb_ucl = 5;

      var ipf_lcl = 13;
      var ipf_ucl = 21;

      var rpf_lcl = 12;
      var rpf_ucl = 20;

      var hys_lcl = 0;
      var hys_ucl = 100;

      var ctdb_lcl = 2.5;
      var ctdb_ucl = 5;

      var fptd_lcl = 17;
      var fptd_ucl = 21;


      //Electrical
      var APS1CT_lcl = 20;
      var APS1CT_ucl = 24;

      var APS1WOT_lcl = 82;
      var APS1WOT_ucl = 86;

      var APS2CT_lcl = 9;
      var APS2CT_ucl = 13;

      var APS2WOT_lcl = 40;
      var APS2WOT_ucl = 44;

      var APS1Diff_Lin_lcl = -2;
      var APS1Diff_Lin_ucl = 2;

      var APS1Int_Lin_lcl = -1;
      var APS1Int_Lin_ucl = 1;

      var APS2Int_Lin_lcl = -1;
      var APS2Int_Lin_ucl = 1;

      var Dual_APS_Corr_lcl = -2;
      var Dual_APS_Corr_ucl = 2;

      var CTE_Return_lcl = -1;
      var CTE_Return_ucl = 1;

      var Power_Sup_Voltage_lcl = 4.5;
      var Power_Sup_Voltage_ucl = 5.5;
      for (var i = 0; i < new_array.length; i++) {
        parameter_time[i] = new_array[i].ResultDate;
        //Mechanical
        CTDB[i] = new_array[i].CTDB_Val;
        CTDB_LCL[i] = ctdb_lcl;
        CTDB_UCL[i] = ctdb_ucl;

        FPTD[i] = new_array[i].FPTD_Val;
        FPTD_LCL[i] = fptd_lcl;
        FPTD_UCL[i] = fptd_ucl;

        HYS[i] = new_array[i].HYS;
        HYS_LCL[i] = hys_lcl;
        HYS_UCL[i] = hys_ucl;

        IPF[i] = new_array[i].IPF_Val;
        IPF_LCL[i] = ipf_lcl;
        IPF_UCL[i] = ipf_ucl;

        RPF[i] = new_array[i].RPF_Val;
        RPF_LCL[i] = rpf_lcl;
        RPF_UCL[i] = rpf_ucl;

        WOTM[i] = new_array[i].WOTM;
        WOTM_LCL[i] = wotm_lcl;
        WOTM_UCL[i] = wotm_ucl;

        WOTDB[i] = new_array[i].WOTDB;
        WOTDB_LCL[i] = wotdb_lcl;
        WOTDB_UCL[i] = wotdb_ucl;


        //Electrical
        APS1CT[i] = new_array[i].APS1CT;
        APS1CT_LCL[i] = APS1CT_lcl;
        APS1CT_UCL[i] = APS1CT_ucl;

        APS1WOT[i] = new_array[i].APS1WOT;
        APS1WOT_LCL[i] = APS1WOT_lcl;
        APS1WOT_UCL[i] = APS1WOT_ucl;

        APS2CT[i] = new_array[i].HYS;
        APS2CT_LCL[i] = APS2CT_lcl;
        APS2CT_UCL[i] = APS2CT_ucl;

        APS2WOT[i] = new_array[i].IPF_Val;
        APS2WOT_LCL[i] = APS2WOT_lcl;
        APS2WOT_UCL[i] = APS2WOT_ucl;

        APS1Diff_Lin[i] = new_array[i].RPF_Val;
        APS1Diff_Lin_LCL[i] = APS1Diff_Lin_lcl;
        APS1Diff_Lin_UCL[i] = APS1Diff_Lin_ucl;

        APS1Int_Lin[i] = new_array[i].CTDB_Val;
        APS1Int_Lin_LCL[i] = APS1Int_Lin_lcl;
        APS1Int_Lin_UCL[i] = APS1Int_Lin_ucl;

        APS2Int_Lin[i] = new_array[i].FPTD_Val;
        APS2Int_Lin_LCL[i] = APS2Int_Lin_lcl;
        APS2Int_Lin_UCL[i] = APS2Int_Lin_ucl;

        Dual_APS_Corr[i] = new_array[i].HYS;
        Dual_APS_Corr_LCL[i] = Dual_APS_Corr_lcl;
        Dual_APS_Corr_UCL[i] = Dual_APS_Corr_ucl;

        CTE_Return[i] = new_array[i].IPF_Val;
        CTE_Return_LCL[i] = CTE_Return_lcl;
        CTE_Return_UCL[i] = CTE_Return_ucl;

        Power_Sup_Voltage[i] = new_array[i].RPF_Val;
        Power_Sup_Voltage_LCL[i] = Power_Sup_Voltage_lcl;
        Power_Sup_Voltage_UCL[i] = Power_Sup_Voltage_ucl;
      }

      //Electrical
      CTDB_Chart = trend_call(parameter_time, CTDB, CTDB_Title, CTDB_LCL, CTDB_UCL);
      FPTB_Chart = trend_call(parameter_time, FPTD, FPTD_Title, FPTD_LCL, FPTD_UCL);
      HYS_Chart = trend_call(parameter_time, HYS, HYS_Title, HYS_LCL, HYS_UCL);
      IPF_Chart = trend_call(parameter_time, IPF, IPF_Title, IPF_LCL, IPF_UCL);
      RPF_Chart = trend_call(parameter_time, RPF, RPF_Title, RPF_LCL, RPF_UCL);
      WOTM_Chart = trend_call(parameter_time, WOTM, WOTM_Title, WOTM_LCL, WOTM_UCL);
      WOTDB_Chart = trend_call(parameter_time, WOTDB, WOTDB_Title, WOTDB_LCL, WOTDB_UCL);


      //Mechanical
      APS1CT_Chart = trend_call(parameter_time, APS1CT, APS1CT_Title, APS1CT_LCL, APS1CT_UCL);
      APS1WOT_Chart = trend_call(parameter_time, APS1WOT, APS1WOT_Title, APS1WOT_LCL, APS1WOT_UCL);
      APS2CT_Chart = trend_call(parameter_time, APS2CT, APS2CT_Title, APS2CT_LCL, APS2CT_UCL);
      APS2WOT_Chart = trend_call(parameter_time, APS2WOT, APS2WOT_Title, APS2WOT_LCL, APS2WOT_UCL);
      APS1Diff_Lin_Chart = trend_call(parameter_time, APS1Diff_Lin, APS1Diff_Lin_Title, APS1Diff_Lin_LCL, APS1Diff_Lin_UCL);
      APS1Int_Lin_Chart = trend_call(parameter_time, APS1Int_Lin, APS1Int_Lin_Title, APS1Int_Lin_LCL, APS1Int_Lin_UCL);
      APS2Int_Lin_Chart = trend_call(parameter_time, APS2Int_Lin, APS2Int_Lin_Title, APS2Int_Lin_LCL, APS2Int_Lin_UCL);
      Dual_APS_Corr_Chart = trend_call(parameter_time, Dual_APS_Corr, Dual_APS_Corr_Title, Dual_APS_Corr_LCL, Dual_APS_Corr_UCL);
      CTE_Return_Chart = trend_call(parameter_time, CTE_Return, CTE_Return_Title, CTE_Return_LCL, CTE_Return_UCL);
      Power_Sup_Voltage_Chart = trend_call(parameter_time, Power_Sup_Voltage, Power_Sup_Voltage_Title, Power_Sup_Voltage_LCL, Power_Sup_Voltage_UCL);
    }

    function trend_call(P_time, P_value, P_Title, P_LCL, P_UCL) {
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
    let onEvents = {
      'click': this.onChartClick
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
              <Link to="/historical_main"><i className="fa fa-arrow-circle-left"></i> Back</Link>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" lg="4">
                    <Card>
                      <CardHeader>
                        <strong>{Title_Value} Results: Part Wise</strong>
                        <div className="card-actions">
                          <a onClick={this.toggle_overall_bar}>
                            <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                          </a>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <ReactEcharts
                          option={bar_product_wise}
                          style={{ height: 350 }}
                          onChartReady={onChartReady}
                          onEvents={onEvents} />
                      </CardBody>
                    </Card>
                    <Modal isOpen={this.state.overall_bar} toggle={this.toggle_overall_bar}
                      className={'modal-lg ' + this.props.className}>
                      <ModalHeader toggle={this.toggle_overall_bar}>
                        <strong>{Title_Value} Results: Part Wise</strong>
                      </ModalHeader>
                      <ModalBody>
                        <ReactEcharts
                          option={bar_product_wise}
                          style={{ height: 600 }}
                          onChartReady={onChartReady}
                          onEvents={onEvents} />
                      </ModalBody>
                    </Modal>
                  </Col>
                  <Col xs="12" lg="8">
                    <Card>
                      <CardHeader>
                        <strong>{Title_Value} Results: Part Wise (Last 7 Days)</strong>
                        <div className="card-actions">
                          <a onClick={this.toggle_last_7_bar}>
                            <i className="fa fa-expand fa-lg" tooltip="Expand"></i>
                          </a>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <ReactEcharts
                          option={last_7_days_product_wise}
                          style={{ height: 350 }}
                          onChartReady={onChartReady}
                          onEvents={onEvents} />
                      </CardBody>
                    </Card>
                    <Modal isOpen={this.state.last_7_bar} toggle={this.toggle_last_7_bar}
                      className={'modal-lg ' + this.props.className}>
                      <ModalHeader toggle={this.toggle_last_7_bar}>
                        <strong>{Title_Value} Results: Part Wise (Last 7 Days)</strong>
                      </ModalHeader>
                      <ModalBody>
                        <ReactEcharts
                          option={last_7_days_product_wise}
                          style={{ height: 600 }}
                          onChartReady={onChartReady}
                          onEvents={onEvents} />
                      </ModalBody>
                    </Modal>
                  </Col>
                </Row>
                <Row>
                  {!this.state.fail_param && (
                    <Col xs="12" lg="12">
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle_tab('1'); }}>
                            Mechanical
              </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle_tab('2'); }}>
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
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={RPF_Chart}
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={HYS_Chart}
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={FPTB_Chart}
                                  style={{ height: 280 }}
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
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={CTDB_Chart}
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={WOTDB_Chart}
                                  style={{ height: 280 }}
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
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={APS1WOT_Chart}
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={APS2CT_Chart}
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={APS2WOT_Chart}
                                  style={{ height: 280 }}
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
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={APS1Int_Lin_Chart}
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={APS2Int_Lin_Chart}
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={Dual_APS_Corr_Chart}
                                  style={{ height: 280 }}
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
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                            <Col xs="12" lg="3">
                              <div className="chart-wrapper">
                                <ReactEcharts
                                  option={Power_Sup_Voltage_Chart}
                                  style={{ height: 280 }}
                                />
                              </div>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </Col>
                  )}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}