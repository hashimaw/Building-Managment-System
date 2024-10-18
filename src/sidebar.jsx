import { useEffect, useState } from "react";
const SideBar = () => {
    const [tenants, setTenants] = useState(null);
    const [isPending, setIsPending] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:4000/tenants")
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            setTenants(data);
            setIsPending(false);
        })
        },[])

    return (
        <div className="w-60 max-h-fit bg-[#1f1f1f] rounded-lg text-[#b0b0b0] text-sm font-medium font-['Montserrat'] " >
            <div className="w-60 py-1 px-3  hover:bg-[#2d2d2d] rounded-lg" >
            <h1 className="text-xl text-center py-2 font-semibold ">Pending Payments</h1>
            </div>

            <hr className="h-px border-0 bg-gray-700"></hr>
            {isPending && <p> Loading...</p>}
            {tenants&& 
            tenants.map((tenant) => (
               tenant.active &&
                <div className="w-60 py-1 px-3 h-16 hover:bg-[#2d2d2d] rounded-lg" >
                    <div className="flex justify-between mb-1">
                    <div className="text-lg"> {tenant.first_name +" "+ tenant.last_name}</div> 
                    <p className="self-center" >{tenant.date_to && <span className={`${tenant.remaining_days>=10 ?'text-green-500':'' } ${tenant.remaining_days<=9&&tenant.remaining_days>=1 ?'text-amber-500':'' } ${tenant.remaining_days<=0 ?'text-red-500':'' }`}> in {tenant.remaining_days} days</span> }</p>
                    </div>
                    <div className="flex justify-between">
                        <div className=" text-sm">{tenant.shop_id && tenant.shop_id}</div>
                        <div className="text-light-blue-500" >ETB {tenant.price&& tenant.price}</div>
                       <p> {tenant.date_to && new Date (tenant.date_to).toLocaleDateString("en-US", {year:'numeric', month:'short',day:'numeric'})}</p>
                    </div>
                    <hr className="h-px border-0 mt-2 bg-gray-800"></hr>
                </div>
            ))}
        

            
            
            
        </div>
        
    );
}
export default SideBar;