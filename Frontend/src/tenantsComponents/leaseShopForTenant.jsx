import { Select, TextInput, Center, Modal, LoadingOverlay } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useForm } from '@mantine/form';


const LeaseShopForTenant = ({tenant, api}) =>{

    const [opened, { open, close }] = useDisclosure(false);

    const queryClient = useQueryClient();


    const { isPending: unrentedshopsPending, error: unrentedshopsError, data: unrentedshopsData } = useQuery({
        queryKey: ['unrentedshops'],
        queryFn: () =>
          fetch(`${api}/unrentedshops`).then((res) =>
            res.json(),
          ),
          enabled: true,
      })

console.log(unrentedshopsData)
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { ...tenant},
        validate: {
            shop_id: (value) => (value.length == 0 ? 'Please select shop' : null),
            start_date: (value) => (value.length == 0 ? 'Insert the starting date of leasing' : null),
            duration: (value) => (value <= 0 ? "Please enter duration in month" : null)
           },
        });

        const {mutate, isPending, error } = useMutation({
            mutationFn: (newPost) => 
              fetch(`${api}/leaseshop`, {
                method: "POST",
                body: JSON.stringify(newPost),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              }).then((res) => { if (!res.ok) { return res.json().then((error) => { throw new Error(error.message || "Something went wrong"); }); } return res.json(); }),
              onError:()=>{open()},
              onSuccess:() => {
                queryClient.invalidateQueries({queryKey: ["tenants"]});
                form.reset();
                close();
              }
          })

          const handleSubmit = (values) => { mutate({ ...values }); };
          const selectData = unrentedshopsData?.map((shop) => ({ 
            value: shop.shop_id, // Adjust this based on your data structure 
            label: shop.shop_id, // Adjust this based on your data structure 
            })) || [];
            console.log(selectData)

    return (
        <>
        <span onClick={open} className="hover:bg-[rgb(17,17,17)] border border-[#1d1d1d] hover:border-gray-700 py-0.5 px-2 rounded cursor-pointer">{tenant.shop_id ?(<div>Payment</div>):(<div className="text-[#2dd4bf]">Lease Shop</div>)}</span>

            
            <Modal zIndex={999} className='z-50' opened={opened} onClose={close} title="Add Tenant" centered>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    
                    <LoadingOverlay visible={isPending} overlayProps={{ radius: "sm", blur: 2 }}>
                    </LoadingOverlay>
                    {error&&<div className='text-center text-red-400'>{error.message}</div>}
                    <Select mb={7}
                        label="Shop No"
                        placeholder='102'
                        data={[selectData]}
                        key={form.key('shop_id')}
                        {...form.getInputProps('shop_id')}
                    />
                    <TextInput mb={7}
                        label="First Name"
                        placeholder="Mike"
                        key={form.key('first_name')}
                        {...form.getInputProps('first_name')}
                    /> 
                    <TextInput mb={7}

                        label="Last Name"
                        placeholder="Hammer"
                        key={form.key('last_name')}
                        {...form.getInputProps('last_name')}
                    /> 
                   
                    <TextInput mb={15}
                        label='Phone No' 
                        component={IMaskInput} 
                        mask="+251 (00) 000-0000" 
                        placeholder="Your phone" 
                        key={form.key('phone')}
                        {...form.getInputProps('phone')}
                    />
                    <Center>
                        <button className="w-64 self-center">
                            <div className="px-4 py-2 hover:bg-[#008f97] transition-all ease-in-out  bg-[#00adb5] rounded text-center items-center self-center flex place-content-center gap-2 text-white text-lg" >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white size-5">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                                Edit Tenant
                            </div>
                        </button> 
                    </Center>

                </form>
            </Modal>
            
        </>

    );
}

export default LeaseShopForTenant;



// import { useEffect, useState } from "react";
// // import { Select, Option, Input } from "@material-tailwind/react";

// const LeaseShopForTenant = ({tenant, api}) =>{

//     const [shops, setShops] = useState([]);
//     const [selectedShop, setSelectedShop] = useState();
//     const [startDate, setStartDate] = useState();
//     const [duration, setDuration] = useState();

//     useEffect(() => {
//         fetch(`${api}/unrentedshops`)
//         .then(res => {
//             return res.json();
//         })
//         .then(data => {
//             setShops(data);
//         })
//         },[])

        

//         const [errorMessage, setErrorMessage] = useState('');
//         const [successMessage, setSuccessMessage] = useState('');
      
//         const handleSubmit = async (e) => {
//           e.preventDefault();
//           if(!selectedShop){
         
//           } else {
        
//             try {
//                 const response = await fetch(`${api}/leaseshop`,
//                 {
//                     method: 'POST',
//                     headers: {
//                     'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                     shop_id: selectedShop&&selectedShop.shop_id,
//                     tenant_id: tenant.tenant_id,
//                     start_date: startDate,
//                     duration: duration
//                     })
//                 });
        
//                 if (response.status === 200) {
//                 setErrorMessage('');
//                 setSuccessMessage('Data inserted successfully');
//                 } else {
//                 throw new Error('Failed to insert data');
//                 }
//             } catch (error) {
//                 setErrorMessage('Error inserting data: ' + error.message);
//                 setSuccessMessage('');
//             }
//         }
//         };
      

//     return (
//         <>
//             <div className="w-96  bg-[#2d2d2d] rounded-lg p-5 text-[#b0b0b0] text-start text-sm font-medium font-['Montserrat']" >
          
//             {shops &&
//                 <form onSubmit={handleSubmit}>
//                     <div className="flex flex-col gap-8 items-center">
//                         <div className="flex w-full justify-between text-gray-200">
//                             <h1 className="text-gray-200 text-xl self-center">Lease Shop</h1>
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:cursor-pointer">
//                                 <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
//                             </svg>
//                         </div>
                        
//                         <div className="self-start flex justify-evenly w-full">
//                             <div className="flex gap-3"> 
//                             <p>Tenant</p>
//                             <p className="text-gray-200">{tenant.first_name +" "+ tenant.last_name}</p>
//                             </div>
//                         </div>

//                         <div className="flex flex-col w-64 gap-5">
//                             <Select color='white' label="Select Shop" className=" placeholder-blue-gray-400 text-white" 
//                                 id="shareholderId" required error:message
//                                 value={selectedShop}
//                                 onChange={(val) => {setSelectedShop(val)}}>
//                                 {shops.map((shop) => (
//                                 <Option 
//                                     key={shop.shop_id}
//                                     value={shop}
//                                     className=" border-blue-gray-900 hover:bg-brown-700" >
//                                     <span>Shop No: {shop.shop_id}</span> , <span className="text-blue-500" >ETB {shop.price}</span> 
//                                 </Option> 
//                                 ))}
//                             </Select>
//                             <Input type="date"
//                             id="date"
//                             value={startDate}
//                             onChange={(e) => setStartDate(e.target.value)}
//                             color='white' required label="Start Date" inputMode="none"
//                             className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"/>
//                             <Input type="number"
//                             id="duration"
//                             value={duration}
//                             onChange={(e) => setDuration(e.target.value)}
//                             color='white' required label="Leasing for (In Months)" inputMode="numeric" placeholder="eg. 1"
//                             className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"/>

//                         <div className="self-start -mb-4 flex justify-evenly w-full">
//                             <div className="flex gap-3"> 
//                                 <p>Total Amount:</p>
//                                 <p className="text-gray-200">{selectedShop&&selectedShop.price*duration}</p>
//                             </div>
//                         </div>
//                         </div>
//                         <button className="w-64 self-center">
//                                 <div className="px-4 py-2 hover:bg-[#008f97] transition-all ease-in-out  bg-[#00adb5] rounded text-center items-center self-center flex place-content-center gap-2 text-white text-lg" >
//                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className=" text-white size-5">
//                                         <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
//                                         <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
//                                     </svg>

//                                     Lease Shop
//                                 </div>
//                         </button> 
//                         {errorMessage && <p className="text-red-400">{errorMessage}</p>}
//                         {successMessage && <p className="text-teal-500">{successMessage}</p>}
//                     </div>
                    
//                 </form>
//                 }
//             </div>
//         </>

//     );
// }

// export default LeaseShopForTenant;