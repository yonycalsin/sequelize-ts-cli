import path from 'path';

const root = (...more: string[]) => path.resolve('temp', 'database', ...more);

const configOptions = {
   env: 'development',
   config: root('config', 'config.json'),
   'models-path': root('models'),
   'seeders-path': root('models'),
   'migrations-path': root('migrations'),
};

export default configOptions;
