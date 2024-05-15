import React from 'react';

function BotonesModal({ variant, onClick, children, className }) {
  return (
    <div>
      <button className={className} variant={variant} onClick={onClick} style={{width: '90px', height: '40px'}}>
        {children}
      </button>
    </div>
  );
}

export default BotonesModal;
