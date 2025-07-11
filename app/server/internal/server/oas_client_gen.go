// Code generated by ogen, DO NOT EDIT.

package server

import (
	"context"
	"net/url"
	"strings"
	"time"

	"github.com/go-faster/errors"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/metric"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
	"go.opentelemetry.io/otel/trace"

	"github.com/ogen-go/ogen/conv"
	ht "github.com/ogen-go/ogen/http"
	"github.com/ogen-go/ogen/otelogen"
	"github.com/ogen-go/ogen/uri"
)

func trimTrailingSlashes(u *url.URL) {
	u.Path = strings.TrimRight(u.Path, "/")
	u.RawPath = strings.TrimRight(u.RawPath, "/")
}

// Invoker invokes operations described by OpenAPI v3 specification.
type Invoker interface {
	StbUserInvoker
	TimeEntryInvoker
}

// StbUserInvoker invokes operations described by OpenAPI v3 specification.
//
// x-gen-operation-group: StbUser
type StbUserInvoker interface {
	// CreateStbUser invokes createStbUser operation.
	//
	// Create a new stb_user.
	//
	// POST /stb_user
	CreateStbUser(ctx context.Context, request *StbUserCreateRequestBody) (CreateStbUserRes, error)
	// DeleteStbUserByUUID invokes deleteStbUserByUUID operation.
	//
	// Delete a single stb_user by UUID.
	//
	// DELETE /stb_user/{stb_user_uuid}
	DeleteStbUserByUUID(ctx context.Context, params DeleteStbUserByUUIDParams) (DeleteStbUserByUUIDRes, error)
	// GetStbUserByUUID invokes getStbUserByUUID operation.
	//
	// Get a single stb_user by UUID.
	//
	// GET /stb_user/{stb_user_uuid}
	GetStbUserByUUID(ctx context.Context, params GetStbUserByUUIDParams) (GetStbUserByUUIDRes, error)
	// GetStbUsers invokes getStbUsers operation.
	//
	// List all stb_users.
	//
	// GET /stb_user
	GetStbUsers(ctx context.Context) (GetStbUsersRes, error)
	// UpdateStbUserByUUID invokes updateStbUserByUUID operation.
	//
	// Update an existing stb_user by UUID.
	//
	// PUT /stb_user/{stb_user_uuid}
	UpdateStbUserByUUID(ctx context.Context, request *StbUserUpdateRequestBody, params UpdateStbUserByUUIDParams) (UpdateStbUserByUUIDRes, error)
}

// TimeEntryInvoker invokes operations described by OpenAPI v3 specification.
//
// x-gen-operation-group: TimeEntry
type TimeEntryInvoker interface {
	// CreateTimeEntry invokes createTimeEntry operation.
	//
	// Add a time entry to a matter.
	//
	// POST /time-entry
	CreateTimeEntry(ctx context.Context, request *CreateTimeEntryRequestBody) (CreateTimeEntryRes, error)
	// GetTimeEntries invokes getTimeEntries operation.
	//
	// Get all time entries.
	//
	// GET /time-entry
	GetTimeEntries(ctx context.Context) (GetTimeEntriesRes, error)
	// RemoveTimeEntry invokes removeTimeEntry operation.
	//
	// Remove a time entry from a matter.
	//
	// DELETE /time-entry/{timeEntryUuid}
	RemoveTimeEntry(ctx context.Context, params RemoveTimeEntryParams) (RemoveTimeEntryRes, error)
	// UpdateTimeEntry invokes updateTimeEntry operation.
	//
	// Update a time entry.
	//
	// PATCH /time-entry/{timeEntryUuid}
	UpdateTimeEntry(ctx context.Context, request *UpdateTimeEntryRequestBody, params UpdateTimeEntryParams) (UpdateTimeEntryRes, error)
}

// Client implements OAS client.
type Client struct {
	serverURL *url.URL
	baseClient
}
type errorHandler interface {
	NewError(ctx context.Context, err error) *ServerErrorResponseStatusCode
}

var _ Handler = struct {
	errorHandler
	*Client
}{}

// NewClient initializes new Client defined by OAS.
func NewClient(serverURL string, opts ...ClientOption) (*Client, error) {
	u, err := url.Parse(serverURL)
	if err != nil {
		return nil, err
	}
	trimTrailingSlashes(u)

	c, err := newClientConfig(opts...).baseClient()
	if err != nil {
		return nil, err
	}
	return &Client{
		serverURL:  u,
		baseClient: c,
	}, nil
}

type serverURLKey struct{}

// WithServerURL sets context key to override server URL.
func WithServerURL(ctx context.Context, u *url.URL) context.Context {
	return context.WithValue(ctx, serverURLKey{}, u)
}

func (c *Client) requestURL(ctx context.Context) *url.URL {
	u, ok := ctx.Value(serverURLKey{}).(*url.URL)
	if !ok {
		return c.serverURL
	}
	return u
}

// CreateStbUser invokes createStbUser operation.
//
// Create a new stb_user.
//
// POST /stb_user
func (c *Client) CreateStbUser(ctx context.Context, request *StbUserCreateRequestBody) (CreateStbUserRes, error) {
	res, err := c.sendCreateStbUser(ctx, request)
	return res, err
}

func (c *Client) sendCreateStbUser(ctx context.Context, request *StbUserCreateRequestBody) (res CreateStbUserRes, err error) {
	otelAttrs := []attribute.KeyValue{
		otelogen.OperationID("createStbUser"),
		semconv.HTTPRequestMethodKey.String("POST"),
		semconv.HTTPRouteKey.String("/stb_user"),
	}

	// Run stopwatch.
	startTime := time.Now()
	defer func() {
		// Use floating point division here for higher precision (instead of Millisecond method).
		elapsedDuration := time.Since(startTime)
		c.duration.Record(ctx, float64(elapsedDuration)/float64(time.Millisecond), metric.WithAttributes(otelAttrs...))
	}()

	// Increment request counter.
	c.requests.Add(ctx, 1, metric.WithAttributes(otelAttrs...))

	// Start a span for this request.
	ctx, span := c.cfg.Tracer.Start(ctx, CreateStbUserOperation,
		trace.WithAttributes(otelAttrs...),
		clientSpanKind,
	)
	// Track stage for error reporting.
	var stage string
	defer func() {
		if err != nil {
			span.RecordError(err)
			span.SetStatus(codes.Error, stage)
			c.errors.Add(ctx, 1, metric.WithAttributes(otelAttrs...))
		}
		span.End()
	}()

	stage = "BuildURL"
	u := uri.Clone(c.requestURL(ctx))
	var pathParts [1]string
	pathParts[0] = "/stb_user"
	uri.AddPathParts(u, pathParts[:]...)

	stage = "EncodeRequest"
	r, err := ht.NewRequest(ctx, "POST", u)
	if err != nil {
		return res, errors.Wrap(err, "create request")
	}
	if err := encodeCreateStbUserRequest(request, r); err != nil {
		return res, errors.Wrap(err, "encode request")
	}

	stage = "SendRequest"
	resp, err := c.cfg.Client.Do(r)
	if err != nil {
		return res, errors.Wrap(err, "do request")
	}
	defer resp.Body.Close()

	stage = "DecodeResponse"
	result, err := decodeCreateStbUserResponse(resp)
	if err != nil {
		return res, errors.Wrap(err, "decode response")
	}

	return result, nil
}

// CreateTimeEntry invokes createTimeEntry operation.
//
// Add a time entry to a matter.
//
// POST /time-entry
func (c *Client) CreateTimeEntry(ctx context.Context, request *CreateTimeEntryRequestBody) (CreateTimeEntryRes, error) {
	res, err := c.sendCreateTimeEntry(ctx, request)
	return res, err
}

func (c *Client) sendCreateTimeEntry(ctx context.Context, request *CreateTimeEntryRequestBody) (res CreateTimeEntryRes, err error) {
	otelAttrs := []attribute.KeyValue{
		otelogen.OperationID("createTimeEntry"),
		semconv.HTTPRequestMethodKey.String("POST"),
		semconv.HTTPRouteKey.String("/time-entry"),
	}

	// Run stopwatch.
	startTime := time.Now()
	defer func() {
		// Use floating point division here for higher precision (instead of Millisecond method).
		elapsedDuration := time.Since(startTime)
		c.duration.Record(ctx, float64(elapsedDuration)/float64(time.Millisecond), metric.WithAttributes(otelAttrs...))
	}()

	// Increment request counter.
	c.requests.Add(ctx, 1, metric.WithAttributes(otelAttrs...))

	// Start a span for this request.
	ctx, span := c.cfg.Tracer.Start(ctx, CreateTimeEntryOperation,
		trace.WithAttributes(otelAttrs...),
		clientSpanKind,
	)
	// Track stage for error reporting.
	var stage string
	defer func() {
		if err != nil {
			span.RecordError(err)
			span.SetStatus(codes.Error, stage)
			c.errors.Add(ctx, 1, metric.WithAttributes(otelAttrs...))
		}
		span.End()
	}()

	stage = "BuildURL"
	u := uri.Clone(c.requestURL(ctx))
	var pathParts [1]string
	pathParts[0] = "/time-entry"
	uri.AddPathParts(u, pathParts[:]...)

	stage = "EncodeRequest"
	r, err := ht.NewRequest(ctx, "POST", u)
	if err != nil {
		return res, errors.Wrap(err, "create request")
	}
	if err := encodeCreateTimeEntryRequest(request, r); err != nil {
		return res, errors.Wrap(err, "encode request")
	}

	stage = "SendRequest"
	resp, err := c.cfg.Client.Do(r)
	if err != nil {
		return res, errors.Wrap(err, "do request")
	}
	defer resp.Body.Close()

	stage = "DecodeResponse"
	result, err := decodeCreateTimeEntryResponse(resp)
	if err != nil {
		return res, errors.Wrap(err, "decode response")
	}

	return result, nil
}

// DeleteStbUserByUUID invokes deleteStbUserByUUID operation.
//
// Delete a single stb_user by UUID.
//
// DELETE /stb_user/{stb_user_uuid}
func (c *Client) DeleteStbUserByUUID(ctx context.Context, params DeleteStbUserByUUIDParams) (DeleteStbUserByUUIDRes, error) {
	res, err := c.sendDeleteStbUserByUUID(ctx, params)
	return res, err
}

func (c *Client) sendDeleteStbUserByUUID(ctx context.Context, params DeleteStbUserByUUIDParams) (res DeleteStbUserByUUIDRes, err error) {
	otelAttrs := []attribute.KeyValue{
		otelogen.OperationID("deleteStbUserByUUID"),
		semconv.HTTPRequestMethodKey.String("DELETE"),
		semconv.HTTPRouteKey.String("/stb_user/{stb_user_uuid}"),
	}

	// Run stopwatch.
	startTime := time.Now()
	defer func() {
		// Use floating point division here for higher precision (instead of Millisecond method).
		elapsedDuration := time.Since(startTime)
		c.duration.Record(ctx, float64(elapsedDuration)/float64(time.Millisecond), metric.WithAttributes(otelAttrs...))
	}()

	// Increment request counter.
	c.requests.Add(ctx, 1, metric.WithAttributes(otelAttrs...))

	// Start a span for this request.
	ctx, span := c.cfg.Tracer.Start(ctx, DeleteStbUserByUUIDOperation,
		trace.WithAttributes(otelAttrs...),
		clientSpanKind,
	)
	// Track stage for error reporting.
	var stage string
	defer func() {
		if err != nil {
			span.RecordError(err)
			span.SetStatus(codes.Error, stage)
			c.errors.Add(ctx, 1, metric.WithAttributes(otelAttrs...))
		}
		span.End()
	}()

	stage = "BuildURL"
	u := uri.Clone(c.requestURL(ctx))
	var pathParts [2]string
	pathParts[0] = "/stb_user/"
	{
		// Encode "stb_user_uuid" parameter.
		e := uri.NewPathEncoder(uri.PathEncoderConfig{
			Param:   "stb_user_uuid",
			Style:   uri.PathStyleSimple,
			Explode: false,
		})
		if err := func() error {
			return e.EncodeValue(conv.UUIDToString(params.StbUserUUID))
		}(); err != nil {
			return res, errors.Wrap(err, "encode path")
		}
		encoded, err := e.Result()
		if err != nil {
			return res, errors.Wrap(err, "encode path")
		}
		pathParts[1] = encoded
	}
	uri.AddPathParts(u, pathParts[:]...)

	stage = "EncodeRequest"
	r, err := ht.NewRequest(ctx, "DELETE", u)
	if err != nil {
		return res, errors.Wrap(err, "create request")
	}

	stage = "SendRequest"
	resp, err := c.cfg.Client.Do(r)
	if err != nil {
		return res, errors.Wrap(err, "do request")
	}
	defer resp.Body.Close()

	stage = "DecodeResponse"
	result, err := decodeDeleteStbUserByUUIDResponse(resp)
	if err != nil {
		return res, errors.Wrap(err, "decode response")
	}

	return result, nil
}

// GetStbUserByUUID invokes getStbUserByUUID operation.
//
// Get a single stb_user by UUID.
//
// GET /stb_user/{stb_user_uuid}
func (c *Client) GetStbUserByUUID(ctx context.Context, params GetStbUserByUUIDParams) (GetStbUserByUUIDRes, error) {
	res, err := c.sendGetStbUserByUUID(ctx, params)
	return res, err
}

func (c *Client) sendGetStbUserByUUID(ctx context.Context, params GetStbUserByUUIDParams) (res GetStbUserByUUIDRes, err error) {
	otelAttrs := []attribute.KeyValue{
		otelogen.OperationID("getStbUserByUUID"),
		semconv.HTTPRequestMethodKey.String("GET"),
		semconv.HTTPRouteKey.String("/stb_user/{stb_user_uuid}"),
	}

	// Run stopwatch.
	startTime := time.Now()
	defer func() {
		// Use floating point division here for higher precision (instead of Millisecond method).
		elapsedDuration := time.Since(startTime)
		c.duration.Record(ctx, float64(elapsedDuration)/float64(time.Millisecond), metric.WithAttributes(otelAttrs...))
	}()

	// Increment request counter.
	c.requests.Add(ctx, 1, metric.WithAttributes(otelAttrs...))

	// Start a span for this request.
	ctx, span := c.cfg.Tracer.Start(ctx, GetStbUserByUUIDOperation,
		trace.WithAttributes(otelAttrs...),
		clientSpanKind,
	)
	// Track stage for error reporting.
	var stage string
	defer func() {
		if err != nil {
			span.RecordError(err)
			span.SetStatus(codes.Error, stage)
			c.errors.Add(ctx, 1, metric.WithAttributes(otelAttrs...))
		}
		span.End()
	}()

	stage = "BuildURL"
	u := uri.Clone(c.requestURL(ctx))
	var pathParts [2]string
	pathParts[0] = "/stb_user/"
	{
		// Encode "stb_user_uuid" parameter.
		e := uri.NewPathEncoder(uri.PathEncoderConfig{
			Param:   "stb_user_uuid",
			Style:   uri.PathStyleSimple,
			Explode: false,
		})
		if err := func() error {
			return e.EncodeValue(conv.UUIDToString(params.StbUserUUID))
		}(); err != nil {
			return res, errors.Wrap(err, "encode path")
		}
		encoded, err := e.Result()
		if err != nil {
			return res, errors.Wrap(err, "encode path")
		}
		pathParts[1] = encoded
	}
	uri.AddPathParts(u, pathParts[:]...)

	stage = "EncodeRequest"
	r, err := ht.NewRequest(ctx, "GET", u)
	if err != nil {
		return res, errors.Wrap(err, "create request")
	}

	stage = "SendRequest"
	resp, err := c.cfg.Client.Do(r)
	if err != nil {
		return res, errors.Wrap(err, "do request")
	}
	defer resp.Body.Close()

	stage = "DecodeResponse"
	result, err := decodeGetStbUserByUUIDResponse(resp)
	if err != nil {
		return res, errors.Wrap(err, "decode response")
	}

	return result, nil
}

// GetStbUsers invokes getStbUsers operation.
//
// List all stb_users.
//
// GET /stb_user
func (c *Client) GetStbUsers(ctx context.Context) (GetStbUsersRes, error) {
	res, err := c.sendGetStbUsers(ctx)
	return res, err
}

func (c *Client) sendGetStbUsers(ctx context.Context) (res GetStbUsersRes, err error) {
	otelAttrs := []attribute.KeyValue{
		otelogen.OperationID("getStbUsers"),
		semconv.HTTPRequestMethodKey.String("GET"),
		semconv.HTTPRouteKey.String("/stb_user"),
	}

	// Run stopwatch.
	startTime := time.Now()
	defer func() {
		// Use floating point division here for higher precision (instead of Millisecond method).
		elapsedDuration := time.Since(startTime)
		c.duration.Record(ctx, float64(elapsedDuration)/float64(time.Millisecond), metric.WithAttributes(otelAttrs...))
	}()

	// Increment request counter.
	c.requests.Add(ctx, 1, metric.WithAttributes(otelAttrs...))

	// Start a span for this request.
	ctx, span := c.cfg.Tracer.Start(ctx, GetStbUsersOperation,
		trace.WithAttributes(otelAttrs...),
		clientSpanKind,
	)
	// Track stage for error reporting.
	var stage string
	defer func() {
		if err != nil {
			span.RecordError(err)
			span.SetStatus(codes.Error, stage)
			c.errors.Add(ctx, 1, metric.WithAttributes(otelAttrs...))
		}
		span.End()
	}()

	stage = "BuildURL"
	u := uri.Clone(c.requestURL(ctx))
	var pathParts [1]string
	pathParts[0] = "/stb_user"
	uri.AddPathParts(u, pathParts[:]...)

	stage = "EncodeRequest"
	r, err := ht.NewRequest(ctx, "GET", u)
	if err != nil {
		return res, errors.Wrap(err, "create request")
	}

	stage = "SendRequest"
	resp, err := c.cfg.Client.Do(r)
	if err != nil {
		return res, errors.Wrap(err, "do request")
	}
	defer resp.Body.Close()

	stage = "DecodeResponse"
	result, err := decodeGetStbUsersResponse(resp)
	if err != nil {
		return res, errors.Wrap(err, "decode response")
	}

	return result, nil
}

// GetTimeEntries invokes getTimeEntries operation.
//
// Get all time entries.
//
// GET /time-entry
func (c *Client) GetTimeEntries(ctx context.Context) (GetTimeEntriesRes, error) {
	res, err := c.sendGetTimeEntries(ctx)
	return res, err
}

func (c *Client) sendGetTimeEntries(ctx context.Context) (res GetTimeEntriesRes, err error) {
	otelAttrs := []attribute.KeyValue{
		otelogen.OperationID("getTimeEntries"),
		semconv.HTTPRequestMethodKey.String("GET"),
		semconv.HTTPRouteKey.String("/time-entry"),
	}

	// Run stopwatch.
	startTime := time.Now()
	defer func() {
		// Use floating point division here for higher precision (instead of Millisecond method).
		elapsedDuration := time.Since(startTime)
		c.duration.Record(ctx, float64(elapsedDuration)/float64(time.Millisecond), metric.WithAttributes(otelAttrs...))
	}()

	// Increment request counter.
	c.requests.Add(ctx, 1, metric.WithAttributes(otelAttrs...))

	// Start a span for this request.
	ctx, span := c.cfg.Tracer.Start(ctx, GetTimeEntriesOperation,
		trace.WithAttributes(otelAttrs...),
		clientSpanKind,
	)
	// Track stage for error reporting.
	var stage string
	defer func() {
		if err != nil {
			span.RecordError(err)
			span.SetStatus(codes.Error, stage)
			c.errors.Add(ctx, 1, metric.WithAttributes(otelAttrs...))
		}
		span.End()
	}()

	stage = "BuildURL"
	u := uri.Clone(c.requestURL(ctx))
	var pathParts [1]string
	pathParts[0] = "/time-entry"
	uri.AddPathParts(u, pathParts[:]...)

	stage = "EncodeRequest"
	r, err := ht.NewRequest(ctx, "GET", u)
	if err != nil {
		return res, errors.Wrap(err, "create request")
	}

	stage = "SendRequest"
	resp, err := c.cfg.Client.Do(r)
	if err != nil {
		return res, errors.Wrap(err, "do request")
	}
	defer resp.Body.Close()

	stage = "DecodeResponse"
	result, err := decodeGetTimeEntriesResponse(resp)
	if err != nil {
		return res, errors.Wrap(err, "decode response")
	}

	return result, nil
}

// RemoveTimeEntry invokes removeTimeEntry operation.
//
// Remove a time entry from a matter.
//
// DELETE /time-entry/{timeEntryUuid}
func (c *Client) RemoveTimeEntry(ctx context.Context, params RemoveTimeEntryParams) (RemoveTimeEntryRes, error) {
	res, err := c.sendRemoveTimeEntry(ctx, params)
	return res, err
}

func (c *Client) sendRemoveTimeEntry(ctx context.Context, params RemoveTimeEntryParams) (res RemoveTimeEntryRes, err error) {
	otelAttrs := []attribute.KeyValue{
		otelogen.OperationID("removeTimeEntry"),
		semconv.HTTPRequestMethodKey.String("DELETE"),
		semconv.HTTPRouteKey.String("/time-entry/{timeEntryUuid}"),
	}

	// Run stopwatch.
	startTime := time.Now()
	defer func() {
		// Use floating point division here for higher precision (instead of Millisecond method).
		elapsedDuration := time.Since(startTime)
		c.duration.Record(ctx, float64(elapsedDuration)/float64(time.Millisecond), metric.WithAttributes(otelAttrs...))
	}()

	// Increment request counter.
	c.requests.Add(ctx, 1, metric.WithAttributes(otelAttrs...))

	// Start a span for this request.
	ctx, span := c.cfg.Tracer.Start(ctx, RemoveTimeEntryOperation,
		trace.WithAttributes(otelAttrs...),
		clientSpanKind,
	)
	// Track stage for error reporting.
	var stage string
	defer func() {
		if err != nil {
			span.RecordError(err)
			span.SetStatus(codes.Error, stage)
			c.errors.Add(ctx, 1, metric.WithAttributes(otelAttrs...))
		}
		span.End()
	}()

	stage = "BuildURL"
	u := uri.Clone(c.requestURL(ctx))
	var pathParts [2]string
	pathParts[0] = "/time-entry/"
	{
		// Encode "timeEntryUuid" parameter.
		e := uri.NewPathEncoder(uri.PathEncoderConfig{
			Param:   "timeEntryUuid",
			Style:   uri.PathStyleSimple,
			Explode: false,
		})
		if err := func() error {
			return e.EncodeValue(conv.UUIDToString(params.TimeEntryUuid))
		}(); err != nil {
			return res, errors.Wrap(err, "encode path")
		}
		encoded, err := e.Result()
		if err != nil {
			return res, errors.Wrap(err, "encode path")
		}
		pathParts[1] = encoded
	}
	uri.AddPathParts(u, pathParts[:]...)

	stage = "EncodeRequest"
	r, err := ht.NewRequest(ctx, "DELETE", u)
	if err != nil {
		return res, errors.Wrap(err, "create request")
	}

	stage = "SendRequest"
	resp, err := c.cfg.Client.Do(r)
	if err != nil {
		return res, errors.Wrap(err, "do request")
	}
	defer resp.Body.Close()

	stage = "DecodeResponse"
	result, err := decodeRemoveTimeEntryResponse(resp)
	if err != nil {
		return res, errors.Wrap(err, "decode response")
	}

	return result, nil
}

// UpdateStbUserByUUID invokes updateStbUserByUUID operation.
//
// Update an existing stb_user by UUID.
//
// PUT /stb_user/{stb_user_uuid}
func (c *Client) UpdateStbUserByUUID(ctx context.Context, request *StbUserUpdateRequestBody, params UpdateStbUserByUUIDParams) (UpdateStbUserByUUIDRes, error) {
	res, err := c.sendUpdateStbUserByUUID(ctx, request, params)
	return res, err
}

func (c *Client) sendUpdateStbUserByUUID(ctx context.Context, request *StbUserUpdateRequestBody, params UpdateStbUserByUUIDParams) (res UpdateStbUserByUUIDRes, err error) {
	otelAttrs := []attribute.KeyValue{
		otelogen.OperationID("updateStbUserByUUID"),
		semconv.HTTPRequestMethodKey.String("PUT"),
		semconv.HTTPRouteKey.String("/stb_user/{stb_user_uuid}"),
	}

	// Run stopwatch.
	startTime := time.Now()
	defer func() {
		// Use floating point division here for higher precision (instead of Millisecond method).
		elapsedDuration := time.Since(startTime)
		c.duration.Record(ctx, float64(elapsedDuration)/float64(time.Millisecond), metric.WithAttributes(otelAttrs...))
	}()

	// Increment request counter.
	c.requests.Add(ctx, 1, metric.WithAttributes(otelAttrs...))

	// Start a span for this request.
	ctx, span := c.cfg.Tracer.Start(ctx, UpdateStbUserByUUIDOperation,
		trace.WithAttributes(otelAttrs...),
		clientSpanKind,
	)
	// Track stage for error reporting.
	var stage string
	defer func() {
		if err != nil {
			span.RecordError(err)
			span.SetStatus(codes.Error, stage)
			c.errors.Add(ctx, 1, metric.WithAttributes(otelAttrs...))
		}
		span.End()
	}()

	stage = "BuildURL"
	u := uri.Clone(c.requestURL(ctx))
	var pathParts [2]string
	pathParts[0] = "/stb_user/"
	{
		// Encode "stb_user_uuid" parameter.
		e := uri.NewPathEncoder(uri.PathEncoderConfig{
			Param:   "stb_user_uuid",
			Style:   uri.PathStyleSimple,
			Explode: false,
		})
		if err := func() error {
			return e.EncodeValue(conv.UUIDToString(params.StbUserUUID))
		}(); err != nil {
			return res, errors.Wrap(err, "encode path")
		}
		encoded, err := e.Result()
		if err != nil {
			return res, errors.Wrap(err, "encode path")
		}
		pathParts[1] = encoded
	}
	uri.AddPathParts(u, pathParts[:]...)

	stage = "EncodeRequest"
	r, err := ht.NewRequest(ctx, "PUT", u)
	if err != nil {
		return res, errors.Wrap(err, "create request")
	}
	if err := encodeUpdateStbUserByUUIDRequest(request, r); err != nil {
		return res, errors.Wrap(err, "encode request")
	}

	stage = "SendRequest"
	resp, err := c.cfg.Client.Do(r)
	if err != nil {
		return res, errors.Wrap(err, "do request")
	}
	defer resp.Body.Close()

	stage = "DecodeResponse"
	result, err := decodeUpdateStbUserByUUIDResponse(resp)
	if err != nil {
		return res, errors.Wrap(err, "decode response")
	}

	return result, nil
}

// UpdateTimeEntry invokes updateTimeEntry operation.
//
// Update a time entry.
//
// PATCH /time-entry/{timeEntryUuid}
func (c *Client) UpdateTimeEntry(ctx context.Context, request *UpdateTimeEntryRequestBody, params UpdateTimeEntryParams) (UpdateTimeEntryRes, error) {
	res, err := c.sendUpdateTimeEntry(ctx, request, params)
	return res, err
}

func (c *Client) sendUpdateTimeEntry(ctx context.Context, request *UpdateTimeEntryRequestBody, params UpdateTimeEntryParams) (res UpdateTimeEntryRes, err error) {
	otelAttrs := []attribute.KeyValue{
		otelogen.OperationID("updateTimeEntry"),
		semconv.HTTPRequestMethodKey.String("PATCH"),
		semconv.HTTPRouteKey.String("/time-entry/{timeEntryUuid}"),
	}

	// Run stopwatch.
	startTime := time.Now()
	defer func() {
		// Use floating point division here for higher precision (instead of Millisecond method).
		elapsedDuration := time.Since(startTime)
		c.duration.Record(ctx, float64(elapsedDuration)/float64(time.Millisecond), metric.WithAttributes(otelAttrs...))
	}()

	// Increment request counter.
	c.requests.Add(ctx, 1, metric.WithAttributes(otelAttrs...))

	// Start a span for this request.
	ctx, span := c.cfg.Tracer.Start(ctx, UpdateTimeEntryOperation,
		trace.WithAttributes(otelAttrs...),
		clientSpanKind,
	)
	// Track stage for error reporting.
	var stage string
	defer func() {
		if err != nil {
			span.RecordError(err)
			span.SetStatus(codes.Error, stage)
			c.errors.Add(ctx, 1, metric.WithAttributes(otelAttrs...))
		}
		span.End()
	}()

	stage = "BuildURL"
	u := uri.Clone(c.requestURL(ctx))
	var pathParts [2]string
	pathParts[0] = "/time-entry/"
	{
		// Encode "timeEntryUuid" parameter.
		e := uri.NewPathEncoder(uri.PathEncoderConfig{
			Param:   "timeEntryUuid",
			Style:   uri.PathStyleSimple,
			Explode: false,
		})
		if err := func() error {
			return e.EncodeValue(conv.UUIDToString(params.TimeEntryUuid))
		}(); err != nil {
			return res, errors.Wrap(err, "encode path")
		}
		encoded, err := e.Result()
		if err != nil {
			return res, errors.Wrap(err, "encode path")
		}
		pathParts[1] = encoded
	}
	uri.AddPathParts(u, pathParts[:]...)

	stage = "EncodeRequest"
	r, err := ht.NewRequest(ctx, "PATCH", u)
	if err != nil {
		return res, errors.Wrap(err, "create request")
	}
	if err := encodeUpdateTimeEntryRequest(request, r); err != nil {
		return res, errors.Wrap(err, "encode request")
	}

	stage = "SendRequest"
	resp, err := c.cfg.Client.Do(r)
	if err != nil {
		return res, errors.Wrap(err, "do request")
	}
	defer resp.Body.Close()

	stage = "DecodeResponse"
	result, err := decodeUpdateTimeEntryResponse(resp)
	if err != nil {
		return res, errors.Wrap(err, "decode response")
	}

	return result, nil
}
