FROM nginx:alpine

WORKDIR /var/www/html
COPY dist/apps/miku-credit-front /var/www/html
COPY apps/miku-credit-front/deployment/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
