# Use the official Python image from the Docker Hub
FROM golang:1.23-bookworm AS builder

RUN apt-get update
RUN apt-get install -y netcat-traditional postgresql-client 
RUN mkdir -p /go_app

# COPY entrypoint.sh /entrypoint.sh
# ENTRYPOINT ["/entrypoint.sh"]

