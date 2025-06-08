package sqldb

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/joho/godotenv/autoload"
)

type SqlHandle struct {
	Pool *pgxpool.Pool
}

var RoHandle = newHandle("RO_DATABASE_URL")
var RwHandle = newHandle("RW_DATABASE_URL")

func newHandle(handleEnvVarName string) *SqlHandle {
	url := os.Getenv(handleEnvVarName)
	if url == "" {
		panic(handleEnvVarName + " is not set in the environment variables")
	}
	pool, err := pgxpool.New(context.Background(), url)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	return &SqlHandle{Pool: pool}
}
