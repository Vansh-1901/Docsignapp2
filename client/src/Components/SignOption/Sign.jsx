
import React, { useState } from 'react';
import './Sign.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaSignature } from 'react-icons/fa';
import NormalSign from '../normalSign/NormalSign';
import SignPad from '../SignPad/SignPad';

function Sign({ setSignatureType, setSignatureData }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="container-signOption mt-4">
      <h2 className="text-center mb-4">Signing Options</h2>

      {!selectedOption && (
        <div className="d-flex justify-content-center mb-4 gap-3">
          <div
            className="card border-danger text-center"
            style={{ width: '200px', cursor: 'pointer' }}
            onClick={() => setSelectedOption('normal')}
          >
            <div className="card-body text-danger">
              <FaSignature size={30} />
              <h5 className="mt-2">Normal Sign</h5>
            </div>
          </div>

          <div
            className="card text-center"
            style={{ width: '200px', cursor: 'pointer' }}
            onClick={() => setSelectedOption('pad')}
          >
            <div className="card-body text-secondary">
              <FaSignature size={30} />
              <h5 className="mt-2">Sign Pad</h5>
            </div>
          </div>
        </div>
      )}

      {selectedOption === 'normal' && (
        <NormalSign setSignatureType={setSignatureType} setSignatureData={setSignatureData} />
      )}
      {selectedOption === 'pad' && (
        <SignPad setSignatureType={setSignatureType} setSignatureData={setSignatureData} />
      )}
    </div>
  );
}

export default Sign;
