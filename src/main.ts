#!/usr/bin/env node
import { getYArgs } from 'sequelize-cli/lib/core/yargs';

const yargs = getYArgs();

import init from 'sequelize-cli/lib/commands/init';
import migrate from 'sequelize-cli/lib/commands/migrate';
import migrateUndo from 'sequelize-cli/lib/commands/migrate_undo';
import migrateUndoAll from 'sequelize-cli/lib/commands/migrate_undo_all';
import seed from 'sequelize-cli/lib/commands/seed';
import seedOne from 'sequelize-cli/lib/commands/seed_one';
import migrationGenerate from 'sequelize-cli/lib/commands/migration_generate';
import modelGenerate from 'sequelize-cli/lib/commands/model_generate';
import seedGenerate from 'sequelize-cli/lib/commands/seed_generate';
import database from 'sequelize-cli/lib/commands/database';
import helpers from 'sequelize-cli/lib/helpers/index';

helpers.view.teaser();

const template = `
var path = require('path');

const root = (...more) => path.resolve('scripts', 'database', ...more);

module.exports = {
   env: 'development',
   config: root('config', 'config.js'),
   'models-path': root('models'),
   'seeders-path': root('seeders'),
   'migrations-path': root('migrations'),
};`;

yargs
   .help()
   .version()
   .command('db:migrate', 'Run pending migrations', migrate)
   .command(
      'db:migrate:schema:timestamps:add',
      'Update migration table to have timestamps',
      migrate,
   )
   .command('db:migrate:status', 'List the status of all migrations', migrate)
   .command('db:migrate:undo', 'Reverts a migration', migrateUndo)
   .command('db:migrate:undo:all', 'Revert all migrations ran', migrateUndoAll)
   .command('db:seed', 'Run specified seeder', seedOne)
   .command('db:seed:undo', 'Deletes data from the database', seedOne)
   .command('db:seed:all', 'Run every seeder', seed)
   .command('db:seed:undo:all', 'Deletes data from the database', seed)
   .command('db:create', 'Create database specified by configuration', database)
   .command('db:drop', 'Drop database specified by configuration', database)
   .command('init', 'Initializes project', init)
   .command('init:config', 'Initializes configuration', init)
   .command('init:migrations', 'Initializes migrations', init)
   .command('init:models', 'Initializes models', init)
   .command('init:seeders', 'Initializes seeders', init)
   .command(
      ['migration:generate', 'migration:create'],
      'Generates a new migration file',
      migrationGenerate,
   )
   .command(
      ['model:generate', 'model:create'],
      'Generates a model and its migration',
      modelGenerate,
   )
   .command(
      ['seed:generate', 'seed:create'],
      'Generates a new seed file',
      seedGenerate,
   )
   .wrap(yargs.terminalWidth())
   .demandCommand(1, 'Please specify a command')
   .help()
   .strict()
   .recommendCommands().argv;
