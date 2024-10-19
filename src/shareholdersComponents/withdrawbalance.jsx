import { useState } from "react";
import { Input, Select, Option} from "@material-tailwind/react";

const WithdrawBalance = ({shareholder}) =>{

        const [withdrawAmount, setWithdrawAmmount] = useState()


        const [errorMessage, setErrorMessage] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          
            try {
                const response = await fetch('https://bws-51zy.onrender.com/withdraw',
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    withdrawing: withdrawAmount,
                    shareholder_id: shareholder.shareholder_id,
                    })
                });
        
                if (response.status === 200) {
                setErrorMessage('');
                setSuccessMessage('Data inserted successfully');
                } else {
                throw new Error('Failed to insert data');
                }
            } catch (error) {
                setErrorMessage('Error inserting data: ' + error.message);
                setSuccessMessage('');
            }
        
        };
      

    return (
        <>
            <div className="w-96  bg-[#2d2d2d] rounded-lg p-5 text-[#b0b0b0] text-start text-sm font-medium font-['Montserrat']" >
          
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-8 items-center">
                        <div className="flex w-full justify-between text-gray-200">
                            <h1 className="text-gray-200 text-xl self-center">Add Shop</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:cursor-pointer">
                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="self-start flex justify-evenly w-full">
                            <div className="flex gap-3"> 
                                <p>Name:</p>
                                <p className="text-gray-200">{shareholder.first_name + " " + shareholder.last_name}</p>
                            </div>
                            <div className="flex gap-3"> 
                                <p>Shops:</p>
                                <p className="text-gray-200">{shareholder.shop_ids}</p>
                            </div>
                        </div>

                        <div className="self-start flex -mt-5 justify-evenly w-full">
                            <div className="flex gap-3"> 
                                <p>Available Balance:</p>
                                <p className="text-gray-200">{shareholder.balance}</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-64 gap-5">
                          
                            <Input 
                                id="withdrawamount"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmmount(e.target.value)}
                                color='white' type="number" required inputMode="numeric" placeholder="eg. 10,000" label="Withdraw Amount" 
                                className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                          

                            
                        </div>
                        <button className="w-64 self-center">
                                <div className="px-4 py-2 hover:bg-[#008f97] transition-all ease-in-out  bg-[#00adb5] rounded text-center items-center self-center flex place-content-center gap-2 text-white text-lg" >

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-white size-5">
                                        <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
                                        <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
                                    </svg>

                                    Withdraw
                                </div>
                        </button> 
                        {errorMessage && <p className="text-red-400">{errorMessage}</p>}
                        {successMessage && <p className="text-teal-500">{successMessage}</p>}
                    </div>
                    
                </form>
                
            </div>
        </>

    );
}

export default WithdrawBalance;