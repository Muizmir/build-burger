import React from 'react';
import Order from '../../components/order/order/order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hocs/error-handler/error-handler';
import { connect } from 'react-redux';
import Spinner from '../../components/ui/spinner/spinner';
import * as actions from '../../store/actions/exported-actions';

class Orders extends React.Component {
 
    componentDidMount(){
        this.props.onFetchedOrders();
    }

    render(){
        let order = <Spinner />
        if(!this.props.loading){
            order = this.props.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))
        }
        return <div>{ order }</div>;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchedOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ErrorHandler(Orders, axios));