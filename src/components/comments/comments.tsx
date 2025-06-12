"use client"

import { useState } from "react"
import { XIcon, InfoIcon, ArrowLeftIcon, DownloadIcon, RefreshIcon } from "../../pages/Icons"

interface MetricData {
  name: string
  abbreviation: string
  value: number
  unit: string
  status: "good" | "needs-improvement" | "poor"
  description: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "good":
      return "bg-green-400"
    case "needs-improvement":
      return "bg-yellow-300"
    case "poor":
      return "bg-red-500"
    default:
      return "bg-gray-200"
  }
}

export default function MetricsDetails({ onClose }: { onClose: () => void }) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const metrics: MetricData[] = [
    {
      name: "First Contentful Paint",
      abbreviation: "FCP",
      value: 2443.96,
      unit: "S",
      status: "needs-improvement",
      description:
        "Measures the time from when the page starts loading to when any part of the page's content is rendered on the screen.",
    },
    {
      name: "Largest Contentful Paint",
      abbreviation: "LCP",
      value: 2731.93,
      unit: "S",
      status: "needs-improvement",
      description: "Reports the render time of the largest content element visible within the viewport.",
    },
    {
      name: "Cumulative Layout Shift",
      abbreviation: "CLS",
      value: 0.0,
      unit: "S",
      status: "good",
      description:
        "Measures the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page.",
    },
    {
      name: "Total Blocking Time",
      abbreviation: "TBT",
      value: 131.99,
      unit: "S",
      status: "needs-improvement",
      description:
        "Measures the total amount of time between First Contentful Paint and Time to Interactive where the main thread was blocked for long enough to prevent input responsiveness.",
    },
    {
      name: "Time to Interactive",
      abbreviation: "interactive",
      value: 2835.35,
      unit: "S",
      status: "needs-improvement",
      description:
        "Measures the time from when the page starts loading to when it's capable of reliably responding to user input quickly.",
    },
    {
      name: "Speed Index",
      abbreviation: "speedIndex",
      value: 2596.02,
      unit: "S",
      status: "needs-improvement",
      description: "Shows how quickly the contents of a page are visibly populated.",
    },
    {
      name: "Time to Byte",
      abbreviation: "TTB",
      value: 69.09,
      unit: "S",
      status: "good",
      description:
        "Measures the time between the request for a resource and when the first byte of a response begins to arrive.",
    },
    {
      name: "First Input Delay",
      abbreviation: "FID",
      value: 1030.0,
      unit: "S",
      status: "poor",
      description:
        "Measures the time from when a user first interacts with your site to the time when the browser is able to respond to that interaction.",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeftIcon />
            </button>
            <h2 className="text-xl font-semibold">Metrics test</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
            <XIcon />
          </button>
        </div>

        <div className="p-6">
          {/* Metrics Visualization */}
          <div className="mb-8">
            <div className="grid grid-cols-8 gap-0 mb-2">
              {metrics.map((metric) => (
                <div key={metric.abbreviation} className="relative">
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
              {metrics.map((metric) => (
                <div
                  key={metric.abbreviation}
                  className={`flex-1 ${getStatusColor(metric.status)} flex items-center justify-center`}
                >
                  <span className="text-sm font-medium">
                    {metric.value} {metric.unit}
                  </span>
                </div>
              ))}
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
                  {metrics.map((metric) => (
                    <tr key={metric.abbreviation} className="hover:bg-gray-100">
                      <td className="py-3 px-4">
                        <div className="font-medium">{metric.name}</div>
                        <div className="text-sm text-gray-500">{metric.abbreviation}</div>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {metric.value} {metric.unit}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${getStatusColor(metric.status)} mr-2`}
                        ></span>
                        <span className="capitalize">{metric.status.replace("-", " ")}</span>
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
  )
}
