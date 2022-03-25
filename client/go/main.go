package main

import (
	"context"
	"flag"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	pb "grpc-app-client/proto"
)

const (
	defaultInput = "57717"
)

var (
	addr = flag.String("addr", "localhost:8080", "the address to connect to")
	zipCode = flag.String("zipcode", defaultInput, "zip code")
)

func main() {
	flag.Parse()
	// Set up a connection to the server.
	conn, err := grpc.Dial(*addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic(err)
	}
	defer conn.Close()
	c := pb.NewMainServiceClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.Run(ctx, &pb.MainServiceRequest{ZipCode: *zipCode})
	if err != nil {
		panic(err)
	}
	log.Printf("Response from %#v...\n%s", *addr, r.GetResponse())
}
