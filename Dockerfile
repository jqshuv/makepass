# Copyright (c) 2024 Joshua Schmitt
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

FROM oven/bun:1-alpine AS build

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun build ./src/index.ts --compile --outfile makepass

FROM gcr.io/distroless/base-debian12

COPY --from=build /app/makepass /app/makepass
WORKDIR /app

CMD [ "/app/makepass" ]
