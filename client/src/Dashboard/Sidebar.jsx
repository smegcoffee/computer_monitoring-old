import React, { useState } from 'react';
import smct from '../img/smct.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faDesktop, faQrcode, faWrench } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SideBar() {
  const [dashboardActive, setDashboardActive] = useState(true);
  const [monitoredActive, setMonitoredActive] = useState(false);
  const [qrCodesActive, setQrCodesActive] = useState(false);
  const [unitActive, setUnitActive] = useState(false);
  const [setActive, setSetActive] = useState(false);

  const handleDashboardClick = () => {
    setDashboardActive(true);
    setMonitoredActive(false);
    setQrCodesActive(false);
    setUnitActive(false);
    setSetActive(false);
  };

  const handleMonitoredClick = () => {
    setDashboardActive(false);
    setMonitoredActive(true);
    setQrCodesActive(false);
    setUnitActive(false);
    setSetActive(false);
  };

  const handleQrCodesClick = () => {
    setDashboardActive(false);
    setMonitoredActive(false);
    setQrCodesActive(true);
    setUnitActive(false);
    setSetActive(false);
  };

  const handleUnitClick = () => {
    setDashboardActive(false);
    setMonitoredActive(false);
    setQrCodesActive(false);
    setUnitActive(true);
    setSetActive(false);
  };

  const handleSetClick = () => {
    setDashboardActive(false);
    setMonitoredActive(false);
    setQrCodesActive(false);
    setUnitActive(false);
    setSetActive(true);
  };

  return (
    <div className='w-96 h-full'>
      <div>
        <img src={smct} alt="SMCT Logo" className='w-72 h-32 ml-10 pt-5 block'></img>
      </div>
      <div className='ml-10 mt-5'>
        <Link to="/dashboard"> <p
          className={`text-2xl font-semibold pl-5 pt-0.5 ${
            dashboardActive ? 'bg-blue-500 text-white' : ''
          } rounded-3xl h-10 cursor-pointer`}
          onClick={handleDashboardClick}
        >
          <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
        </p> </Link>
        <Link to="/computers">
        <p
          className={`text-2xl font-semibold mt-5 pl-5 pt-0.5 ${
            monitoredActive ? 'bg-blue-500 text-white' : ''
          } rounded-3xl h-10 cursor-pointer`}
          onClick={handleMonitoredClick}
        >
          <FontAwesomeIcon icon={faDesktop} /> Monitored Computers
        </p>
        </Link>
        <Link to="/qr">
        <p
          className={`text-2xl font-semibold mt-5 pl-5 pt-0.5 ${
            qrCodesActive ? 'bg-blue-500 text-white' : ''
          } rounded-3xl h-10 cursor-pointer`}
          onClick={handleQrCodesClick}
        >
          <FontAwesomeIcon icon={faQrcode} /> Scan QR Codes
        </p>
        </Link>
        <p className={`text-2xl font-semibold mt-5 pl-5 pt-0.5 rounded-3xl h-10 cursor-default`}>
          <FontAwesomeIcon icon={faWrench} /> Setup
        </p>
        <Link to="/unit">
        <p
          className={`text-2xl font-semibold mt-5 pl-8 pt-0.5 ${
            unitActive ? 'bg-blue-500 text-white' : ''
          } rounded-tr-none rounded-bl-none rounded-tl-full rounded-br-full h-10 w-48 ml-20 cursor-pointer`}
          onClick={handleUnitClick}
        >
         Setup Unit
        </p>
        </Link>
        <Link to= "/set">
        <p
          className={`text-2xl font-semibold mt-5 pl-8 pt-0.5 ${
            setActive ? 'bg-blue-500 text-white' : ''
          } rounded-tl-none rounded-br-none rounded-tr-full rounded-bl-full h-10 w-72 ml-20 cursor-pointer`}
          onClick={handleSetClick}
        >
          Setup Computer Set
        </p>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
