import _ from 'lodash';
import { Sequelize } from 'sequelize-typescript';
import {
   defaultSequelizeConfig,
   packageJsonFilePath,
   projectPackageJsonFilePath,
} from './constants';
import createContainer from './create-container';
import { getArgs } from './helpers';
import waitPromise from './utils/wait-promise';

const container = createContainer();

const readFileFactory = (filePath: string) => () => {
   try {
      const promise = waitPromise(import(filePath));

      return promise?.default ?? promise;
   } catch (error) {
      throw error;
   }
};

export const getSequelizeInstance = () => {
   const sequelize = new Sequelize({
      database: 'fpyron-bin',
      dialect: 'mysql',
      username: 'root',
      password: '123456',
   });

   return sequelize;
};

const getSequelizeConfig = (container) =>
   _.defaults(
      defaultSequelizeConfig,
      readFileFactory(container.cradle.sequelizeRC.config)(),
   );

container.register({
   projectPackage: readFileFactory(projectPackageJsonFilePath),
   package: readFileFactory(packageJsonFilePath),
   sequelizeRC: () => getArgs().argv,
   sequelizeConfig: getSequelizeConfig,
   sequelize: getSequelizeInstance,
});

export default container;
