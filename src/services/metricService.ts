import axios from "axios";
import { BASE_URL } from "../../config";
import Cookies from "js-cookie";

const multiOptions = [
    "https://online-we-fe-u.morgenfund.com/#login",
    "https://online-we-fe-u.morgenfund.com/#multi-depot-dashboard",
    "https://online-we-fe-u.morgenfund.com/#dashboard",
    "https://online-we-fe-u.morgenfund.com/#watchlist",
    "https://online-we-fe-u.morgenfund.com/#settings/profile",
    "https://online-we-fe-u.morgenfund.com/#postbox",
    "https://online-we-fe-u.morgenfund.com/#transactions",
    "https://online-we-fe-u.morgenfund.com/#manage-orders",
    "https://online-we-fe-u.morgenfund.com/#link-depot",
    "https://online-we-fe-u.morgenfund.com/#usersettings/userprofile",
    "https://www.morgenfund.com/de/private/kontakt/online-depot",
    "https://online-we-fe-u.morgenfund.com/#fund-finder",


];
const token = Cookies.get("authorization");

export const fetchMetrics = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}metrics/${id}`,
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

export const fetchApplications = async () => {
    try {
        const response = await axios.get(`${BASE_URL}AllApplications`,
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

export const addMetrics = async (id: string) => {  //kamalhaa mazelet 
    try {
        const response = await axios.get(`${BASE_URL}metrics/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

export const getAppTest = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}testApp/${id}`,
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

export const getWebVitalById = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}webvital/${id}`,
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

export const addTest = async (name: string, urls: string[] = multiOptions) => {
    try {
      
        if (urls[0] == "All" || urls.length == 0) {
            urls = multiOptions
        }
        const response = await axios.post(
            `${BASE_URL}AddMetrics`,
            { name, urls },
            {
              headers: {
                "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`, 
              },})
        console.log(response.data);
        return response.data.test;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

export const fetchMetricTest = async () => {
    try {
        const response = await axios.get(`${BASE_URL}testMetric`,
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


export const getNumberOfTests = async () => {
    try {
        const response = await axios.get(`${BASE_URL}getTestsNumber`,
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

export const getNumberOfTestsByMonth = async () => {
    try {
        const response = await axios.get(`${BASE_URL}getTestsNumberBymonth`,
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

export const getPerformanceAverageByMonth = async () => {
    try {
        const response = await axios.get(`${BASE_URL}getAverage`,
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