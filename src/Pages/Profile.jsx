import React from 'react'

export const Profile = () => {
  return (
    <div className='w-full fixed mt-[-69px] h-screen flex flex-col items-center bg-slate-200'>

      <h1 className='bg-white shadow-lg mt-[100px] rounded-lg p-2 text-xl mb-7 font-semibold'>MANAGE PROFILE</h1>

      <div className='bg-white w-3/5 shadow-md flex flex-col justify-center items-center p-2 rounded-md gap-3'>

        <div className='flex flex-col mt-4 gap-4 font-semibold w-full h-full justify-center items-left'>
          <p>Nama:</p>
          <p>Username:</p>
          <p>Address:</p>
          <p>NIC:</p>
          <p>Age:</p>
          <p>Gender:</p>
          <p>Number:</p>
          <p>Provider:</p>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 mb-4 sm:gap-4 justify-center w-full'>
                
          <button className='sm:w-[100px] text-white font-medium bg-purple-600 rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:bg-purple-500 cursor-pointer'
            >
              Edit
          </button>
          {/* <button className='sm:w-[100px] text-black font-medium bg-white border-[2px] rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:text-purple-600 hover:border-purple-400 cursor-pointer'
            >
              Cancel
          </button> */}
        </div>

      </div>
    </div>
  )
}
