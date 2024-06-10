import React, { useState, useEffect } from 'react';
import smct from '../img/smct.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faDesktop, faQrcode, faWrench } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SideBar() {
  const [activeItem, setActiveItem] = useState();

  useEffect(() => {
    switch (window.location.pathname) {
      case '/dashboard':
        setActiveItem('dashboard');
        break;
      case '/computers':
        setActiveItem('computers');
        break;
      case '/qr':
        setActiveItem('qr');
        break;
      case '/unit':
        setActiveItem('unit');
        break;
      case '/set':
        setActiveItem('set');
        break;
      default:
        setActiveItem('dashboard');
    }
  }, []);

  return (
    <div className="sidebar">
    <div className= 'w-72 h-full'>
      <div>
        <img src={smct} alt="SMCT Logo" className='w-64 h-28 ml-10 pt-5 block'></img>
      </div>
      <div className='ml-10 mt-5'>
        <Link to="/dashboard">
          <button className={`text-lg font-medium pl-5 pt-0.5 w-full text-justify ${activeItem === 'dashboard' ? 'bg-blue-500 text-white active' : ''} rounded-3xl h-10 cursor-pointer`}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </button>
        </Link>
        <Link to="/computers">
          <button className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify ${activeItem === 'computers' ? 'bg-blue-500 text-white active' : ''} rounded-3xl h-10 cursor-pointer`}>
            <FontAwesomeIcon icon={faDesktop} /> Monitored Computers
          </button>
        </Link>
        <Link to="/qr">
          <button className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify ${activeItem === 'qr' ? 'bg-blue-500 text-white active' : ''} rounded-3xl h-10 cursor-pointer`}>
            <FontAwesomeIcon icon={faQrcode} /> Scan QR Codes
          </button>
        </Link>
        <p className={`text-lg font-medium mt-5 pl-5 pt-0.5 rounded-3xl h-10 cursor-default`}>
          <FontAwesomeIcon icon={faWrench} /> Setup
        </p>
        <Link to="/unit">
          <button className={`text-lg font-medium mt-5 pl-8 text-justify pt-0.5 ${activeItem === 'unit' ? 'bg-blue-500 text-white active' : ''} rounded-tr-none rounded-bl-none rounded-tl-full rounded-br-full h-10 w-40 ml-8 cursor-pointer`}>
            Setup Unit
          </button>
        </Link>
        <Link to="/set">
          <button className={`text-lg font-medium mt-5 pl-8 text-justify pt-0.5 ${activeItem === 'set' ? 'bg-blue-500 text-white active' : ''} rounded-tl-none rounded-br-none rounded-tr-full rounded-bl-full h-10 w-56 ml-8 cursor-pointer`}>
            Setup Computer Set
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default SideBar;