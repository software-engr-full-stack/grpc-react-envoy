// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.26.0
// 	protoc        v3.6.1
// source: grpcapp.proto

package grpcapp

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type MainServiceRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ZipCode string `protobuf:"bytes,1,opt,name=zipCode,proto3" json:"zipCode,omitempty"`
}

func (x *MainServiceRequest) Reset() {
	*x = MainServiceRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpcapp_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MainServiceRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MainServiceRequest) ProtoMessage() {}

func (x *MainServiceRequest) ProtoReflect() protoreflect.Message {
	mi := &file_grpcapp_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MainServiceRequest.ProtoReflect.Descriptor instead.
func (*MainServiceRequest) Descriptor() ([]byte, []int) {
	return file_grpcapp_proto_rawDescGZIP(), []int{0}
}

func (x *MainServiceRequest) GetZipCode() string {
	if x != nil {
		return x.ZipCode
	}
	return ""
}

type MainServiceReply struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Response string `protobuf:"bytes,1,opt,name=response,proto3" json:"response,omitempty"`
}

func (x *MainServiceReply) Reset() {
	*x = MainServiceReply{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpcapp_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MainServiceReply) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MainServiceReply) ProtoMessage() {}

func (x *MainServiceReply) ProtoReflect() protoreflect.Message {
	mi := &file_grpcapp_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MainServiceReply.ProtoReflect.Descriptor instead.
func (*MainServiceReply) Descriptor() ([]byte, []int) {
	return file_grpcapp_proto_rawDescGZIP(), []int{1}
}

func (x *MainServiceReply) GetResponse() string {
	if x != nil {
		return x.Response
	}
	return ""
}

var File_grpcapp_proto protoreflect.FileDescriptor

var file_grpcapp_proto_rawDesc = []byte{
	0x0a, 0x0d, 0x67, 0x72, 0x70, 0x63, 0x61, 0x70, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12,
	0x07, 0x67, 0x72, 0x70, 0x63, 0x61, 0x70, 0x70, 0x22, 0x2e, 0x0a, 0x12, 0x4d, 0x61, 0x69, 0x6e,
	0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x18,
	0x0a, 0x07, 0x7a, 0x69, 0x70, 0x43, 0x6f, 0x64, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x07, 0x7a, 0x69, 0x70, 0x43, 0x6f, 0x64, 0x65, 0x22, 0x2e, 0x0a, 0x10, 0x4d, 0x61, 0x69, 0x6e,
	0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x52, 0x65, 0x70, 0x6c, 0x79, 0x12, 0x1a, 0x0a, 0x08,
	0x72, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08,
	0x72, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x32, 0x4e, 0x0a, 0x0b, 0x4d, 0x61, 0x69, 0x6e,
	0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x3f, 0x0a, 0x03, 0x52, 0x75, 0x6e, 0x12, 0x1b,
	0x2e, 0x67, 0x72, 0x70, 0x63, 0x61, 0x70, 0x70, 0x2e, 0x4d, 0x61, 0x69, 0x6e, 0x53, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x19, 0x2e, 0x67, 0x72,
	0x70, 0x63, 0x61, 0x70, 0x70, 0x2e, 0x4d, 0x61, 0x69, 0x6e, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63,
	0x65, 0x52, 0x65, 0x70, 0x6c, 0x79, 0x22, 0x00, 0x42, 0x18, 0x5a, 0x16, 0x72, 0x65, 0x70, 0x6f,
	0x2e, 0x68, 0x6f, 0x73, 0x74, 0x2f, 0x75, 0x73, 0x65, 0x72, 0x2f, 0x67, 0x72, 0x70, 0x63, 0x61,
	0x70, 0x70, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_grpcapp_proto_rawDescOnce sync.Once
	file_grpcapp_proto_rawDescData = file_grpcapp_proto_rawDesc
)

func file_grpcapp_proto_rawDescGZIP() []byte {
	file_grpcapp_proto_rawDescOnce.Do(func() {
		file_grpcapp_proto_rawDescData = protoimpl.X.CompressGZIP(file_grpcapp_proto_rawDescData)
	})
	return file_grpcapp_proto_rawDescData
}

var file_grpcapp_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_grpcapp_proto_goTypes = []interface{}{
	(*MainServiceRequest)(nil), // 0: grpcapp.MainServiceRequest
	(*MainServiceReply)(nil),   // 1: grpcapp.MainServiceReply
}
var file_grpcapp_proto_depIdxs = []int32{
	0, // 0: grpcapp.MainService.Run:input_type -> grpcapp.MainServiceRequest
	1, // 1: grpcapp.MainService.Run:output_type -> grpcapp.MainServiceReply
	1, // [1:2] is the sub-list for method output_type
	0, // [0:1] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_grpcapp_proto_init() }
func file_grpcapp_proto_init() {
	if File_grpcapp_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_grpcapp_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MainServiceRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpcapp_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MainServiceReply); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_grpcapp_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_grpcapp_proto_goTypes,
		DependencyIndexes: file_grpcapp_proto_depIdxs,
		MessageInfos:      file_grpcapp_proto_msgTypes,
	}.Build()
	File_grpcapp_proto = out.File
	file_grpcapp_proto_rawDesc = nil
	file_grpcapp_proto_goTypes = nil
	file_grpcapp_proto_depIdxs = nil
}
