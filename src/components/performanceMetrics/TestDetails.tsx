import { useLocation } from "react-router";
import AllMetrics from "./Metrics";


export default function TestDetails() {
  const location = useLocation();
  const { MetricsData = [] } = location.state || {};

  return <AllMetrics metricsData={MetricsData} />;
}
