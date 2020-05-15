import React from 'react';
import Order from '../../components/order/order/order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hocs/error-handler/error-handler';
import { connect } from 'react-redux';
import Spinner from '../../components/ui/spinner/spinner';
import * as actions from '../../store/actions/exported-actions';

class Orders extends React.Component {
 
    componentDidMount(){
        this.props.onFetchedOrders(this.props.token, this.props.userId);
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
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchedOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ErrorHandler(Orders, axios));