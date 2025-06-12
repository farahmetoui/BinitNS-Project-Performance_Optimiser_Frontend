import { postRequest } from "./httpService";



export const getPaginationTabels = async (data:any[] , page:number, limit:number) => {
    try {
       const response = await postRequest(`pagination` ,
            {data, page, limit});
        return response.data;
    } catch (error) {
        throw error;
    }
};