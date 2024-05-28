import React, { useState } from 'react';
import smct from '../img/smct.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import bg from '../img/bg.png';
import { Link } from 'react-router-dom';

// Component for rendering input fields with icons
function InputField({ icon, text, value, onChange }) {
  return (
    <div className="flex items-center mb-4">
      <span className="mr-2 text-gray-400">{icon}</span>
      <input
        type={text === 'Password' ? 'password' : 'text'}
        className="w-full h-12 px-4 rounded-md border border-gray-300"
        placeholder={text}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

// Component for rendering the login form
function LoginForm({ fields }) {
  const [inputValues, setInputValues] = useState(fields.map(() => ''));

  // Handler for input change
  const handleChange = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  //Fetch API but will change if will be using Axios
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email= inputValues[0];
    const password = inputValues[1];
    try{
      const response = await fetch('INSERT BACKEND API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      if (response.ok){
        console.log('Login Successfully!');
      } else{
        console.log('Login Failed!');
      }
    } catch (error){
      console.error('Error:', error);
    }
  };

  return (
    <form className="rounded p-4 w-full max-w-md mt-10" onSubmit={handleSubmit}>
      {fields.map((item, index) => (
        <InputField
          key={index}
          icon={item.icon}
          text={item.text}
          value={inputValues[index]}
          onChange={(event) => handleChange(index, event)}
        />
      ))}
      <div className="flex justify-center flex-col items-center">
  <div className="mb-4">
    <Link to="/forgot" className='hover:underline'>Forgot Password?</Link>
  </div>
  <div>
    <button type="submit" className='w-32 h-10 mt-8 rounded-full font-semibold bg-blue-800 text-white'>LOG IN</button>
  </div>
</div>
    </form>
  );
}

function Background() {
  return (
    <div className='absolute inset-0 bg-cover bg-center' style={{backgroundImage: `url(${bg})`, zIndex: -1}}> 
      <div className='absolute inset-0 bg-white opacity-90'></div>
    </div>
  );
}

function LogIn() {
  // Define fields for the login form
  const fields = [
    { icon: <FontAwesomeIcon icon={faEnvelope} />, text: 'Email' },
    { icon: <FontAwesomeIcon icon={faLock} />, text: 'Password' }
  ];

  return (
    <div> 
      <Background/>
      <div className='flex flex-col items-center pt-20' style={{zIndex: 1}}>
        <img src={smct} alt="SMCT Logo" className='w-72 h-32 m-0 block'></img>
        <h1 className="text-4xl font-bold mt-5">COMPUTER MONITORING SYSTEM</h1>
        <h1 className="text-4xl font-medium mt-2">Log In</h1>
        <LoginForm fields={fields} />
        <p className='mt-2'>Do you have an account? <Link to="/signup" className='text-blue-800'>Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LogIn;

//This is the Log In Form