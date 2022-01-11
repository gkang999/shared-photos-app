import React from 'react';
import './Backdrop.css';

const Backdrop = (props) => (
    props.show ? <div class="backdrop" onClick={props.clicked}></div> : null
)

export default Backdrop