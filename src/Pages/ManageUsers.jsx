import React from 'react'
import { UsersTable } from '../Components/UsersTable'
import { LoginPage } from '../Pages/LoginPage';

const token = localStorage.getItem('accessToken')

export const ManageUsers = () => {
  return (
    <>

    {token ? (
    <div className='w-full fixed mt-[-69px] h-screen flex flex-col items-center bg-slate-200'>

      <h1 className='bg-white shadow-lg mt-[100px] mb-7 rounded-lg p-2 text-xl font-semibold'>MANAGE USERS</h1>

      <div className='w-full mx-auto max-w-5xl overflow-x-auto'>

        <UsersTable/>

      </div>
    </div>
    ) : (

      <LoginPage/>
    
    )}
    
    </>
  )
}
