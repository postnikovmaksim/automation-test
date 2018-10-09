const requestHelper = require('../../helper/requestHelper');
const nomenclatureService = require('./nomenclatureService');
const NdsEnum = require('../../enums/NdsEnum');
const GoodTypeEnum = require('../../enums/GoodTypeEnum');
const NdsPositionTypeEnum = require('../../enums/NdsPositionTypeEnum');

module.exports = {
    async createGood({ cookie, model }) {
        const defaultModel = {
            NomenclatureId: await nomenclatureService.getIdGoodNomenclature({ cookie }),
            Name: 'Товар по-умолчанию',
            Article: '',
            UnitOfMeasurement: 'шт',
            Nds: NdsEnum.Nds18,
            SalePrice: 0,
            MinSalePrice: 0,
            Type: GoodTypeEnum.Good,
            NdsPositionType: NdsPositionTypeEnum.None,
            Producer: ''
        };

        return requestHelper.post(
            'https://restapi.moedelo.org/stock/api/v1/good',
            Object.assign(defaultModel, model),
            { cookie }
        );
    }
};
