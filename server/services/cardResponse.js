const { CardResponse } = require("../db/models");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const UniqueConstraintError = require("../errors/UniqueConstraintError");

module.exports = function CardResponseService() {
    return {
        findAll: async function (filters, options) {
            let dbOptions = {
                where: filters,
            };
            if (options.order) {
                dbOptions.order = Object.entries(options.order);
            }
            if (options.limit) {
                dbOptions.limit = options.limit;
                dbOptions.offset = options.offset;
            }
            return CardResponse.findAll(dbOptions);
        },
        findOne: async function (filters) {
            return CardResponse.findOne({ where: filters });
        },
        create: async function (data) {
            try {
                const cardResponse = await CardResponse.create(data);

                return cardResponse;
            } catch (e) {
                if (e instanceof Sequelize.UniqueConstraintError) {
                    throw UniqueConstraintError.fromSequelizeUniqueConstraintError(
                        e
                    );
                }
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }

                throw e;
            }
        },
        replace: async function (filters, newData) {
            try {
                const nbDeleted = await this.delete(filters);
                const cardResponse = await this.create(newData);
                return [[cardResponse, nbDeleted === 0]];
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        update: async (filters, newData) => {
            try {
                const [nbUpdated, cardResponses] = await CardResponse.update(
                    newData,
                    {
                        where: filters,
                        returning: true,
                        individualHooks: true,
                    }
                );
                return [nbUpdated, cardResponses];
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        delete: async function (filters) {
            return CardResponse.destroy({ where: filters });
        },
        getResponsesByCard: async function (cardId, userId) {
            return CardResponse.findAll({
                where: {
                    cardId,
                    userId,
                },
            });
        },
        checkCardResponseValidity: async function (cardId, userId) {
            const cardResponse = await CardResponse.findAll({
                where: {
                    cardId,
                    userId,
                },
            });

            if (cardResponse.isValid === false) {
                throw new UnauthorizedError();
            }

            return cardResponse;
        },
    };
};
