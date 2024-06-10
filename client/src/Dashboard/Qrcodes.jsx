import React from 'react';
import SideBar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
//import { QrReader } from 'react-qr-reader';
import Codes from './Codes';


function Header() {
    return (
        <div>
            <div className='h-20 bg-blue-800 w-full flex justify-between items-center'>
                <div className='flex-grow text-center'>
                    <p className='text-white text-4xl font-bold'>COMPUTER MONITORING SYSTEM</p>
                </div>
                <Link to="/login"><FontAwesomeIcon icon={faRightFromBracket} className='text-white mr-8' /> </Link>
            </div>
        </div>
    );
}

function QrC() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <div>
                    <SideBar />
                </div>
                <div style={{ flex: 2, paddingBottom: '50px' }}>
                    <p className='font-normal text-2xl pt-10 ml-10'>Scan QR Codes</p>
                    <p className='font-light text-lg ml-10'><Link to="/dashboard" className='text-blue-800'>Home</Link> &gt; Scan QR</p>
                    <br /> <br />
                    <div className='flex text-center justify-center items-center'>
                        <Codes/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QrC;