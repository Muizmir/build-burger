import React from 'react';
import Layout from './containers/layout/layout';
import BurgerBuilder from './containers/burger-builder/burger-builder';
import Orders from './containers/orders/orders';
import Checkout from './containers/checkout/checkout';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  state = {
    show: true
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ show: false })
    }, 5000);
  }

  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={ Checkout } />
            <Route path='/orders' component={ Orders } />
            <Route path='/' exact component={ BurgerBuilder } />
          </Switch>          
        </Layout>
      </div>
    );
  }
  
}

export default App;
