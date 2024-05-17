import React, { useState } from 'react';
import smct from '../img/smct.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


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

function Placeholder() {
    const [inputValues, setInputValues] = useState(['', '', '', '', '', '', '', '']);
  
    const handleChange = (index, event) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = event.target.value;
      setInputValues(newInputValues);
    };
  
    return (
      <div className="rounded p-4 w-full max-w-2xl mt-10">
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-1/2 h-12 px-4 rounded-md border border-gray-300 mr-2"
            placeholder="First Name"
            value={inputValues[0]}
            onChange={(event) => handleChange(0, event)}
          />
          <input
            type="text"
            className="w-1/2 h-12 px-4 rounded-md border border-gray-300 ml-2"
            placeholder="Last Name"
            value={inputValues[1]}
            onChange={(event) => handleChange(1, event)}
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-1/2 h-12 px-4 rounded-md border border-gray-300 mr-2"
            placeholder="Contact Number"
            value={inputValues[2]}
            onChange={(event) => handleChange(2, event)}
          />
          <input
            type="text"
            className="w-1/2 h-12 px-4 rounded-md border border-gray-300 ml-2"
            placeholder="Email"
            value={inputValues[3]}
            onChange={(event) => handleChange(3, event)}
          />
        </div>
        <div className="flex items-center mb-4">
          <select
            className="w-full h-12 px-4 rounded-md border border-gray-300"
            value={inputValues[4]}
            onChange={(event) => handleChange(4, event)}
          >
            <option value="" disabled selected hidden>Select Branch Code</option>
            <option value="BOHL">BOHL</option>
            <option value="DSMT">DSMT</option>
            <option value="DSMT2">DSMT2</option>
            <option value="DSMAO">DSMAO</option>
            <option value="DSMBN">DSMBN</option>
            {/* Add your dropdown options here */}
          </select>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-full h-12 px-4 rounded-md border border-gray-300"
            placeholder="Username"
            value={inputValues[5]}
            onChange={(event) => handleChange(5, event)}
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="password"
            className="w-full h-12 px-4 rounded-md border border-gray-300"
            placeholder="Password"
            value={inputValues[6]}
            onChange={(event) => handleChange(6, event)}
          />
        </div>
        <div className="flex items-center">
          <input
            type="password"
            className="w-full h-12 px-4 rounded-md border border-gray-300"
            placeholder="Confirm Password"
            value={inputValues[7]}
            onChange={(event) => handleChange(7, event)}
          />
        </div>
      </div>
    );
  }
  
  const Profile = () => {
    const openFile = () => {
      // Replace 'filePath' with the URL of the file you want to open
      const filePath = 'https://example.com/file'; // Example URL
      window.open(filePath, '_blank');
    };
  
    // Example profile picture URL
    const profilePictureUrl = 'https://example.com/profile-picture.jpg';
  
    return (
      <div>
        <Header />
        <div>
          <img src={smct} alt="SMCT Logo" className='w-72 h-32 ml-10 pt-5 block' />
        </div>
        <div className='flex justify-center items-center'>
          <div className='border w-64 h-64 rounded-xl p-4 shadow-xl'>
            <div className="flex justify-center items-center">
              {/* Display profile picture */}
              <img src={profilePictureUrl} alt="Profile" className="w-36 h-36 rounded-full" />
            </div>
            <p className='text-center font-normal text-gray-600 bg-gray-100 hover:bg-gray-300 cursor-pointer' onClick={openFile}>
              Change Photo
              <FontAwesomeIcon icon={faCamera} className='pl-2'/>
            </p>
            <p className='text-center font-semibold text-lg pt-2'>Angeleen Darunday</p>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <Placeholder />
        </div>
        <div className='flex justify-center items-center'>
          <div className='flex gap-2 pb-10'>
            <Link to="/dashboard"><button className='mt-10 w-44 h-10 rounded-xl font-semibold bg-gray-600 text-white'>Cancel</button></Link>
            <button className='mt-10 w-44 h-10 rounded-xl font-semibold bg-blue-600 text-white'>Save Changes</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;