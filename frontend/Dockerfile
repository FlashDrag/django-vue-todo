FROM node:18-alpine3.18

WORKDIR /app

COPY package*.json /app/
COPY . /app

RUN npm install

EXPOSE 8080

ENV BACKEND_URL=http://ec2-34-245-90-50.eu-west-1.compute.amazonaws.com:8000

RUN npm run build

CMD ["npm", "run", "serve"]
