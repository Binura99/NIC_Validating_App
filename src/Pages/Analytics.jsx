import React, { useState } from "react";
import Barchart from "../Components/Chart/BarChart";
import PieChartA from "../Components/Chart/PieChartA";

export const Analytics = () => {

  const [totalAccount, setTotalAccount] = useState('');

  const getTotal = (total) => {
    setTotalAccount(total);
  }
  return (
    <div className="w-full relative mt-[-70px] justify-center h-screen flex flex-col items-center bg-slate-200">
      <div className="flex flex-col justify-center items-center gap-2 ">

        <h1 className="bg-white shadow-lg mt-[100px] mb-7 rounded-lg p-2 text-xl font-semibold">ANALYTICS</h1>

        <p>User Accounts : {totalAccount}</p>

        <div className="flex flex-row justify-center items-center gap-4">
          <div className="flex bg-slate-300 p-4 rounded-lg flex-col justify-center items-center">
            <p className="font-base text-lg">
              Bar Chart For Service Provider
            </p>
            <Barchart />
          </div>
          <div className="flex bg-slate-300 p-4 rounded-lg flex-col justify-center items-center">
            <p className="font-base text-lg">
              Pie Chart For Users
            </p>
            <PieChartA getTotal={getTotal}/>
          </div>
        </div>
      </div>
    </div>
  );
};
