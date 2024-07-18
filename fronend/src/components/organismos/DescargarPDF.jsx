import React from 'react';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from '../pages/PDF';
import ButtonPDF from '../atomos/ButtonDescargar';

const DescargarPDF = ({ fincaId }) => {
  return (
    <div>
      <PDFDownloadLink document={<PDF fincaId={fincaId} />} fileName="ReporteFincaCropLink.pdf">
        <ButtonPDF />
      </PDFDownloadLink>
    </div>
  );
};

export default DescargarPDF;
