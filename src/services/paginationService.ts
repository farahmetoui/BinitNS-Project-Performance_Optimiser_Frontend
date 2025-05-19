import axios from "axios";
import { BASE_URL } from "../../config";
import Cookies from "js-cookie";

const token = Cookies.get("authorization");

export const getPaginationTabels = async (data:any[] , page:number, limit:number) => {
    try {
        const response = await axios.post(`${BASE_URL}pagination`,
            { data, page, limit },
            {
                headers: {
                  "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`, 
                },}
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};