import React from 'react'
import Logo from '../mobios_logo.png'
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className='flex drop-shadow relative mt-4 rounded-xl h-fit mx-4 items-center justify-between bg-[#d8d8d8] z-50'>
{/* left */}
        <div className='flex w-full h-full my-2 p-1 space-x-3 ml-7 gap-2'>
            <img src={Logo} alt="logo" className='h-7 object-contain items-center' />
        </div>
{/* right */}
        <div className='h-full font-semibold flex'>

          <ul className='hidden md:flex items-center space-x-14 mr-7'><Link to='/login'> 
            <li className='w-[60px] text-black whitespace-nowrap my-2 rounded-3xl p-1 text-center flex transition-all duration-200 hover:bg-[#c49cff] hover:text-white cursor-pointer justify-center items-center'>
              Login 
            </li></Link>
          </ul>

        </div>

        <div className='flex h-full w-'>

        </div>

    </div>
  )
};