
import ComponentCard from "../common/ComponentCard";
import { webVitaldata } from "../../interfaces/model";
import { getStatusColor, getWebVitalStyle } from "./WebVitalsColors";
import { XIcon, InfoIcon, ArrowLeftIcon, DownloadIcon, RefreshIcon } from "../../pages/Icons"
import { useState } from "react";

interface WebVitalMetricsProps {
  webVitalData: webVitaldata;
  setVisible: (visible: boolean) => void;
}




export default function WebVitalMetrics({ webVitalData, setVisible }: WebVitalMetricsProps) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const mapWebVitals = (data: webVitaldata) => {
    return [
      {
        name: "First Contentful Paint",
        key: "firstContentfulPaint",
        value: data.firstContentfulPaint,
        abbreviation: "FCP",
        description:
          "Measures the time from when the page starts loading to when any part of the page's content is rendered on the screen.",
      },
      {
        name: "Largest Contentful Paint",
        key: "largestContentfulPaint",
        value: data.largestContentfulPaint,
        abbreviation: "LCP",
        description:
          "Reports the render time of the largest content element visible within the viewport.",
      },
      {
        name: "Cumulative Layout Shift",
        key: "cumulativeLayoutShift",
        value: data.cumulativeLayoutShift,
        abbreviation: "CLS",
        description:
          "Measures the sum of all layout shifts for unexpected layout shifts.",
      },
      {
        name: "Total Blocking Time",
        key: "totalBlockingTime",
        value: data.totalBlockingTime,
        abbreviation: "TBT",
        description:
          "Measures total time between FCP and Time to Interactive where the main thread was blocked.",
      },
      {
        name: "Time to Interactive",
        key: "interactive",
        value: data.interactive,
        abbreviation: "Interactive",
        description:
          "Time from page load to when it's reliably interactive.",
      },
      {
        name: "Speed Index",
        key: "speedIndex",
        value: data.speedIndex,
        abbreviation: "SpeedIndex",
        description:
          "How quickly the contents are visibly populated.",
      },
      {
        name: "Time To First Byte",
        key: "timeToFirstByte",
        value: data.timeToFirstByte,
        abbreviation: "TTFB",
        description:
          "Time between request and first byte of the response.",
      },
      {
        name: "First Input Delay",
        key: "firstInputDelay",
        value: data.firstInputDelay,
        abbreviation: "FID",
        description:
          "Time from user interaction to when the browser is able to respond.",
      },
    ];
  };


  return (
    <ComponentCard title="Metrics test">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVisible(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeftIcon />
              </button>
              <h2 className="text-xl font-semibold">Metrics test</h2>
            </div>
            <button onClick={() => setVisible(false)} className="p-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
              <XIcon />
            </button>
          </div>

          <div className="p-6">
            {/* Metrics Visualization */}
            <div className="mb-8">
              <div className="grid grid-cols-8 gap-0 mb-2">
                {mapWebVitals(webVitalData).map((metric) => (
                  <div key={webVitalData._id} className="relative">
                    <div className="text-center text-sm font-medium mb-2 flex items-center justify-center gap-1">
                      {metric.abbreviation}
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onMouseEnter={() => setShowTooltip(metric.abbreviation)}
                        onMouseLeave={() => setShowTooltip(null)}
                        aria-label={`Info about ${metric.name}`}
                      >
                        <InfoIcon />
                      </button>
                      {showTooltip === metric.abbreviation && (
                        <div className="absolute z-10 top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded p-2 w-48">
                          <p className="font-semibold mb-1">{metric.name}</p>
                          <p>{metric.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex rounded-lg overflow-hidden h-12">
                {mapWebVitals(webVitalData).map((metric) => {
                  const { className } = getWebVitalStyle(metric.abbreviation, metric.value);
                  return (
                    <div
                      key={metric.abbreviation}
                      className={`flex-1 ${className} flex items-center justify-center`}
                    >
                      <span className="text-sm font-medium">{metric.value.toFixed(2)} S</span>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* Detailed Metrics Table */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-4">Detailed Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-4 font-medium">Metric</th>
                      <th className="text-left py-2 px-4 font-medium">Value</th>
                      <th className="text-left py-2 px-4 font-medium">Status</th>
                      <th className="text-left py-2 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mapWebVitals(webVitalData).map((metric) => (
                      <tr key={metric.abbreviation} className="hover:bg-gray-100">
                        <td className="py-3 px-4">
                          <div className="font-medium">{metric.name}</div>
                          <div className="text-sm text-gray-500">{metric.abbreviation}</div>
                        </td>
                        <td className="py-3 px-4 font-mono">
                         {metric.value.toFixed(2)} S
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block w-3 h-3 rounded-full ${getStatusColor(getWebVitalStyle(metric.abbreviation, metric.value).status)} mr-2`}
                          ></span>
                          <span className="capitalize">{getWebVitalStyle(metric.abbreviation, metric.value).status.replace("-", " ")}</span>
                        </td>
                        <td className="py-3 px-4 text-sm max-w-xs">{metric.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <DownloadIcon />
                Export Report
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                <RefreshIcon />
                Run Test Again
              </button>
            </div>
          </div>
        </div>
      </div>

    </ComponentCard>
  );
}
