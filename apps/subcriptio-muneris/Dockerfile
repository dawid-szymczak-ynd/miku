FROM node:12.13.1

WORKDIR /usr/src/app
COPY package-lock.json /usr/src/app
COPY package.json /usr/src/app
RUN npm ci --only=prod && rm package-lock.json && rm package.json
RUN npm i ts-node typescript tslib
COPY dist/apps/subcriptio-muneris /usr/src/app

EXPOSE 80
ENTRYPOINT ["node", "./main.js"]
