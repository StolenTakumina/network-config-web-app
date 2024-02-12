FROM node:18.10-alpine

RUN mkdir -p /app

COPY assets /app/assets
COPY components /app/components
COPY pages /app/pages
COPY layouts /app/layouts
COPY plugins /app/plugins
COPY static /app/static
COPY store /app/store
COPY *.config.js /app/
COPY package*.json /app/
WORKDIR /app
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm cache clean --force
RUN npm i

ENV NODE_ENV='production'

RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3000

CMD ["npm", "start"]
