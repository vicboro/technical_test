"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const controllers_1 = require("../controllers");
const express_prometheus_middleware_1 = __importDefault(require("express-prometheus-middleware"));
const config_1 = require("../config");
const AuthorizationRoutes = (0, express_1.Router)();
AuthorizationRoutes.get('/time', (0, auth_middleware_1.AuthMiddleware)(config_1.Config.authPhrase), controllers_1.GetTime);
AuthorizationRoutes.use((0, express_prometheus_middleware_1.default)({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    authenticate: (req) => (0, auth_middleware_1.checkToken)(req.headers.authorization, config_1.Config.authPhrase)
}));
exports.default = AuthorizationRoutes;
