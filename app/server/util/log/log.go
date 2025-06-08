package logger

import (
	"log/slog"
	"os"
)

func NewLogger() *slog.Logger {

	// TODO:
	// - add a configurable log level, influencable from an API endpoint
	// - add a log file writer based on the production level
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	return logger
}

var Logger = NewLogger()
