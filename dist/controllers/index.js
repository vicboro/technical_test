"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTime = void 0;
const GetTime = (req, res) => {
    try {
        const time = { epoch: Math.round(Date.now() / 1000) };
        res.status(200).json(time);
    }
    catch (err) {
        res.sendStatus(500);
    }
};
exports.GetTime = GetTime;
