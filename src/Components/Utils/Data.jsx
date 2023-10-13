import { Pie, Bar } from 'react-chartjs-2'
import React from 'react'

export const Data = [
    {
        id: "1",
        name: "Binura Yasith",
        username: "Binura",
        address: "University Of Kelaniya",
        nic: "199930711970",
        number: "0705704652",
        age: "24",
        gender: "Male",
        provider: "Mobitel"
    },
    {
        id: "2",
        name: "Mihisuru P.",
        username: "Mihisuru",
        address: "University Of Kelaniya",
        nic: 199930711970,
        number: "0702558926",
        age: 23,
        gender: "Male",
        provider: "Mobitel"
    },
    {
        id: 3,
		name: "Ishan Ravindu",
		username: "Ishan",
        address: "University Of Kelaniya",
        nic: 199930711970,
        number: "0705704652",
        age: 24,
        gender: "Male",
        provider: "Mobitel"
    },
    {
        id: 4,
        name: "Damidu Shalinda",
        username: "Damidu",
        address: "University Of Kelaniya",
        nic: 200001800829,
        number: "0770170677",
        age: 24,
        gender: "Male",
        provider: "Dialog"
    },

]

// export const ChartComponent = () => {
//     // Calculate the gender distribution for the Pie chart
//     const genderData = Data.reduce((acc, curr) => {
//       acc[curr.gender] = (acc[curr.gender] || 0) + 1;
//       return acc;
//     }, {});
  
//     const pieData = {
//       labels: Object.keys(genderData),
//       datasets: [
//         {
//           data: Object.values(genderData),
//           backgroundColor: ['bg-blue-500', 'bg-pink-500'],
//         },
//       ],
//     };
  
//     const barData = {
//       labels: Data.map((item) => item.name),
//       datasets: [
//         {
//           label: 'Ages',
//           data: Data.map((item) => parseInt(item.age, 10)), // Convert age to integers
//           backgroundColor: 'bg-blue-500',
//         },
//       ],
//     };
  
//     return (
//       <div className="w-full max-w-screen-lg mx-auto p-4">
//         <h2 className="text-2xl font-semibold mb-4">Gender Distribution Pie Chart</h2>
//         <Pie data={pieData} key="pie-chart" />
  
//         <h2 className="text-2xl font-semibold mt-8 mb-4">Ages Bar Chart</h2>
//         <Bar data={barData} key="bar-chart" />
//       </div>
//     );
//   };