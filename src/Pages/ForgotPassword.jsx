import axios from "axios";
import React, { useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";

export const ForgotPassword = () => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState({});
  const [id, setId] = useState({});
  // const [showBox, setShowBox] = useState(false);
  const [OTP, setOTP] = useState("");
  let navigate = useNavigate();
  let { username } = useParams(); //use params here---------------------------------

  // const handleShowBox = () => {
  //   setShowBox(true);
  // }

  useEffect(() => {
    setCurrentUserName(username);
    axios
      .get(`http://localhost:3001/auth/otp/${currentUserName}`)
      .then((response) => {
        setMobileNumber(response.data.number);
        setId(response.data.id);
        console.log(response.data.number);
        console.log(response.data.id);
      })
      .catch((error) => {
        console.log(error);
        console.log("error line 31");
      });
  }, [currentUserName, username]);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      authentication,
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const requestOTP = (e) => {
    e.preventDefault();
    generateRecaptcha();
    console.log("request OTP");

    let appVerifier = window.recaptchaVerifier;
    // console.log(mobileNumber)
    const formattedNumber = "+94" + mobileNumber.slice(1);
    signInWithPhoneNumber(authentication, formattedNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log("error: OTP not sent");
        console.log(error);
      });
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);

    if (otp.length === 6) {
      console.log(otp);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          console.log("Correct OTP");
          navigate(`/changePassword/${id}`);
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };

  return (
    <>
      {/* {changePassword ? ()} */}
      <div className="w-full fixed mt-[-69px] h-screen flex flex-col justify-center items-center bg-purple-100">
        <form className="flex flex-col w-full sm:w-[376px] h-1/3 justify-center items-center bg-white rounded-xl shadow-xl">
          <div className="flex flex-col mt-5">
            <label
              htmlFor="nicnumber"
              className="text-base font-semibold text-gray-900"
            >
              OTP Code
            </label>

            <input
              type="number"
              placeholder="Enter OTP Code"
              value={OTP}
              onChange={verifyOTP}
              className="w-full text-black my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
          <div className="flex flex-row gap-4">
            <button
              className="sm:w-[100px] text-white font-medium bg-purple-600 rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:bg-purple-500 cursor-pointer"
              onClick={requestOTP}
            >
              Resend OTP
            </button>

            {/* <button type="submit" className="sm:w-[100px] text-white font-medium bg-purple-600 rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:bg-purple-500 cursor-pointer">
              Confirm
            </button> */}
          </div>
          <div id="recaptcha"></div>
        </form>
      </div>
    </>
  );
};
