# base
FROM oven/bun:latest AS base

WORKDIR /app

# install
FROM base AS install

RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod
RUN cd /temp/prod && bun install --frozen-lockfile --production

# build
FROM base AS build

COPY package.json .

COPY --from=install /temp/dev/node_modules node_modules

COPY src src
COPY static static
COPY svelte.config.js .
COPY tsconfig.json .
COPY vite.config.ts .

RUN bun run build

# runtime
FROM base AS runtime

COPY package.json .

COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /app/build ./build

USER bun:bun 
CMD [ "bun", "build/index.js" ]