import { getRequest } from "./httpService";


export const getAllUsers = async () => {
    try {
        const response = await getRequest("allUsers");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};
