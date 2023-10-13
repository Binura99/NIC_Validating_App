import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";
import { useEffect, useState } from "react";
import extractInfoFromNIC from "../Utils/NicUtils";

const PieChartA = ({getTotal}) => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [nicGenderData, setNicGenderData] = useState([]);
  const [maleCount, setMaleCount] = useState('');
  const [femaleCount, setFemaleCount] = useState('');
  const [totalCount, setTotalCount] = useState('');


  const FetchData = async () => {
    let maleCount = 0;
    let femaleCount = 0;
    let totalCount = 0;


    await axios.get("http://localhost:3001/auth").then((response) => {
      setListOfUsers(response.data);
      listOfUsers.push(response.data);
      console.log(listOfUsers);
    });
    
    listOfUsers.map((item) => {
      item.map((value) => {
        let arrayData = extractInfoFromNIC(value.nic);
        setNicGenderData(arrayData.gender);
        nicGenderData.push(arrayData.gender);
      });
        totalCount = nicGenderData.length
        setTotalCount(totalCount);
        
        for (let i = 0; i < nicGenderData.length; i++) {
          if (nicGenderData[i] === "Male") {
            maleCount++;
          } else if (nicGenderData[i] === "Female") {
            femaleCount++;
          }
        }
      });
      setMaleCount(maleCount);
      setFemaleCount(femaleCount);
      setTotalCount(totalCount);
      getTotal(totalCount);
    };
    
    useEffect(() => {
      FetchData();
    }, []);

  
  return (
    <div className="flex justify-center items-center">
          <PieChart
      series={[
        {
          data: [
            { id: 0, value: maleCount, label: 'Male' },
            { id: 1, value: femaleCount, label: 'Female' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
    </div>
  );
};
export default PieChartA ;