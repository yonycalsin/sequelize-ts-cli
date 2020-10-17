#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { exec } from 'child_process';

const template = `var path = require('path');

const root = (...more) => path.resolve('scripts', 'database', ...more);

module.exports = {
   env: 'development',
   config: root('config', 'config.js'),
   'models-path': root('models'),
   'seeders-path': root('seeders'),
   'migrations-path': root('migrations'),
};
`;
const optionsPath = path.resolve(yargs.argv.optionsPath || 'sequelizerc.ts');
const already = fs.existsSync(optionsPath);

if (!already) {
   fs.writeFileSync(optionsPath, template, {
      encoding: 'utf-8',
   });
}

exec(
   `npx sequelize $* --options-path ./sequelizerc.ts`,
   (error, stdout, stderr) => {
      if (error) {
         console.log('Error:', error);
         return;
      }

      if (stderr) {
         console.log('Stderr:', stderr);
         return;
      }

      console.log(stdout);
   },
);
