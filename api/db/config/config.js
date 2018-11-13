const config = {
  development: {
    username: process.env.POSTGRES_USERNAME || 'botmoc',
    password: process.env.POSTGRES_PASSWORD || 'botmoc',
    database: process.env.POSTGRES_DB || 'botmoc',
    host: process.env.DB_HOSTNAME || 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    operatorsAliases: false,
  },
};

module.exports = config;
