FROM node:20-alpine AS build

ARG BUILD_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx ng build --configuration=${BUILD_ENV}

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
