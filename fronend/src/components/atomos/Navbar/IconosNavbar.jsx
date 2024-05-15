
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon,style, onClick }) => (
 <FontAwesomeIcon icon={icon} className='w-6 h-6 text-custom-white' style={{style}} onClick={onClick} />
);

export default Icon;
