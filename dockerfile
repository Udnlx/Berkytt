FROM node:22-alpine AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build

FROM node:22-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/.output /usr/src/app/.output
ENV PORT 3000
EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]
