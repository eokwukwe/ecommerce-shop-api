import path from 'path';
import fs from 'fs';
import { sequelize } from '../database/models';

// read sql from file
const dir = path.join(__dirname, '../../database/test-dump.sql');
let sql = fs.readFileSync(dir).toString();

// run query against database
sequelize
  .query(sql, { raw: false })
  .then(results => {
    console.log('Successfully created');
  })
  .catch(error => {
    console.error('error', error);
  })
  .finally(() => process.exit());
