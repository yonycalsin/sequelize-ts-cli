#!/usr/bin/env node
import './init';
import { getArgs } from 'src/helpers';
import container from './container';

const yargs = getArgs();

container.cradle.sequelize;

yargs
   .help()
   .version()
   .wrap(yargs.terminalWidth())
   .demandCommand(1, 'Please specify a command')
   .help()
   .strict()
   .recommendCommands().argv;
