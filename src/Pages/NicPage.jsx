import React from 'react'

export const NicPage = () => {
  return (
    <div className='w-full h-screen mt-[-70px] flex items-center justify-center bg-slate-200'>

        <form className='flex flex-col w-full sm:w-[376px] h-1/3 justify-center items-center bg-white rounded-xl shadow-xl'>
            <div className='flex flex-col mt-5'>

            <label htmlFor="nicnumber" className='text-base font-medium text-gray-900'>NIC Number</label>
            <input 
            type="text"
            placeholder='Enter NIC Number'
            className='w-full text-black my-4 bg-transparent border-b border-black outline-none focus:outline-none' 
            />
            </div>

            <button className='w-1/3 text-[#a66aff] font-medium my-2 bg-white border-2 border-[#ccaaff] rounded-3xl p-2 text-center flex items-center justify-center transition-all duration-200 hover:bg-[#ceaeff] hover:text-white cursor-pointer'>Submit</button>

        </form>

    </div>
  )
};
