# Copyright (c) 2024 Joshua Schmitt
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# FROM oven/bun:latest

FROM gcr.io/distroless/nodejs20-debian12

COPY --from=build /app/build/ /app/
COPY --from=prod-deps /app/node_modules /app/node_modules
# COPY --from=build /app/node_modules /app/node_modules
# COPY package.json /app/package.json
WORKDIR /app

CMD [ "index.js" ]

