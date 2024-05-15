import React from 'react';
import v from '../../styles/variables';

function Image({ className, style }) {
  return (
    <div>
      <img src={v.imageLogo} className={className} alt="" style={style} />
    </div>
  );
}

export default Image;
