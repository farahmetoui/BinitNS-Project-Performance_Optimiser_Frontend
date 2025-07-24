import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config";

export async function getRequest(url: string) {
    const token = Cookies.get("authorization");
    const response = await axios.get(BASE_URL + url,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
}

export async function postRequest(url: string, object: any) {
    const token = Cookies.get("authorization");
    const response = await axios.post(BASE_URL + url,
        object,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
}

export async function putRequest(url: string, object: any) {
  const token = Cookies.get("authorization");
  const response = await axios.put(BASE_URL + url, object, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function deleteRequest(url: string) {
    const token = Cookies.get("authorization");
    const response = await axios.delete(BASE_URL + url,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
}

