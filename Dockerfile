FROM node:10 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./
RUN npm run build

FROM nginx:1.20

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY entrypoint.sh .
COPY --from=builder /app/build .
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]