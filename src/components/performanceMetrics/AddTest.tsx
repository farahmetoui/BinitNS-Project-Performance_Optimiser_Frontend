import { useState, useRef, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Select from "../form/Select";
import { addTest } from "../../services/metricService";
import Button from "../ui/button/Button";
import { io, Socket } from "socket.io-client";
import LineBar from "./LineBar";
import AllMetrics from "./Metrics";
import MultiSelect from "../form/MultiSelect";
import Percentage from "./Percentage";
import { multiOptions, wiseOptions } from "../../interfaces/model";


export default function AddTest() { 
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedUrls, setselectedUrls] = useState<string[]>();
    const [progress, setProgress] = useState<number>(0);
    const [Urls, setUrls] = useState<any[]>([]);
    const [treatedUrlIndex, setTreatedUrlIndex] = useState<number>(-1);
    const [resultTest, setresultTest] = useState<string[]>();
    let socket: Socket | undefined = undefined;
    let percentage2 = 0;
    let width = 128;
    let height = 128;

   
    const progressRingRef = useRef<SVGCircleElement | null>(null);
    const percentageRef = useRef<HTMLSpanElement | null>(null);
    const loadingdivRef = useRef<HTMLDivElement | null>(null);
    const options = [
        { value: "edison", label: "Edison" },
        { value: "wise", label: "Wise" },
    ];


    const handleSelectChange = (selected: any) => {
        setSelectedName(selected);
    };
    const handleSelectUrlChange = (selected: string[]) => {
        setselectedUrls(selected);
    };
    const reduceloadersize = () => {
        const interval = setInterval(() => {
            if (loadingdivRef.current) {
                if (width > 0) {
                    width = width - 1;
                    height = height - 1;
                    loadingdivRef.current.style.width = `${width}px`;
                    loadingdivRef.current.style.height = `${height}px`;
                    if (percentageRef.current) {
                        percentageRef.current.style.display = "none";
                    }
                }
                else {
                    loadingdivRef.current.style.display = "none";
                    percentage2 += 1;
                    clearInterval(interval);
                }
            }
        }, 20);
    }

    function updateProgress(percentage: number) {


        const interval = setInterval(() => {

            if (percentage2 < percentage) {
                percentage2 += 1;
                const strokeOffset = 345 - (percentage2 / 100) * 345;

                if (progressRingRef.current) {
                    progressRingRef.current.style.strokeDashoffset = strokeOffset.toString();
                }

                if (percentageRef.current) {
                    percentageRef.current.innerText = `${percentage2}%`;
                }

            } else if (percentage2 == 100) {
                reduceloadersize();

            } else {

                clearInterval(interval);
            }
        }, 100);


    }

    const handleSubmit = async () => {
        if (!selectedName) {
            alert("Select an  option.");
            return;
        }

        try {
            if (socket == undefined) {
                socket = io("http://localhost:8080");
            }

            socket.on("connect", () => {
                console.log("Connected to Socket.IO");
            });
            socket.on("initiateAnalyse", (data) => {

                setUrls(data.urlsList);

            });
            socket.on("progress", (data) => {
                if (data.pourcentage !== undefined) {
                    updateProgress(data.pourcentage);
                    setProgress(data.pourcentage);
                    setTreatedUrlIndex(data.treatedUrlIndex);

                }
            });

            socket.on("disconnect", () => {
                console.log(" Disconnect from the Socket.IO");
            });

            updateProgress(1);
            setProgress(1);

            const result = await addTest(selectedName, selectedUrls);
            setresultTest(result.Metrics);
            console.log("Test lancé :", result);
        } catch (err) {
            console.error("Erreur :", err);
        }
    };
    const [showMetrics, setShowMetrics] = useState(false);

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => {
                setShowMetrics(true);
            }, 5000);

            return () => clearTimeout(timer);
        } else {
            setShowMetrics(false);
        }
    }, [progress, selectedName]);

    return (


        <ComponentCard title="Add Test Metrics">
            <div className="space-y-6">

                {progress == 0 && (
                    <>

                        <div>
                            <Label>Select Name</Label>
                            <Select
                                options={options}
                                placeholder="ChooseOption"
                                onChange={handleSelectChange}
                                className="dark:bg-dark-900"
                            />
                        </div>

                        <div className="space-y-4">
                            <Label>Select URLs</Label>

                            {/* MultiSelect UI */}
                            <div className="rounded border border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-dark-800 shadow-sm">
                                <MultiSelect
                                    label="Multiple Select Options"
                                    options={selectedName === "edison" ? multiOptions : wiseOptions}
                                    defaultSelected={["All"]}
                                    onChange={handleSelectUrlChange}
                                />
                            </div>

                        </div>
                        <Button onClick={handleSubmit}>Save Option</Button>
                    </>
                )}

                {/*  Affichage du pourcentage */}
                {progress > 0 && (
                    <>
                        {progress <= 100 && (
                            <>
                                <Percentage percentageRef={percentageRef} loadingdivRef={loadingdivRef} progressRingRef={progressRingRef} />
                            </>
                        )}
                        <Button onClick={() => {
                            window.location.href = "/addTest";
                        }}>
                            Stop Test
                        </Button>

                    </>

                )}

                <LineBar treatedUrlIndex={treatedUrlIndex} urls={Urls} />
                {showMetrics && (
                    <AllMetrics metricsData={resultTest} />
                )}

            </div>
        </ComponentCard>
    );
}
