"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
(0, globals_1.describe)('Unit testing:', () => {
    let mockedReq;
    (0, globals_1.beforeAll)(() => {
        mockedReq = (0, supertest_1.default)(app_1.default);
    });
    (0, globals_1.describe)('Get time:', () => {
        (0, globals_1.test)('Without Authorization', () => {
            return mockedReq.get('/time').expect(403);
        });
        (0, globals_1.test)('With wrong Auth', () => {
            return mockedReq
                .get('/time')
                .set('Authorization', 'bearer ' + 123)
                .expect(403);
        });
        (0, globals_1.test)('With Auth, get data', () => __awaiter(void 0, void 0, void 0, function* () {
            const okRequest = yield mockedReq.get('/time').set('Authorization', 'bearer ' + process.env.AUTH_PHRASE);
            (0, globals_1.expect)(okRequest.status).toBe(200);
            const body = okRequest.body;
            (0, globals_1.expect)(typeof body).toBe('object');
            (0, globals_1.expect)(typeof body.epoch).toBe('number');
        }));
    });
    (0, globals_1.describe)('Random urls', () => {
        (0, globals_1.test)('Without Auth, url: /time123', () => {
            return mockedReq.get('/time123').expect(404);
        });
        (0, globals_1.test)('Random url with wrong Auth', () => {
            return mockedReq
                .get('/123')
                .set('Authorization', 'bearer ' + 123)
                .expect(404);
        });
        (0, globals_1.test)('Random url with right Auth', () => {
            return mockedReq
                .get('/123')
                .set('Authorization', 'bearer ' + process.env.AUTH_PHRASE)
                .expect(404);
        });
    });
    (0, globals_1.describe)('Metrics:', () => {
        (0, globals_1.test)('Without Auth', () => {
            return mockedReq.get('/metrics').expect(404);
        });
        (0, globals_1.test)('With wrong Auth', () => {
            return mockedReq
                .get('/metrics')
                .set('Authorization', 'bearer ' + 123)
                .expect(404);
        });
        (0, globals_1.test)('With Auth, get data', () => __awaiter(void 0, void 0, void 0, function* () {
            const okRequest = yield mockedReq.get('/metrics').set('Authorization', 'bearer ' + process.env.AUTH_PHRASE);
            (0, globals_1.expect)(okRequest.status).toBe(200);
        }));
    });
});
