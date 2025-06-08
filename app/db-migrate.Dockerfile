# Use the official Python image from the Docker Hub
FROM python:3.12-slim

RUN apt-get update
#RUN apt-get install -y curl netcat-traditional openjdk-17-jdk postgresql-client
RUN apt-get install -y curl netcat-traditional postgresql-client wget gpg
RUN wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" > /etc/apt/sources.list.d/mongodb-org-7.0.list
RUN apt-get update
RUN apt-get install -y mongodb-mongosh

# Install jbang and neo4j-migrations tool
#RUN curl -sL https://sh.jbang.dev | bash
#RUN /root/.jbang/bin/jbang trust add https://github.com/neo4j/
#RUN /root/.jbang/bin/jbang neo4j-migrations@neo4j --version
#RUN printf '#!/bin/bash\n/root/.jbang/bin/jbang neo4j-migrations@neo4j $@\n' > /usr/local/bin/neo4j-migrations
#RUN chmod 775 /usr/local/bin/neo4j-migrations
