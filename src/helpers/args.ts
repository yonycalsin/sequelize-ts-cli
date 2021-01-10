import fs from 'fs';
import path from 'path';
import yargs from 'yargs';

const loadConfigFile = async (filePath: string) => {
   const rcFile = filePath || path.resolve(process.cwd(), '.sequelizerc.ts');

   const rcFileResolved = path.resolve(rcFile);

   const configData = fs.existsSync(rcFileResolved)
      ? (await import(rcFileResolved)).default
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
