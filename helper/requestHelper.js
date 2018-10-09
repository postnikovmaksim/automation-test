const request = require('request-promise-native');
const cookieHelper = require('./cookieHelper');

module.exports = {
    get(url, { cookie }) {
        return request(url, {
            method: 'GET',
            headers: {
                Cookie: cookieHelper.getCookieString({ cookie })
            },
            json: true
        });
    },

    post(url, data, { cookie }) {
        return request(url, {
            method: 'POST',
            headers: {
                Cookie: cookieHelper.getCookieString({ cookie })
            },
            body: data,
            json: true
        });
    }
};
