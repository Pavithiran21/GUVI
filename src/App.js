import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Register } from './Components/Users/Register';
import { Login } from './Components/Users/Login';
import { Forgot } from './Components/Users/Forgot';
import { Reset } from './Components/Users/Reset';
import { CreateDetails } from './Components/Details/CreateDetails';
import { EditDetails } from './Components/Details/EditDetails';
import { ViewDetail } from './Components/Details/ViewDetail';

// dob
// : 
// "2000-06-07"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/reset' element={<Forgot/>}/>
          <Route path='/reset/:resetToken' element={<Reset/>}/>
          <Route path='/add-details' element={<CreateDetails/>}/>
          <Route path='/edit-details/:id' element={<EditDetails/>}/>
          <Route path='/view-details/:id' element={<ViewDetail/>}/>
          
          
        </Routes>

      </BrowserRouter>    
    </div>
  );
}

export default App;
