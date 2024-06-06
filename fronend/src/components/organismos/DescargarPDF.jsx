import React from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from '../pages/PDF'
import ButtonPDF from '../atomos/ButtonDescargar';


function DescargarPDF() {
  return (
    <div>
                <PDFDownloadLink document={<PDF />} fileName="ReporteFincaCropLink.pdf">
                    {
                        <ButtonPDF></ButtonPDF>
                    }
                </PDFDownloadLink>
    </div>
  )
}

export default DescargarPDF
