import React from 'react';
import smct from '../img/smct.png';
import Placeholder from './Placeholder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import bg from '../img/bg.png';

function Backg() {
    return (
        <div className='absolute inset-0 bg-cover bg-center' style={{backgroundImage: `url(${bg})`, zIndex: -1}}> 
            <div className='absolute inset-0 bg-white opacity-90'></div>
        </div>
    );
}

function Reset(){
    return(
        <div> 
            <Backg/>
            <div className='flex flex-col items-center pt-20' style={{zIndex: 1}}>
                <img src={smct} alt="SMCT Logo" className='w-72 h-32 m-0 block'></img>
                <h1 className="text-4xl font-bold mt-5">COMPUTER MONITORING SYSTEM</h1>
                <h1 className="text-4xl font-medium mt-2">Reset Password</h1>
                <Placeholder texts={[{ icon: <FontAwesomeIcon icon={faLock} />, text: 'New Password' }, { icon: <FontAwesomeIcon icon={faLock} />, text: 'Confirm New Password' }]} />
                <button className='mt-2 h-10 rounded-full font-semibold bg-blue-800 text-white' style={{width: '192px'}}>RESET PASSWORD</button>
            </div>
        </div>
    );
}

export default Reset;
