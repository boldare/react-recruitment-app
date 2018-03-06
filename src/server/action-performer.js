import chalk from 'chalk';
import cloneDeep from 'lodash/cloneDeep';
import logger from './logger';
import config from './config';

const { detailedLogs } = config;

const stringify = (object) => {
  if (!object) return `${object}`;
  return JSON.stringify(object, null, 2).replace(/\n/g, '\n  ');
};

const asyncJoin = (socket, room) => new Promise((resolve) => {
  socket.join(room, () => resolve());
});

const asyncLeave = (socket, room) => new Promise((resolve) => {
  socket.leave(room, () => resolve());
});

export const performAction = async ({ socket, state, handlers }, name, params) => {
  let actionLog = chalk.bold(`action ${chalk.bold.underline.blue(name)}\n`);
  actionLog += `  ${chalk.blue('params')}: ${stringify(params)}\n`;
  const newState = cloneDeep(state);
  const perform = async (performName, performParams, performState) => performAction({
    socket, state: performState || newState, handlers
  }, performName, performParams || {});
  try {
    if (!handlers[name]) {
      throw new Error(`Action ${name} is not supported.`);
    }
    const {
      emit,
      broadcast,
      state: stateChange,
      join,
      leave
    } = await handlers[name](params, state, perform);
    if (stateChange) {
      if (detailedLogs) {
        actionLog += `  ${chalk.green.italic('state')}: ${stringify(stateChange)}\n`;
      }
      Object.assign(newState, stateChange);
    }
    if (emit) {
      if (detailedLogs) {
        actionLog += `  ${chalk.green.italic('emit')}: ${stringify(emit)}\n`;
      }
      socket.emit(`${name}/success`, emit);
    }
    if (join) {
      await asyncJoin(socket, join);
    }
    if (broadcast) {
      const rooms = Object.keys(socket.rooms);
      rooms.splice(rooms.indexOf(socket.id), 1);
      if (rooms.length) {
        if (detailedLogs) {
          actionLog += `  ${chalk.green.italic(`broadcast(${rooms[0]})`)}: ${stringify(broadcast)}\n`;
        }
        socket.to(rooms[0]).emit(`${name}/success`, broadcast);
      } else if (detailedLogs) {
        actionLog += `  ${chalk.green.italic('broadcast -> emit')}: ${stringify(broadcast)}\n`;
      }
      socket.emit(`${name}/success`, broadcast);
    }
    if (leave) {
      await asyncLeave(socket, leave);
      socket.to(leave).emit(`${name}/success`, broadcast);
    }
  } catch (error) {
    actionLog += `  ${chalk.red.italic('error')} ${error.message}\n`;
    socket.emit(`${name}/failure`, { message: error.message });
    logger.log(error);
  }
  if (detailedLogs) {
    logger.log(actionLog);
  }

  return newState;
};
