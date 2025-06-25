package main

import (
	"context"
	"log"
	"net/http"
	"os"

	sqldb "stb/app/server/internal/db/sql"

	"stb/app/server/internal/server"
	auth "stb/app/server/internal/session"
	stbuser "stb/app/server/internal/stb_user"

	timeentry "stb/app/server/internal/time_entry"

	"stb/app/server/openapi"

	"github.com/rs/cors"
)

type handler struct {
	timeentry.TimeEntryHandler
	stbuser.StbUserHandler
}

func (h *handler) NewError(ctx context.Context, err error) *server.ServerErrorResponseStatusCode {
	// Create a server error response with the error message
	return &server.ServerErrorResponseStatusCode{
		StatusCode: 500,
		Response: server.ServerErrorResponse{},
	}
}

func main() {
	service := &handler{
		TimeEntryHandler: timeentry.Handlers,
		StbUserHandler:   stbuser.Handlers,
	}

	srv, err := server.NewServer(service, auth.SecurityHandler, server.NotFoundHandler, server.GenericErrorHandler)
	if err != nil {
		log.Fatal(err)
	}
	mux := http.NewServeMux()
	mux.Handle("/", srv)
	openapi.RegisterOpenApiSpec(mux)

	c := cors.New(cors.Options{
		AllowCredentials: true,
		AllowedOrigins:   []string{"http://localhost:*", "http://127.0.0.1:*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	handler := c.Handler(mux)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal(err)
	}

	defer func() {
		sqldb.RoHandle.Pool.Close()
		sqldb.RwHandle.Pool.Close()
	}()
}
