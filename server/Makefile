_server_dir := $(dir $(abspath $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))))

include ${_server_dir}/../proto/Makefile

run:
	make proto-main out_dir=proto && \
	nodemon --exec go run *.go --signal SIGTERM
