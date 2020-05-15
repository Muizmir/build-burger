import React from 'react';
import NavItem from './nav-item/nav-item';
import './navigation-items.css';

const navigationItems = props => (
    <ul className='NavigationItems'>
        <NavItem link='/' exact> BURGER BUILDER</NavItem>
        { props.isAuth ? <NavItem link='/orders'> ORDERS </NavItem> : null}
        { !props.isAuth ? <NavItem link='/auth'> Log In </NavItem> : 
                        <NavItem link='/logout'> Log OUT </NavItem> }
    </ul>
)

export default navigationItems;