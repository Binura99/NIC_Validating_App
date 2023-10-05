import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ChangePassword = () => {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [newData, setNewData] = useState({
    password: "",
    Cpassword: "",
  });
  const { id } = useParams();

  const change = () => {
    const data = {
      password: newData.password,
    };
    console.log(data);
    axios
      .put(`http://localhost:3001/auth/changePassword/${id}`, data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data);
          navigate("/login", { replace: true });
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorMessage = "";

    if (!newData.password || !newData.Cpassword) {
      errorMessage = "Please Fill All Fields";
    } else if (newData.password !== newData.Cpassword) {
      errorMessage = "Password does not match";
    }

    if (errorMessage) {
      setErrorMessage(errorMessage);
    } else {
      change();
    }
  };

  return (
    <div className="w-full h-screen mt-[-70px] flex items-center justify-center bg-purple-100">
      <form
        className="flex flex-col w-full sm:w-[376px] p-5 justify-center items-center bg-white gap-3 rounded-xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mt-5">
          <label
            htmlFor="password"
            className="text-base font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newData.password}
            onChange={(e) =>
              setNewData({ ...newData, password: e.target.value })
            }
            className="w-full text-black placeholder:text-sm bg-transparent border-b border-black outline-none focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="nicnumber"
            className="text-base font-medium text-gray-900"
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-Enter New Password"
            value={newData.Cpasswordpassword}
            onChange={(e) =>
              setNewData({ ...newData, Cpassword: e.target.value })
            }
            className="w-full text-black placeholder:text-sm bg-transparent border-b border-black outline-none focus:outline-none"
          />
        </div>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <button
          className="sm:w-[100px] mt-2 text-white font-medium bg-purple-600 rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:bg-purple-500 cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
