import React, { useEffect } from 'react';
import * as actions from '../../../store/actions/exported-actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const LogOut = props => {
    const { onLogOut } = props;
    useEffect(() => {
        onLogOut();
    }, [onLogOut])

    return( <Redirect to='/' />)   
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actions.logOut())
    }
}

export default connect(null, mapDispatchToProps)(LogOut);