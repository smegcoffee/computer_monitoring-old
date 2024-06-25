import React, { useState, useRef, useEffect } from 'react';
import SideBar from '../Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../api/axios';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { data } from '../../data/vacantUnitsData';
import { TableContainer } from '@material-ui/core';

function Header() {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
        return;
      }

      await axios.get('/api/logout', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      window.location = "/login";
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <div>
      <div className='h-20 bg-blue-800 w-full flex justify-between items-center'>
        <div className='flex-grow text-center'>
          <p className='text-white text-4xl font-bold'>COMPUTER MONITORING SYSTEM</p>
        </div>
        <Link onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className='text-white mr-8' /> </Link>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginTop: theme.spacing(3),
    borderRadius: '12px', // Adjust the value according to your preference
  },
  //table: {
  //minWidth: 650,
  //},
}));

const CustomTableB = () => {
  const classes = useStyles();
  const [unit, setUnit] = useState({ data: [] });

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.get('/api/units', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUnit(response.data);
      } catch (error) {
        console.e('Error fetching chart data:', error);
      }
    };

    fetchUnit();
  }, [unit]);
  return (
    <div className={`${classes.root} border border-transparent rounded-xl shadow-lg max-h-max w-full mt-3`}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className='bg-red-200'>
            <TableCell align='center'>
              <p className='font-semibold text-base mt-1.5'>UNIT CODE</p>
            </TableCell>
            <TableCell align='center'>
              <p className='font-semibold text-base mt-1.5'>DATE OF PURCHASE</p>
            </TableCell>
            <TableCell align='center'>
              <p className='font-semibold text-base mt-1.5'>CATEGORY</p>
            </TableCell>
            <TableCell align='center'>
              <p className='font-semibold text-base mt-1.5'>DESCRIPTION</p>
            </TableCell>
            <TableCell align='center'>
              <p className='font-semibold text-base mt-1.5'>SUPPLIER</p>
            </TableCell>
            <TableCell align='center'>
              <p className='font-semibold text-base mt-1.5'>SERIAL NO.</p>
            </TableCell>
            <TableCell align='center'>
              <p className='font-semibold text-base mt-1.5'>STATUS</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {unit.data && unit.data.length > 0 ? (
            unit.data.map((data, index) => (
              <TableRow key={index}>
                <TableCell align="center">{data.unit_code}</TableCell>
                <TableCell align="center">{format(new Date(data.date_of_purchase), 'yyyy-MM-dd')}</TableCell>
                <TableCell align="center">{data.category ? data.category.category_name : 'N/A'}</TableCell>
                <TableCell align="center">{data.description}</TableCell>
                <TableCell align="center">{data.supplier ? data.supplier.supplier_name : 'N/A'}</TableCell>
                <TableCell align="center">{data.serial_number}</TableCell>
                <TableCell align="center">{data.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">No units found</TableCell>
            </TableRow>
          )}

        </TableBody>
      </Table>
    </div>
  );
}

//Searchable Dropdown
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
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    setIsOpen(true);
  };

  const handleSelectOption = (option) => {
    setSearchTerm(option.label);
    onSelect(option);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    setIsOpen(true);
  };
  return (
    <div ref={dropdownRef} className="flex items-center relative">
      <input
        type="text"
        className='bg-gray-200 border border-transparent rounded-xl w-full h-9 pl-2'
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      {isOpen && (
        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-xl mt-1 top-full text-justify">
          {Array.isArray(filteredOptions) && filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectOption(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 cursor-default text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

const CustomTableA = ({ rows, setRows }) => {
  const classes = useStyles();
  const [category, setCategory] = useState({ data: [] });
  const [supplier, setSupplier] = useState({ data: [] });
  const [validationErrors, setValidationErrors] = useState({});
  const [uloading, setuLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.get('/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchCategory();
  }, [category]);
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.get('/api/suppliers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSupplier(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchSupplier();
  }, [supplier]);

  // This is a sample data for Category
  const Category = category.data && category.data.length > 0 ? category.data.map(cat => ({
    label: cat.category_name,
    value: cat.id
  })) : [];

  // This is a sample data for Supplier
  const Supplier = supplier.data && supplier.data.length > 0 ? supplier.data.map(sup => ({
    label: sup.supplier_name,
    value: sup.id
  })) : [];

  const addRow = () => {
    setRows([
      ...rows,
      { date_of_purchase: '', category: '', description: '', supplier: '', serial_number: '', status: '' }
    ]);
  };

  const handleChangeA = (date, index) => {
    const newRows = [...rows];
    newRows[index]['date_of_purchase'] = date;
    setRows(newRows);
  };

  const handleChange = (index, key, newValue) => {
    const newRows = [...rows];
    newRows[index][key] = newValue;
    setRows(newRows);
  };

  const deleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleAddUnit = async (e) => {
    e.preventDefault();
    setuLoading(true);
    try {
      const response = await axios.post('/api/add-unit', rows);
      if (response.data.status === true) {
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          confirmButtonColor: '#1e88e5',
          confirmButtonText: 'Ok',
        });
        setSuccess(response.data.message);
        setError('');
        setValidationErrors('');
        setRows([{ date_of_purchase: '', category: '', description: '', supplier: '', serial_number: '', status: '' }]);
      }
    } catch (error) {
      console.error('Error: ', error)
      setSuccess('');
      if (error.response && error.response.data) {
        console.log('Backend error response:', error.response.data);
        setError(error.response.data.message);
        setValidationErrors(error.response.data.errors || {});
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'red',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
          ; (async () => {
            await Toast.fire({
              icon: 'error',
              title: error.response.data.message,
            })
          })();
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setuLoading(false);
    }
  };

  return (
    <div className={`${classes.root} border border-transparent rounded-xl shadow-lg max-h-max w-full mt-3`}>
      <form onSubmit={handleAddUnit}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className='bg-blue-200'>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>DATE OF PURCHASE</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>CATEGORY</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>DESCRIPTION</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>SUPPLIER</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>SERIAL NO.</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>STATUS</p>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align='center'>
                  <DatePicker
                    selected={row.date_of_purchase ? new Date(row.date_of_purchase) : null}
                    onChange={(date) => handleChangeA(date, index)}
                    placeholderText=""
                    className='bg-gray-200 border border-transparent rounded-xl w-4/4 h-9 pl-2'
                  />
                  {/* <span className="text-sm">
                    {validationErrors.firstName && (
                      <div className="text-red-500">
                        {validationErrors.firstName.map((error, index) => (
                          <span key={index}>{error}</span>
                        ))}
                      </div>
                    )}
                  </span> */}
                </TableCell>
                <TableCell align='center'>
                  <SearchableDropdown
                    options={Category}
                    value={row.category}
                    onChange={(e) => handleChange(index, 'category', e.target.value)}
                    placeholder=""
                    onSelect={(option) => {
                      handleChange(index, 'category', option.value);
                    }}
                  />
                </TableCell>
                <TableCell align='center'>
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder=""
                    className='bg-gray-200 border border-transparent rounded-xl w-4/4 h-9 pl-2'
                  />
                </TableCell>
                <TableCell align='center'>
                  <SearchableDropdown
                    options={Supplier}
                    value={row.supplier}
                    onChange={(e) => handleChange(index, 'supplier', e.target.value)}
                    placeholder=""
                    onSelect={(option) => {
                      handleChange(index, 'supplier', option.value);
                    }}
                  />
                </TableCell>
                <TableCell align='center'>
                  <input
                    type="text"
                    value={row.serial_number}
                    onChange={(e) => handleChange(index, 'serial_number', e.target.value)}
                    placeholder=""
                    className='bg-gray-200 border border-transparent rounded-xl w-4/4 h-9 pl-2'
                  />
                </TableCell>
                <TableCell align='center'>
                  <input
                    type="text"
                    value={row.status}
                    onChange={(e) => handleChange(index, 'status', e.target.value)}
                    placeholder=""
                    className='bg-gray-200 border border-transparent rounded-xl w-4/4 h-9 pl-2'
                  />
                </TableCell>
                <TableCell align='center'>
                  {index > 0 && (
                    <button type='button' onClick={() => deleteRow(index)} className="text-red-600 text-base font-semibold"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <button type='button' onClick={addRow} className='text-green-600 text-base font-semibold mt-2 mb-2 ml-5'><FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> ADD FIELD</button>
        <div className='flex justify-center'>
          <button type='submit' disabled={uloading} className='mt-4 mb-5 border border-transparent duration-700 bg-green-600 hover:bg-green-700 text-white rounded-3xl w-32 h-9 text-base font-semibold'>
            {uloading ? 'ADDING...' : 'ADD'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Unit() {
  const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');
  const [rows, setRows] = useState([{ date_of_purchase: '', category: '', description: '', serial_number: '', status: '' }]);
  const [sloading, setsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [validationErrors, setValidationErrors] = useState({});

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setsLoading(true);
    try {
      const response = await axios.post('/api/add-category', { category_name: category });
      if (response.data.status === true) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'green',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
          ; (async () => {
            await Toast.fire({
              icon: 'success',
              title: response.data.message,
            })
          })();
        setSuccess(response.data.message);
        setError('');
        setCategory('');
        setValidationErrors('');
      }
    } catch (error) {
      console.error('Error: ', error)
      setSuccess('');
      if (error.response && error.response.data) {
        console.log('Backend error response:', error.response.data);
        setError(error.response.data.message);
        setValidationErrors(error.response.data.errors || {});
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'red',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
          ; (async () => {
            await Toast.fire({
              icon: 'error',
              title: error.response.data.message,
            })
          })();
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setsLoading(false);
    }
  };

  const handleSupplier = (e) => {
    setSupplier(e.target.value);
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/add-supplier', { supplier_name: supplier });
      if (response.data.status === true) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'green',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
          ; (async () => {
            await Toast.fire({
              icon: 'success',
              title: response.data.message,
            })
          })();
        setSuccess(response.data.message);
        setError('');
        setSupplier('');
        setValidationErrors('');
      }
    } catch (error) {
      console.error('Error: ', error)
      setSuccess('');
      if (error.response && error.response.data) {
        console.log('Backend error response:', error.response.data);
        setError(error.response.data.message);
        setValidationErrors(error.response.data.errors || {});
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'red',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
          ; (async () => {
            await Toast.fire({
              icon: 'error',
              title: error.response.data.message,
            })
          })();
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <div>
          <SideBar />
        </div>
        <div style={{ flex: 2, paddingBottom: '50px' }}>
          <p className='font-normal text-2xl pt-10 ml-10'>Setup Unit</p>
          <p className='font-light text-lg ml-10'><Link to="/dashboard" className='text-blue-800'>Home</Link> &gt; Setup</p>
          <br /> <br />
          <div className='flex justify-center items-center ml-10 mr-10'>
            <div className='border border-transparent rounded-xl shadow-lg max-h-max w-1/2 mr-5'>
              <div className='flex items-center text-center justify-center'>
                <div className='bg-yellow-200 h-10 w-full rounded-tl-xl rounded-tr-xl'>
                  <p className='font-semibold text-base mt-1.5'>ADD CATEGORY</p>
                </div>
              </div>
              <div className='flex justify-center pt-5 pr-5 pl-5 pb-4'>
                <input
                  type="text"
                  name="category_name"
                  value={category}
                  onChange={handleCategory}
                  placeholder="Input category..."
                  className={validationErrors.category_name ? 'bg-gray-200 border border-red-500 rounded-xl w-3/4 h-9 pl-5' : 'bg-gray-200 border border-transparent rounded-xl w-3/4 h-9 pl-5'}
                />
              </div>
              <span className="text-sm text-center">
                {validationErrors.category_name && (
                  <div className="text-red-500">
                    {validationErrors.category_name.map((error, index) => (
                      <span key={index}>{error}</span>
                    ))}
                  </div>
                )}
              </span>
              <div className='flex justify-center'>
                <button onClick={handleAddCategory} disabled={sloading} className='mb-5 border border-transparent duration-700 bg-green-600 hover:bg-green-700 text-white rounded-3xl w-32 h-9 text-base font-semibold'>
                  {sloading ? 'ADDING...' : 'ADD'}
                </button>
              </div>
            </div>
            <div className='border border-transparent rounded-xl shadow-lg max-h-max w-1/2'>
              <div className='flex items-center text-center justify-center'>
                <div className='bg-yellow-200 h-10 w-full rounded-tl-xl rounded-tr-xl'>
                  <p className='font-semibold text-base mt-1.5'>ADD SUPPLIER</p>
                </div>
              </div>
              <div className='flex justify-center pt-5 pr-5 pl-5 pb-4'>
                <input
                  type="text"
                  name='supplier_name'
                  value={supplier}
                  onChange={handleSupplier}
                  placeholder="Input supplier..."
                  className={validationErrors.supplier_name ? 'bg-gray-200 border border-red-500 rounded-xl w-3/4 h-9 pl-5' : 'bg-gray-200 border border-transparent rounded-xl w-3/4 h-9 pl-5'}
                />
              </div>

              <span className="text-sm text-center">
                {validationErrors.supplier_name && (
                  <div className="text-red-500">
                    {validationErrors.supplier_name.map((error, index) => (
                      <span key={index}>{error}</span>
                    ))}
                  </div>
                )}
              </span>
              <div className='flex justify-center'>
                <button onClick={handleAddSupplier} disabled={loading} className='mb-5 border border-transparent duration-700 bg-green-600 hover:bg-green-700 text-white rounded-3xl w-32 h-9 text-base font-semibold'>
                  {loading ? 'ADDING...' : 'ADD'}
                </button>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center ml-10 mr-10'>
            <CustomTableA rows={rows} setRows={setRows} />
          </div>
          <div className='flex justify-center items-center ml-10 mr-10'>
            <CustomTableB rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unit;