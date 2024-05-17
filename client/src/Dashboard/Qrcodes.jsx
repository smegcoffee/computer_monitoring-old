import React, { useState } from 'react';
import SideBar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faRightFromBracket, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';


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
    const [dragging, setDragging] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [scanResult, setScanResult] = useState('');

    // eslint-disable-next-line
    const toggleCamera = () => {
        setShowCamera(!showCamera);
    };

    const handleScan = (data) => {
        if (data) {
            setScanResult(data);
        }
    };
    
    const handleError = (err) => {
        console.error(err);
    };    

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const files = Array.from(e.dataTransfer.files);
        // Handle file upload
        handleUpload(files);
    };

    const handleUpload = (files) => {
        // Implement your file upload logic here
        console.log(files);
    };

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
                        <h1 className='font-normal text-xl'>Scan QR Code from Image</h1>
                    </div>
                    <div className= 'mx-auto border border-l-slate-700 border-r-slate-700 border-t-transparent rounded-3xl border-b-slate-700 my-auto mt-4' style={{ height: '500px', width: '800px' }}>
                        <p className= 'border rounded-3xl h-8 bg-red-600' style={{ width: '800px' }}></p>
                        <div className='flex justify-center items-center'>
                        <div className={`border border-dashed border-slate-900 rounded-3xl mt-8 ${dragging ? 'bg-gray-200' : ''}`} style={{ width: '650px', height: '400px' }}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}>
                            <div className='text-center'>
                                <FontAwesomeIcon icon={faUpload} className='w-64 h-36 mt-16 text-amber-600'></FontAwesomeIcon>
                                <h1 className='font-semibold text-lg mt-4'>Drag & Drop or Browse</h1>
                                <h1 className='font-light text-lg'><i>All image types allowed.</i></h1>
                                </div>
                        </div>
                        </div>
                    </div>
                    <div className='flex text-center justify-center items-center'>
                        <h1 className='font-normal text-xl mt-8'>Cam QR Code Scanner</h1>
                    </div>
                    <div className= 'mx-auto border border-l-slate-700 border-r-slate-700 border-t-transparent rounded-3xl border-b-slate-700 my-auto mt-4' style={{ height: '550px', width: '800px' }}>
                        <p className= 'border rounded-3xl h-8 bg-blue-600' style={{ width: '800px' }}></p>
                        <div className='flex justify-center items-center'>
                        <div className='border border-slate-200 rounded-3xl mt-8' style={{ width: '650px', height: '400px' }}>
                            {/* Display camera if showCamera is true */}
                            {showCamera && (
                                <div className='text-center'>
                                    <QrReader
                                        delay={300}
                                        onError={handleError}
                                        onScan={handleScan}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            )}
                            {/* Display scan result */}
                        {scanResult && (
                            <p>Scanned QR code: {scanResult}</p>
                        )}
                        </div>
                        </div>
                        <div className='flex justify-center items-center'>
                        <button 
                            className='text-center align-middle rounded-lg bg-cyan-600 text-white mt-3 pb-1 font-normal text-3xl' 
                            style={{ width: '650px', height: '45px'}}
                        >
                            <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon> {showCamera ? "Close Camera" : "Open Camera"}
                        </button>  
                        </div>
                    </div>
                </div>
                <div style={{ flex: 'none', height: '100px' }}>
                    <p className='font-normal text-xl pt-10 pr-10'>Welcome, <Link to="/profile"><b>Angeleen Darunday</b></Link></p>
                </div>
            </div>
        </div>
    );
}

export default QrC;