import React from 'react';
import Aux from '../../../hocs/hoc/auxillary';
import Backdrop from '../backdrop/backdrop';

import './modal.css';

const Modal = props => {
    const { show, modalClosed, children } = props;

    return (
        <Aux>
            <Backdrop show={ show } clicked={ modalClosed } />
            <div className='Modal'
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}>
                { children }
            </div>
        </Aux>
    )
}

export default React.memo(Modal, (prevProps, nextProps) => prevProps.show === nextProps.show || 
                                                           prevProps.children === nextProps.children);