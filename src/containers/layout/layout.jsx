import React, { useState } from 'react';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/side-drawer/side-drawer';
import Aux from '../../hocs/hoc/auxillary';
import { connect } from 'react-redux';
import './layout.css';

const Layout = props => {    
    const [sideDrawerVisible, setSideDrawerVisible] = useState(true)

    const sideDrawerToggleHandler = () => {
        setSideDrawerVisible(!sideDrawerVisible);
    }

    return(
        <Aux>
            <Toolbar 
                drawerClicked={ sideDrawerToggleHandler }
                isAuth={ props.isAuthenticated } />
            <SideDrawer 
                open={ sideDrawerVisible } 
                closed={ sideDrawerToggleHandler } 
                isAuth={ props.isAuthenticated } />
            <main className='content'>
                { props.children }
            </main>
        </Aux>  
    )
}
    
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);