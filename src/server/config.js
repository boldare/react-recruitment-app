const configFile = require('../../config/server.json');

const { port, database } = configFile;

const configuration = {
  port: port || 5000,
  database: {
    host: database.host,
    port: database.port,
    name: database.name,
    user: database.user,
    pass: database.pass
  },
  detailedLogs: process.env.NODE_ENV === 'development'
};

if (!configuration.database.host) {
  throw new Error('Config error: Missing database host.');
}
if (!configuration.database.name) {
  throw new Error('Config error: Missing database name.');
}

if(process.env.DATABASE){
  configuration.database.host = process.env.DATABASE;
}

export default configuration;
