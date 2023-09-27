import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const EditUserModal = ({isOpen, onClose, userId}) => {

    const [userData, setUserData] = useState({
        name: '',
        username: '',
        address: '',
        nic: '',
        number: '',
    });

    const handleOnClose = (e) => {
        if(e.target.id === 'container'){ onClose();}
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/${userId}`).then((response) => {
            setUserData({...response.data});
            // console.log(response.data)
        });
    }, [userId]);

    const handleSubmit = (e) => {

        axios.put(`http://localhost:3001/auth/update/${userId}`, userData).then((response) => {
            alert('User Updated Successfully');
            // console.lod(response.data)
            onClose();
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error updating',error);
        });
    };

    if (!isOpen) return null;
  return (
    <div id='container' onClick={handleOnClose} className='fixed flex bg-purple-200 bg-opacity-30 backdrop-blur-[1px] justify-center items-center inset-0'>

        <div className='flex flex-col bg-white mt-8 sm:mt-0 mx-4 p-4 justify-center items-center rounded-lg shadow-md gap-2 sm:gap-4 sm:max-w-[653px] w-full'>
    
            <p className='font-semibold text-xl'>Edit User Details</p>
    
            <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
                <input 
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value})}
                placeholder='Name'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3]  outline-violet-400 rounded-sm'
                />
                <input 
                type="text"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value})}
                placeholder='Username'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
                <input 
                type="text"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value})}
                placeholder='Address'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
                <input 
                type="text"
                value={userData.nic}
                onChange={(e) => setUserData({ ...userData, nic: e.target.value})}
                placeholder='NIC'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
                <input 
                type="text"
                id="age"
                placeholder='Age'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
                <input 
                type="text"
                id="gender"
                placeholder='Gender'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
                <input 
                type="text"
                value={userData.number}
                onChange={(e) => setUserData({ ...userData, number: e.target.value})}
                placeholder='Mobile Number'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
                <input 
                type="text"
                id="provider"
                placeholder='Provider'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
            </div>
            <div className='flex flex-col sm:flex-row sm:gap-4 justify-center w-full'>
                
                <button className='sm:w-[100px] text-white font-medium my-2 bg-purple-600 rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:bg-purple-500 cursor-pointer'
                        onClick={handleSubmit}>
                    Confirm
                </button>
                <button className='sm:w-[100px] text-black font-medium my-2 bg-white border-[2px] rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:text-purple-600 hover:border-purple-400 cursor-pointer'
                        onClick={onClose}>
                    Cancel
                </button>
            </div>
    
        </div>
    
    </div>
  )
}
