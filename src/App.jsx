
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Coponents/Signup';
import Login from './Coponents/Login';
import Mainpart from './Mainpart';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Signup/>} />
      <Route path = "/login" element = {<Login/>} />
     <Route path="/movie" element = {<Mainpart/>}/>  
    </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
