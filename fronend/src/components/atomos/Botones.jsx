// ButtonAtom.js
import React from 'react';


const Botones = ({ onClick, actionLabel, variant }) => {
 return (
    <button type='submit' variant={variant} onClick={onClick} style={{width: '90px', height: '40px',background:'#035020'}}>
    {actionLabel}
    </button>
 );
};

export default Botones;
