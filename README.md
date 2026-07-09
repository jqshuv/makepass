<!--
 Copyright (c) 2023 Joshua Schmitt

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# makepass

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

A very simple password and secret generator for the command line, built on [Bun](https://bun.com).

![demo](demo.gif)

## Installation

```sh
bun add -g makepass
```

Or run it without installing:

```sh
bunx makepass
```

## Usage

Running `makepass` with no arguments generates a 16-character password using the defaults (lowercase, uppercase, numbers, no symbols) and prints it to stdout:

```sh
makepass
```

### Flags

| Flag | Description |
| --- | --- |
| `-l, --length <number>` | Length of the password (default: `16`) |
| `-s, --symbols` | Include symbols |
| `-C, --no-caps` | Exclude capital letters |
| `-N, --no-numbers` | Exclude numbers |
| `-g, --secret` | Shortcut for a 32-character alphanumeric secret (caps + numbers, no symbols) |
| `-i, --interactive` | Launch an interactive setup instead of using flags/defaults |

### Examples

```sh
# 32-character password with symbols
makepass -l 32 -s

# lowercase-only, 20 characters
makepass -C -N -l 20

# quick 32-character secret
makepass -g

# walk through the options interactively
makepass -i
```

## Development

```sh
bun install          # install dependencies
bun run dev           # run from source
bunx tsc --noEmit     # type-check
bun run build          # bundle to build/index.js
bun run compile        # compile a standalone native binary
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Joshua Schmitt - [@jqshuv](https://twitter.com/jqshuv) - me@jqshuv.com

Project Link: [https://github.com/jqshuv/makepass](https://github.com/jqshuv/makepass)

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/jqshuv/makepass.svg?style=for-the-badge
[contributors-url]: https://github.com/jqshuv/makepass/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jqshuv/makepass.svg?style=for-the-badge
[forks-url]: https://github.com/jqshuv/makepass/network/members
[stars-shield]: https://img.shields.io/github/stars/jqshuv/makepass.svg?style=for-the-badge
[stars-url]: https://github.com/jqshuv/makepass/stargazers
[issues-shield]: https://img.shields.io/github/issues/jqshuv/makepass.svg?style=for-the-badge
[issues-url]: https://github.com/jqshuv/makepass/issues
[license-shield]: https://img.shields.io/github/license/jqshuv/makepass.svg?style=for-the-badge
[license-url]: https://github.com/jqshuv/makepass/blob/master/LICENSE
