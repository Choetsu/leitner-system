const genericRouter = require("./generic");
const genericController = require("../controllers/generic");
const cardResponseController = require("../controllers/cardResponse");
const CardResponseService = require("../services/cardResponse");

module.exports = new genericRouter(
    new genericController(new CardResponseService(), {
        customController: cardResponseController,
    }),
    {
        customRoutes: [
            {
                handler: "create",
                method: "post",
                path: "/",
                middleware: [],
            },
            {
                handler: "getResponsesByCard",
                method: "get",
                path: "/card/:cardId/:userId",
                middleware: [],
            },
            {
                handler: "checkCardResponseValidity",
                method: "post",
                path: "/check-validity",
                middleware: [],
            },
        ],
        defaultRoutes: {
            getAll: {
                method: "get",
                path: "/",
                middleware: [],
                active: true,
            },
            getOne: {
                method: "get",
                path: "/:id",
                middleware: [],
                active: true,
            },
            update: {
                method: "put",
                path: "/:id",
                middleware: [],
                active: true,
            },
            delete: {
                method: "delete",
                path: "/:id",
                middleware: [],
                active: true,
            },
        },
        middleware: [],
    }
);
