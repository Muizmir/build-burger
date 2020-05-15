import React from 'react';
import * as actions from '../../../store/actions/exported-actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class LogOut extends React.Component {
    componentDidMount(){
        this.props.onLogOut();
    }
    render(){
        return(
            <Redirect to='/' />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actions.logOut())
    }
}

export default connect(null, mapDispatchToProps)(LogOut);