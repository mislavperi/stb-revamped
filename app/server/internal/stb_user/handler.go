package stb_user

import (
	"context"

	"stb/app/server/internal/server"
	stbuserro "stb/app/server/internal/stb_user/sql_ro"
	stbuserrw "stb/app/server/internal/stb_user/sql_rw"

	"github.com/google/uuid"
)

type Handler struct {
	ro *stbuserro.Queries
	rw *stbuserrw.Queries
}

func NewHandler(ro *stbuserro.Queries, rw *stbuserrw.Queries) *Handler {
	return &Handler{
		ro: ro,
		rw: rw,
	}
}

func (h *Handler) CreateStbUser(ctx context.Context, req server.StbUserCreateRequestBody) (server.StbUser, error) {
	newUUID := uuid.New()
	_, err := h.rw.CreateStbUser(ctx, stbuserrw.CreateStbUserParams{
		StbUserUuid:   newUUID,
		StbCustomerID: int16(req.StbCustomerId),
		FirstName:     req.FirstName,
		MiddleName:    req.MiddleName,
		LastName:      req.LastName,
		Initials:      req.Initials,
		HasStatus:     int16(req.HasStatus),
		HasAuthMethod: int16(req.HasAuthMethod),
	})

	return server.StbUser{
		StbUserUuid:   newUUID,
		StbCustomerId: req.StbCustomerId,
		FirstName:     req.FirstName,
		MiddleName:    req.MiddleName,
		LastName:      req.LastName,
		Initials:      req.Initials,
		HasStatus:     req.HasStatus,
		HasAuthMethod: req.HasAuthMethod,
	}, err
}

func (h *Handler) GetStbUsers(ctx context.Context) ([]server.StbUser, error) {
	users, err := h.ro.ListStbUsers(ctx)

	var result []server.StbUser
	for _, user := range users {
		result = append(result, server.StbUser{
			StbUserUuid:   user.StbUserUuid,
			StbCustomerId: int32(user.StbCustomerID),
			FirstName:     user.FirstName,
			MiddleName:    user.MiddleName,
			LastName:      user.LastName,
			Initials:      user.Initials,
			HasStatus:     int32(user.HasStatus),
			HasAuthMethod: int32(user.HasAuthMethod),
		})
	}

	return result, err
}

func (h *Handler) GetStbUserByUUID(ctx context.Context, params server.GetStbUserByUUIDParams) (server.StbUser, error) {
	user, err := h.ro.GetStbUserByUUID(ctx, params.StbUserUUID)

	return server.StbUser{
		StbUserUuid:   user.StbUserUuid,
		StbCustomerId: int32(user.StbCustomerID),
		FirstName:     user.FirstName,
		MiddleName:    user.MiddleName,
		LastName:      user.LastName,
		Initials:      user.Initials,
		HasStatus:     int32(user.HasStatus),
		HasAuthMethod: int32(user.HasAuthMethod),
	}, err
}

func (h *Handler) UpdateStbUserByUUID(ctx context.Context, params server.UpdateStbUserByUUIDParams, req server.StbUserUpdateRequestBody) (server.StbUser, error) {
	err := h.rw.UpdateStbUser(ctx, stbuserrw.UpdateStbUserParams{
		StbUserUuid:   params.StbUserUUID,
		FirstName:     req.GetFirstName().Value,
		MiddleName:    req.MiddleName,
		LastName:      req.LastName,
		Initials:      req.Initials,
		HasStatus:     int16(req.HasStatus),
		HasAuthMethod: int16(req.HasAuthMethod),
	})

	user, err := h.ro.GetStbUserByUUID(ctx, params.StbUserUUID)

	return server.StbUser{
		StbUserUuid:   user.StbUserUuid,
		StbCustomerId: int32(user.StbCustomerID),
		FirstName:     user.FirstName,
		MiddleName:    user.MiddleName,
		LastName:      user.LastName,
		Initials:      user.Initials,
		HasStatus:     int32(user.HasStatus),
		HasAuthMethod: int32(user.HasAuthMethod),
	}, err
}
