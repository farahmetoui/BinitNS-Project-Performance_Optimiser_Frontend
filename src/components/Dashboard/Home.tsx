import StatisticsChart from "../performanceHome/StatisticsChart";
import RecentOrders from "../performanceHome/ApplicationsFetch";
import PageMeta from "../common/PageMeta";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import NumberOfMetrics from "../performanceHome/NumberOfMetrics";
import MonthlyMetricsChart from "../performanceHome/MonthlyMetricsChart";

export default function Home() {
  const { token, isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Fetch data now with token:", token);
    }
  }, [isAuthenticated, token]);


  return (
    <>
      <PageMeta
        title="PerformanceMetricsDashboard| PerformanceMetricsDashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-10">
          <NumberOfMetrics />    
          <MonthlyMetricsChart />
        </div>
{/* 
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div> */}

        <div className="col-span-15">
          <StatisticsChart />
        </div>

        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}

        <div className="col-span-12 xl:col-span-11">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
