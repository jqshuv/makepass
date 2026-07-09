#!/usr/bin/env bun
// Copyright (c) 2023 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { intro, outro, cancel, group, text, confirm } from "@clack/prompts";
import { parseArgs } from "node:util";

interface PasswordOptions {
  length: number;
  symbols: boolean;
  caps: boolean;
  numbers: boolean;
}

function generatePassword({ length, symbols, caps, numbers }: PasswordOptions): string {
  let baseChars = "abcdefghijklmnopqrstuvwxyz";
  if (caps) baseChars += baseChars.toUpperCase();
  if (numbers) baseChars += "0123456789";
  if (symbols) baseChars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let password = "";
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * baseChars.length);
    password += baseChars[random];
  }
  return password;
}

async function runInteractive(): Promise<void> {
  intro("makepass");

  const options = await group(
    {
      secret: () =>
        confirm({
          message: "Generate a 32-character secret (alphanumeric, no symbols)?",
          initialValue: false,
        }),
      length: ({ results }) =>
        results.secret
          ? Promise.resolve(undefined)
          : text({
              message: "Password length",
              initialValue: "16",
              validate: (value) => {
                if (!value || !/^\d+$/.test(value) || Number(value) < 1) return "Enter a positive number";
              },
            }),
      caps: ({ results }) =>
        results.secret
          ? Promise.resolve(undefined)
          : confirm({ message: "Include capital letters?", initialValue: true }),
      numbers: ({ results }) =>
        results.secret
          ? Promise.resolve(undefined)
          : confirm({ message: "Include numbers?", initialValue: true }),
      symbols: ({ results }) =>
        results.secret
          ? Promise.resolve(undefined)
          : confirm({ message: "Include symbols?", initialValue: false }),
    },
    {
      onCancel: () => {
        cancel("Cancelled.");
        process.exit(0);
      },
    }
  );

  const password = options.secret
    ? generatePassword({ length: 32, symbols: false, caps: true, numbers: true })
    : generatePassword({
        length: Number(options.length),
        symbols: options.symbols as boolean,
        caps: options.caps as boolean,
        numbers: options.numbers as boolean,
      });

  outro(password);
}

function runNonInteractive(values: {
  length: string;
  symbols: boolean;
  "no-caps": boolean;
  "no-numbers": boolean;
  secret: boolean;
}): void {
  const password = values.secret
    ? generatePassword({ length: 32, symbols: false, caps: true, numbers: true })
    : generatePassword({
        length: Number(values.length),
        symbols: values.symbols,
        caps: !values["no-caps"],
        numbers: !values["no-numbers"],
      });

  console.log(password);
}

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    length: { type: "string", short: "l", default: "16" },
    symbols: { type: "boolean", short: "s", default: false },
    "no-caps": { type: "boolean", short: "C", default: false },
    "no-numbers": { type: "boolean", short: "N", default: false },
    secret: { type: "boolean", short: "g", default: false },
    interactive: { type: "boolean", short: "i", default: false },
  },
  allowPositionals: false,
});

if (values.interactive) {
  await runInteractive();
} else {
  runNonInteractive(values);
}
