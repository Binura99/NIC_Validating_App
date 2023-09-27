import React from 'react'
// import NIC from '../nic.png'
// import Mobile from '../phone.png'
import { Link } from 'react-router-dom';
import Profile from '../profile.png'
import M_users from '../management.png'

export const Home = () => {
  return (
    <div className='w-full fixed mt-[-70px] justify-center h-screen flex flex-col items-center bg-slate-200'>

        <div className='flex flex-col gap-10 sm:flex-row'>

          <button className='items-center flex flex-col p-5 w-[200px] rounded-2xl transition-all duration-200 bg-white shadow-lg hover:bg-[#FFA1F5] cursor-pointer'>
              <Link to='/profile'><img src={Profile} alt="User" className='h-32 ' />
              <p className='font-semibold text-center text-xl'>Profile</p></Link>
          </button>

          <button className='items-center flex flex-col p-5 w-[200px] rounded-2xl transition-all duration-200 bg-white shadow-lg hover:bg-[#FFA1F5] cursor-pointer'>
              <Link to='/manageUsers'><span className='flex-col'>
              <img src={M_users} alt="Muser" className='justify-center mx-4 h-32' />
              <p className='font-semibold text-center text-xl'>Manage Users</p></span></Link>
          </button>

        </div>
      
    </div>
  )
};
