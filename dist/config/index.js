"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
exports.Config = {
    env: process.env.NODE_ENV,
    isDevEnv: process.env.NODE_ENV === 'dev',
    authPhrase: process.env.AUTH_PHRASE
};
