#!/usr/bin/env node
import './init';
import { getArgs } from 'src/helpers';

const yargs = getArgs();

yargs
   .help()
   .version()
   .wrap(yargs.terminalWidth())
   .demandCommand(1, 'Please specify a command')
   .help()
   .strict()
   .recommendCommands().argv;
