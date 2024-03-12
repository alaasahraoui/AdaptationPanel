#we may update version later
FROM node:14 

WORKDIR /usr/src/app/engine

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "adaptationEngine.js" ]

