const requestHelper = require('../../helper/requestHelper');

module.exports = {
    async getNomenclatures({ cookie }) {
        const resp = await requestHelper.get('https://restapi.moedelo.org/stock/api/v1/nomenclature', { cookie });
        return resp.ResourceList;
    },

    async getIdGoodNomenclature({ cookie }) {
        const nomenclatures = await this.getNomenclatures({ cookie });
        return nomenclatures.find(n => n.Name === 'Товары').Id;
    }
};
