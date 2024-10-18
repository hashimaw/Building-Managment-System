import { useEffect, useState, useRef } from "react";
import { Input, Select, Option} from "@material-tailwind/react";

const AddShops = () =>{

    const [shareHolders, setShareHolders] = useState([]);
    const [selectedHolder, setSelectedHolder] = useState();
    const [isPending, setIsPending] = useState(true);
    const [message, setMessage] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/getshareholders")
        .then(res => {
            return res.json();
        })
        .then(data => {
            setShareHolders(data);
        })
        },[])

        const [shopId, setShopId] = useState('');
        const [price, setPrice] = useState('');
        const [floor, setFloor] = useState('');
 
        const [errorMessage, setErrorMessage] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          if(!selectedHolder){
            setMessage(false)
          } else {
            setMessage(true)
            try {
                const response = await fetch('http://localhost:4000/addshop',
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    shop_id: shopId,
                    price: price,
                    floor: floor,
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
                            <h1 className="text-gray-200 text-xl self-center">Add Shop</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:cursor-pointer">
                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex flex-col w-64 gap-5">
                            <Input
                                id="shopId"
                                value={shopId}
                                onChange={(e) => setShopId(e.target.value)}
                                color="white" type="text" required placeholder="eg. G-01" label="Shop ID" 
                                className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                            <Input 
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                color='white' type="number" required inputMode="numeric" placeholder="eg. 8000" label="Shop Price" 
                                className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                            <Input 
                                id="floor"
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                color='white' type="number" required inputMode="numeric" placeholder="eg. '0' for ground " label="shop floor" 
                                className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                            <Select  color='white' label="Select Owner" className="placeholder-blue-gray-400 text-white" 
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
                                        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                    </svg>
                                    Add Shop
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

export default AddShops;