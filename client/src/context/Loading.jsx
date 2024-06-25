import React, { useEffect, useState } from 'react';
import smct from '../img/smct.png';

const Loading = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {loading ? (
                <>
                    <img src={smct} style={{ width: '600px' }} alt='Logo' />
                    <div className="flex items-center justify-center mt-5 space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                    <p className='text-xl mt-5'><strong>Loading...</strong></p>
                </>
            ) : (
                <p className='text-xl mt-5'><strong>Loaded!</strong></p>
            )}
        </div>
    );
};

export default Loading;
