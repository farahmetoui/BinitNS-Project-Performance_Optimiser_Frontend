import { getWebVitalById } from "../../services/metricService";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import ComponentCard from "../common/ComponentCard";
import { useState } from "react";
import Button from "../ui/button/Button";
import WebVitalMetrics from "./WebVital";
import { MetricsDataType } from "../interfaces/model";
import { getColorClass } from "./ColorMetric";


interface AllMetricsProps {
  metricsData?: any[];
}

export default function AllMetrics({ metricsData = [] }: AllMetricsProps) {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [webVitalData, setWebVitalData] = useState<any>(null);

  const fetchWebVital = async (id: string) => {
    if (id) {
      try {
        const data = await getWebVitalById(id);
        console.log("Data fetched:", data);
        setWebVitalData(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des Web Vitals", err);
      }
    }
  };

  function getCellClass(value: number): string {
    const bgClass = getColorClass(value);
    const textColor = bgClass === "bg-morgen" ? "text-gray-300" : "text-gray-500 dark:text-gray-400";
    return `  ${textColor} ${bgClass}`;
  }


  return (
    <ComponentCard title="Metrics test">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Url test
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    performance
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    accessibility
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    bestPractices
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    seo
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    pwa
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    webVitalMetrics
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    RapportLighthouse
                  </TableCell>


                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {metricsData.map((metric: MetricsDataType) => (
                  <TableRow key={metric._id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {metric.url}
                    </TableCell>
                    <TableCell className={`px-4 py-3  text-start text-theme-sm  ${getCellClass(metric.performance)}`}>
                      {metric.performance}
                    </TableCell>
                    <TableCell className={`px-4 py-3  text-theme-sm  ${getCellClass(metric.accessibility)}`}>
                      {metric.accessibility}
                    </TableCell>
                    <TableCell className={`px-4 py-3  text-theme-sm  ${getCellClass(metric.bestPractices)}`}>
                      {metric.bestPractices}
                    </TableCell>
                    <TableCell className={`px-4 py-3  text-theme-sm  ${getCellClass(metric.seo)}`}>
                      {metric.seo}
                    </TableCell>
                    <TableCell className={`px-4 py-3  text-theme-sm${getCellClass(metric.pwa)}`}>
                      {metric.pwa}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          setVisible(true);
                          fetchWebVital(metric.webVitalsId)

                        }}
                      >
                        details
                      </Button>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => window.open(metric.urlRapport, '_blank')}
                      >
                        ShowRapport
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Modal affichant les Web Vitals */}
        {isVisible && webVitalData && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
            {/* Close Icon */}
            <div
              className="absolute top-65 right-47 z-50 text-3xl font-bold text-gray-700 cursor-pointer hover:text-red-500 z-50"
              onClick={() => setVisible(false)}
            >
              &times;
            </div>

            <WebVitalMetrics webVitalData={webVitalData} />
          </div>
        )}


      </div>
    </ComponentCard>
  );
}
