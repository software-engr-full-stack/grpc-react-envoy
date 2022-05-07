run:
	docker compose up --build --remove-orphans

envoy:
	docker compose up --build --remove-orphans envoy

clean:
	docker compose down; \
	docker ps -a

.PHONY: run clean envoy
