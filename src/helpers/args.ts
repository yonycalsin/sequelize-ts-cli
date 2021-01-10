import fs from 'fs';
import path from 'path';
import { defaultSequelizeRcFilePath } from 'src/constants';
import waitPromise from 'src/utils/wait-promise';
import yargs from 'yargs';

export const loadConfigFile = (filePath: string) => {
   const rcFile = filePath ?? defaultSequelizeRcFilePath;

   const rcFileResolved = path.resolve(rcFile);

   const promiseData = waitPromise<More>(import(rcFileResolved));

   const configData = fs.existsSync(rcFileResolved)
      ? promiseData?.default ?? promiseData
      : {};

   return configData;
};

function getArgs() {
   const args = yargs
      .help(false)
      .version(false)
      .config(loadConfigFile(yargs.argv.optionsPath as string));

   return args;
}

export default getArgs;
