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
import { MetricsDataType } from "../../interfaces/model";
import { getColorClass } from "./ColorMetric";
import { generateSimpleReport } from "../../services/pythonService";
import { getLoadingCard } from "./LoadingCard";
import { DownloadIcon, EyeIcon, FileTextIcon, GlobeIcon } from "../../pages/Icons";

interface AllMetricsProps {
  metricsData?: any[];
}

export default function AllMetrics({ metricsData = [] }: AllMetricsProps) {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [webVitalData, setWebVitalData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
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

  const getSimpleReport = async (urlJson: string) => {

    try {
      const data = await generateSimpleReport(urlJson);
      console.log("Data fetched:", data);
      return data.public_url
    } catch (err) {
      console.error("Erreur lors de la récupération des Web Vitals", err);
    }

  };

  function getCellClass(value: number): string {
    const bgClass = getColorClass(value);
    const textColor = bgClass === "bg-red-100 text-red-800 border-red-200" ? "text-morgen" : "text-gray-500 dark:text-gray-400";
    return `  ${textColor} ${bgClass}`;
  }


  return (
    <ComponentCard title="Metrics test">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">

        {/* Modal to show webvitals */}
        {isVisible && webVitalData && (
          <div className="fixed inset-0 flex items-center justify-center z-20 backdrop-blur-md">
          
            <WebVitalMetrics webVitalData={webVitalData} setVisible={setWebVitalData} />
          </div>
        )}

      </div>

              <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-white">Lighthouse Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400">Monitor and analyze your website performance metrics</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 dark:text-gray-400 dark:divide-white/[0.05] dark:bg-white/[0.03]">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold ">Performance Test Results</h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors dark:text-gray-400">
                  <DownloadIcon />
                  Export
                </button>
              </div>

              <div className="p-6 space-y-6 ">
                {metricsData.map((metric: MetricsDataType) => (
                  <div key={metric._id} className="border border-gray-200 rounded-lg p-6 dark:divide-white/[0.05] dark:text-gray-400 dark:text-gray-400 ">
                    <div className="flex items-start justify-between mb-4 ">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 dark:text-gray-400 ">
                          <GlobeIcon />
                          <span className="font-medium text-gray-900 dark:text-gray-400">URL Test</span>
                        </div>
                        <a
                          href={metric.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm dark:text-gray-400"
                        >
                          {metric.url}
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 ">
                      <div className="text-center">
                        <div className="text-xs font-medium text-gray-500 mb-2">Performance</div>
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCellClass(metric.performance)}`}
                        >
                          {metric.performance}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium text-gray-500 mb-2">Accessibility</div>
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCellClass(metric.accessibility)}`}
                        >
                          {metric.accessibility}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium text-gray-500 mb-2">Best Practices</div>
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCellClass(metric.bestPractices)}`}
                        >
                          {metric.bestPractices}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium text-gray-500 mb-2">SEO</div>
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCellClass(metric.seo)}`}
                        >
                          {metric.seo}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium text-gray-500 mb-2">PWA</div>
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCellClass(metric.pwa)}`}
                        >
                          {metric.pwa}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex flex-wrap gap-2 dark:text-gray-400 ">
                        <button className=" inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-gray-700 dark:text-gray-400 text-sm rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setVisible(true);
                          fetchWebVital(metric.webVitalsId)
                        }}>
                          <EyeIcon />
                          View Details
                        </button>
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm dark:text-gray-400 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => window.open(metric.urlRapport, '_blank')}>
                          <FileTextIcon />
                          Full Report
                        </button>
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-gray-700 dark:text-gray-400 text-sm rounded-md hover:bg-gray-50 transition-colors"
                         onClick={async () => {
                          setLoading(true);
                          const reportUrl = await getSimpleReport(metric.urlJsonRapport);
                          setLoading(false);
                          if (reportUrl) {
                            window.open(reportUrl, '_blank');
                          } else {
                            console.error("the report can't be generated");
                          }
                        }}>
                          <DownloadIcon />
                          Simple Report
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      {loading && (
        getLoadingCard()
      )}
    </ComponentCard>

  );
}
