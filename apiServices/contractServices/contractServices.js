const moment = require('moment');
const requestHelper = require('../../helper/requestHelper');
const kontragentServices = require('../../apiServices/kontragentServices/kontragentServices');
const ContractStatusEnum = require('../../enums/ContractStatusEnum');
const ContractDirectionEnum = require('../../enums/ContractDirectionEnum');
const ContractKindEnum = require('../../enums/ContractKindEnum');

module.exports = {
    async createContract({ cookie, model }) {
        let defaultKontragentId;

        if (!model || !model.KontragentId) {
            const kontragents = await kontragentServices.getKontragents({ cookie });
            if (kontragents && kontragents.length) {
                defaultKontragentId = kontragents[0].Id;
            }

            const kontragent = await kontragentServices.createKontragent({ cookie });
            defaultKontragentId = kontragent.Id;
        }

        const defaultModel = {
            Number: '1',
            DocDate: moment().format('DD.MM.YYYY'),
            Sum: 0,
            EndDate: '',
            IsArchived: false,
            Status: ContractStatusEnum.Active,
            KontragentId: defaultKontragentId,
            Project: '',
            Direction: ContractDirectionEnum.Outgoing,
            Kind: ContractKindEnum.Default,
            MediationType: null
        };

        return requestHelper.post(
            'https://restapi.moedelo.org/contract/api/v1/contract',
            Object.assign(defaultModel, model),
            { cookie }
        );
    }
};
