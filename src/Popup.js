import React from 'react';
import './Popup.css';
import Backdrop from './Backdrop.js';

const Popup = props => {
    return (
        <div class="popup">
            {props.children}
            <Backdrop show={props.show} clicked={props.modalClosed}/>
        </div>
    );
};



export default Popup;