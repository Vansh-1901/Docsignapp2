import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './SignPad.css';

const SignPad = ({ setSignatureType, setSignatureData }) => {
  const canvasRef = useRef();

  const clearPad = () => {
    canvasRef.current.clear();
  };
  const BackSigning = () => {
    window.location.href = '/viewPdf';
  };  

  const handleSubmit = () => {
    if (canvasRef.current.isEmpty()) return alert('Please draw your signature');
    const dataUrl = canvasRef.current.getCanvas().toDataURL('image/png');

    setSignatureType('image');
    setSignatureData(dataUrl);
  };

  return (
    <div>
      <h2>Draw Your Signature</h2>
      <SignatureCanvas
        ref={canvasRef}
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
      />
      <button onClick={clearPad}>Clear</button>
      <button onClick={handleSubmit}>Submit</button>
       <button onClick={BackSigning}>Back to option</button>
    </div>
  );
};

export default SignPad;
