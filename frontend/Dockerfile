FROM node:16 as builder

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn install \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive \
    --production=false

COPY . .
RUN yarn build
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3001

CMD [ "yarn", "start" ]