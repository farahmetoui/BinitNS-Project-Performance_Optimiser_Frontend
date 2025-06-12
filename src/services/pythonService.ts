import axios from "axios";

const pythonURl  ="http://127.0.0.1:5001/"

export const generateSimpleReport = async (urlJson:string) => {  
    try {
        const response = await axios.post(`${pythonURl}generer-pdf`,
            {url:urlJson });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};