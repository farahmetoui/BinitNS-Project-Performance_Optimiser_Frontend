import { postRequest } from "./httpService";

export const loginRequest = async (email: string, password: string) => {
  try {
   const response = await postRequest(`loginadmin` ,
            {email, password});
    return response.data;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
};

export const createUser = async (firstName: string, lastName: string, userName: string, email: string, phonenumber: number, password: string ,role:string) => {
  try {
    const response = await postRequest(`createAccount` ,
    {firstName, lastName, userName, email, phonenumber, password, role});
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};