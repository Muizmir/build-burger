import React from 'react';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/side-drawer/side-drawer';
import Aux from '../../hocs/hoc/auxillary';
import { connect } from 'react-redux';
import './layout.css';

class Layout extends React.Component{
    state = {
        sideDrawerShown: true
    }

    sideDrawerToggleHandler = () => this.setState({ sideDrawerShown: !this.state.sideDrawerShown })

    render(){
        return(
            <Aux>
                <Toolbar 
                    drawerClicked={ this.sideDrawerToggleHandler }
                    isAuth={ this.props.isAuthenticated } />
                <SideDrawer 
                    open={ this.state.sideDrawerShown } 
                    closed={ this.sideDrawerToggleHandler } 
                    isAuth={ this.props.isAuthenticated } />
                <main className='content'>
                    { this.props.children }
                </main>
            </Aux>  
        )
    } 
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);