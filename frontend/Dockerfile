FROM node:21-alpine3.18

WORKDIR /app

COPY package*.json /app/
COPY . /app

RUN npm install

EXPOSE 8080

ENV BACKEND_URL=http://0.0.0.0:8000

CMD ["npm", "run", "serve"]
