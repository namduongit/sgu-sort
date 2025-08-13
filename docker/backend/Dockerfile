FROM node:18-alpine

WORKDIR /home/node/app
RUN chown -R node:node /home/node/app

COPY --chown=node:node ../../src/server/package*.json ./

USER node
RUN npm install

COPY --chown=node:node ../../src/server/ ./

EXPOSE 5000
CMD [ "node", "index.js" ]
