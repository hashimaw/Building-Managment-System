import { useEffect, useState } from "react";

const TheOtherSideBar = () => {
    const [shareholders, setShareholders] = useState(null);
    const [isPending, setIsPending] = useState(true);
   
    useEffect(() => {
        fetch("http://localhost:4000/shareholders")
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            setShareholders(data);
            setIsPending(false);
        })
        },[])


    return (
        <div className="w-60 max-h-fit grid gap-1 bg-[#202020] rounded-lg text-[#b0b0b0] text-sm font-medium font-['Montserrat'] " >
            <div className="text-xl text-center pt-2 font-semibold">
                Shareholders
            </div>
            <hr className="h-px border-0 bg-gray-700"></hr>
            {isPending && <tr> <td> Loading...</td></tr>}

            {shareholders && shareholders.map((shareholder) => (
            <div className="w-56 py-1 justify-self-center px-3 mt-1 bg-[#111111]  hover:bg-[#2d2d2d] rounded-lg" >
                <div className="flex justify-items-start justify-between py-1 gap-2">
                        <p className="text-base">{shareholder.first_name + " " + shareholder.last_name}</p>
                        <p className="text-base self-center" >{shareholder.number_of_shops} shares</p>
                </div>
            </div>
              ))}

           
        </div>
        
    );
}
export default TheOtherSideBar;