import React from 'react';
import NavItem from './nav-item/nav-item';
import './navigation-items.css';

const navigationItems = () => (
    <ul className='NavigationItems'>
        <NavItem link='/' exact> BURGER BUILDER</NavItem>
        <NavItem link='/orders'> ORDERS </NavItem>
    </ul>
)

export default navigationItems;