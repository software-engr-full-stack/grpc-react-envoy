package main

import (
    "context"
    "flag"
    "fmt"
    "log"
    "net"
    "encoding/json"

    "google.golang.org/grpc"

    pb "grpc-app-server/proto"
)

const defaultPort = 50051

var (
    port = flag.Int("port", defaultPort, "The server port")
)

type server struct {
    pb.UnimplementedMainServiceServer
}

func (s *server) Run(ctx context.Context, in *pb.MainServiceRequest) (*pb.MainServiceReply, error) {
    var empty *pb.MainServiceReply
    ad, err := api(in.GetZipCode())
    if err != nil {
        return empty, err
    }

    log.Printf("Received zip code: %v", in.GetZipCode())

    result, err := json.Marshal(map[string]APIDataType{
        "result": ad,
    })
    if err != nil {
        return empty, err
    }
    return &pb.MainServiceReply{Response: string(result)}, nil
}

func main() {
    flag.Parse()
    lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", *port))
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }
    s := grpc.NewServer()
    pb.RegisterMainServiceServer(s, &server{})
    log.Printf("server listening at %v", lis.Addr())
    if err := s.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}
