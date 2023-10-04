import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {

  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [regData, setRegData] = useState({
    name: '',
    username: '',
    address: '',
    nic: '',
    number: '',
    password: '',
    Cpassword: '',
  });

  const account = () => {
    const data = {
      name: regData.name,
      username: regData.username,
      address: regData.address,
      password: regData.password,
      nic: regData.nic,
      number: regData.number,
    };
    console.log(data);
    axios.post("http://localhost:3001/auth", data).then((response) => {

      if (response.data.error) { alert(response.data.error); } else {
        console.log(response.data);
        alert(response.data);
        navigate("/", { replace: true });
      }
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  // Regular expressions for Sri Lankan NIC (old and new formats) and mobile numbers
  const nicRegex = /^([0-9]{9}[VvXx]|[0-9]{12})$/; // Old and new NIC formats
  const mobileRegex = /^(0)(7[0-9])[0-9]{7}$/; // Sri Lankan mobile number format

  let errorMessage = '';

  if (!regData.name || !regData.username || !regData.password || !regData.address || !regData.nic || !regData.Cpassword || !regData.number) {
    errorMessage = 'Please fill in all fields';
  } else if (regData.password !== regData.Cpassword) {
    errorMessage = 'Password does not match';
  } else if (!(nicRegex.test(regData.nic) || (regData.nic.length === 12 && regData.nic.match(/^\d{9}$/)))) {
    errorMessage = 'Invalid NIC number';
  } else if (!mobileRegex.test(regData.number) && regData.number.length > 10) {
    errorMessage = 'Invalid mobile number';
  } else if (regData.number.length !== 10 ) {
    errorMessage = 'Mobile number must be 10 digits';
  }

  if (errorMessage) {
    setErrorMessage(errorMessage);
  } else {
    // All validations passed, you can proceed with the account creation
    account();
    setRegData({
      name: '',
      username: '',
      address: '',
      nic: '',
      number: '',
      password: '',
      Cpassword: '',
    });
    setErrorMessage('');
  }
};


  return (
    <div className="flex flex-col w-full h-full bg-purple-100 relative justify-center items-center">
      <div className="flex flex-col h-fit justify-center items-center">

        <form onSubmit={handleSubmit} className="sm:w-1/2 w-3/4 justify-center items-center my-4 bg-white shadow-lg rounded-lg p-3">
        <h1 className="font-semibold text-5xl my-5 text-center">
          Sign<span className="text-purple-600">Up</span>
        </h1>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full text-black pay-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            value={regData.name}
            onChange={(e) => setRegData({ ...regData, name: e.target.value })}
          />
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="w-full text-black pay-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            value={regData.username}
            onChange={(e) => setRegData({ ...regData, username: e.target.value })}
          />

          <label htmlFor="Address">Address</label>
          <input
            type="text"
            placeholder="Address"
            className="w-full text-black pay-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            value={regData.address}
            onChange={(e) =>
              setRegData({ ...regData, address: e.target.value })}
          />

          <label htmlFor="NIC">NIC</label>
          <input
            type="text"
            placeholder="NIC"
            className="w-full text-black pay-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            value={regData.nic}
            onChange={(e) => setRegData({ ...regData, nic: e.target.value })}
          />

          <label htmlFor="Mobile">Mobile Number</label>
          <input
            type="number"
            placeholder="Mobile"
            className="w-full text-black pay-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            value={regData.number}
            onChange={(e) => setRegData({ ...regData, number: e.target.value }) }
          />

          <label htmlFor="Password">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full text-black pay-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            value={regData.password}
            onChange={(e) =>
              setRegData({ ...regData, password: e.target.value })}
          />

          <label htmlFor="CPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full text-black pay-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            value={regData.Cpassword}
            onChange={(e) =>
              setRegData({ ...regData, Cpassword: e.target.value })}
          />

          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full text-black font-medium my-2 bg-white border-2 border-purple-500 rounded-3xl p-2 text-center flex items-center justify-center transition-all duration-200 hover:bg-purple-500 hover:text-white cursor-pointer"
          >
            Create Account
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};
