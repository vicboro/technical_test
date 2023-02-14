import { Router } from 'express';
import { AuthMiddleware, checkToken } from '../middlewares/auth.middleware';
import { GetTime } from '../controllers';
import promMid from 'express-prometheus-middleware';
import { Config } from '../config';

const AuthorizationRoutes = Router();

AuthorizationRoutes.get('/time', AuthMiddleware(Config.authPhrase), GetTime);

AuthorizationRoutes.use(
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    authenticate: (req) => checkToken(req.headers.authorization, Config.authPhrase)
  })
);
export default AuthorizationRoutes;
