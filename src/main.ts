#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const template = `
/* Create by https://github.com/yonycalsin/sequelize-ts-cli */

var path = require('path');

const root = (...more) => path.resolve('scripts', 'database', ...more);

module.exports = {
   env: 'development',
   config: root('config', 'config.js'),
   'models-path': root('models'),
   'seeders-path': root('seeders'),
   'migrations-path': root('migrations'),
};
`;

const getArg = (key: string, defaultValue?: any) => {
   const args = process.argv;
   let newValue: any = null;

   args.reduceRight((a, value, index) => {
      if (key === value) {
         newValue = args[index + 1] || true;
      }
      return a;
   });

   return newValue || defaultValue;
};

const optionsFileName = getArg('--options-path', 'sequelizerc.ts');

const initFile = () => {
   const optionsPath = path.resolve(optionsFileName);
   const already = fs.existsSync(optionsPath);

   if (!already) {
      fs.writeFileSync(optionsPath, template, {
         encoding: 'utf-8',
      });
   }
};
const logger = (error, stdout, stderr) => {
   if (error) {
      console.log('Error:', error);
      return;
   }

   if (stderr) {
      console.log('Stderr:', stderr);
      return;
   }

   console.log(stdout);
};
const getArgsString = () => {
   let data = process.argv;

   delete data[0];
   delete data[1];

   let newData = data.filter(Boolean).join(' ');

   newData = newData.replace(/(--options-path\s*[a-z.\/]+)\s/, '');

   return newData;
};

const firstArg = process.argv[2];
const stringArg = getArgsString();

switch (firstArg) {
   case 'init':
      initFile();
      exec(
         `npx sequelize ${stringArg} --options-path ${optionsFileName} `,
         logger,
      );
      break;
   default:
      exec(`npx sequelize ${stringArg}`, logger);
      break;
}
