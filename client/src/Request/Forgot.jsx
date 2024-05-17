import React, { useState } from 'react';
import smct from '../img/smct.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import bg from '../img/bg.png';
//import { Link } from 'react-router-dom';


function Placeholder({ texts }) {
    const [inputValues, setInputValues] = useState(texts.map(() => ''));
  
    const handleChange = (index, event) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = event.target.value;
      setInputValues(newInputValues);
    };
  
    return (
      <div className="rounded p-4 w-full max-w-md mt-10">
        {texts.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            <span className="mr-2 text-gray-400">{item.icon}</span>
            <input
              type="text"
              className="w-full h-12 px-4 rounded-md border border-gray-300"
              placeholder={item.text}
              value={inputValues[index]}
              onChange={(event) => handleChange(index, event)}
            />
          </div>
        ))}
      </div>
    );
  }

function Backg() {
    return (
        <div className='absolute inset-0 bg-cover bg-center' style={{backgroundImage: `url(${bg})`, zIndex: -1}}> 
            <div className='absolute inset-0 bg-white opacity-90'></div>
        </div>
    );
}

function Forgot(){
    return(
        <div> 
            <Backg/>
            <div className='flex flex-col items-center pt-20' style={{zIndex: 1}}>
                <img src={smct} alt="SMCT Logo" className='w-72 h-32 m-0 block'></img>
                <h1 className="text-4xl font-bold mt-5">COMPUTER MONITORING SYSTEM</h1>
                <h1 className="text-4xl font-medium mt-2">Reset Password</h1>
                <Placeholder texts={[{ icon: <FontAwesomeIcon icon={faEnvelope} />, text: 'Email' }]} />
                <button className='mt-2 h-10 rounded-full font-semibold bg-blue-800 text-white' style={{width: '192px'}}>GET NEW PASSWORD</button>
            </div>
        </div>
    );
}

export default Forgot;

//You will be redirected to this page upon clicking Forgot Password? in the Log In Form