import React, { useState } from 'react';
import { FormControl, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import smct from '../img/smct.png';
import bg from '../img/bg.png';

function Backg() {
    return (
        <div className='absolute inset-0 bg-cover bg-center' style={{backgroundImage: `url(${bg})`, zIndex: -1}}> 
            <div className='absolute inset-0 bg-white opacity-90'></div>
        </div>
    );
}

function Forgot(){
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit =async ()=> {
    try{
        const generatedPassword = generatePassword();

        const response = await axios.post('/api/sendpass', { email, password: generatedPassword});
        console.log(response.data);
        alert('Check your email.');
        navigate('/login');
    } catch (error) {
        console.error(error);
        alert('ERROR!');
    }
  };

  const generatePassword =()=> {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
  };

    return(
        <div> 
            <Backg/>
            <div className='flex flex-col items-center pt-20' style={{zIndex: 1}}>
                <img src={smct} alt="SMCT Logo" className='w-72 h-32 m-0 block'></img>
                <h1 className="text-4xl font-bold mt-5">COMPUTER MONITORING SYSTEM</h1>
                <h1 className="text-4xl font-medium mt-2 mb-10">Reset Password</h1>
                <form onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    type='email'
                    variant='outlined'
                    value={email}
                    onChange={handleEmailChange}
                  /> <br/>
                  <div className='flex justify-center'>
                <button type='button' onClick={handleSubmit} className='mt-3 h-10 rounded-full font-semibold bg-blue-800 text-white' style={{width: '192px'}}>GET NEW PASSWORD</button>
                </div>
                </FormControl>
                </form>
            </div>
        </div>
    );
}

export default Forgot;