import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASS, TEST_DB_NAME, JAWSDB_MARIA_URL } = process.env;

export const dbConfig = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      multipleStatements: true,
    },
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: TEST_DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      multipleStatements: true,
    },
  },
  production: {
    use_env_variable: JAWSDB_MARIA_URL,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      multipleStatements: true,
    },
  },
};
