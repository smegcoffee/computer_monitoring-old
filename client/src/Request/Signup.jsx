import React, { useState, useEffect, useRef } from 'react';
import smct from '../img/smct.png';
import bg from '../img/bg.png';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Swal from 'sweetalert2';


//This is for the Searchable Dropdown

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

// END OF THE SEARCHABLE DROPDOWN

function Backg() {
  return (
    <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${bg})`, zIndex: -1 }}>
      <div className='absolute inset-0 bg-white opacity-90'></div>
    </div>
  );
}

//Sample Data for the Registered User
const user = ([
  {
    firstName: "Noreen Angeleen", lastName: "Darunday", contactNumber: "09485931172", email: "angeleensuarez14@gmail.com",
    branchCode: "HO", username: "noreenangeleen", password: "123456789"
  },
  {
    firstName: "Luffy", lastName: "Monkey", contactNumber: "09484521145", email: "luffy@gmail.com",
    branchCode: "DSMT", username: "kingp", password: "qwertyuiop"
  }
]);

function SignUp() {
  // const [inputValues, setInputValues] = useState(['', '', '', '', '', '', '', '']);
  // const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    branchCode: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [passwordPlaceholders, setPasswordPlaceholders] = useState(["Password", "Confirm Password"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [validationErrors, setValidationErrors] = useState({});


  //Sample Data for the Branch Code Options
  const options = ["BOHL", "DSMT", "HO"];

  // const handleChange = (index, event) => {
  //   const newInputValues = [...inputValues];
  //   newInputValues[index] = event.target.value;
  //   setInputValues(newInputValues);
  //   // console.log(newInputValues);
  // };

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
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
      newPlaceholders[index] = "";
      setPasswordPlaceholders(newPlaceholders);
    }

    setInputValues(newInputValues);
  };

  const handlePasswordConfirmationFocus = (index) => {
    // Function implementation, if needed
  };

  const handlePasswordConfirmationBlur = (index) => {
    const newInputValues = [...inputValues];
    const newPlaceholders = [...passwordPlaceholders];

    if (!newInputValues[index]) {
      newPlaceholders[index] = "••••••••••"; // Placeholder text as dots
      setPasswordPlaceholders(newPlaceholders);
    }
  };

  const handlePasswordConfirmationChange = (index, event) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (let i = 0; i< user.length; i++){
        if (inputValues[3] === user[i].email){
          console.log('Email already registered.');
        setError('Email already registered.');
        setLoading(false);
        return;
        }
      }

      //   const response = await axios.post('/api/register', {
      //       firstName: inputValues[0],
      //       lastName: inputValues[1],
      //       contactNumber: inputValues[2],
      //       email: inputValues[3],
      //       branchCode: inputValues[4],
      //       username: inputValues[5],
      //       password: inputValues[6],
      //       password_confirmation: inputValues[7],
      //   });
      //   console.log(response);

      //   for (let i = 0; i< user.length; i++){
      //     if (inputValues[3] === user[i].email){
      //       console.log('Email already registered.');
      //     setError('Email already registered.');
      //     setLoading(false);
      //     return;
      //     }
      //   }

      //   for (let i = 0; i < inputValues.length; i++) {
      //     if (!inputValues[i]) {
      //         console.log('Please fill in all fields!');
      //         setError('Please fill in all fields!');
      //         setLoading(false);
      //         return;
      //     }
      // }

      //   const emailRegex = /^\S+@\S+\.\S+$/;
      //   if (!emailRegex.test(inputValues[3])) {
      //     console.log('Please enter a valid email address.');
      //     setError('Please enter a valid email address.');
      //     setLoading(false);
      //     return;
      //   }
      //   for (let i = 0; i < user.length; i++) {
      //     if (inputValues[5] === user[i].username) {
      //       console.log('Username is already in use.');
      //       setError('Username is already in use.');
      //       setLoading(false);
      //       return;
      //     }
      //   }      

      //   if (inputValues[6].length < 6){
      //     console.log('Password must be at least 6 characters long.');
      //     setError('Password must be at least 6 characters long.');
      //     setLoading(false);
      //     return;
      //   }

      //   if (inputValues[7] !== inputValues[6]){
      //     console.log('Password did not match.');
      //     setError('Password did not match.');
      //     setLoading(false);
      //     return;
      //   }

      //   if (!options.includes(inputValues[4])){
      //     console.log('No branch code found.');
      //     setError('No branch code found.');
      //     setLoading(false);
      //     return;
      //   }

      //   if (response.status >= 200) {
      //     console.log('Signup successful');
      //     setSuccess('Signup successfully.');
      //     setInputValues(['', '', '', '', '', '', '', '']);
      //     setPasswordPlaceholders(["Password", "Confirm Password"]);
      //   } else{
      //       console.log('Signup failed.');
      //       setError('Signup failed.');
      //   }


      const response = await axios.post('/api/register', inputValues);
      if (response.data.status === true) {
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          confirmButtonColor: '#1e88e5',
          confirmButtonTExt: 'Done',
          html: "You will redirected to Login page <br>Thank you!"
        }).then(function() {
          window.location  = "/login";
        });
        setSuccess(response.data.message);
        setError('');
        setValidationErrors('');
        setInputValues({
          firstName: '',
          lastName: '',
          contactNumber: '',
          branchCode: '',
          username: '',
          email: '',
          password: '',
          password_confirmation: ''
        });
        // navigate('/')
      }
    } catch (error) {
      console.error('Error: ', error)
      setSuccess('');
      if (error.response && error.response.data) {
        console.log('Backend error response:', error.response.data);
        setError(error.response.data.message);
        setValidationErrors(error.response.data.errors || {});
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Backg />
      <div className='flex flex-col items-center pt-20' style={{ zIndex: 1 }}>
        <img src={smct} alt="SMCT Logo" className='w-72 h-32 m-0 block'></img>
        <h1 className="text-4xl font-bold mt-5">COMPUTER MONITORING SYSTEM</h1>
        <h1 className="text-4xl font-medium mt-2">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="rounded p-4 w-full max-w-2xl mt-10">
            <div className="flex items-center mb-4">
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="w-1/2 h-12 px-4 rounded-md border border-gray-300 mr-2"
                placeholder="First Name"
                value={inputValues.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="w-1/2 h-12 px-4 rounded-md border border-gray-300 ml-2"
                placeholder="Last Name"
                value={inputValues.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="text"
                name="contactNumber"
                id="contactNumber"
                className="w-1/2 h-12 px-4 rounded-md border border-gray-300 mr-2"
                placeholder="Contact Number"
                value={inputValues.contactNumber}
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                id="email"
                className="w-1/2 h-12 px-4 rounded-md border border-gray-300 ml-2"
                placeholder="Email"
                value={inputValues.email}
                onChange={handleChange}
              />
            </div>
            <SearchableDropdown
              options={["BOHL", "DSMT", "HO"]} // Example options for branch code
              name="branchCode"
              id="branchCode"
              placeholder="Select Branch Code"
              onSelect={(option) => setInputValues({ ...inputValues, branchCode: option })}
            />
            <div className="flex items-center mb-4">
              <input
                type="text"
                name="username"
                id="username"
                className="w-full h-12 px-4 rounded-md border border-gray-300"
                placeholder="Username"
                value={inputValues.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full h-12 px-4 rounded-md border border-gray-300"
                placeholder="Password"
                value={inputValues.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                className="w-full h-12 px-4 rounded-md border border-gray-300"
                placeholder="Confirm Password"
                value={inputValues.password_confirmation}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="text-center">
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}

            {Object.keys(validationErrors).length > 0 &&
              <div className="text-red-500">
                <ul>
                  {Object.values(validationErrors).flat().map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            }

            <button type='submit' className='mt-10 w-32 h-10 rounded-full font-semibold bg-blue-800 text-white' disabled={loading}>
              {loading ? 'Signing Up...' : 'SIGN UP'}
            </button>
          </div>
        </form>
        <p className='mt-5'>Already have an account? <Link to="/login" className='text-blue-800'>Log In</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
export { user };