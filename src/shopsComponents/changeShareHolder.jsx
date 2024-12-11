import { useEffect, useState } from "react";
// import { Select, Option} from "@material-tailwind/react";

const ChangeShareHolder = ({shop, api}) =>{

    const [shareHolders, setShareHolders] = useState([]);
    const [selectedHolder, setSelectedHolder] = useState();
 

    useEffect(() => {
        fetch(`${api}/getshareholders`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setShareHolders(data);
        })
        },[])

        

        const [errorMessage, setErrorMessage] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          if(!selectedHolder){
         
          } else {
        
            try {
                const response = await fetch(`${api}/changeshareholder`,
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    shop_id: shop.shop_id,
                    shareholder_id: selectedHolder
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
        }
        };
      

    return (
        <>
            <div className="w-96  bg-[#2d2d2d] rounded-lg p-5 text-[#b0b0b0] text-start text-sm font-medium font-['Montserrat']" >
          
            {shareHolders&&
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-8 items-center">
                        <div className="flex w-full justify-between text-gray-200">
                            <h1 className="text-gray-200 text-xl self-center">Change Owner</h1>
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
                                <p>Current Owner:</p>
                                <p className="text-gray-200">{shop.holder_first_name + " " + shop.holder_last_name}</p>
                            </div>
                        </div>

                        <div className="flex flex-col w-64 gap-5">
                        <Select  color='white' label="Select New Owner" className="placeholder-blue-gray-400 text-white" 
                                    id="shareholderId" required error:message
                                    value={selectedHolder}
                                    onChange={(val) => setSelectedHolder(val)}>
                                    {shareHolders.map((shareholder) => (
                                    <Option 
                                        key={shareholder.shareholder_id}
                                        value={shareholder.shareholder_id}
                                        className=" border-blue-gray-900 hover:bg-brown-700" >
                                        {`${shareholder.shareholder_id} - ${shareholder.first_name} ${shareholder.last_name}`}
                                    </Option>
                                    ))}
                        </Select>
                        </div>
                        <button className="w-64 self-center">
                                <div className="px-4 py-2 hover:bg-[#008f97] transition-all ease-in-out  bg-[#00adb5] rounded text-center items-center self-center flex place-content-center gap-2 text-white text-lg" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white size-5">
                                        <path fill-rule="evenodd" d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                    </svg>
                                    Change Owner
                                </div>
                        </button> 
                        {errorMessage && <p className="text-red-400">{errorMessage}</p>}
                        {successMessage && <p className="text-teal-500">{successMessage}</p>}
                    </div>
                    
                </form>
                }
            </div>
        </>

    );
}

export default ChangeShareHolder;