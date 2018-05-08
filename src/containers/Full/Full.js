import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashbaord/';
import Trend_Chart from '../../views/Trend_Chart/';
import Over_all_status from '../../views/Over_all_status/';
import Product_Wise from '../../views/Product_Wise/';
import Machines from '../../views/Machines/';
import Historical_Data from '../../views/Historical_Data/';
import Machine_Details from '../../views/Machine_Details/';
import Real_Time_Trend_Chart from '../../views/Real_Time_Trend_Chart/';
import Auth from '../../Auth/Auth';
import Callback from '../../Callback/Callback';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}
class Full extends Component {
  render() {
    return (
      <div className="app">
        {auth.isAuthenticated() &&
          (<Header />)}
        {auth.isAuthenticated() &&
          (
            <div className="app-body">
              <Sidebar {...this.props} />
              <main className="main">
                <Breadcrumb />
                <Container fluid>
                  <Switch>
                    <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                    <Route path="/historical_main" name="Historical_Data" component={Historical_Data} /> 
                    <Route path="/overall_status" name="Overall_status" component={Over_all_status} /> 
                    <Route path="/machines" name="Machine" component={Machines} />
                    <Route path="/machine_details" name="Machine_Details" component={Machine_Details} />       
                    <Route path="/product_wise" name="Product_Wise" component={Product_Wise} />                                                        
                    <Route path="/trend_chart" name="Trend_Chart" component={Trend_Chart} />
                    <Route path="/real_time_trend_chart" name="Real_Time_Trend_Chart" component={Real_Time_Trend_Chart} />
                    <Route path="/callback" name="Callback" component={Callback} render={(props) => {
                      handleAuthentication(props);
                      return <Callback {...props} />
                    }} />
                    <Redirect from="/" to="/dashboard" />
                  </Switch>
                </Container>
              </main>
              <Aside />
            </div>)}
        {auth.isAuthenticated() &&
          (<Footer />)}
      </div>
    );
  }
}

export default Full;
