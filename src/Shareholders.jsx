import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import AddShareholder from "../src/shareholdersComponents/addShareholder";
import WithdrawBalance from "../src/shareholdersComponents/withdrawbalance";
import EditInformation from "../src/shareholdersComponents/editInformation";

const Shareholders = ({api}) => {
  
        const [shareholders, setShareholders] = useState(null);
        const [isPending, setIsPending] = useState(true);
        
        useEffect(() => {
            fetch( `${api}/shareholders`)
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
        <div className=" px-5 max-h-fit bg-[#202020] rounded-lg text-[#b0b0b0] text-start text-sm font-medium font-['Montserrat']">
            <div className="grid grid-flow-col justify-between py-2">
                <div className="text-white text-xl self-center">
                    Shareholders List
                </div>

                <div className="flex gap-10">
                    <Popup modal trigger={
                        <button >
                            <div className="px-4 py-2 hover:bg-[#008f97] transition-all ease-in-out  bg-[#00adb5] rounded text-center self-center flex gap-2 items-center text-white text-lg" >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white size-5">
                                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                </svg>
                                Add Shareholder
                            </div>
                        </button>}>
                        <AddShareholder api = {api}/>
                    </Popup>

                    <div className="px-4 py-2 bg-[#20744a] rounded text-center self-center flex gap-2 items-center text-white text-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5858 3.30368H13.9882V1.51343L1.5 3.44093V20.3362L13.9882 22.4872V19.8337H21.5858C21.8158 19.8453 22.0412 19.7654 22.2125 19.6114C22.3839 19.4573 22.4872 19.2417 22.5 19.0117V4.12493C22.487 3.89502 22.3836 3.6796 22.2123 3.52572C22.041 3.37184 21.8157 3.29202 21.5858 3.30368ZM21.7057 19.1482H13.9628L13.95 17.7314H15.8153V16.0814H13.9357L13.9268 15.1064H15.8153V13.4564H13.9125L13.9035 12.4814H15.8153V10.8314H13.8975V9.85643H15.8153V8.20643H13.8975V7.23143H15.8153V5.58143H13.8975V4.08143H21.7057V19.1482Z" fill="white"/>
                            <path d="M16.8652 5.57935H20.1075V7.22935H16.8652V5.57935ZM16.8652 8.2051H20.1075V9.8551H16.8652V8.2051ZM16.8652 10.8308H20.1075V12.4808H16.8652V10.8308ZM16.8652 13.4566H20.1075V15.1066H16.8652V13.4566ZM16.8652 16.0823H20.1075V17.7323H16.8652V16.0823Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.76007 8.00482L6.36957 7.91257L7.38132 10.6943L8.57682 7.79782L10.1863 7.70557L8.23182 11.6551L10.1863 15.6143L8.48457 15.4996L7.33557 12.4816L6.18582 15.3848L4.62207 15.2468L6.43857 11.7496L4.76007 8.00482Z" fill="#20744A"/>
                        </svg>

                        Export Data
                    </div>
                    <div className="self-center flex items-center gap-2">
                        <div className="text-white text-base font-normal font-['Montserrat']">
                            Entries /Page
                        </div>
                        <div className="px-7 py-1 text-base text-white bg-[#111111] rounded" >
                            10
                        </div>
                    </div>
                </div>
                
            </div>
            <table className="border-separate border-spacing-y-2 ">
                <thead>
                    <tr className="text-white text-base font-semibold font-['Montserrat']">
                        <th className="min-w-40 py-3 text-start">Name</th>
                        <th className="min-w-16 py-3 text-start">Gender</th>
                        <th className="min-w-16 py-3 text-start">Shares</th>
                        <th className="min-w-32 py-3 text-start">Shop Nos.</th>
                        <th className="min-w-32 py-3 text-start">Rented Shops</th>
                        <th className="min-w-24 py-3 text-start">Balance</th>
                        <th className="min-w-24 py-3 text-start">Contact No.</th>
                        <th className="text-end"></th>
                    </tr>
                </thead>
                
                <tbody>
                {isPending && <tr> <td> Loading...</td></tr>}

                {shareholders && shareholders.map((shareholder) => (

                    <tr className="bg-[#111111]">
                        <td className="py-3 pl-3">{shareholder.first_name + " " + shareholder.last_name}</td>
                        <td>{shareholder.gender}</td>
                        <td>{shareholder.number_of_shops}</td>
                        <td className="pr-1">{shareholder.shop_ids}</td>
                        <td>{shareholder.rented_shop_ids}</td>
                        <td className="text-light-blue-400">ETB {Math.round(shareholder.balance * 100) /100 }</td>
                        <td >{shareholder.phone}</td>
                        <td className="pr-3 my-4">
                        <Popup trigger={
                                <button className=" mt-2">
                                    <svg width="20" height="22" viewBox="0 0 4 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="1.99996" cy="1.84615" r="1.84615" fill="white"/>
                                        <circle cx="1.99996" cy="10.5385" r="1.84615" fill="white"/>
                                        <circle cx="1.99996" cy="19.2307" r="1.84615" fill="white"/>
                                    </svg> 
                                </button>} position="left top" nested>
                                {close =>(
                                <div className="bg-[#202020] border-gray-700 border rounded text-gray-300 text-sm p-1 gap-1 flex flex-col">
                                   <Popup modal trigger={ <span className="hover:bg-[#111111] border border-[#1d1d1d] hover:border-gray-700 py-0.5 px-2 rounded cursor-pointer">Withdraw Balance</span>}>
                                   <WithdrawBalance api = {api} shareholder = {shareholder} />
                                   </Popup>
                                   <Popup modal trigger={ <span className="hover:bg-[#111111] border border-[#1d1d1d] hover:border-gray-700 py-0.5 px-2 rounded cursor-pointer">Edit Information</span>}>
                                   <EditInformation api = {api} shareholder={shareholder}/>
                                   </Popup>
                                </div>
                                )}
                                
                            </Popup>
                        </td>
                    </tr>

                ))}
                    </tbody>
            </table>
        </div>
    );
}
export default Shareholders;