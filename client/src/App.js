import './styles/Tailwind.css';
import LogIn from './Request/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Forgot from './Request/Forgot';
import SignUp from './Request/Signup';
import DashBoard from './Dashboard/Dashboard';
import Unit from './Dashboard/Setup/Unit';
import Set from './Dashboard/Setup/Set';
import Profile from './Dashboard/Profile';
import Computers from './Dashboard/Computers';
import QrC from './Dashboard/Qrcodes';
import Extract from './Dashboard/Extract';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn />}></Route>
        <Route path='/forgot' element={<Forgot />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<LogIn />}></Route>
        <Route path='/dashboard' element={<DashBoard />}></Route>
        <Route path='/unit' element={<Unit />}></Route>
        <Route path='/set' element={<Set />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/computers' element={<Computers />}></Route>
        <Route path='/qr' element={<QrC />}></Route>
        <Route path='/computers/:id' element={<Extract />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
