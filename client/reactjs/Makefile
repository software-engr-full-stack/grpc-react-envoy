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

# Network name in --net rproxy_default should match the network name in the
#   Docker compose file of the reverse proxy.
reverse_proxy_ip := $$(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' reverse_proxy)
docker:
	[ -n "${reverse_proxy_ip}" ] || exit 1 && \
	echo "REACT_APP_API_END_POINT=http://${reverse_proxy_ip}:8080" > "${_client_js_dir}/.env.production.docker" && \
	docker build --tag react-build-test . && \
	docker run --rm --net rproxy_default --publish 80:80 --name react-build-test react-build-test

run: proto
	BROWSER=none npm start
