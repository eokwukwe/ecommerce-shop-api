import '@babel/polyfill';
import cors from 'cors';
import log from 'fancy-log';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import expressWinston from 'express-winston';

import router from './routes';
import logger from './helpers/logger';
import swaggerDoc from './swagger.json'

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
const corsOptions = {
  credentials: true,
  origin: [],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// compression and header security middleware
app.use(compression());
app.use(helmet());

app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    meta: false,
    expressFormat: true,
    colorize: true,
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  })
);

app.use('/stripe/charge', express.static(`${__dirname}/public`));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Resource does not exist');
  error.status = 404;
  next(error);
});

if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    log(error.stack);
    res.status(error.status || 500).json({
      error: {
        message: error.message,
      },
    });
  });
}

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  // eslint-disable-line no-unused-vars
  logger.log({ level: 'error', message: error.message });
  return res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

// configure port and listen for requests
const port = parseInt(process.env.NODE_ENV === 'test' ? 8378 : process.env.PORT, 10) || 8000;
export const server = app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});

export default app;
