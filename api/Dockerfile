FROM node:18

WORKDIR /api
COPY nodemon.json package.json yarn.lock ./
RUN yarn install
COPY . /api

EXPOSE 4000

CMD ["yarn", "serve"]
