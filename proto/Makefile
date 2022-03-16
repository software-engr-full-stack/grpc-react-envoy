proto_dir := $(dir $(abspath $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))))
proto_dir := $(proto_dir:/=)

proto_files := grpcapp.proto

include ${proto_dir}/../lib/Makefile

-proto-out-dir-validate:
	@:$(call check_defined, out_dir)

proto-main: -proto-out-dir-validate
	mkdir -p "${out_dir}" && \
	protoc \
		--go_out="${out_dir}" \
		--go_opt=paths=source_relative \
    --go-grpc_out="${out_dir}" \
    --go-grpc_opt=paths=source_relative \
    --proto_path="${proto_dir}" \
    ${proto_files}
