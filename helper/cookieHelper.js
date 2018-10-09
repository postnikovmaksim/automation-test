module.exports = {
    getCookieString({ cookie }) {
        return `md-auth=${cookie.find(c => c.name === 'md-auth').value}`;
    },

    getCookie({ page }) {
        return page.cookies('https://restapi.moedelo.org');
    }
};
