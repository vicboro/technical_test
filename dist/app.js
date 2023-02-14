"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
if (config_1.Config.isDevEnv) {
    app.use((0, morgan_1.default)('combined'));
}
app.use('/', routes_1.default);
app.use(notFound_middleware_1.NotFound);
const port = process.env.PORT || 8000;
const startServer = () => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};
exports.startServer = startServer;
exports.default = app;
