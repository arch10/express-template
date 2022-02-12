import mongoose from 'mongoose';
import { logger } from './util';

export const appConfig = {
  DB_CONNECTION: process.env.DB_CONNECTION || '',
  PORT: process.env.PORT || 8080,
  API_CONTEXT: process.env.API_CONTEXT || '/v1',
  ENV: process.env.ENV || 'dev'
};

export const setupDb = () => {
  //Connect to DB
  mongoose.connect(appConfig.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  const db = mongoose.connection;

  db.on('error', e => logger.error(e.message));
  db.once('open', () => {
    logger.info('Connected to DB');
  });
};
