import React from 'react';
import Aux from '../../../hocs/hoc/auxillary';
import Backdrop from '../backdrop/backdrop';

import './modal.css';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState){
        return (this.props.show !== nextProps.show || this.props.children !== nextProps.children)
    }

    render(){
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className='Modal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;