import './App.css';
import Login from './components/Login';
import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup';
import Home from './components/Home';
import Slots from './components/Slots';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/signup' element={<Signup/>}></Route>
        {isAuthenticated ? (
          <Route path='/Home' element={<Home />} />
        ) : (
          <Route path='/Home' element={<div>Not Authorized</div>} />
        )}
        <Route path='/Home/Slots' element={<Slots />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
