const requestHelper = require('../../helper/requestHelper');
const KontragentTypeEnum = require('../../enums/KontragentTypeEnum');
const KontragentFormEnum = require('../../enums/KontragentFormEnum');

module.exports = {
    async getKontragents({ cookie }) {
        const resp = requestHelper.get(
            'https://restapi.moedelo.org/kontragents/api/v1/kontragent',
            { cookie }
        );

        return resp.ResourceList;
    },

    async createKontragent({ cookie, model }) {
        const defaultModel = {
            Inn: '',
            Ogrn: '',
            Okpo: '',
            Name: 'Контрагент по умолчанию',
            Type: KontragentTypeEnum.Kontragent,
            Form: KontragentFormEnum.UL,
            LegalAddress: '',
            ActualAddress: '',
            RegistrationAddress: '',
            TaxpayerNumber: '',
            AdditionalRegNumber: ''
        };

        return requestHelper.post(
            'https://restapi.moedelo.org/kontragents/api/v1/kontragent',
            Object.assign(defaultModel, model),
            { cookie }
        );
    }
};
