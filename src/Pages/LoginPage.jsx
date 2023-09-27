import React, { useState } from 'react';
import loginA from '../login.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginPage = () => {

    let navigate = useNavigate();
    const [username, setUsername ] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const login = () => {
        const data = { username: username, password: password };
        console.log(data);
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
          if (response.data.error) { alert(response.data.error); } else {
          localStorage.setItem("accessToken", response.data);
          navigate('/', { replace: true });
        }
      });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username || !password){
        setErrorMessage('Please fill in all fields');
        return;
    }else{
        login();
        return;
      }
    };

  return (
    <div>
        <div className='w-full h-screen flex items-center justify-center fixed'>

            <div className='relative z-0 w-1/2 h-screen bg-fixed hidden sm:flex flex-col justify-center'>
                <img src={loginA} alt="login" className='object-cover h-full w-full' />
            </div>
{/* Right */}
            <div className='flex flex-col sm:w-1/2 w-full h-full z-50 bg-purple-100 shadow-xl justify-center items-center '>
{/* Head */}
                <h1 className='text-4xl font-semibold'> Welcome Back! </h1>
                <p className='text-base mb-10'>Enter your creadentials to access your account</p>

        <form onSubmit={handleSubmit}  className='w-[80%] flex flex-col '>
                <div className='flex flex-col '>
                    <label htmlFor="Email" className="text-base font-medium text-gray-900">
                        Username
                    </label>
                    <input
                        type='text'
                        placeholder='Name'
                        className='w-full text-black pay-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none'

                        id='username'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}

                    />

                    <label htmlFor="Password" className="text-base font-medium text-gray-900">
                        Password
                    </label>
                    <input
                        type='password'
                        placeholder='Password'
                        className='w-full text-black pay-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none'

                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}

                    />
            </div>

            {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}

            <div className='flex flex-col'>

                <div className='w-full flex items-center justify-between'>
                    <div className='w-full flex'>
                        <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forget Password?</p>
                    </div>
                </div>

                <div className='w-full flex flex-col'>
                    
                    <button className='w-full text-white font-bold my-2 bg-[#e75dda] rounded-3xl p-2.5 text-center flex items-center justify-center hover:bg-[#ef61e1]/80 cursor-pointer'>
                        LOG IN
                    </button>
              
                </div>
            </div>

        </form>
            <div className='flex flex-col w-[80%]'>
            <Link to='/signup'>
                <button className='w-full text-black font-medium my-2 bg-white border-2 border-[#ff8bf3] rounded-3xl p-2 text-center flex items-center justify-center transition-all duration-200 hover:bg-[#e75dda] hover:text-white cursor-pointer'>
                    CREATE AN ACCOUNT
                </button>
            </Link>
            </div>
        
            </div>
        </div>
    </div>
  )
}
