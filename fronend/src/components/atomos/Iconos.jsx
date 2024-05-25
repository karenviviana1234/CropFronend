// components/atoms/Icon/Icon.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon, className }) => (
 <FontAwesomeIcon icon={icon} className={className} style={{width: '18px', height: '18px'}} />
);

export default Icon;
