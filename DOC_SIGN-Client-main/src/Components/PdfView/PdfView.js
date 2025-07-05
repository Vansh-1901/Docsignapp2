
import React, { useState } from 'react';
import './PdfView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom'; // ✅ correct import

function PdfView() {
    const [pdfFile, setPdfFile] = useState(null);
    const fileType = ['application/pdf'];
    const navigate = useNavigate(); // ✅ correct usage

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (fileType.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = () => {
                    setPdfFile(reader.result);
                };
            } else {
                alert('Please select a valid PDF file');
                setPdfFile(null);
            }
        } else {
            alert('Please select a file');
            setPdfFile(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pdfFile) {
            localStorage.setItem('uploadedPdf', pdfFile);
            navigate('/viewPdf'); // ✅ go to route
        } else {
            alert('Please select a PDF file before uploading');
        }
    };

    return (
        
        <div className="container-pdf-view">
            <h1> SIGN PDF </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    className="pdf-form-control"
                    onChange={handleChange}
                    accept=".pdf"
                />
                <button type="submit" className="btn btn-primary mt-3">
                    Upload PDF
                </button>
            </form>
        </div>
    );
}

export default PdfView;
