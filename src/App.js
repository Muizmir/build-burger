import React, { Suspense, useEffect } from 'react';
import Layout from './containers/layout/layout';
import Spinner from './components/ui/spinner/spinner';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import * as actionTypes from './store/actions/exported-actions';

const Checkout = React.lazy(() => import('./containers/checkout/checkout'));
const Orders = React.lazy(() => import('./containers/orders/orders'));
const Auth = React.lazy(() => import('./containers/auth/auth'));
const LogOut = React.lazy(() => import('./containers/auth/logout/logout'));
const Contact = React.lazy(() => import('./containers/contact/contact'));
const BurgerBuilder = React.lazy(() => import('./containers/burger-builder/burger-builder'));

const App = props => {  
  const { onTryAutoSignUp, isAuthenticated} = props;
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]); 
 
    let routes = (
      <Switch>
        <Route path='/auth' render={() => <Suspense fallback={<Spinner />}><Auth /></Suspense>} />
        <Route path='/contact' render={() => <Suspense fallback={<Spinner />}><Contact /></Suspense>} />
        <Route path='/' exact render={() => <Suspense fallback={<Spinner />}><BurgerBuilder /></Suspense>} />
        <Redirect to='/' />
      </Switch> 

    );

    if(isAuthenticated){
      routes = (
        <Switch>
          <Route path='/checkout' render={() => <Suspense fallback={<Spinner />}><Checkout/></Suspense> } />
          <Route path='/orders' render={() => <Suspense fallback={<Spinner />}><Orders /></Suspense>} />
          <Route path='/auth' render={() => <Suspense fallback={<Spinner />}><Auth /></Suspense>} />
          <Route path='/logout' render={() => <Suspense fallback={<Spinner />}><LogOut /></Suspense>} />
          <Route path='/contact' render={() => <Suspense fallback={<Spinner />}><Contact /></Suspense>} />
          <Route path='/' exact render={() => <Suspense fallback={<Spinner />}><BurgerBuilder /></Suspense>} />
          <Redirect to='/' />
        </Switch> 
      )
  }
  return (<Layout>{routes}</Layout>);
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
