import React from 'react';
import QRCode from 'react-qr-code';
import smct from './../../img/smct.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function Qr() {
  return (
    <div className='flex justify-center items-center flex-col'>
      <QRCode value="Your data here" />
      <div>
      <h1 className='font-semibold text-2xl mt-4'>Computer QR Code</h1>
      </div>
    </div>
  );
}

function QrCode({ isOpen, onClose }) {
    if (!isOpen) {
      return null; // Render nothing if isOpen is false
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-2xl shadow-md" style={{width:'700px', maxHeight:'100vh'}}>
          <span className="absolute top-5 right-5 p-2 cursor-pointer text-white" onClick={onClose}>
            <FontAwesomeIcon icon={faClose} className='w-6 h-6'/>
          </span>
          <div className='bg-blue-500 rounded-tr-2xl rounded-tl-2xl max-h-max p-5 flex'>
              <div className='flex-none'>
              <img src={smct} alt="SMCT Logo" className='w-60 h-24 m-0 block'></img>
              </div>
              <div className='flex-2 ml-16 text-white text-3xl mt-8 font-medium'>
                  Computer ID: 00001
              </div>
          </div>
          <div className='mt-6 ml-6 mr-6 mb-4'>
          <Qr/>
          </div>
        </div>
      </div>
    );
  }

export default QrCode;