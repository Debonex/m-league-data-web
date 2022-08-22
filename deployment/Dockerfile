# Install dependencies only when needed
FROM node:16-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM nginx:latest
COPY --from=builder app/dist/ /usr/share/nginx/html/
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80