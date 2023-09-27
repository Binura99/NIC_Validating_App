import axios from 'axios';
import React, { useState } from 'react';


export const AddUserModal = ({onClose,isOpen}) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [regData, setRegData] = useState({
      name: '',
      username: '',
      address: '',
      nic: '',
      number: '',
      password: '',
      Cpassword: '',
    });
  
    const account = () => {
      const data = {
        name: regData.name,
        username: regData.username,
        address: regData.address,
        password: regData.password,
        nic: regData.nic,
        number: regData.number,
      };
      console.log(data);
      axios.post("http://localhost:3001/auth", data).then((response) => {
  
        if (response.data.error) { alert(response.data.error); } else {
          console.log(response.data);
          alert(response.data);
        }
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        !regData.name ||
        !regData.username ||
        !regData.password ||
        !regData.address ||
        !regData.nic ||
        !regData.Cpassword ||
        !regData.number
      ) {
        setErrorMessage('Please fill in all fields');
        return;
      } else if (regData.password !== regData.Cpassword) {
        setErrorMessage('Password do not match');
        return;
      } else if (regData.password === regData.Cpassword) {
        account();
        // alert('Successfully Registered');
  
        setRegData({
          name: '',
          username: '',
          address: '',
          nic: '',
          number: '',
          password: '',
          Cpassword: '',
        });
  
        setErrorMessage("");
        return;
      }
  
    };

    const handleOnClose = (e) => {
        if(e.target.id === 'container'){ onClose();}
    };

    if (!isOpen) return null;
  return (
    <div id='container' onClick={handleOnClose} className='fixed flex bg-purple-200 bg-opacity-30 backdrop-blur-[1px] justify-center items-center inset-0'>

        <form onSubmit={handleSubmit} className='flex flex-col bg-white mt-16 sm:mt-0 mx-4 p-4 items-center rounded-lg shadow-md gap-2 sm:gap-4 sm:max-w-[653px] w-full'>
    
            <p className='font-semibold text-xl'>Add User</p>
    
            <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
                <input 
                type="text"
                value={regData.name}
                onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                placeholder='Name'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3]  outline-violet-400 rounded-sm'
                />
                <input 
                type="text"
                value={regData.username}
                onChange={(e) => setRegData({ ...regData, username: e.target.value })}
                placeholder='Username'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
                <input 
                type="text"
                value={regData.address}
                onChange={(e) => setRegData({ ...regData, address: e.target.value })}
                placeholder='Address'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
                <input 
                type="text"
                value={regData.nic}
                onChange={(e) => setRegData({ ...regData, nic: e.target.value })}
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
                type="number"
                value={regData.number}
                onChange={(e) => setRegData({ ...regData, number: e.target.value }) }
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
            <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
                <input 
                type="password"
                value={regData.password}
                onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                placeholder='Password'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
                <input 
                type="Cpassword"
                value={regData.Cpassword}
                onChange={(e) => 
                    setRegData({ ...regData, Cpassword: e.target.value })}
                placeholder='Confirm Password'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
            </div>

            {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}

            <div className='flex flex-col sm:flex-row sm:gap-4 justify-center w-full'>
                
                <button className='sm:w-[100px] text-white font-medium my-2 bg-purple-600 rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:bg-purple-500 cursor-pointer'
                type='submit'
                >
                    Add
                </button>
                <button className='sm:w-[100px] text-black font-medium my-2 bg-white border-[2px] rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:text-purple-600 hover:border-purple-400 cursor-pointer'
                        onClick={onClose}>
                    Cancel
                </button>
            </div>
    
        </form>
    
    </div>
  )
}
