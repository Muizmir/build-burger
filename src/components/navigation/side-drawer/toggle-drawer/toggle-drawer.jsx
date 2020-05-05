import React from 'react';
import './toggle-drawer.css';

const toggleDrawer = props =>(
    <div className='ToggleDrawer' onClick={ props.clicked }>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default toggleDrawer;