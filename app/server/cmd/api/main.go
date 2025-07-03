package main

import (
	"bytes"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime/debug"

	sqldb "stb/app/server/internal/db/sql"
	stbuserro "stb/app/server/internal/stb_user/sql_ro"
	stbuserrw "stb/app/server/internal/stb_user/sql_rw"

	"stb/app/server/internal/server"
	stbuser "stb/app/server/internal/stb_user"

	timeentry "stb/app/server/internal/time_entry"

	"stb/app/server/openapi"

	"github.com/rs/cors"
)

type handler struct {
	timeentry.TimeEntryHandler
	*stbuser.StbUserHandler
}

func (h *handler) NewError(ctx context.Context, err error) *server.ServerErrorResponseStatusCode {
	statusCode := http.StatusInternalServerError
	message := err.Error()

	jsonResponse := fmt.Sprintf(`{"message": "%s"}`, message)

	return &server.ServerErrorResponseStatusCode{
		StatusCode: statusCode,
		Response:   server.ServerErrorResponse(jsonResponse),
	}
}

func recoveryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				fmt.Printf("PANIC: %v\n", err)
				fmt.Printf("Stack trace:\n%s\n", debug.Stack()) // Add import "runtime/debug"
				http.Error(w, "Internal Server Error", 500)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

type responseRecorder struct {
	http.ResponseWriter
	statusCode int
	body       *bytes.Buffer
}

func (r *responseRecorder) WriteHeader(code int) {
	r.statusCode = code
	r.ResponseWriter.WriteHeader(code)
}

func (r *responseRecorder) Write(b []byte) (int, error) {
	r.body.Write(b)
	return r.ResponseWriter.Write(b)
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("=== DETAILED DEBUG ===\n")
		fmt.Printf("Request URL: %s\n", r.URL.String())
		fmt.Printf("Request Method: %s\n", r.Method)
		fmt.Printf("Handler type: %T\n", next)

		// Create a custom ResponseWriter to capture what's being written
		recorder := &responseRecorder{
			ResponseWriter: w,
			statusCode:     200,
			body:           &bytes.Buffer{},
		}

		fmt.Printf("Calling next handler...\n")
		next.ServeHTTP(recorder, r)

		fmt.Printf("Response Status: %d\n", recorder.statusCode)
		fmt.Printf("Response Body Length: %d\n", recorder.body.Len())
		fmt.Printf("Response Body: %s\n", recorder.body.String())
		fmt.Printf("Response Headers: %v\n", w.Header())
		fmt.Printf("=== END DEBUG ===\n")
	})
}

func main() {

	repo := stbuser.NewstbUserRepo(stbuserro.New(sqldb.RoHandle.Pool), stbuserrw.New(sqldb.RwHandle.Pool), context.Background())

	service := &handler{
		TimeEntryHandler: timeentry.Handlers,
		StbUserHandler:   stbuser.NewStbUserHandler(repo),
	}

	fmt.Println("=== Testing Direct Method Call ===")
	ctx := context.Background()
	result, err := service.StbUserHandler.GetStbUsers(ctx)
	fmt.Printf("Direct call result type: %T\n", result)
	fmt.Printf("Direct call error: %v\n", err)
	fmt.Println("=== End Direct Test ===")

	srv, err := server.NewServer(service, server.NotFoundHandler, server.GenericErrorHandler)
	if err != nil {
		fmt.Println(err)
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

	handler := c.Handler(recoveryMiddleware(loggingMiddleware(mux)))
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal(err)
	}

	defer func() {
		sqldb.RoHandle.Pool.Close()
		sqldb.RwHandle.Pool.Close()
	}()
}
