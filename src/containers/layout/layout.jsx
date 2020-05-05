import React from 'react';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/side-drawer/side-drawer';
import Aux from '../../hoc/aux';
import './layout.css';

class Layout extends React.Component{
    state = {
        sideDrawerShown: true
    }

    sideDrawerToggleHandler = () => this.setState({ sideDrawerShown: !this.state.sideDrawerShown })

    render(){
        return(
            <Aux>
                <Toolbar drawerClicked={ this.sideDrawerToggleHandler } />
                <SideDrawer open={ this.state.sideDrawerShown } closed={ this.sideDrawerToggleHandler } />
                <main className='content'>
                    {this.props.children}
                </main>
            </Aux>  
        )
    } 
}

export default Layout;