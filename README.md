## About

Demo: [grpc.cloudsandbox.dev](https://grpc.cloudsandbox.dev/)

It's an app that takes a zip code as an input. After entering the input, it will show the zip code location on a map along with the weather summary for the next 7 days. I made this app to learn about [gRPC](https://grpc.io/docs/what-is-grpc/introduction/).

From the official gRPC documentation:
> Overview

> In gRPC, a client application can directly call a method on a server application on a different machine as if it were a local object, making it easier for you to create distributed applications and services. As in many RPC systems, gRPC is based around the idea of defining a service, specifying the methods that can be called remotely with their parameters and return types. On the server side, the server implements this interface and runs a gRPC server to handle client calls. On the client side, the client has a stub (referred to as just a client in some languages) that provides the same methods as the server.

> gRPC clients and servers can run and talk to each other in a variety of environments - from servers inside Google to your own desktop - and can be written in any of gRPC’s supported languages. So, for example, you can easily create a gRPC server in Java with clients in Go, Python, or Ruby. In addition, the latest Google APIs will have gRPC versions of their interfaces, letting you easily build Google functionality into your applications.

## Components

The backend is written in Go. The frontend is a React app. Requests from the frontend (a web browser client in this case) must pass through a reverse proxy before going to the backend. gRPC uses HTTP2. Web browsers use HTTP1.x. The reverse proxy translates the HTTP1.x request from the web browser into HTTP2. Then it sends the HTTP2 request to the backend. The backend sends a response in HTTP2 to the proxy. The proxy translates the response from HTTP2 to HTTP1.x. Then it sends the HTTP1.x response back to the client.

The reverse proxy used in this project is called [Envoy](https://www.envoyproxy.io/docs/envoy/latest/intro/what_is_envoy). It's going to run inside a Docker container.

## How to run the development environment

Prerequisites: you must have Go, NodeJS and Docker installed in your development environment. If you want your backend server to reload automatically after editing the backend server code, install nodemon.

Ports: 8080 (Envoy) and 50051 (backend) should be unused.

Firewalls: if you have a firewall running, open port 50051.

Steps:

1. Install the "Protocol Buffer Compiler"

2. Install the Go plugins for the protocol compiler:

    `go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28`

    `go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2`


3. Clone this repo and `cd` into the clone directory

4. Start the backend server. This will run in the foreground:

    `cd server && make run`

5. Start Envoy. This will run in the foreground:

    `cd rproxy && make run`

6. Test using a Go client. These are simple command line tests to make sure the proxy and backend are working:

    `cd client/go`

    `make send-request-directly-to-backend`

    `make send-request-to-proxy`

7. Start the React dev server. This will run in the foreground:

    `cd client/reactjs && npm install && make run`

8. Open your browser to `http://localhost:3000/`

## TODO

- [x] Deploy to ~~AWS~~ DigitalOcean

- [x] Center map on the corresponding marker when clicking on a search result item found in the left sidebar list

- [ ] Write tests
