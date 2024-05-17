import React from 'react';
import SideBar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import BarGraph from './Bargraph';
import BarGraphB from './BargraphB';

function Header(){
    return(
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

function DashBoard() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <div>
                    <SideBar />
                </div>
                <div style={{ flex: 2, paddingBottom: '50px'}}>
                    <p className='font-normal text-2xl pt-10 ml-10'>Dashboard</p>
                    <p className='font-light text-lg ml-10'>Home</p>
                    <br/> <br/>
                    <div className='w-11/12 ml-10'>
                    <p className='font-light text-2xl mb-5'>This Month</p>
                    <BarGraph/> <br/> <br/> <br/>
                    <p className='font-light text-2xl mb-5' style={{marginTop: '-70px'}}>This Year</p>
                    <BarGraphB/>
                    </div>
                </div>
                <div style={{ flex: 'none'}}>
                    <p className='font-normal text-xl pt-10 pr-10'>Welcome, <Link to="/profile"><b>Angeleen Darunday</b></Link></p>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;