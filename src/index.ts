// Copyright (c) 2023 Joshua Schmitt
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { program } from "commander";

program
  .name('makepass')
  .description('A very simple password generator for the command line.')
  .version('1.0.0')
  .option('-l, --length <number>', 'length of password', '16')
  .option('-s, --symbols', 'include symbols')
  .option('-C, --no-caps', 'exclude capital letters')
  .option('-N, --no-numbers', 'exclude numbers')
  .option('-g, --secret', 'shortcut for create 32 length secrets')
  .action((options) => {
    if (options.secret) {
      options.length = 32;
      options.caps = false;
      options.numbers = true;
      options.symbols = false;
    }

    let baseChars = 'abcdefghijklmnopqrstuvwxyz';
    if (options.caps) baseChars += baseChars.toUpperCase();
    if (options.numbers) baseChars += '0123456789';
    if (options.symbols) baseChars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let password = '';

    for (let i = 0; i < options.length; i++) {
      const random = Math.floor(Math.random() * baseChars.length);
      password += baseChars.substring(random, random + 1);
    }

    console.log(password)
  });

program.parse(process.argv);
