import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config";


const token = Cookies.get("authorization");

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(
        BASE_URL + "loginadmin",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = response.data.token;
    Cookies.set("authorization", token, {
      expires: 7,
      path: "/",
    });
   


    return response.data;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
};

export const createUser = async (firstName:string , lastName:string, userName:string, email:string, phonenumber:number, password:string) => {
    try {
        const response = await axios.post(`${BASE_URL}createAccount`,
            { firstName, lastName, userName,email,phonenumber,password },
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