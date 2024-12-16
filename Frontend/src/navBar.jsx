import { useEffect, useState } from 'react';
import { Link, useLocation  } from "react-router-dom";

const NavBar = () => {
    
    const location = useLocation();
    const currentPath = location.pathname;

    var [Dashboard, setDashboard] = useState(false);
    var [Tenants, setTenants] = useState(false);
    var [Shareholders, setShareholders] = useState(false);
    var [Employees, setEmployees] = useState(false);
    var [Shops, setShops] = useState(false);
    var [Maintainance, setMaintainance] = useState(false);


    const DashboardTab = () => {
        if(currentPath === "/" ){
            setDashboard(true)
        }else{
            setDashboard(false)
        }
        
        if(currentPath === "/tenants" || currentPath === "/tenants/"){
            setTenants(true)
        }else{
            setTenants(false)
        }
        
        if(currentPath === "/shareholders" || currentPath === "/shareholders/"){
            setShareholders(true)
        }else{
            setShareholders(false)
        }
       
        if(currentPath === "/employees" || currentPath === "/employees/"){
            setEmployees(true)
        }else{
            setEmployees(false)
        }
       
        if(currentPath === "/shops" || currentPath === "/shops/"){
            setShops(true)
        }else{
            setShops(false)
        }

        if (currentPath === "/maintainance/" || currentPath === "/maintainance") {
            setMaintainance(true);
        } else {
            setMaintainance(false);
        }
    }
    useEffect(() => {
        DashboardTab()
    },[currentPath]);
    

    const activeButtonStyle = "self-center flex gap-2 hover:text-white transition-all ease-in-out group py-3 px-5 text-white absolute"
    const inactiveButtonStyle = "self-center flex gap-2 hover:text-white transition-all ease-in-out group"
   
    const activeButtonSvgStyle = "size-6 transition-all ease-in-out group-hover:text-teal-400 text-teal-400"
    const inactiveButtonSvgStyle = "size-6 transition-all ease-in-out group-hover:text-teal-400"
    
    const activeSvgProperties = "relative w-40 -mb-1"
    const inactiveSvgProperties = "invisible"

    return ( 
        <nav className="flex w-full justify-between max-w-screen-3xl px-5 bg-[#202020] h-24 ">
            <div className="flex self-center gap-1 ">
                <div className="w-6 h-6 left-0 top-[2px]  bg-cyan-400 rounded-full self-center" />
                <div className=" text-white text-xl font-semibold font-['Montserrat'] ">PMS</div>
            </div>

            <ul className="flex gap-10 self-end  text-gray-400 text-lg font-medium font-['Montserrat'] -mr-16">
                <div className='flex relative justify-center'>
                    <svg className= {Dashboard? activeSvgProperties : inactiveSvgProperties} viewBox="0 0 225 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.50841 20.1819C8.93128 8.65663 18.7224 0 30.3351 0H194.665C206.278 0 216.069 8.65663 217.492 20.1819L225 81H0L7.50841 20.1819Z" fill="black"/>
                        <path d="M30.3351 0.5H194.665C206.025 0.5 215.603 8.96844 216.995 20.2432L224.434 80.5H0.565524L8.00464 20.2431C9.39658 8.96844 18.9748 0.5 30.3351 0.5Z" stroke="url(#paint0_linear_0_1)"/>
                        <defs>
                            <linearGradient id="paint0_linear_0_1" x1="112.5" y1="0" x2="112.5" y2="81" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00FFF5"/>
                                <stop offset="1" stop-color="#00FFF5" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <Link to="/"  className={Dashboard? activeButtonStyle: inactiveButtonStyle}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={Dashboard? activeButtonSvgStyle: inactiveButtonSvgStyle}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <div className="">Dashboard</div>
                    </Link>
                </div>
                
                <div className='flex relative justify-center'>
                <svg className= {Tenants? activeSvgProperties : inactiveSvgProperties} viewBox="0 0 225 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.50841 20.1819C8.93128 8.65663 18.7224 0 30.3351 0H194.665C206.278 0 216.069 8.65663 217.492 20.1819L225 81H0L7.50841 20.1819Z" fill="black"/>
                        <path d="M30.3351 0.5H194.665C206.025 0.5 215.603 8.96844 216.995 20.2432L224.434 80.5H0.565524L8.00464 20.2431C9.39658 8.96844 18.9748 0.5 30.3351 0.5Z" stroke="url(#paint0_linear_0_1)"/>
                        <defs>
                            <linearGradient id="paint0_linear_0_1" x1="112.5" y1="0" x2="112.5" y2="81" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00FFF5"/>
                                <stop offset="1" stop-color="#00FFF5" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <Link to="/tenants" className={Tenants? activeButtonStyle: inactiveButtonStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={Tenants? activeButtonSvgStyle: inactiveButtonSvgStyle}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                        <div className="">Tenants</div>
                    </Link>
                </div>
                
                <div className='flex relative justify-center'>
                    <svg className={Shareholders? activeSvgProperties : inactiveSvgProperties} viewBox="0 0 225 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.50841 20.1819C8.93128 8.65663 18.7224 0 30.3351 0H194.665C206.278 0 216.069 8.65663 217.492 20.1819L225 81H0L7.50841 20.1819Z" fill="black"/>
                        <path d="M30.3351 0.5H194.665C206.025 0.5 215.603 8.96844 216.995 20.2432L224.434 80.5H0.565524L8.00464 20.2431C9.39658 8.96844 18.9748 0.5 30.3351 0.5Z" stroke="url(#paint0_linear_0_1)"/>
                        <defs>
                            <linearGradient id="paint0_linear_0_1" x1="112.5" y1="0" x2="112.5" y2="81" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00FFF5"/>
                                <stop offset="1" stop-color="#00FFF5" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <Link to="/shareholders" className={Shareholders? activeButtonStyle: inactiveButtonStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={Shareholders? activeButtonSvgStyle: inactiveButtonSvgStyle}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <div className="">Shareholders</div>
                    </Link>
                </div>
                
                <div className='flex relative justify-center'>
                    <svg className={Shops? activeSvgProperties : inactiveSvgProperties} viewBox="0 0 225 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.50841 20.1819C8.93128 8.65663 18.7224 0 30.3351 0H194.665C206.278 0 216.069 8.65663 217.492 20.1819L225 81H0L7.50841 20.1819Z" fill="black"/>
                        <path d="M30.3351 0.5H194.665C206.025 0.5 215.603 8.96844 216.995 20.2432L224.434 80.5H0.565524L8.00464 20.2431C9.39658 8.96844 18.9748 0.5 30.3351 0.5Z" stroke="url(#paint0_linear_0_1)"/>
                        <defs>
                            <linearGradient id="paint0_linear_0_1" x1="112.5" y1="0" x2="112.5" y2="81" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00FFF5"/>
                                <stop offset="1" stop-color="#00FFF5" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <Link to="shops" className={Shops? activeButtonStyle: inactiveButtonStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={Shops? activeButtonSvgStyle: inactiveButtonSvgStyle}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                        </svg>
                        <div className="">Shops</div>
                    </Link>
                </div>
               
                <div className='flex relative justify-center'>
                    <svg className={Employees? activeSvgProperties : inactiveSvgProperties} viewBox="0 0 225 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.50841 20.1819C8.93128 8.65663 18.7224 0 30.3351 0H194.665C206.278 0 216.069 8.65663 217.492 20.1819L225 81H0L7.50841 20.1819Z" fill="black"/>
                        <path d="M30.3351 0.5H194.665C206.025 0.5 215.603 8.96844 216.995 20.2432L224.434 80.5H0.565524L8.00464 20.2431C9.39658 8.96844 18.9748 0.5 30.3351 0.5Z" stroke="url(#paint0_linear_0_1)"/>
                        <defs>
                            <linearGradient id="paint0_linear_0_1" x1="112.5" y1="0" x2="112.5" y2="81" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00FFF5"/>
                                <stop offset="1" stop-color="#00FFF5" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <Link to="/employees" className={Employees? activeButtonStyle: inactiveButtonStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={Employees? activeButtonSvgStyle: inactiveButtonSvgStyle}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                        <div className="">Employees</div>
                    </Link>
                </div>

                <div className='flex relative justify-center'>
                    <svg className={Maintainance? activeSvgProperties : inactiveSvgProperties} viewBox="0 0 225 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.50841 20.1819C8.93128 8.65663 18.7224 0 30.3351 0H194.665C206.278 0 216.069 8.65663 217.492 20.1819L225 81H0L7.50841 20.1819Z" fill="black"/>
                        <path d="M30.3351 0.5H194.665C206.025 0.5 215.603 8.96844 216.995 20.2432L224.434 80.5H0.565524L8.00464 20.2431C9.39658 8.96844 18.9748 0.5 30.3351 0.5Z" stroke="url(#paint0_linear_0_1)"/>
                        <defs>
                            <linearGradient id="paint0_linear_0_1" x1="112.5" y1="0" x2="112.5" y2="81" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00FFF5"/>
                                <stop offset="1" stop-color="#00FFF5" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <Link to="/maintainance" className={Maintainance? activeButtonStyle: inactiveButtonStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={Maintainance? activeButtonSvgStyle: inactiveButtonSvgStyle}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                        </svg>
                        <div className="">Maintainance</div>
                    </Link>
                </div>
                

            </ul>

            <account className="flex self-center gap-5 ">
                <div className="p-2 rounded-full bg-[#2F2F2F]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-yellow-400">
                        <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div className="p-2 rounded-full bg-[#2F2F2F]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-cyan-400">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </account>

        </nav>
     );
}
 
export default NavBar;