import axios from "axios";

export const axiosInstance = axios.create({});

export const apiconnector = async ( method , url, bodyData = null,
                 headers = null, params = null ) => {
    console.log(url);
    console.log(method);

    if (params) {
        const queryParams = new URLSearchParams(params).toString();
        url += `?${queryParams}`;
    }

    const options = {
        method,
        headers: {
            ...headers, 
            'Content-Type': 'application/json',
        },
        Credential: "include"
    };

    if (bodyData ) {
        options.body = bodyData ;
    }
    if (bodyData && method !== 'GET') {
        options.body = JSON.stringify(bodyData);
    }

    const response = await fetch(url, options);

    return response.json() ;
};