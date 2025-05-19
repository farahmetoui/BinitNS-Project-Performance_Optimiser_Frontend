import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import { getAppTest } from "../../services/metricService";
import Button from "../ui/button/Button";
import { Test } from "../interfaces/model";
import { useParams } from "react-router";
import { getPaginationTabels } from "../../services/paginationService";

export default function TestApplication() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [allTests, setAllTests] = useState<Test[]>([]);
    const [tests, setTests] = useState<Test[]>([]);
    const [page, setPage] = useState(1);
    const limit = 5;
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {

                const data = await getAppTest(id)
                setAllTests(data);
                console.log("here are the tests data : ", data);
            } catch (err) {
                console.error(err);
                console.log("Erreur lors de la récupération des métriques");
            }
        };
        fetchData();
    }, [id]);


    useEffect(() => {
        if (allTests.length === 0) return;

        const fetchPage = async () => {
            try {
                console.log("Fetching page", page);
                const paginated = await getPaginationTabels(allTests, page, limit);
                console.log("Paginated Data:", paginated);

                if (paginated && paginated.data && Array.isArray(paginated.data)) {
                    setTests(paginated.data);
                    setTotalPages(paginated.totalPages);
                } else {
                    console.error("Données paginées invalides", paginated);
                }
            } catch (err) {
                console.error("Erreur pagination:", err);
            }
        };

        fetchPage();
    }, [allTests, page]);

    return (
        <div className="fixed flex flex-col  items-center w-full">
            <div className="max-w-full flex justify-center lg:pl-50 px-20 py-10 lg:px-130">
                <Table >
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y ">
                        <TableRow>
                            <TableCell isHeader className="py-3 lg:px-15 font-medium text-gray-500 text-start text-theme-lg dark:text-gray-400">
                                Test Number
                            </TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-lg dark:text-gray-400 lg:px-15">
                                Date of the Test
                            </TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-lg dark:text-gray-400 lg:px-15">
                                Show Metrics Details
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {tests.length > 0 ? (
                            tests.map((test, index) => (
                                <TableRow key={index}>
                                    <TableCell className="py-3 lg:px-20 text-gray-500 text-theme-sm dark:text-gray-400">
                                        Test {index + 1 + (page - 1) * limit}
                                    </TableCell>
                                    <TableCell className="py-3 lg:px-20  text-gray-500 text-theme-sm dark:text-gray-400">
                                        {test.DateofTest?.split("T")[0]}
                                    </TableCell>
                                    <TableCell className="py-3 lg:px-20 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Button
                                            size="sm"
                                            variant="primary"
                                            onClick={() =>
                                                navigate("/metrics", {
                                                    state: { MetricsData: test.Metrics },
                                                })
                                            }
                                        >
                                            Show Metrics
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={1} className="text-center">

                                    <div className="flex flex-row gap-2 pl-90">
                                        <div className="w-4 h-4 rounded-full bg-morgen animate-bounce"></div>
                                        <div
                                            className="w-4 h-4 rounded-full bg-morgen animate-bounce [animation-delay:-.3s]"
                                        ></div>
                                        <div
                                            className="w-4 h-4 rounded-full bg-morgen animate-bounce [animation-delay:-.5s]"
                                        ></div>
                                    </div>

                                </td>
                            </tr>
                        )}
                    </TableBody>


                </Table>
            </div>
            <div className="flex justify-end gap-20 mt-4 lg:-ml-90">
                <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="cursor-pointer duration-200 hover:scale-125 active:scale-100 px-30" title="Go Back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-morgen">
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
                    </svg>
                </button>
                <span className="text-xs text-gray-400">Page {page} / {totalPages}</span>

                <button className=" px-30 cursor-pointer duration-200 hover:scale-125 active:scale-100" title="Go Forward" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-morgen transform scale-x-[-1]">
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
                    </svg>
                </button>


            </div>


        </div>
    );
}



