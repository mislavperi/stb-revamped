package sqldb

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/joho/godotenv/autoload"
)

type SqlHandle struct {
	Pool *pgxpool.Pool
}

var RoHandle = newHandle("postgres://user:pass@localhost:5432/steaby")
var RwHandle = newHandle("postgres://user:pass@localhost:5432/steaby")

func newHandle(url string) *SqlHandle {
	pool, err := pgxpool.New(context.Background(), url)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	return &SqlHandle{Pool: pool}
}
