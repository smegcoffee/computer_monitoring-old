import React from 'react';
import smct from '../img/smct.png';

const Loading = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <img src={smct} style={{ width: '600px' }} />
                <div className="flex space-x-4 mt-5">
                    <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
                <p className='text-xl'><strong>Loading...</strong></p>
            </div>
        </>
    );
};

export default Loading;