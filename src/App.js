import React from 'react';
import Layout from './containers/layout/layout';
import BurgerBuilder from './containers/burger-builder/burger-builder';
import Orders from './containers/orders/orders';
import Checkout from './containers/checkout/checkout';
import Auth from './containers/auth/auth';
import LogOut from './containers/auth/logout/logout';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import * as actionTypes from './store/actions/exported-actions';

class App extends React.Component {
  
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render(){
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch> 

    );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={LogOut} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch> 
      )
    }
    return (
      <div>
        <Layout>
          { routes }  
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actionTypes.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
