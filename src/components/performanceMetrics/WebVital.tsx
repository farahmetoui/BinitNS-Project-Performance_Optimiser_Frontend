import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import ComponentCard from "../common/ComponentCard";
import { webVitaldata } from "../interfaces/model";
import { getWebVitalStyle } from "./WebVitalsColors";

interface WebVitalMetricsProps {
  webVitalData: webVitaldata;
}

function getCellClass(metricName: string, value: number): string {
  const bgClass = getWebVitalStyle(metricName, value);
  const textColor = bgClass === "bg-morgen" ? "text-gray-300" : "text-gray-500 dark:text-gray-400";
  return `  ${textColor} ${bgClass}`;
}

export default function WebVitalMetrics({ webVitalData }: WebVitalMetricsProps) {
  const style = getWebVitalStyle('FCP', webVitalData.firstContentfulPaint);
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
                    className="px-5 py-3 font-medium text-white-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    FCP
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-white-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    LCP
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-white-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    CLS
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-white-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    TBT
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-white-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    interactive
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-white-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    speedIndex
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-white-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    TTB
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-white-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    FID
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                <TableRow key={webVitalData._id}>
                  <TableCell
                    className={`px-4 py-3  text-start text-theme-sm dark:text-white-400 ${getCellClass('FCP', webVitalData.firstContentfulPaint)}`}
                  >
                    {webVitalData.firstContentfulPaint.toFixed(2)} S
                  </TableCell>

                  <TableCell
                    className={`px-4 py-3 text-start text-theme-sm dark:text-gray-400 ${getCellClass('LCP', webVitalData.largestContentfulPaint)}`}
                  >
                    {webVitalData.largestContentfulPaint.toFixed(2)} S
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3  text-start text-theme-sm dark:text-gray-400 ${getCellClass('CLS', webVitalData.cumulativeLayoutShift)}`}
                  >
                    {webVitalData.cumulativeLayoutShift.toFixed(2)} S
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3  text-start text-theme-sm dark:text-gray-400 ${getCellClass('TBT', webVitalData.totalBlockingTime)}`}
                  >
                    {webVitalData.totalBlockingTime.toFixed(2)} S
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3  text-start text-theme-sm dark:text-gray-400 ${getCellClass('interactive', webVitalData.interactive)}`}
                  >
                    {webVitalData.interactive.toFixed(2)} S
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3 text-start text-theme-sm dark:text-gray-400 ${getCellClass('speedIndex', webVitalData.speedIndex)}`}
                  >
                    {webVitalData.speedIndex.toFixed(2)} S
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3 text-start text-theme-sm dark:text-gray-400 ${getCellClass('TTFB', webVitalData.timeToFirstByte)}`}
                  >
                    {webVitalData.timeToFirstByte.toFixed(2)} S
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3  text-start text-theme-sm dark:text-gray-400 ${getCellClass('FID', webVitalData.firstInputDelay)}`}
                  >
                    {webVitalData.firstInputDelay.toFixed(2)} S
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
