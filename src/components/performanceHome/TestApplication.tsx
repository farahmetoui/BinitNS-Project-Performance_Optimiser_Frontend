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
import { Test } from "../../interfaces/model";
import { useParams } from "react-router";
import { getPaginationTabels } from "../../services/paginationService";
import { AddCommentsCard } from "../comments/addComments";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, EyeIcon, MessageSquareIcon, PlusIcon } from "../../pages/Icons";
import TestComments from "../comments/showComments";

export default function TestApplication() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [allTests, setAllTests] = useState<Test[]>([]);
    const [tests, setTests] = useState<Test[]>([]);
    const [page, setPage] = useState(1);
    const limit = 5;
    const [totalPages, setTotalPages] = useState(1);
    const [isVisible, setVisible] = useState<boolean>(false);
    const [isVisibleComment, setVisibleComment] = useState<boolean>(false);
    const [testNumber, setTestNumber] = useState<string>("");
    const [testId, setTestId] = useState<string>("");
    const currentUrl = window.location.href;
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {

                const data = await getAppTest(id)
                setAllTests(data);
                console.log("here are the tests data : ", data);
            } catch (err) {
                console.error(err);
                console.log("Error to getr metrics");
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
     if (isVisibleComment) {
    return <TestComments id={testId} setVisible={setVisibleComment} />;
  }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Test Results</h1>
                    <p className="text-gray-600">Manage and review your test results and comments</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 font-medium text-gray-900">Test Number</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-900">Date of the Test</th>
                                    <th className="text-center py-4 px-6 font-medium text-gray-900">Show Metrics Details</th>
                                    <th className="text-center py-4 px-6 font-medium text-gray-900">Add Comments</th>
                                    <th className="text-center py-4 px-6 font-medium text-gray-900">Show Comments</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {tests.length > 0 ? (
                                    tests.map((test, index) => (
                                        <tr key={test.id} className="hover:bg-gray-50">
                                            <td className="py-4 px-6 text-gray-900"> Test  {index + 1 + (page - 1) * limit} </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon />
                                                    {test.DateofTest?.split("T")[0]}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-morgen text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                                                    onClick={() =>
                                                        navigate("/metrics", {
                                                            state: { MetricsData: test.Metrics },
                                                        })
                                                    }>
                                                    <EyeIcon />
                                                    Show
                                                </button>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
                                                    onClick={() => {
                                                        setVisible(true),
                                                            setTestNumber(`Test ${index + 1 + (page - 1) * limit}`),
                                                            setTestId(test.id)
                                                    }}>
                                                    <PlusIcon />
                                                    Add
                                                </button>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button
                                                    onClick={() => {
                                                        setVisibleComment(true),
                                                            setTestId(test.id)
                                                    }}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors"
                                                >
                                                    <MessageSquareIcon />
                                                    Show
                                                </button>
                                            </td>
                                        </tr>
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
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeftIcon />
                            </button>
                            <button
                                disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRightIcon />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-20 mt-4 lg:-ml-90">

                    {isVisible && (
                        <div className="fixed inset-0 flex items-center justify-center z-20 backdrop-blur-md">
                            <AddCommentsCard UrlLink={currentUrl} testNumber={testNumber} setVisible={setVisible} testId={testId} />
                        </div>
                    )}
                </div>
               


            </div> </div>
    );
}



