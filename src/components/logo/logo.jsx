import React from 'react';
import burgerLogo from '../../assets/images/original.png'
import { NavLink } from 'react-router-dom';
import './logo.css';

const logo = () => (
    <div className='Logo'>
        <NavLink to='/' exact ><img src={ burgerLogo } alt='MyBurger' /></NavLink> 
    </div>
)

export default logo;