_server_dir := $(dir $(abspath $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))))

include ${_server_dir}/../proto/Makefile

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

.PHONY: run
