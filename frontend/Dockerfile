FROM node:18-alpine3.18

WORKDIR /app

COPY . /app

RUN npm cache verify
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]
