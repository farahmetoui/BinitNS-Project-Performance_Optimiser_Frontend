import { getRequest, postRequest } from "./httpService";

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


export const fetchMetrics = async (id: string) => {
    try {
        const response =   await getRequest(`metrics/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

export const fetchApplications = async () => {
    try {
        const response =await getRequest(`AllApplications`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};


export const getAppTest = async (id: string) => {
    try {
        const response =   await getRequest(`testApp/${id}`);
            
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

export const getWebVitalById = async (id: string) => {
    try {
       const response =   await getRequest(`webvital/${id}`);
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
        const response = await postRequest(`AddMetrics` ,
            {name, urls});
        console.log(response.data);
        return response.data.test;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

export const fetchMetricTest = async () => {
    try {
        const response = await getRequest("testMetric");           
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};


export const getNumberOfTests = async () => {
    try {
        const response = await getRequest("getTestsNumber");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

export const getNumberOfTestsByMonth = async (name:string) => {
    try {
       const response = await postRequest(`getTestsNumberBymonth` ,
            {name});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

export const getPerformanceAverageByMonth = async (name:string) => {
    try {
        const response = await postRequest(`getAverage` ,
            {name});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};