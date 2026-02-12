FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

COPY index.html styles.css script.js ./

EXPOSE 80
