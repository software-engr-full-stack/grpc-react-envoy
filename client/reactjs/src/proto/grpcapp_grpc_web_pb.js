/**
 * @fileoverview gRPC-Web generated client stub for grpcapp
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.grpcapp = require('./grpcapp_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.grpcapp.TestClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.grpcapp.TestPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpcapp.TestRequest,
 *   !proto.grpcapp.TestReply>}
 */
const methodDescriptor_Test_Test = new grpc.web.MethodDescriptor(
  '/grpcapp.Test/Test',
  grpc.web.MethodType.UNARY,
  proto.grpcapp.TestRequest,
  proto.grpcapp.TestReply,
  /**
   * @param {!proto.grpcapp.TestRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcapp.TestReply.deserializeBinary
);


/**
 * @param {!proto.grpcapp.TestRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcapp.TestReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcapp.TestReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcapp.TestClient.prototype.test =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcapp.Test/Test',
      request,
      metadata || {},
      methodDescriptor_Test_Test,
      callback);
};


/**
 * @param {!proto.grpcapp.TestRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcapp.TestReply>}
 *     Promise that resolves to the response
 */
proto.grpcapp.TestPromiseClient.prototype.test =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcapp.Test/Test',
      request,
      metadata || {},
      methodDescriptor_Test_Test);
};


module.exports = proto.grpcapp;

