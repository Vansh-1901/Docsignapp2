
import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import './PdfViewPage.css';
import Sign from '../SignOption/Sign';

function PdfViewPage() {
  const plugin = defaultLayoutPlugin();
  const pdfUrl = localStorage.getItem('uploadedPdf');

  const [signatureType, setSignatureType] = useState(null); // 'text' or 'image'
  const [signatureData, setSignatureData] = useState(null); // text or image URL
  const [position, setPosition] = useState({ x: 50, y: 100 });

  const handleDragEnd = (e) => {
    const rect = e.target.parentNode.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left - 50,
      y: e.clientY - rect.top - 20,
    });
  };

  const downloadSignedPdf = async () => {
    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const pdfHeight = firstPage.getHeight();

    if (signatureType === 'text') {
      const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      firstPage.drawText(signatureData, {
        x: position.x,
        y: pdfHeight - position.y,
        size: 24,
        font,
        color: rgb(0, 0, 0),
      });
    } else if (signatureType === 'image') {
      const imageBytes = await fetch(signatureData).then((res) => res.arrayBuffer());
      const pngImage = await pdfDoc.embedPng(imageBytes);
      const dims = pngImage.scale(0.5);
      firstPage.drawImage(pngImage, {
        x: position.x,
        y: pdfHeight - position.y,
        width: dims.width,
        height: dims.height,
      });
    }

    const modifiedPdf = await pdfDoc.save();
    const blob = new Blob([modifiedPdf], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'signed-document.pdf';
    link.click();
  };

  return (
    <div className="pdf-sign-wrapper">
      <div className="pdf-section">
        <Worker workerUrl={pdfjsWorker}>
          {pdfUrl ? (
            <div style={{ position: 'relative' }}>
              <Viewer fileUrl={pdfUrl} plugins={[plugin]} />
              {signatureData && (
                <div
                  draggable
                  onDragEnd={handleDragEnd}
                  style={{
                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                    cursor: 'move',
                    fontSize: '24px',
                    fontFamily: 'Open Sans',
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    padding: '6px',
                    border: '1px dashed gray',
                  }}
                >
                  {signatureType === 'text' ? (
                    signatureData
                  ) : (
                    <img src={signatureData} alt="Signature" width={150} />
                  )}
                </div>
              )}
            </div>
          ) : (
            <p>No PDF found</p>
          )}
        </Worker>
      </div>

      <div className="sign-section">
        <Sign
          setSignatureData={setSignatureData}
          setSignatureType={setSignatureType}
        />
        {signatureData && (
          <button className="btn btn-success mt-3" onClick={downloadSignedPdf}>
            Save to PDF
          </button>
        )}
      </div>
    </div>
  );
}

export default PdfViewPage;
