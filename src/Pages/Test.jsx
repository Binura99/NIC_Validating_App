import React, { useState } from 'react';
import  identifyProvider  from '../Components/Utils/ProviderUtils';

export const Test = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [provider, setProvider] = useState('');

  const handleMobileNumberChange = (e) => {
    const newMobileNumber = e.target.value;
    setMobileNumber(newMobileNumber);
    const newProvider = identifyProvider(newMobileNumber);
    setProvider(newProvider);
  };

  return (
    <div className='w-full h-screen flex items-center mt-[-70px] justify-center bg-slate-200'>
      <div className='flex flex-col w-full sm:w-[376px] h-1/3 justify-center items-center bg-white rounded-xl shadow-xl'>
        <div className='flex flex-col mt-5'>
          <label htmlFor='nicnumber' className='text-base font-medium text-gray-900'>
            Mobile Number
          </label>
          <input
            type='text'
            placeholder='Enter Mobile Number'
            className='w-full text-black my-4 bg-transparent border-b border-black outline-none focus:outline-none'
            value={mobileNumber}
            onChange={handleMobileNumberChange}
          />
        </div>
        <div>
          {provider && (
            <p className='text-base font-medium text-gray-900'>
              Provider: {provider}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};