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
proto.grpcapp.MainServiceClient =
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
proto.grpcapp.MainServicePromiseClient =
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
 *   !proto.grpcapp.MainServiceRequest,
 *   !proto.grpcapp.MainServiceReply>}
 */
const methodDescriptor_MainService_Run = new grpc.web.MethodDescriptor(
  '/grpcapp.MainService/Run',
  grpc.web.MethodType.UNARY,
  proto.grpcapp.MainServiceRequest,
  proto.grpcapp.MainServiceReply,
  /**
   * @param {!proto.grpcapp.MainServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcapp.MainServiceReply.deserializeBinary
);


/**
 * @param {!proto.grpcapp.MainServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpcapp.MainServiceReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcapp.MainServiceReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcapp.MainServiceClient.prototype.run =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcapp.MainService/Run',
      request,
      metadata || {},
      methodDescriptor_MainService_Run,
      callback);
};


/**
 * @param {!proto.grpcapp.MainServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcapp.MainServiceReply>}
 *     Promise that resolves to the response
 */
proto.grpcapp.MainServicePromiseClient.prototype.run =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpcapp.MainService/Run',
      request,
      metadata || {},
      methodDescriptor_MainService_Run);
};


module.exports = proto.grpcapp;

