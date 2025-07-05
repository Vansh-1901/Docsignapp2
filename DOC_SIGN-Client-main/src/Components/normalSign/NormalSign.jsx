import React, { useState, useEffect } from 'react';
import './normalSign.css';

const googleFonts = [
  'Open Sans',
  'Roboto',
  'Lobster',
  'Pacifico',
  'Dancing Script',
  'Playfair Display',
];

const BackSigning = () => {
  window.location.href = '/viewPdf'; 
}
const NormalSign = ({ setSignatureType, setSignatureData }) => {
  const [selectedFont, setSelectedFont] = useState('Open Sans');
  const [name, setName] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(/ /g, '+')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, [selectedFont]);

  const handleSubmit = () => {
    if (!name) return alert('Please enter a name');
    setSignatureType('text');
    setSignatureData(name);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Normal Signature Preview</h2>

      <div className="form-group mb-4">
        <label htmlFor="fontSelect"><strong>Select Font:</strong></label>
        <select
          id="fontSelect"
          className="form-control"
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
        >
          {googleFonts.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      <div className="form-group mb-3">
        <label><strong>Name:</strong></label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ fontFamily: selectedFont, fontSize: '24px' }}
        />
      </div>

      <label><strong>Preview:</strong></label>
      <div
        style={{
          fontFamily: selectedFont,
          fontSize: '28px',
          border: '1px dashed #ccc',
          padding: '10px',
          textAlign: 'center',
          background: '#f8f9fa',
        }}
        className="text-center rounded"
      >
        {name || 'Your Signature Preview'}
      </div>

      <div className="btn-control d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-secondary" onClick={() => setName('')}>Clear</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        <button className="btn btn-primary" onClick={BackSigning}>Back to option</button>
      </div>
    </div>
  );
};

export default NormalSign;