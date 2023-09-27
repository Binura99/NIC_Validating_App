import React, { useState } from 'react';

export const MobilePage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [provider, setProvider] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const mobileValid = () => {
    if (/^07[078]\d{7}$/.test(mobileNumber)) {
      if (mobileNumber.startsWith('070')) {
        setProvider('Mobitel');
      } else if (mobileNumber.startsWith('077')) {
        setProvider('Dialog');
      } else if (mobileNumber.startsWith('078')) {
        setProvider('Hutch');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mobileNumber) {
      setErrorMessage('Please fill in this field');
    } else {
      setErrorMessage('');
      mobileValid();
    }
  };

  return (
    <div className='w-full h-screen flex items-center mt-[-70px] justify-center bg-slate-200'>

      <form onSubmit={handleSubmit} className='flex flex-col w-full sm:w-[376px] h-1/3 justify-center items-center bg-white rounded-xl shadow-xl'>
        
          <div className='flex flex-col mt-5'>

            <label htmlFor='nicnumber' className='text-base font-medium text-gray-900'>
              Mobile Number
            </label>

            <input
              type='number'
              placeholder='Enter Mobile Number'
              className='w-full text-black my-4 bg-transparent border-b border-black outline-none focus:outline-none'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />

          </div>

          {provider && (
            <p className='text-base font-medium text-gray-900'>Provider: {provider}</p>
          )}

          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}

          <button
            className='w-1/3 text-[#a66aff] font-medium my-2 bg-white border-2 border-[#ceaeff] rounded-3xl p-2 text-center flex items-center justify-center transition-all duration-200 hover:bg-[#ceaeff] hover:text-white cursor-pointer'
            type="submit"
          >
            Submit
          </button>

      </form>
    </div>
  );
};
