_server_dir := $(dir $(abspath $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))))

include ${_server_dir}/../proto/Makefile

_deploy_go_path := /usr/local/go/bin/go

deploy:
	make proto-main out_dir=proto && \
	if [ -f "${_deploy_go_path}" ]; then \
		"${_deploy_go_path}" build; \
	else \
		go build; \
	fi && \
	./grpc-app-server &

run:
	make proto-main out_dir=proto && \
	if type nodemon >/dev/null; then \
		while true; do \
			nodemon --exec go run *.go --signal SIGTERM; \
			sleep 2; \
		done \
	else \
		go run *.go; \
	fi

.PHONY: run deploy
