# Dockerfile in /project/frontend directory
FROM node:18.10-alpine

RUN mkdir -p /app

COPY components /app/components
COPY pages /app/pages
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

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD ["npm", "start"]
