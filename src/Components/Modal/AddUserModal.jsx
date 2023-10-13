import axios from 'axios';
import React, { useState } from 'react';
import extractInfoFromNIC from '../Utils/NicUtils';
import identifyProvider from '../Utils/ProviderUtils';

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
    const [nicDetails, setNicDetails] = useState({
      dob: '', // Initialize with empty values
      gender: '',
      age: '',
    });
    const [provider, setProvider] = useState('');
  
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
      
    // Regular expressions for Sri Lankan NIC (old and new formats) and mobile numbers
    const nicRegex = /^([0-9]{9}[VvXx]|[0-9]{12})$/; // Old and new NIC formats
    const mobileRegex = /^(0)(7[0-9])[0-9]{7}$/; // Sri Lankan mobile number format
      
    let errorMessage = '';
      
    if (!regData.name || !regData.username || !regData.password || !regData.address || !regData.nic || !regData.Cpassword || !regData.number) {
      errorMessage = 'Please fill in all fields';
    } else if (regData.password !== regData.Cpassword) {
      errorMessage = 'Password does not match';
    } else if (!(nicRegex.test(regData.nic) || (regData.nic.length === 12 && regData.nic.match(/^\d{9}$/)))) {
      errorMessage = 'Invalid NIC number';
    } else if (!mobileRegex.test(regData.number) && regData.number.length > 10) {
      errorMessage = 'Invalid mobile number';
    } else if (regData.number.length !== 10 ) {
      errorMessage = 'Mobile number must be 10 digits';
    }
  
    if (errorMessage) {
      setErrorMessage(errorMessage);
    } else {
      // All validations passed, you can proceed with the account creation
      account();
      setRegData({
        name: '',
        username: '',
        address: '',
        nic: '',
        number: '',
        password: '',
        Cpassword: '',
      });
      setErrorMessage('');
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
                onChange={(e) => {
                  const newNic = e.target.value;
                  const newNicDetails = extractInfoFromNIC(newNic);
                  setRegData({ ...regData, nic: newNic });
                  setNicDetails(newNicDetails);
                }}
                placeholder='NIC'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
                <input 
                type="text"
                id="age"
                value={nicDetails.age}
                placeholder='Age'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
                <input 
                type="text"
                id="gender"
                value={nicDetails.gender}
                placeholder='Gender'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
                <input 
                type="number"
                value={regData.number}
                onChange={(e) => {
                  const newNumber = e.target.value;
                  const newProvider = identifyProvider(newNumber);
                  setRegData({ ...regData, number: newNumber });
                  setProvider(newProvider);
                }}
                placeholder='Mobile Number'
                className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
                />
                <input 
                type="text"
                id="provider"
                value={provider}
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
