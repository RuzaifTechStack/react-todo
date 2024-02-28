import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { UserLogin } from './Components/user-login';
import { UserRegister } from './Components/user-register';
import { UserDashboard } from './Components/user-dashboard';
import { UserInvalid } from './Components/Invalid';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function App() {

  const [cookies, setcookie, removecookie] = useCookies('userid');

 
  return (
    <div className="container-fluid body">
       <BrowserRouter>
        <header className='bg-shade'>
          <div className='text-center p-4'>
            <h2 className='text-white'>To D0 Web App</h2>
          </div>
          <div >
           {
            (cookies['userid']==undefined)?
            <div className='d-flex justify-content-center align-items-center'>
            <Link to="/register" className='btn btn-danger me-2'>New User Register</Link>
            <Link to="/login" className='btn btn-warning'>Existing User Login</Link>
          </div>:
           <div>  </div>
           }
          </div>
        </header>
        <Routes>
          <Route path='login' element={<UserLogin/>} />
          <Route path='register' element={<UserRegister/>} />
          <Route path='dashboard' element={<UserDashboard/>} />
          <Route path='invalid' element={<UserInvalid/>}/>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
