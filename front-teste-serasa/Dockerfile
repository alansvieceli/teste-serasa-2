# Estágio de build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json 

RUN npm run build

# Estágio de produção
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
