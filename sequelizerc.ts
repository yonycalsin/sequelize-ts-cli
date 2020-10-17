var path = require('path');

const root = (...more) => path.resolve('scripts', 'database', ...more);

module.exports = {
   env: 'development',
   config: root('config', 'config.js'),
   'models-path': root('models'),
   'seeders-path': root('seeders'),
   'migrations-path': root('migrations'),
};
