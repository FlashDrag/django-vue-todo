FROM nginx:1.13.12-alpine
COPY nginx/dev/dev.conf /etc/nginx/nginx.conf
RUN mkdir -p /usr/src/app/static && \
    chmod -R 755 /usr/src/app/static

VOLUME /usr/src/app/static

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
