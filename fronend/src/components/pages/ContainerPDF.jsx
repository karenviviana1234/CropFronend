import React, { useEffect, useState } from 'react';
import axiosClient from '../axiosClient';
import PDF from './PDF'
import { PDFViewer } from '@react-pdf/renderer';

const PDFContainer = () => {
   
    return (
        <PDFViewer width="100%" height="600">
            <PDF />
        </PDFViewer>
    );
};

export default PDFContainer;
