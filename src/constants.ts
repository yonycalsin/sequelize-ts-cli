import path from 'path';

export const projectPackageJsonFileName = 'package.json';

export const projectPackageJsonFilePath = path.resolve(
   projectPackageJsonFileName,
);

export const packageJsonFileName = 'package.json';

export const packageJsonFilePath = path.resolve(
   __dirname,
   '..',
   packageJsonFileName,
);

export const defaultSequelizeRcFileName = '.sequelizerc.ts';

export const defaultSequelizeRcFilePath = path.resolve(
   defaultSequelizeRcFileName,
);

export const defaultSequelizeConfig = {
   development: {
      username: 'root',
      password: null,
      database: 'database_development',
      host: '127.0.0.1',
      dialect: 'mysql',
   },
   test: {
      username: 'root',
      password: null,
      database: 'database_test',
      host: '127.0.0.1',
      dialect: 'mysql',
   },
   production: {
      username: 'root',
      password: null,
      database: 'database_production',
      host: '127.0.0.1',
      dialect: 'mysql',
   },
};
