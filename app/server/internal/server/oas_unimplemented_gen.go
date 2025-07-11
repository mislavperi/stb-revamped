// Code generated by ogen, DO NOT EDIT.

package server

import (
	"context"

	ht "github.com/ogen-go/ogen/http"
)

// UnimplementedHandler is no-op Handler which returns http.ErrNotImplemented.
type UnimplementedHandler struct{}

var _ Handler = UnimplementedHandler{}

// CreateStbUser implements createStbUser operation.
//
// Create a new stb_user.
//
// POST /stb_user
func (UnimplementedHandler) CreateStbUser(ctx context.Context, req *StbUserCreateRequestBody) (r CreateStbUserRes, _ error) {
	return r, ht.ErrNotImplemented
}

// CreateTimeEntry implements createTimeEntry operation.
//
// Add a time entry to a matter.
//
// POST /time-entry
func (UnimplementedHandler) CreateTimeEntry(ctx context.Context, req *CreateTimeEntryRequestBody) (r CreateTimeEntryRes, _ error) {
	return r, ht.ErrNotImplemented
}

// DeleteStbUserByUUID implements deleteStbUserByUUID operation.
//
// Delete a single stb_user by UUID.
//
// DELETE /stb_user/{stb_user_uuid}
func (UnimplementedHandler) DeleteStbUserByUUID(ctx context.Context, params DeleteStbUserByUUIDParams) (r DeleteStbUserByUUIDRes, _ error) {
	return r, ht.ErrNotImplemented
}

// GetStbUserByUUID implements getStbUserByUUID operation.
//
// Get a single stb_user by UUID.
//
// GET /stb_user/{stb_user_uuid}
func (UnimplementedHandler) GetStbUserByUUID(ctx context.Context, params GetStbUserByUUIDParams) (r GetStbUserByUUIDRes, _ error) {
	return r, ht.ErrNotImplemented
}

// GetStbUsers implements getStbUsers operation.
//
// List all stb_users.
//
// GET /stb_user
func (UnimplementedHandler) GetStbUsers(ctx context.Context) (r GetStbUsersRes, _ error) {
	return r, ht.ErrNotImplemented
}

// GetTimeEntries implements getTimeEntries operation.
//
// Get all time entries.
//
// GET /time-entry
func (UnimplementedHandler) GetTimeEntries(ctx context.Context) (r GetTimeEntriesRes, _ error) {
	return r, ht.ErrNotImplemented
}

// RemoveTimeEntry implements removeTimeEntry operation.
//
// Remove a time entry from a matter.
//
// DELETE /time-entry/{timeEntryUuid}
func (UnimplementedHandler) RemoveTimeEntry(ctx context.Context, params RemoveTimeEntryParams) (r RemoveTimeEntryRes, _ error) {
	return r, ht.ErrNotImplemented
}

// UpdateStbUserByUUID implements updateStbUserByUUID operation.
//
// Update an existing stb_user by UUID.
//
// PUT /stb_user/{stb_user_uuid}
func (UnimplementedHandler) UpdateStbUserByUUID(ctx context.Context, req *StbUserUpdateRequestBody, params UpdateStbUserByUUIDParams) (r UpdateStbUserByUUIDRes, _ error) {
	return r, ht.ErrNotImplemented
}

// UpdateTimeEntry implements updateTimeEntry operation.
//
// Update a time entry.
//
// PATCH /time-entry/{timeEntryUuid}
func (UnimplementedHandler) UpdateTimeEntry(ctx context.Context, req *UpdateTimeEntryRequestBody, params UpdateTimeEntryParams) (r UpdateTimeEntryRes, _ error) {
	return r, ht.ErrNotImplemented
}

// NewError creates *ServerErrorResponseStatusCode from error returned by handler.
//
// Used for common default response.
func (UnimplementedHandler) NewError(ctx context.Context, err error) (r *ServerErrorResponseStatusCode) {
	r = new(ServerErrorResponseStatusCode)
	return r
}
