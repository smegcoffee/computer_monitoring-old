import React, { useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import smct from '../img/smct.png';
import bg from '../img/bg.png';
import { InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import axios from 'axios';

function Backg() {
    return (
        <div className='absolute inset-0 bg-cover bg-center' style={{backgroundImage: `url(${bg})`, zIndex: -1}}>
            <div className='absolute inset-0 bg-white opacity-90'></div>
        </div>
    );
}

function Reset(){
    const {code} = useParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState(null);

    const handleClickShowPassword = () => setShowPassword((show)=> !show);
    const handleClickShowConfirm = () => setShowConfirm((show)=> !show);

    const handleMouseDownPassword = (event)=> {
        event.preventDefault();
    };

    const handleChangePassword = (event) => {
      setPassword(event.target.value);
    }

    const handleChangeConfirm = (event) => {
      setConfirm(event.target.value);
    }

    const handleResetPassword = async (event) => {
      event.preventDefault();

      try{
      if (!password || !confirm) {
        setError('Please fill in all fields!');
        return;
      }
      if (password.length < 6){
        setError('Password must be at least 6 characters long!');
        return;
      }
      if (password !== confirm){
        setError('Password did not match!');
        return;
      }
      const response = await axios.post('/api/reset-pass', { code, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Password reset successful: ', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error resetting password: ', error);
    }
      setPassword('');
      setConfirm('');
      setError(null);
    };

    return(
        <div> 
            <Backg/>
            <div className='flex flex-col items-center pt-20' style={{zIndex: 1}}>
                <img src={smct} alt="SMCT Logo" className='w-72 h-32 m-0 block'></img>
                <h1 className="text-4xl font-bold mt-5">COMPUTER MONITORING SYSTEM</h1>
                <h1 className="text-4xl font-medium mt-2 mb-10">Reset Password</h1>
        <form onSubmit={handleResetPassword}>
        <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl> <br/>
        <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-confirm">Confirm Password</InputLabel>
          <OutlinedInput
          id='outlined-adornment-confirm'
          type={showConfirm ? 'text' : 'password'}
          value={confirm}
          onChange={handleChangeConfirm}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowConfirm}
              edge="end"
              >
                {showConfirm ? <VisibilityOff/> : <Visibility/>}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
          />
          </FormControl> <br/>
          <div className='text-red-500 text-sm ml-5'>
          {error ? error : null}
          </div>
              <div className='flex justify-center'>
                <button type="submit" className='mt-5 h-10 rounded-full font-semibold bg-blue-800 text-white' style={{width: '192px'}}>RESET PASSWORD</button>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Reset;
