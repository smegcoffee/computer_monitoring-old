import React, { useState, useEffect, useRef } from 'react';
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

const SearchableDropdown = ({ options, placeholder, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    setIsOpen(true);
  };

  const handleSelectOption = (option) => {
    setSearchTerm(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="flex items-center mb-4 relative">
      <input
        type="text"
        className="w-full h-12 px-4 rounded-md border border-gray-300"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 top-full">
          {filteredOptions.map(option => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

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
        <SearchableDropdown
            options={["BOHL", "DSMT", "DSMT2", "DSMAO", "DSMBN"]}
            placeholder="Select Branch Code"
            onSelect={(option) => {
              const event = { target: { value: option } };
              handleChange(4, event);
            }}
          />
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
  
  class OpenFolder extends React.Component {
    handleClick = () => {
      // Trigger file explorer opening
      this.openFileExplorer();
    }
  
    openFileExplorer() {
      // Code to open file explorer will depend on browser/OS
      // For security reasons, browsers don't allow direct control over the file system
      // However, you can simulate this behavior by allowing the user to choose files using <input type="file"> element
  
      // Example:
      const input = document.createElement('input');
      input.type = 'file';
      input.click();
    }
  
    render() {
      return (
        <div className="folder" onClick={this.handleClick}>
            <p className='text-center font-normal text-gray-600 bg-gray-100 hover:bg-gray-300 cursor-pointer'>
              Change Photo
              <FontAwesomeIcon icon={faCamera} className='pl-2'/>
            </p>
        </div>
      );
    }
  }

  const Profile = () => {
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
            <OpenFolder/>
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