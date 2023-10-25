import axios from 'axios';

export const makeRequest = (url, method = 'get', body) => {
    return axios({
        method,
        url: `https://backend-vert-nine.vercel.app${url}`,
        data: body,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};