import React from 'react';

function ImageConfi({ alt, src }) {
  return (
    <div>
      <img src={src} alt={alt} className="w-full h-auto mb-3" style={{ maxWidth: '800px', height: '200px' }} />
    </div>
  );
}

export default ImageConfi;
