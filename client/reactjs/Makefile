_client_js_dir := $(dir $(abspath $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))))

include ${_client_js_dir}/../../proto/Makefile

_out_dir := "${_client_js_dir}src/proto"

proto:
	mkdir -p "${_out_dir}" && \
	protoc \
		--js_out=import_style=commonjs,binary:"${_out_dir}" \
		--proto_path="${proto_dir}" \
		${proto_files} && \
	protoc \
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:"${_out_dir}" \
		--proto_path="${proto_dir}" \
		${proto_files}

run: proto
	BROWSER=none npm start
