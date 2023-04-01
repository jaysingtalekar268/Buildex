import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/navbar/navbar';
import Login from './Components/login/login';
import Home from './Components/home/home';
import Myproject from './Components/myproject/myproject';
import PrivateComponent from './Components/privatecomponents/privatecomponets';
import Profile from './Components/profile/profile';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar> </Navbar>
        <Routes>
          
            <Route element={<PrivateComponent></PrivateComponent>}>
            <Route path='/' element={<Home></Home>}> </Route> 
            <Route path='/MyProject' element={<Myproject></Myproject>}> </Route>
            {/* <Route path='/Message' element={<h1>Message</h1>}> </Route> */}
            <Route path='/Profile' element={<Profile></Profile>}> </Route>
            </Route>
          <Route path='/Login' element={<Login></Login>}> </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
