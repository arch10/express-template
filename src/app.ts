require('dotenv').config();

import express from 'express';
import { appConfig, setupDb } from './setup';
import { logger, initializeLogging } from './util';
import { handlePageNotFound, handleError } from './middlewares';
import { testRoute } from './routes';

const app = express();
initializeLogging();
setupDb();

//Add Middleware
app.use(express.json());

const contextPath = appConfig.API_CONTEXT;
const getPath = (path: string) => {
  return `${contextPath}${path}`;
};

//Add routes
app.use(getPath('/test'), testRoute);

// Capture errors
app.use(handleError);
app.use(handlePageNotFound);

const serverPort = appConfig.PORT;
app.listen(serverPort, () => {
  logger.info(`Started server at port ${serverPort}`);
  logger.debug(`API context: ${contextPath}`);
});
