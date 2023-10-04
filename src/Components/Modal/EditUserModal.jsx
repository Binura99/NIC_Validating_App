import axios from 'axios';
import React, { useEffect, useState } from 'react';
import identifyProvider from '../Utils/ProviderUtils';
import extractInfoFromNIC from '../Utils/NicUtils';

export const EditUserModal = ({ isOpen, onClose, userId }) => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    address: '',
    nic: '',
    number: '',
  });
  const [provider, setProvider] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nicDetails, setNicDetails] = useState({
    dob: '', // Initialize with empty values
    gender: '',
    age: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/${userId}`).then((response) => {
      setUserData({ ...response.data });
      const initialProvider = identifyProvider(response.data.number);
      setProvider(initialProvider);
      // Set age and gender from nicDetails if available
      const initialNicDetalis = extractInfoFromNIC(response.data.nic);
      setNicDetails(initialNicDetalis);
    });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nicRegex = /^([0-9]{9}[VvXx]|[0-9]{12})$/; // Old and new NIC formats
    const mobileRegex = /^(0)(7[0-9])[0-9]{7}$/; // Sri Lankan mobile number format

    let errorMessage = '';

    if (!userData.name || !userData.username || !userData.address || !userData.nic || !userData.number) {
      errorMessage = 'Please fill in all fields';
    }else if (!(nicRegex.test(userData.nic) || (userData.nic.length === 12 && userData.nic.match(/^\d{9}$/)))) {
      errorMessage = 'Invalid NIC number';
    } else if (!mobileRegex.test(userData.number) && userData.number.length > 10) {
      errorMessage = 'Invalid mobile number';
    }

    if (errorMessage) {
      setErrorMessage(errorMessage);
    } else {

    axios
      .put(`http://localhost:3001/auth/update/${userId}`, userData)
      .then((response) => {
        alert('User Updated Successfully');
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating', error);
      });

    setErrorMessage('');
  }
  };

//   const handleNICChange = (e) => {
//     const newNic = e.target.value;
//     const newNicDetails = extractInfoFromNIC(newNic);
//     setUserData({ ...userData, nic: newNic });
//     setNicDetails(newNicDetails);
//   };

  if (!isOpen) return null;

  return (
    <div className='fixed flex bg-purple-200 bg-opacity-30 backdrop-blur-[1px] justify-center items-center inset-0'>
      <div className='flex flex-col bg-white mt-8 sm:mt-0 mx-4 p-4 justify-center items-center rounded-lg shadow-md gap-2 sm:gap-4 sm:max-w-[653px] w-full'>
        <p className='font-semibold text-xl'>Edit User Details</p>
        <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
          <input
            type='text'
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder='Name'
            className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3]  outline-violet-400 rounded-sm'
          />
          <input
            type='text'
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            placeholder='Username'
            className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
          />
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
          <input
            type='text'
            value={userData.address}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            placeholder='Address'
            className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
          />
          <input
            type='text'
            value={userData.nic}
            onChange={(e) => {
                const newNic = e.target.value;
                const newNicDetails = extractInfoFromNIC(newNic);
                setUserData({ ...userData, nic: newNic });
                setNicDetails(newNicDetails);
              }}
            placeholder='NIC'
            className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
          />
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
          <input
            type='text'
            id='age'
            value={nicDetails.age}
            placeholder='Age'
            className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
          />
          <input
            type='text'
            id='gender'
            value={nicDetails.gender}
            placeholder='Gender'
            className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
          />
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full items-center'>
          <input
            type='text'
            value={userData.number}
            onChange={(e) => {
              const newNumber = e.target.value;
              const newProvider = identifyProvider(newNumber);
              setUserData({ ...userData, number: newNumber });
              setProvider(newProvider);
            }}
            placeholder='Mobile Number'
            className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
          />
          <input
            type='text'
            id='provider'
            value={provider}
            placeholder='Provider'
            className='w-full sm:w-[320px] text-black p-1 bg-[#f3f3f3] outline-violet-400 rounded-sm'
          />
        </div>

        {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}

        <div className='flex flex-col sm:flex-row sm:gap-4 justify-center w-full'>
          <button
            className='sm:w-[100px] text-white font-medium my-2 bg-purple-600 rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:bg-purple-500 cursor-pointer'
            onClick={handleSubmit}
          >
            Confirm
          </button>
          <button
            className='sm:w-[100px] text-black font-medium my-2 bg-white border-[2px] rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:text-purple-600 hover:border-purple-400 cursor-pointer'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
