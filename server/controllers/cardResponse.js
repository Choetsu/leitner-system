module.exports = function CardResponseController(CardResponseService) {
    return {
        create: async (req, res, next) => {
            try {
                const { body } = req;
                const cardResponse = await CardResponseService.create(body);
                return res.status(201).json(cardResponse);
            } catch (error) {
                if (error.constructor.name === "ValidationError") {
                    res.status(422).json(error.errors);
                } else if (error.constructor.name === "UniqueConstraintError") {
                    res.status(409).json(error.errors);
                } else {
                    console.error(error);
                    next(error);
                }
            }
        },
        getResponsesByCard: async (req, res, next) => {
            try {
                const { cardId, userId } = req.params;
                const responses = await CardResponseService.getResponsesByCard(
                    cardId,
                    userId
                );
                if (responses) res.json(responses);
                else res.sendStatus(404);
            } catch (error) {
                console.error(error);
                next(error);
            }
        },
        checkCardResponseValidity: async (req, res, next) => {
            try {
                const { cardId, userId } = req.body;
                const response =
                    await CardResponseService.checkCardResponseValidity(
                        cardId,
                        userId
                    );
                if (response) res.json(response);
                else res.sendStatus(404);
            } catch (error) {
                console.error(error);
                next(error);
            }
        },
    };
};
