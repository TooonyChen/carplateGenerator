import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import {useLocation} from "react-router-dom";

function PDFGenerator() {
    const [pdfUrl, setPdfUrl] = useState('');
    const location = useLocation();
    const CarPlate = location.state?.chinaCarPlate || 'Unknown';
    // const CarPlate = 'B1234'; // FOR TESTING FUNCTION

    useEffect(() => {
        if (CarPlate !== 'Unknown') {
            generatePdf();
        }
    }, [CarPlate]);  // Ensure PDF is generated only when CarPlate is updated

    const generatePdf = () => {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [2598, 1654]
        });

        pdf.advancedAPI(); // Switch to "advanced" mode

        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 14);  // Calculate 14 days in the future
        const year = futureDate.getFullYear();
        const month = futureDate.getMonth() + 1; // Normalize month to 1-based index
        const day = futureDate.getDate();

        pdf.addImage('/car-plate.png', 'PNG', 0, 0, 2598, 1654);

        pdf.setFontSize(250);
        pdf.text(`${year}`, 400, 200, { align: 'center' });
        pdf.text(`${month}`, 1050, 200, { align: 'center' });
        pdf.text(`${day}`, 1550, 200, { align: 'center' });

        pdf.setFontSize(1300);
        const verticalStretchMatrix = new pdf.Matrix(0.5, 0, 0, 1, 0, 0);
        pdf.setCurrentTransformationMatrix(verticalStretchMatrix);  // Apply vertical stretch
        pdf.text(`${CarPlate}`, 1900, 1270);  // Display China car plate
        pdf.compatAPI(); // Switch back to "compat" mode

        const pdfBlob = pdf.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
    };

    return (
        <div>
            <button onClick={generatePdf}>Generate PDF</button>
            {pdfUrl && <iframe src={pdfUrl} title="PDF Display" style={{ height: '1000px', width: '100%' }} />}
        </div>
    );
}

export default PDFGenerator;
