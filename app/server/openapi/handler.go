package openapi

import (
	"net/http"
	"path/filepath"
	"runtime"
)

var _, filename, _, _ = runtime.Caller(0)
var schemaPath = filepath.Join(filepath.Dir(filepath.Dir(filepath.Dir(filename))), "server", "openapi")

func RegisterOpenApiSpec(mux *http.ServeMux) {
	mux.Handle("/openapi/", http.StripPrefix("/openapi/", http.FileServer(http.Dir(schemaPath))))
}
