import { Select, TextInput, Center, Modal, LoadingOverlay } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from '@mantine/form';


const AddTenanat = ({api}) =>{

    const [opened, { open, close }] = useDisclosure(false);

    const queryClient = useQueryClient();


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { first_name: '', last_name: '', gender: '', phone: ''},
        validate: {
            first_name: (value) => (value.length == 0 ? 'Please write tenant first name' : null),
            last_name: (value) => (value <= 0 ? "Please write tenant second name" : null),
            gender: (value) => (value.length == 0 ? 'Please select the gender' : null),
            phone: (value) => (value.length == 18 ? null : 'phone NO is needed'),
           },
        });

        const {mutate, isPending, error } = useMutation({
            mutationFn: (newPost) => 
              fetch(`${api}/addtenant`, {
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
            <button onClick={open} >
                <div className="px-4 py-2 hover:bg-[#008f97] transition-all ease-in-out  bg-[#00adb5] rounded text-center self-center flex gap-2 items-center text-white text-lg" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white size-5">
                        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                    </svg>
                    Add Tenant
                </div>
            </button>
            
            <Modal opened={opened} onClose={close} title="Add Tenant" centered>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    
                    <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}>
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
                                        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                    </svg>
                                    Add Tenant
                                </div>
                        </button> 
                    </Center>
                    
                </form>
            </Modal>
            
        </>

    );
}

export default AddTenanat;