import React, { useEffect } from 'react';
import '../../styles/Printing.css';
import header from '../../img/headerForPrinting.png';

const PrintInformation = () => {

    useEffect(() => {
        const handleAfterPrint = () => {
          window.location.href = "/computers";
        };
    
        window.onload = () => {
          window.print();
          window.onafterprint = handleAfterPrint;
        };
    
        return () => {
          window.onload = null;
          window.onafterprint = null;
        };
      }, []);

  return (
    <div>
        <img src={header} alt='Header'/>
      <h1>Printable Content</h1>
      <p>This is the content that will be printed.</p>
    </div>
  );
};

export default PrintInformation;