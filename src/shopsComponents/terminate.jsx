import { useState } from "react";
import { Input } from "@material-tailwind/react";


const Terminate = ({shop, api}) =>{

    const [assurance, setAssurance] = useState();
    const [disabled, setDisabled] = useState(true)

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
        const handleSubmit = async (e) => {
          e.preventDefault();
         
            try {
                const response = await fetch(`${api}/terminate`,
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    shop_id: shop.shop_id,
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
                            <h1 className="text-gray-200 text-xl self-center">Terminate Lease</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:cursor-pointer">
                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        
                        <div className="self-start flex justify-evenly w-full">
                            <div className="flex gap-3"> 
                            <p>Shop No.:</p>
                            <p className="text-gray-200">{shop.shop_id}</p>
                            </div>
                            <div className="flex gap-3"> 
                            <p>Price:</p>
                            <p className="text-gray-200">{shop.price}</p>
                        </div>
                           
                        </div>
                        <div className="self-start flex -mt-5 justify-evenly w-full">
                            <div className="flex gap-3"> 
                                <p>Owner:</p>
                                <p className="text-gray-200">{shop.holder_first_name + " " + shop.holder_last_name}</p>
                            </div>
                        </div>
                        <div className="self-start flex -mt-5 justify-evenly w-full">
                            <div className="flex gap-3"> 
                                <p>Rented By:</p>
                                <p className="text-gray-200">{shop.tenant_first_name + " " + shop.tenant_last_name}</p>
                            </div>
                        </div>

                        <div className="flex w-72 flex-col items-center  gap-5">
                            <label className="text-center">Type <span className="text-red-400 font-bold text-base">Terminate Lease</span> To Terminate Your Leasing With <span className="text-white">{shop.tenant_first_name + " " + shop.tenant_last_name}</span> </label>
                           <div className="w-64">
                              <Input type="text" autoComplete="off"
                                id="duration"
                                value={assurance}
                                onChange={(e) =>{ setAssurance(e.target.value);
                                    if(e.target.value == "Terminate Lease"){
                                        setDisabled(false)
                                    }else{setDisabled(true)}
                                }}
                                color='white' required label={`Type Terminate Lease`}
                                className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"/>
                    
                           </div>
                             </div>
                            
                        <button disabled={disabled}  className="w-64  self-center">
                                <div className={`px-4 py-2 transition-all ease-in-out rounded text-center items-center self-center flex place-content-center gap-2 text-white text-lg ${disabled? "bg-gray-700 cursor-not-allowed":"hover:bg-red-800 bg-red-700 "}`} >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className=" text-white size-5">
                                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                    Terminate Lease
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

export default Terminate;