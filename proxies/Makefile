run:
	docker compose up --build --remove-orphans

deploy:
	ENVOY_RESTART=always docker compose up --build --remove-orphans --detach envoy

envoy:
	docker compose up --build --remove-orphans envoy

clean:
	docker compose down; \
	docker ps -a

.PHONY: run clean envoy deploy
