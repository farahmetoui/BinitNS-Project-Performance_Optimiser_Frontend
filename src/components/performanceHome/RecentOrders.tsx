import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { fetchApplications } from "../../services/metricService";
import { ApplicationToTest } from "../interfaces/model";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";



export default function RecentOrders() {
  const [metrics, setMetrics] = useState<ApplicationToTest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApplications()
        setMetrics(data); 
        console.log("this is data : ", data);
      } catch (err) {
        console.error(err);
        console.log("Erreur lors de la récupération des métriques");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Applications
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Name of the Application
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Url of Application
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Test the metrics
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {metrics.map((metric, index) => (
              <TableRow key={index}>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {metric.name}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {metric.mainUrl}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Button size="sm" variant="primary" onClick={() => navigate(`/test/${metric.id}`)}>
                    show All test
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


      </div>
    </div>
  );
}
