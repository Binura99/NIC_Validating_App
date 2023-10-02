import axios from 'axios';
import React, { useEffect, useState } from 'react'
import identifyProvider from '../Components/Utils/ProviderUtils';
import { LoginPage } from '../Pages/LoginPage';

export const Profile = () => {

  const [currentUserId, setCurrentUserId] = useState('');
  const token = localStorage.getItem('accessToken');
  const [userData, setUserData] = useState({});
  const [provider, setProvider] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const user = JSON.parse(atob(token.split('.')[1]));// Decoding the JWT payload
        setCurrentUserId(user.id);
      } catch (error) {
        console.error('Error decoding the JWT payload:', error);
        // Handle any error that may occur during decoding
      }
    }
  }, [token, currentUserId]);

  useEffect(() => {

    axios.get(`http://localhost:3001/auth/${currentUserId}`).then((response) => {
    setUserData(response.data);
    const initialProvider = identifyProvider(response.data.number);
    setProvider(initialProvider);
    })
  }, [currentUserId]);


  return (
    <>

    {token ? (
    <div className='w-full fixed mt-[-69px] h-screen flex flex-col items-center bg-slate-200'>

      <h1 className='bg-white shadow-lg mt-[100px] rounded-lg p-2 text-xl mb-7 font-semibold'>MANAGE PROFILE</h1>

      <div className='bg-white w-3/5 shadow-md flex flex-col justify-center items-center p-2 rounded-md gap-3'>

        <div className='flex flex-col mt-4 gap-4 text-lg font-medium w-full h-full justify-center items-left'>
          <p className='text-[#848484]'>Nama: <span className='font-semibold text-black'>{userData.name}</span></p>
          <p className='text-[#848484]'>Username: <span className='font-semibold text-black'>{userData.username}</span></p>
          <p className='text-[#848484]'>Address: <span className='font-semibold text-black'>{userData.address}</span></p>
          <p className='text-[#848484]'>NIC: <span className='font-semibold text-black'>{userData.nic}</span></p>
          <p className='text-[#848484]'>Age:</p>
          <p className='text-[#848484]'>Gender:</p>
          <p className='text-[#848484]'>Number: <span className='font-semibold text-black'>{userData.number}</span></p>
          <p className='text-[#848484]'>Provider: {provider}</p>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 mb-4 sm:gap-4 justify-center w-full'>
                
          <button className='sm:w-[100px] text-white font-medium bg-purple-600 rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:bg-purple-500 cursor-pointer'
            >
              Edit
          </button>
        </div>

      </div>
    </div>
    ) : (

      <LoginPage/>
    
    )}
    
    </>
  )
}
