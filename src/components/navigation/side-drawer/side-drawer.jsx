import React from 'react';
import NavigationItems from '../navigation-items/navigation-items';
import Backdrop from '../../ui/backdrop/backdrop';
import Aux from '../../../hoc/aux';
import Logo from '../../logo/logo';
import './side-drawer.css';

const sideDrawer = props => {
    let cname = 'SideDrawer Close'
    if(!props.open){
        cname = 'SideDrawer Open'
    }
    return(
        <Aux>
            <Backdrop show={ !props.open } clicked={ props.closed } />
            <div className={ cname }>
                <div className='LogoSD'>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>        
    )
}

export default sideDrawer;