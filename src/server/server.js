import socketIo from 'socket.io';
import chalk from 'chalk';

import connectDatabase from './database';
import logger from './logger';
import { actions, handlers } from './actions';
import { initState } from './client-state';
import { performAction } from './action-performer';
import { localIp } from './utils';
import { handleShutdown } from './handle-shutdown';
import config from './config';

logger.log(chalk.bold(`💻 Server starting, environment: ${process.env.NODE_ENV}`));
connectDatabase().then(() => {
  const io = socketIo();
  io.listen(config.port);
  logger.log(chalk.bold(`👂 Listening on ws://${localIp()}:${config.port}/.`));

  const connectionStates = {};
  let ongoingActions = 0;
  let onActionFinished;

  io.on('connection', (socket) => {
    if (config.detailedLogs) {
      logger.log(chalk.bold.blue(`User ${socket.id} connected`));
    }
    connectionStates[socket.id] = initState();

    Object.values(actions)
      .forEach(action => socket.on(action, async (params) => {
        ongoingActions += 1;
        connectionStates[socket.id] = await performAction({
          socket, state: connectionStates[socket.id], handlers
        }, action, params);
        ongoingActions -= 1;
        if (onActionFinished) onActionFinished();
      }));
    socket.on('disconnect', () => {
      delete connectionStates[socket.id];
    });
  });

  handleShutdown(async () => {
    logger.log(chalk.bold('🔪 Shutting down...'));
    await new Promise((resolve) => {
      io.httpServer.close(() => {
        io.close(() => {
          logger.log(chalk.bold('🙉 Server stopped listening on socket.'));
          onActionFinished = () => {
            if (ongoingActions === 0) resolve();
          };
          onActionFinished();
        });
      });
    });
    logger.log(chalk.bold('👌 Server completed all actions.'));
  });
});
