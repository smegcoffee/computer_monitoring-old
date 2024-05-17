import React, { useState, useEffect, useRef } from 'react';
import smct from '../img/smct.png';
import bg from '../img/bg.png';
import { Link } from 'react-router-dom';


//This is for the Searchable Dropdown

const SearchableDropdown = ({ options, placeholder, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if click occurs outside of it
      }
    };

    // Attach event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      // Remove event listener when dropdown is closed
      document.removeEventListener('click', handleClickOutside);
    }

    // Cleanup function to remove event listener on unmount
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

// END OF THE SEARCHABLE DROPDOWN

function Backg() {
  return (
    <div className='absolute inset-0 bg-cover bg-center' style={{backgroundImage: `url(${bg})`, zIndex: -1}}> 
      <div className='absolute inset-0 bg-white opacity-90'></div>
    </div>
  );
}

function SignUp(){
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '', '', '']);
  const [passwordPlaceholders, setPasswordPlaceholders] = useState(["Password", "Confirm Password"]);
  const [emailError, setEmailError] = useState(''); // Define emailError state

  const handleChange = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

      // Function to validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    if (validateEmail(email)) {
      setEmailError('');
    } else {
      setEmailError('Please enter a valid email address.');
    }
    handleChange(3, event); // Update input value
  };


  // For the Password to be not visible when typing

  const handlePasswordBlur = (index) => {
    const newInputValues = [...inputValues];
    const newPlaceholders = [...passwordPlaceholders];
  
    if (!newInputValues[index]) {
      newPlaceholders[index] = "••••••••••"; // Placeholder text as dots
      setPasswordPlaceholders(newPlaceholders);
    }
  };
  
  const handlePasswordChange = (index, event) => {
    const newInputValues = [...inputValues];
    const newPlaceholders = [...passwordPlaceholders];
  
    newInputValues[index] = event.target.value;
  
    if (!newInputValues[index]) {
      newPlaceholders[index] = "••••••••••"; // Placeholder text as dots
      setPasswordPlaceholders(newPlaceholders);
    } else {
      newPlaceholders[index] = ""; // Clear placeholder if there is input
      setPasswordPlaceholders(newPlaceholders);
    }
  
    setInputValues(newInputValues);
  };  

  const handleConfirmPasswordFocus = (index) => {
    // Function implementation, if needed
  };
  
  const handleConfirmPasswordBlur = (index) => {
    const newInputValues = [...inputValues];
    const newPlaceholders = [...passwordPlaceholders];
  
    if (!newInputValues[index]) {
      newPlaceholders[index] = "••••••••••"; // Placeholder text as dots
      setPasswordPlaceholders(newPlaceholders);
    }
  };
  
  const handleConfirmPasswordChange = (index, event) => {
    const newInputValues = [...inputValues];
    const newPlaceholders = [...passwordPlaceholders];
  
    newInputValues[index] = event.target.value;
  
    if (!newInputValues[index]) {
      newPlaceholders[index] = "••••••••••"; // Placeholder text as dots
      setPasswordPlaceholders(newPlaceholders);
    } else {
      newPlaceholders[index] = ""; // Clear placeholder if there is input
      setPasswordPlaceholders(newPlaceholders);
    }
  
    setInputValues(newInputValues);
  };  
  
  // END OF THE ENCRYPTED PASSWORD

  return (
    <div> 
      <Backg/>
      <div className='flex flex-col items-center pt-20' style={{zIndex: 1}}>
        <img src={smct} alt="SMCT Logo" className='w-72 h-32 m-0 block'></img>
        <h1 className="text-4xl font-bold mt-5">COMPUTER MONITORING SYSTEM</h1>
        <h1 className="text-4xl font-medium mt-2">Sign Up</h1>
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
                  <div className="flex flex-col mb-4">
          <div className="flex items-center">
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
              onChange={handleEmailChange}
            />
          </div>
          {emailError && <p className="text-red-500 text-xs mt-1" style={{marginLeft: '340px'}}>{emailError}</p>}
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
        placeholder={passwordPlaceholders[0]}
        value={inputValues[6]}
        onChange={(event) => handlePasswordChange(6, event)}
        onBlur={() => handlePasswordBlur(6)}
        />
          </div>
          <div className="flex items-center">
          <input
          type="password"
          className="w-full h-12 px-4 rounded-md border border-gray-300"
          placeholder={passwordPlaceholders[1]}
          value={inputValues[7]}
          onChange={(event) => handleConfirmPasswordChange(7, event)}
          onFocus={() => handleConfirmPasswordFocus(7)}
          onBlur={() => handleConfirmPasswordBlur(7)}
        />

          </div>
        </div>
        <Link to="/login"><button className='mt-10 w-32 h-10 rounded-full font-semibold bg-blue-800 text-white'>SIGN UP</button></Link>
        <p className='mt-5'>Already have an account? <Link to="/login" className='text-blue-800'>Log In</Link></p>
      </div>
    </div>
  );
}

export default SignUp;