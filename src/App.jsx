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

  return (
    <div className='bg-black overflow-y-scroll h-screen fancy-scrollbar'>
    <div className="max-w-screen-3xl mx-auto h-fit ">
      <div>
      <NavBar />  
      </div>
      <div className="flex justify-center">
        <div className="p-3 hidden lg:block"><SideBar /></div>
       
        <div className="p-3  ">
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/tenants" element={<Tenants/>}/>
            <Route path="/shareholders" element={<Shareholders/>}/>
            <Route path="/employees" element={<Employees/>}/>
            <Route path="/maintainance" element={<Maintainance/>}/>
            <Route path="/shops" element={<Shops/>}/>
          </Routes>
        </div>
        <div className="p-3 hidden 2xl:block "><TheOtherSideBar /></div>
      </div>
      
    </div>
    </div>
  );
}

export default App;
