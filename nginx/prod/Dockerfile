# build stage
FROM node:18-alpine as build-stage
WORKDIR /app
COPY frontend/package.json /app
RUN npm cache verify
RUN npm install
COPY frontend /app
RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY nginx/prod/prod.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /dist/
RUN mkdir -p /usr/src/app/static && \
    chmod -R 755 /usr/src/app/static

VOLUME /usr/src/app/static
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
