/* Create by https://github.com/yonycalsin/sequelize-ts-cli */

var path = require('path');

const root = (...more) => path.resolve('scripts', 'database', ...more);

module.exports = {
   env: 'development',
   config: root('config', 'config.json'),
   'models-path': root('models'),
   'seeders-path': root('seeders'),
   'migrations-path': root('migrations'),
};
