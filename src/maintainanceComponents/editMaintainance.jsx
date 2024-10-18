import { useState } from "react";
import { Input, Select, Option, Textarea} from "@material-tailwind/react";

const EditMaintainance = ( {cost} ) =>{
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        };

        const [name, setName] = useState(cost.name);
        const [type, setType] = useState(cost.type);
        const [price, setPrice] = useState(cost.price);
        const [description, setDescription] = useState(cost.description);
        const [date, setDate] = useState(() => formatDate(cost.date));
        const [status, setStatus] = useState(cost.status);

        const [errorMessage, setErrorMessage] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          
            try {
                const response = await fetch('http://localhost:4000/editcost',
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    cost_id: cost.cost_id,
                    name: name,
                    type: type,
                    price: price,
                    description: description,
                    date: date,
                    status: status,
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
            <div className="w-96 overflow-y-scroll fancy-scrollbar max-h-[90vh] bg-[#2d2d2d] rounded-lg p-5 text-[#b0b0b0] text-start text-sm font-medium font-['Montserrat']" >
          
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-8 items-center">
                        <div className="flex w-full justify-between text-gray-200">
                            <h1 className="text-gray-200 text-xl self-center">Edit Employee</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:cursor-pointer">
                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex flex-col w-64 gap-5">
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                color="white" type="text" required placeholder="eg. Community Fundrising" label="Name The Cost" 
                                className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                            <Input
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                color="white" type="text" required placeholder="eg. Security" label="Type" 
                                className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                            <Input 
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                color='white' type="number" required inputMode="numeric" placeholder="eg. 8,000" label="Price" 
                                className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                            <Input type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                color='white' required label="Date" inputMode="none"
                                className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"/>
                            <Textarea
                                id="name"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                color="white" type="text" required placeholder="Brief description about the cost"  
                                className="placeholder-blue-gray-400" />
                            <Select color='white' label="Select Status" className="placeholder-blue-gray-400 text-white" 
                                    id="status" required error:message
                                    value={status}
                                    onChange={(val) => setStatus(val)}>
                                <Option value="Completed">Completed</Option>
                                <Option value="In-Progress">In-Progress</Option>
                                <Option value="Pending To Start">Pending To Start</Option>
                            </Select>                        
                            
                        </div>
                        <button className="w-64 self-center">
                                <div className="px-4 py-2 hover:bg-[#008f97] transition-all ease-in-out  bg-[#00adb5] rounded text-center items-center self-center flex place-content-center gap-2 text-white text-lg" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white size-5">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                    Edit Cost
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

export default EditMaintainance;