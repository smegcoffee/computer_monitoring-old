import React, {useState, useRef, useEffect} from 'react';
import SideBar from '../Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { data } from './Add';

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
            {data.map((data, index) => (
            <TableRow key={index}>
              <TableCell align="center">{data.unit}</TableCell>
              <TableCell align="center">{data.dop}</TableCell>
              <TableCell align="center">{data.category}</TableCell>
              <TableCell align="center">{data.description}</TableCell>
              <TableCell align="center">{data.supplier}</TableCell>
              <TableCell align="center">{data.serial}</TableCell>
              <TableCell align="center">{data.status}</TableCell>
            </TableRow>
            ))}
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
      <div ref={dropdownRef} className="flex items-center relative">
        <input
          type="text"
          className='bg-gray-200 border border-transparent rounded-xl w-full h-9 pl-2'
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-xl mt-1 top-full text-justify">
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

  const CustomTableA = ({ rows, setRows }) => {
    const classes = useStyles();
    
    //This is a sample data for Category
    const Category = ["Monitor", "Keyboard", "Mouse"];

    //This is a sample data for Supplier
    const Supplier = ["TTI", "Computer Republic", "Bohol Computers"];

    const addRow = () => {
      setRows([
        ...rows,
        { selectedDate: null, value2: '', value3: '', value4: '', value5: '', value6: '' }
      ]);
    };
  
    const handleChangeA = (date, index) => {
      const newRows = [...rows];
      newRows[index]['selectedDate'] = date;
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
    return (
      <div className={`${classes.root} border border-transparent rounded-xl shadow-lg max-h-max w-full mt-3`}>
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
                  selected={row.selectedDate}
                  onChange={(date) => handleChangeA(date, index)}
                  placeholderText=""
                  className='bg-gray-200 border border-transparent rounded-xl w-4/4 h-9 pl-2'
                />
              </TableCell>
              <TableCell align='center'>
              <SearchableDropdown
                  options={Category}
                  value={row.value2}
                  onChange={(e) => handleChange(index, 'value2', e.target.value)}
                  placeholder=""
                  onSelect={(option) => {
                    handleChange(index, 'value2', option);
                  }}
                />
              </TableCell>
              <TableCell align='center'>
                <input
                  type="text"
                  value={row.value3}
                  onChange={(e) => handleChange(index, 'value3', e.target.value)}
                  placeholder=""
                  className='bg-gray-200 border border-transparent rounded-xl w-4/4 h-9 pl-2'
                />
              </TableCell>
              <TableCell align='center'>
              <SearchableDropdown
                  options={Supplier}
                  value={row.value4}
                  onChange={(e) => handleChange(index, 'value4', e.target.value)}
                  placeholder=""
                  onSelect={(option) => {
                    handleChange(index, 'value4', option);
                  }}
                />
              </TableCell>
              <TableCell align='center'>
                <input
                  type="text"
                  value={row.value5}
                  onChange={(e) => handleChange(index, 'value5', e.target.value)}
                  placeholder=""
                  className='bg-gray-200 border border-transparent rounded-xl w-4/4 h-9 pl-2'
                />
              </TableCell>
              <TableCell align='center'>
                <input
                  type="text"
                  value={row.value6}
                  onChange={(e) => handleChange(index, 'value6', e.target.value)}
                  placeholder=""
                  className='bg-gray-200 border border-transparent rounded-xl w-4/4 h-9 pl-2'
                />
              </TableCell>
              <TableCell align='center'>
              {index > 0 && (
              <button onClick={() => deleteRow(index)} className="text-red-600 text-base font-semibold"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button> )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        <button onClick={addRow} className='text-green-600 text-base font-semibold mt-2 mb-2 ml-5'><FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> ADD FIELD</button>
        <div className='flex justify-center'>
          <button className='mt-4 mb-5 border border-transparent duration-700 bg-green-600 hover:bg-green-700 text-white rounded-3xl w-32 h-9 text-base font-semibold'>
            ADD
          </button>
        </div>
      </div>
    );
  }

function Unit() {
      const [category, setCategory] = useState('');
      const [supplier, setSupplier] = useState('');
      const [rows, setRows] = useState([{ value1: '', selectedDate: null, value2: '', value3: '', value4: '', value5: '', value6: '' }]);

      const handleCategory = (event) => {
        setCategory(event.target.value);
      };

      const handleAddCategory = () => {
        if (category.trim() !== '') {
            console.log('Category added:', category);

            setCategory('');
        } else {
            console.log('Category input is empty');
        }
    };

      const handleSupplier = (event) => {
        setSupplier(event.target.value);
      };

      const handleAddSupplier = () => {
        if (supplier.trim() !== '') {
            console.log('Supplier added:', supplier);

            setSupplier('');
        } else {
            console.log('Supplier input is empty');
        }
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <div>
                    <SideBar />
                </div>
                <div style={{ flex: 2, paddingBottom: '50px'}}>
                    <p className='font-normal text-2xl pt-10 ml-10'>Setup Unit</p>
                    <p className='font-light text-lg ml-10'><Link to="/dashboard" className='text-blue-800'>Home</Link> &gt; Setup</p>
                    <br/> <br/>
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
                                    value={category}
                                    onChange={handleCategory}
                                    placeholder="Input category..."
                                    className='bg-gray-200 border border-transparent rounded-xl w-3/4 h-9 pl-5'
                                  />
                                </div>
                                <div className='flex justify-center'>
                                  <button onClick={handleAddCategory} className='mb-5 border border-transparent duration-700 bg-green-600 hover:bg-green-700 text-white rounded-3xl w-32 h-9 text-base font-semibold'>
                                    ADD
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
                                    value={supplier}
                                    onChange={handleSupplier}
                                    placeholder="Input supplier..."
                                    className='bg-gray-200 border border-transparent rounded-xl w-3/4 h-9 pl-5'
                                  />
                                </div>
                                <div className='flex justify-center'>
                                  <button onClick={handleAddSupplier} className='mb-5 border border-transparent duration-700 bg-green-600 hover:bg-green-700 text-white rounded-3xl w-32 h-9 text-base font-semibold'>
                                    ADD
                                  </button>
                                </div>
                            </div>
                    </div>
                    <div className='flex justify-center items-center ml-10 mr-10'>
                      <CustomTableA rows={rows} setRows={setRows}/>
                    </div>
                    <div className='flex justify-center items-center ml-10 mr-10'>
                    <CustomTableB rows={rows}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Unit;