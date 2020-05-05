import React from 'react';
import './nav-item.css';

const navItem = props => (
    <li className='NavItem'>
        <a href={ props.link } className={ props.active ? 'active' : null}>{ props.children }</a>
    </li>
)

export default navItem;