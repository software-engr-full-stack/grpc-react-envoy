FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

# RUN apt-get update && apt-get install --yes vim nmap tree iputils-ping netcat net-tools bind9-host
