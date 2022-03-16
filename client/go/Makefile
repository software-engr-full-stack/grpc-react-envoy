_client_go_dir := $(dir $(abspath $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))))

include ${_client_go_dir}/../../proto/Makefile

run:
	make proto-main out_dir=proto && \
	go run main.go
