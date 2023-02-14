import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import AuthorizationRoutes from './routes';
import { NotFound } from './middlewares/notFound.middleware';
import { Config } from './config';

const app: Express = express();

app.use(express.json());
app.use(cors());

if (Config.isDevEnv) {
  app.use(morgan('combined'));
}

app.use('/', AuthorizationRoutes);

app.use(NotFound);

const port = process.env.PORT || 8000;
export const startServer = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

export default app;
