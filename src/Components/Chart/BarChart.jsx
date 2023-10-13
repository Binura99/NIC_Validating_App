import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";
import identifyProvider from "../Utils/ProviderUtils";

const Barchart = () => {
  const [providerData, setProviderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth");
        const usersData = response.data;

        const providers = {
          Dialog: 0,
          Mobitel: 0,
          Hutch: 0,
          Airtel: 0,
        };

        usersData.forEach((user) => {

          const provider = identifyProvider(user.number);
          if (provider in providers) {
            providers[provider]++;
          }
        });

        setProviderData(providers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['Dialog', 'Mobitel', 'Hutch', 'Airtel'] }]}
        series={[{ data: [providerData.Dialog,providerData.Mobitel,providerData.Hutch,providerData.Airtel] } ]}
        width={500}
        height={350}
      />
    </div>
  );
}

export default Barchart;
