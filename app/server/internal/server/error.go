package server

import (
	"context"
	"errors"
	"fmt"
	"io"
	"net/http"
	logger "stb/app/server/util/log"

	ht "github.com/ogen-go/ogen/http"
	"github.com/ogen-go/ogen/ogenerrors"
)

var NotFoundHandler = WithNotFound(func(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	_, err := io.WriteString(w, `{"message": "not found"}`)
	fmt.Println(err)
})

var GenericErrorHandler = WithErrorHandler(func(ctx context.Context, w http.ResponseWriter, r *http.Request, err error) {
	var (
		code    = http.StatusInternalServerError
		ogenErr ogenerrors.Error
	)

	var message string = ""

	switch {
	case errors.Is(err, ht.ErrNotImplemented):
		code = http.StatusNotImplemented
		message = "Not implemented"
	case errors.Is(err, ogenerrors.ErrSecurityRequirementIsNotSatisfied):
		code = http.StatusUnauthorized
		message = "Unauthorized"
	case errors.As(err, &ogenErr):
		code = ogenErr.Code()
		message = ogenErr.Error()
	}

	// Cant decide if this is a good idea or not
	// if code == http.StatusBadRequest {
	// 	message = "Bad request"
	// }

	if message == "" {
		message = http.StatusText(code)
	}

	logger.Logger.Error("Error", "error", err, "code", code, "message", message)

	w.WriteHeader(code)
	_, _ = io.WriteString(w, `{"message": "`+message+`"}`)
})
