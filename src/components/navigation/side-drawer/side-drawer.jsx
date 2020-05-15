import React from 'react';
import NavigationItems from '../navigation-items/navigation-items';
import Backdrop from '../../ui/backdrop/backdrop';
import Aux from '../../../hocs/hoc/auxillary';
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
            <div className={ cname } onClick={ props.closed }>
                <div className='LogoSD'>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isAuth={ props.isAuth } />
                </nav>
            </div>
        </Aux>        
    )
}

export default sideDrawer;