package sqldb

import (
	"database/sql"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5/pgconn"
)

var errorCodeMap = map[string]string{
	"23505": "Unique constraint violation",
}

const (
	UnknownError = "Unknown"
	NoRowsError  = "No rows"
)

func CheckIfNoRows(err error) bool {
	return errors.Is(err, sql.ErrNoRows)
}

func GetHumanErrorMessage(err error) string {
	// handle logging
	var pgErr *pgconn.PgError
	message := UnknownError

	if errors.Is(err, sql.ErrNoRows) {
		return NoRowsError
	}
	if errors.As(err, &pgErr) {
		fmt.Println("PgError", pgErr.Code, pgErr.Message)
		if msg, ok := errorCodeMap[pgErr.Code]; ok {
			message = msg
		}
	}
	return message
}
