ARG PORT=8080
ARG NODE_ENV="production"

# Project dependencies are less likely to change, and will benefit
# the most from Docker's caching. 
FROM node:lts-alpine as dependencies
WORKDIR /app
COPY package*.json .
RUN npm ci

# The build step requires development dependencies. Separating
# this step helps us to reduce the total size of the final
# image.
FROM dependencies as builder
WORKDIR /app
COPY . .
RUN npm run build

FROM node:lts-alpine
ARG NODE_ENV
ARG PORT
WORKDIR /usr/src/app
ENV NODE_ENV=${NODE_ENV}
COPY --from=builder /app/build . 
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD ["node", "server.js"]
