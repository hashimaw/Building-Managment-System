import { Route, Routes } from 'react-router-dom';
import Employees from "./Employees";
import Maintainance from "./Maintainance";
import NavBar from "./navBar";
import Shareholders from "./Shareholders";
import Shops from "./Shops";
import SideBar from "./sidebar";
import Tenants from "./Tenants";
import TheOtherSideBar from "./theOtherSidebar";
import Dashboard from './Dashboard';

function App() {
  // https://bws-51zy.onrender.com
 const api = 'http://localhost:4000';
  return (
    <div className='bg-black overflow-y-scroll h-screen fancy-scrollbar'>
    <div className="max-w-screen-3xl mx-auto h-fit ">
      <div>
      <NavBar />  
      </div>
      <div className="flex justify-center">
        <div className="p-3 hidden lg:block"><SideBar api = {api}/></div>
       
        <div className="p-3  ">
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/tenants" element={<Tenants api = {api}/>}/>
            <Route path="/shareholders" element={<Shareholders api = {api}/>}/>
            <Route path="/employees" element={<Employees api = {api}/>}/>
            <Route path="/maintainance" element={<Maintainance api = {api}/>}/>
            <Route path="/shops" element={<Shops api = {api}/>}/>
            <Route path="*" element ={<div className='text bg-green-800'>404 Not found</div>} />
          </Routes>
        </div>

        <div className="p-3 hidden 2xl:block "><TheOtherSideBar api = {api}/></div>
      </div>
      
    </div>
    </div>
  );
}

export default App;
