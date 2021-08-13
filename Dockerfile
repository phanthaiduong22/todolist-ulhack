FROM node:12.18.3

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN yarn install 

COPY . .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]