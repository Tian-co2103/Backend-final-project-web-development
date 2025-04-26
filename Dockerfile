FROM Node:23-alpine

WORKDIR /usr/src/app
COPY package*.json ./

COPY . .
ENV PORT=3000
EXPOSE $PORT
ENV NODE_ENV=development
CMD ["npm", "start"]