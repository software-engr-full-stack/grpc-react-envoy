FROM node:latest

RUN apt-get update && apt-get install --yes git vim nmap tree iputils-ping netcat net-tools bind9-dnsutils

RUN mkdir -p /deploy/app

WORKDIR /deploy/app

RUN git clone https://github.com/software-engr-full-stack/grpc-react-envoy.git

WORKDIR /deploy/app/grpc-react-envoy/client/reactjs

RUN npm install

COPY .env.production.local .

RUN npm run build

WORKDIR /deploy/app/grpc-react-envoy/client/reactjs/build

CMD npx serve --listen 80
