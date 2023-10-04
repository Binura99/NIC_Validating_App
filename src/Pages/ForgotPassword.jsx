import React from 'react'

export const ForgotPassword = () => {
  return (
    <div className='w-full fixed mt-[-69px] h-screen flex flex-col items-center bg-purple-100'>

        <form className='flex flex-col w-full sm:w-[376px] h-1/3 justify-center items-center bg-white rounded-xl shadow-xl'>
            <div className='flex flex-col mt-5'>

              <label htmlFor='nicnumber' className='text-base font-medium text-gray-900'>
                Mobile Number
              </label>

              <input
                type='number'
                placeholder='Enter Mobile Number'
                className='w-full text-black my-4 bg-transparent border-b border-black outline-none focus:outline-none'
              />

            </div>
        </form>

    </div>
  )
}
