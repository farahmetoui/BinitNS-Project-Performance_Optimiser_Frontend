import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useEffect, useState } from "react";
import { getNumberOfTestsByMonth } from "../../services/metricService";
import ChartTab from "../common/ChartTab";

export default function MonthlyMetricsChart() {

  const options: ApexOptions = {
    colors: ["#fc3c61"], //morgen color 
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };
  const [tabNumberOfTests, setTabNumberOfTests] = useState<number[]>([]);
  const series = [
    {
      name: "Number Of Tests",
      data: tabNumberOfTests,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>("edison");


  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await getNumberOfTestsByMonth(name);
        setTabNumberOfTests(data);
        console.log("tableExist ", data);
      } catch (err) {
        console.error("Error to get the table of tests:", err);
      }
    };
    if (name) {
      fetchData();
    }
  }, [name]);


  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Tests scores
        </h3>
          <div className="flex items-start w-full gap-3 sm:justify-end">
        <ChartTab setName={setName} />
      </div>
      </div>
    
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={180} />
        </div>
      </div>

    </div>
  );
}
