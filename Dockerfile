FROM nats:alpine

COPY nats-ws.conf nats-ws.conf

CMD [ "-c", "nats-ws.conf" ]
