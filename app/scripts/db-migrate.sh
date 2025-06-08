#!/usr/bin/env bash

cd database || exit 1

# PostgreSQL
cat sql/steaby_ddl.sql sql/steaby_data.sql | psql postgresql://postgres:none1none@steaby-pg/steaby
# migrate -source file://sql/migrations -database postgres://pg-host:5432/steaby up 2

# MongoDB
mongosh mongodb://steaby-mongodb/ --eval "printjson(db.serverStatus())" > /dev/null; echo Return status: $?
# migrate -source file://doc/migrations -database mongodb://mongo-host:27017/steaby up 2

# Neo4j
#neo4j-migrations -p $NEO4J_PASSWORD apply

