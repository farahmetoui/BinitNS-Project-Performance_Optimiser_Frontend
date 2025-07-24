import { deleteRequest, getRequest } from "./httpService";


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

export const getnumberOfUsers = async () => {
    try {
        const response = await getRequest("numberUsers");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

export const deleteUserById = async (userId : string) => {
    try {
        const response = await deleteRequest(`deleteUser/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
}
