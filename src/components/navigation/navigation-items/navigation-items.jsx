import React from 'react';
import NavItem from './nav-item/nav-item';
import './navigation-items.css';

const navigationItems = () => (
    <ul className='NavigationItems'>
        <NavItem link='/' active> Burger Builder</NavItem>
        <NavItem link='/'> Checkout </NavItem>
    </ul>
)

export default navigationItems;