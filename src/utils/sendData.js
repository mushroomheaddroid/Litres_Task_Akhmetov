const axios = require('axios');
const qs = require('qs');

const postData = async (data, url, method) => {
    return axios({
        withCredentials: true,
        method: method,
        url: url,
        data: qs.stringify(data),
        headers: {
            Accept: '*/*',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
};

export {postData}