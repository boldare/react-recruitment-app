import mongoose from 'mongoose';
import chalk from 'chalk';
import config from './config';
import logger from './logger';

mongoose.Promise = Promise;

const suffix = process.env.NODE_ENV === 'test' ? '-test' : '';

const { user, pass, host, port, name } = config.database;

export default () => {
  let uri = 'mongodb://';
  if (user) {
    uri += encodeURIComponent(user);
    if (pass) uri += `:${encodeURIComponent(pass)}`;
    uri += '@';
  }
  uri += host;
  if (port) uri += `:${port}`;
  uri += `/${name}${suffix}`;
  logger.log(chalk.bold(`🗄 Connecting to MongoDB: ${host}/${name}.`));
  return mongoose.connect(uri);
};
