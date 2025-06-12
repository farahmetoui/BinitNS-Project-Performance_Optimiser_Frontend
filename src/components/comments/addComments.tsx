import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";
import { MentionsInput, Mention } from 'react-mentions';
import { sendComments } from "../../services/commentService";
import inputStyle from "./mentionsInputStyle";
import { defaultMentionStyle } from "./mentionStyle";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from 'jwt-decode';
import SuccessAlert from "../ui/alert/suceessAlert";
import ErrorAlert from "../ui/alert/errorAlert";

type TokenPayload = {
    id: string;
    type?: string;
};
type AddCommentsCardProps = {
    UrlLink: string;
    testNumber: string;
    setVisible: (visible: boolean) => void;
    testId: string;

};

export const AddCommentsCard = ({ UrlLink, testNumber, setVisible, testId }: AddCommentsCardProps) => {
    const { token } = useAuth();
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [value, setValue] = useState("");
    const [receivers, setReceivers] = useState<string[]>([""])
    const [type, setType] = useState<string>("")
    const [priority, setPriority] = useState<string>("")
    const [visibleSuccessAllert, setVisibleSuccessAllert] = useState<boolean>()
    const [visibleErrorAllert, setVisibleErroAllert] = useState<boolean>()
    const users = allUsers.map(user => ({
        id: user.id,
        display: user.userName
    }));


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const cleanedValue = value.replace(/@\[[^\]]+\]\([^)]+\)/g, '');
            const updatedValue = `${cleanedValue}\n And this is the link of tests: ${UrlLink} check ${testNumber}`;
            if (token) {
                const decoded = jwtDecode<TokenPayload>(token);

                const response = await sendComments(decoded.id, receivers, updatedValue, testId, type, priority);
                if (response) {
                    setVisibleSuccessAllert(true);
                    setTimeout(() => {
                        setVisibleSuccessAllert(false);
                        setVisible(false)
                    }, 3000);
                }
            } else {
                console.error("Token is null. Cannot send comments.");
                setVisibleErroAllert(true);
                setTimeout(() => {
                    setVisibleErroAllert(false);
                }, 3000);
            }

        } catch (error) {
            console.error("Error to send comments:", error);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllUsers()
                setAllUsers(data.allUsers);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData()
    }, [])


    return (

        <div className="card flex items-center justify-center  w-full p-4 z-50 ">
            <div className="relative p-4 w-full max-w-xl max-h-full">

                <div className="relative bg-white rounded-lg shadow mx-">
                    {(visibleSuccessAllert || visibleErrorAllert) && (
                        <div className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50">
                            <div>
                                {visibleSuccessAllert && <SuccessAlert isVisible={visibleSuccessAllert} msg={"Comment sent successfully"} />}
                                {visibleErrorAllert && <ErrorAlert isVisible={visibleErrorAllert} msg={"Failed to send comment"} />}
                            </div>
                        </div>
                    )}

                    <div
                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
                    >
                        <h3 className="text-lg font-semibold text-gray-900">
                            Send comments about tests :
                        </h3>

                        <button
                            type="button"
                            onClick={() => setVisible(false)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                ></path>
                            </svg>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>


                    <div>
                        <label className="text-sm font-medium mx-4 mb-2 block">Comment Type</label>
                        <select
                            onChange={(e) => setType(e.target.value)}
                            className="w-125 mx-5 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                            <option value="">Select type</option>
                            <option value="general">General</option>
                            <option value="performance">Performance</option>
                            <option value="accessibility">Accessibility</option>
                            <option value="seo">SEO</option>
                            <option value="bug">Bug</option>
                            <option value="suggestion">Suggestion</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 mx-4 block">Priority</label>
                        <select
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-125 mx-5 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                            <option value="">Select priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 md:p-5">
                        <input type="hidden" name="" value="" />

                        <div className="relative mb-4">
                            <label className="text-sm font-medium mb-2  block">Add comment</label>
                            <MentionsInput
                                value={value}
                                onChange={(event, newValue, newPlainTextValue, mentions) => {
                                    setReceivers(mentions.map(m => m.display));
                                    setValue(newValue);
                                }}
                                placeholder="Type a message and mention users with @..."
                                style={inputStyle}
                            >
                                <Mention
                                    trigger="@"
                                    markup='@[__display__](__id__)'
                                    data={users}
                                    style={defaultMentionStyle}
                                    displayTransform={(id, display) => `${display}`}
                                    onAdd={(id, display) => {
                                        console.log("Mention added:", display);
                                    }}
                                />
                            </MentionsInput>

                            <div id="preview" className="mb-4"></div>
                            <div className="absolute bottom-0 inset-x-0 p-2 rounded-b-md bg-none">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">

                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <button
                                            type="submit"
                                            className="inline-flex flex-shrink-0 justify-center items-center size-10 rounded-lg text-white bg-blue-400 hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2"
                                        >
                                            <svg
                                                className="flex-shrink-0 size-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    )
};
