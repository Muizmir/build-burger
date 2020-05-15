import React from 'react';
import NavigationItems from '../navigation-items/navigation-items';
import ToggleDrawer from '../side-drawer/toggle-drawer/toggle-drawer';
import Logo from '../../logo/logo'
import './toolbar.css';

const toolbar = props => (
    <header className='Toolbar'>
        <ToggleDrawer clicked={ props.drawerClicked } />
        <Logo />
        <nav className='DesktopOnly'>
            <NavigationItems isAuth={ props.isAuth } />
        </nav>
    </header>
)

export default toolbar;