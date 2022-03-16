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

var (
    port = flag.Int("port", 50051, "The server port")
)

type server struct {
    pb.UnimplementedTestServer
}

func (s *server) Test(ctx context.Context, in *pb.TestRequest) (*pb.TestReply, error) {
    log.Printf("Received: %v", in.GetName())

    result, err := json.Marshal(map[string]string{"result": "Test " + in.GetName()})
    if err != nil {
        return &pb.TestReply{}, err
    }
    return &pb.TestReply{Message: string(result)}, nil
}

func main() {
    flag.Parse()
    lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", *port))
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }
    s := grpc.NewServer()
    pb.RegisterTestServer(s, &server{})
    log.Printf("server listening at %v", lis.Addr())
    if err := s.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}
