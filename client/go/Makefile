_client_go_dir := $(dir $(abspath $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))))

include ${_client_go_dir}/../../proto/Makefile

_expected_place_name_and_state := 'Belle Fourche/South Dakota'

direct-to-backend:
	make proto-main out_dir=proto && \
	go run main.go --addr localhost:50051 && \
	echo && \
	echo "Expected place name and state output: ${_expected_place_name_and_state}"

use-proxy:
	go run main.go && \
	echo && \
	echo "Expected place name and state output: ${_expected_place_name_and_state}"

help:
	echo 'Usage: go run main.go --addr localhost:8080 --zipcode=57717'

.PHONY: direct-to-backend use-proxy help
