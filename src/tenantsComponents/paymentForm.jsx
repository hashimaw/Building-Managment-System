import { useEffect, useState } from "react";
// import { Select, Option, Input } from "@material-tailwind/react";

const PaymentForm = ({tenant, api}) =>{

    const [duration, setDuration] = useState();        
    const [invoice, setInvoice] = useState();

        const [errorMessage, setErrorMessage] = useState('');
        const [successMessage, setSuccessMessage] = useState('');

        useEffect(() => {
            fetch(`${api}/get/${tenant.shop_id}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setInvoice(data);
            })
            },[]);
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
            try {
                const response = await fetch(`${api}/extendlease`,
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    shop_id: tenant.shop_id,
                    duration: duration,
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
                            <h1 className="text-gray-200 text-xl self-center">Extend Lease</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:cursor-pointer">
                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        
                        <div className="self-start flex justify-evenly w-full">
                            <div className="flex gap-3"> 
                            <p>Shop No.:</p>
                            <p className="text-gray-200">{tenant.shop_id}</p>
                            </div>
                            <div className="flex gap-3"> 
                            <p>Price:</p>
                            <p className="text-gray-200">{tenant.price}</p>
                        </div>
                           
                        </div>
                        <div className="self-start flex -mt-5 justify-evenly w-full">
                            <div className="flex gap-3"> 
                                <p>Tenant:</p>
                                <p className="text-gray-200">{tenant.first_name + " " + tenant.last_name}</p>
                            </div>
                        </div>
                        <div className="self-start flex -mt-5 justify-evenly w-full">
                            <div className="flex gap-3"> 
                                <p>Lease ends / ended in:</p>
                                <p className="text-gray-200">{invoice && new Date (invoice[0].date_to).toLocaleDateString("en-US", {year:'numeric', month:'short',day:'numeric'})}</p>
                            </div>
                        </div>

                        <div className="flex flex-col w-64 gap-5">

                        <Input type="number"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            color='white' required label="Extending Lease for (In Months)" inputMode="numeric" placeholder="eg. 1"
                            className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"/>

                        <div className="self-start -mb-4 flex justify-evenly w-full">
                            <div className="flex gap-3"> 
                                <p>Total Amount:</p>
                                <p className="text-gray-200">{tenant.price*duration}</p>
                            </div>
                        </div>
                        </div>
                        <button className="w-64 self-center">
                                <div className="px-4 py-2 hover:bg-[#008f97] transition-all ease-in-out  bg-[#00adb5] rounded text-center items-center self-center flex place-content-center gap-2 text-white text-lg" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className=" text-white size-5">
                                        <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                                        <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                                    </svg>

                                    Extend Lease
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

export default PaymentForm;