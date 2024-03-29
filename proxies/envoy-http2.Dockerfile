FROM envoyproxy/envoy:v1.20.0

COPY envoy-http2.yml /etc/envoy/envoy.yml

RUN apt-get update && apt-get install --yes vim nmap tree iputils-ping netcat net-tools bind9-host

CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yml -l trace --log-path /tmp/envoy_info.log
