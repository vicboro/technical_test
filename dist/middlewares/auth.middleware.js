"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.AuthMiddleware = void 0;
const AuthMiddleware = (AcceptPhrase) => (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!(0, exports.checkToken)(token, AcceptPhrase)) {
            return res.sendStatus(403);
        }
        next();
    }
    catch (err) {
        res.sendStatus(403);
    }
};
exports.AuthMiddleware = AuthMiddleware;
const checkToken = (token, AcceptPhrase) => {
    if (!token || !AcceptPhrase) {
        return false;
    }
    if (token.toLowerCase().startsWith('bearer')) {
        token = token.slice('bearer'.length).trim();
    }
    return token === AcceptPhrase;
};
exports.checkToken = checkToken;
