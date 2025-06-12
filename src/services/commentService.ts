import { getRequest, postRequest } from "./httpService";


export const sendComments = async (authorId: string, usernames: string[], message: string, testId:string ,type:string , priority:string) => {
    try {
        const response = await postRequest(`createComment`,
            { authorId, usernames, message , testId ,type,priority});
        return response.data;
    } catch (error) {
        console.error("send comments failed:", error);
        throw error;
    }
};


export const getComments = async (id: string) => {
    try {
          const response =   await getRequest(`getComment/${id}`);
        return response.data;
    } catch (error) {
        console.error("send comments failed:", error);
        throw error;
    }
};