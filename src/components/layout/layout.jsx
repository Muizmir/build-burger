import React from 'react';
import Aux from '../../hoc/aux';
import './layout.css';

const layout = (props) => (
    <Aux>
        <div> tolbar, sidedrawer, backdrop</div>
        <main className='content'>
            {props.children}
        </main>
    </Aux>    
)

export default layout;