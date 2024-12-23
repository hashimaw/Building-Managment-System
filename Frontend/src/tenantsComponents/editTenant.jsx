import { Select, TextInput, Center, Modal, LoadingOverlay } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from '@mantine/form';


const EditTenant = ({tenant, api}) =>{

    const [opened, { open, close }] = useDisclosure(false);

    const queryClient = useQueryClient();


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { ...tenant},
        validate: {
            first_name: (value) => (value.length == 0 ? 'Please write tenant first name' : null),
            last_name: (value) => (value == 0 ? "Please write tenant second name" : null),
            gender: (value) => (value.length == 0 ? 'Please select the gender' : null),
            phone: (value) => (value.length == 18 ? null : 'Phone NO is needed'),
           },
        });

        const {mutate, isPending, error } = useMutation({
            mutationFn: (newPost) => 
              fetch(`${api}/edittenant`, {
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

    return (
        <>
        <span onClick={open} className="hover:bg-[#111111] border border-[#1d1d1d] hover:border-gray-700 py-0.5 px-2 rounded cursor-pointer">Edit Information</span>
            {/* <button onClick={open} >
                <div className="px-4 py-2 hover:bg-[#008f97] transition-all ease-in-out  bg-[#00adb5] rounded text-center self-center flex gap-2 items-center text-white text-lg" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white size-5">
                        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                    </svg>
                    edit
                </div>
            </button> */}

            
            <Modal zIndex={999} className='z-50' opened={opened} onClose={close} title="Add Tenant" centered>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    
                    <LoadingOverlay visible={isPending} overlayProps={{ radius: "sm", blur: 2 }}>
                    </LoadingOverlay>
                    {error&&<div className='text-center text-red-400'>{error.message}</div>}
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
                    <Select mb={7}
                        label="Gender"
                        placeholder='Male'
                        data={['Male','Female']}
                        key={form.key('gender')}
                        {...form.getInputProps('gender')}
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

export default EditTenant;
// import { useEffect, useState, useRef } from "react";


// const EditTenant = ({tenant, api}) =>{

//         const [firstName, setFirstName] = useState(tenant.first_name);
//         const [lastName, setLastName] = useState(tenant.last_name);
//         const [contact, setContact] = useState(tenant.phone);
//         const [gender, setGender] = useState(tenant.gender);
 
//         const [errorMessage, setErrorMessage] = useState('');
//         const [successMessage, setSuccessMessage] = useState('');
      
//         const handleSubmit = async (e) => {
//           e.preventDefault();
//           if(!gender){
        
//           } else {
            
//             try {
//                 const response = await fetch(`${api}/edittenant`,
//                 {
//                     method: 'POST',
//                     headers: {
//                     'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                     tenant_id: tenant.tenant_id,
//                     first_name: firstName,
//                     last_name: lastName,
//                     phone: contact,
//                     gender: gender
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
          
//                 <form onSubmit={handleSubmit}>
//                     <div className="flex flex-col gap-8 items-center">
//                         <div className="flex w-full justify-between text-gray-200">
//                             <h1 className="text-gray-200 text-xl self-center">Edit Tenant</h1>
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:cursor-pointer">
//                                 <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
//                             </svg>
//                         </div>
//                         <div className="flex flex-col w-64 gap-5">
//                             <Input
//                                 id="first_name"
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}
//                                 color="white" type="name" required placeholder="eg. john" label="First Name" 
//                                 className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
//                             <Input
//                                 id="last_name"
//                                 value={lastName}
//                                 onChange={(e) => setLastName(e.target.value)}
//                                 color="white" type="name" required placeholder="eg. john" label="last Name" 
//                                 className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
//                             <Select color='white' label="Select Gender" className="placeholder-blue-gray-400 text-white" 
//                                     id="gender" required error:message
//                                     value={gender}
//                                     onChange={(val) => setGender(val)}>
//                                 <Option value="M">Male</Option>
//                                 <Option value="F">Female</Option>
//                             </Select>
//                             <Input 
//                                 id="contact"
//                                 value={contact}
//                                 onChange={(e) => setContact(e.target.value)}
//                                 color='white' type="number" required inputMode="numeric" placeholder="eg. 936684258" label="Phone No." 
//                                 className="placeholder-blue-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                          

                            
//                         </div>
//                         <button className="w-64 self-center">
//                                 <div className="px-4 py-2 hover:bg-[#008f97] transition-all ease-in-out  bg-[#00adb5] rounded text-center items-center self-center flex place-content-center gap-2 text-white text-lg" >
                                    
//                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white size-5">
//                                         <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
//                                         <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
//                                     </svg>

//                                     Edit Tenant
//                                 </div>
//                         </button> 
//                         {errorMessage && <p className="text-red-400">{errorMessage}</p>}
//                         {successMessage && <p className="text-teal-500">{successMessage}</p>}
//                     </div>
                    
//                 </form>
                
//             </div>
//         </>

//     );
// }

// export default EditTenant;