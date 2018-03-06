import readline from 'readline';
import logger from './logger';

if (process.platform === 'win32') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

export const handleShutdown = (onShutdown) => {
  process.on('SIGINT', () => {
    onShutdown()
      .then(() => process.exit())
      .catch(err => logger.error(err));
  });
};
