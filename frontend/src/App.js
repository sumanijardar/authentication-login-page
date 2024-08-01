import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import './style.css';
//pages
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';

export default function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
