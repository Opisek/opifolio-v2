# build
FROM node:18-alpine as build

WORKDIR /app

COPY package.json .
RUN npm i --production
RUN cp -r node_modules /tmp/node_modules_prod
RUN npm i

COPY src src
COPY static static
COPY svelte.config.ts .
COPY tsconfig.json .
COPY vite.config.ts .
RUN ls
RUN npm run build

# runtime
FROM node:18-alpine as runtime

WORKDIR /app

COPY --from=build /tmp/node_modules_prod ./node_modules
COPY --from=build /app/build ./build
COPY package.json .

USER node:node
CMD [ "node", "build/index.js" ]