package stb_user

import (
	"context"

	"stb/app/server/internal/server"
	"stb/app/server/internal/stb_user/mappers"
	stbuserrw "stb/app/server/internal/stb_user/sql_rw"

	"github.com/google/uuid"
)

type StbUserHandler struct {
}

func NewStbUserHandler() *StbUserHandler {
	return &StbUserHandler{}
}

func (h *StbUserHandler) CreateStbUser(ctx context.Context, req *server.StbUserCreateRequestBody) (server.CreateStbUserRes, error) {
	newUUID := uuid.New()
	err := StbUserRepo.CreateStbUser(ctx, stbuserrw.CreateStbUserParams{
		StbUserUuid:   newUUID,
		StbCustomerID: int16(req.StbCustomerId),
		FirstName:     req.FirstName,
		MiddleName:    req.MiddleName,
		LastName:      req.LastName,
		Initials:      req.Initials,
		HasStatus:     int16(req.HasStatus),
		HasAuthMethod: int16(req.HasAuthMethod),
	})

	return &server.StbUserResponse{
		StbUserUuid:   server.NewOptUUID(newUUID),
		StbCustomerId: server.NewOptInt32(req.StbCustomerId),
		FirstName:     server.NewOptString(req.FirstName),
		MiddleName:    server.NewOptString(req.MiddleName),
		LastName:      server.NewOptString(req.LastName),
		Initials:      server.NewOptString(req.Initials),
		HasStatus:     server.NewOptInt32(req.HasStatus),
		HasAuthMethod: server.NewOptInt32(req.HasAuthMethod),
	}, err

}

func (h *StbUserHandler) GetStbUsers(ctx context.Context) (server.GetStbUsersRes, error) {
	users, err := StbUserRepo.ListStbUsers(ctx)

	var result []server.StbUserResponse
	for _, user := range users {
		result = append(result, server.StbUserResponse{
			StbUserUuid:   server.NewOptUUID(user.StbUserUuid),
			StbCustomerId: server.NewOptInt32(int32(user.StbCustomerID)),
			FirstName:     server.NewOptString(user.FirstName),
			MiddleName:    server.NewOptString(user.MiddleName),
			LastName:      server.NewOptString(user.LastName),
			Initials:      server.NewOptString(user.Initials),
			HasStatus:     server.NewOptInt32(int32(user.HasStatus)),
			HasAuthMethod: server.NewOptInt32(int32(user.HasAuthMethod)),
		})
	}

	response := server.GetStbUsersOKApplicationJSON(result)

	return &response, err
}

func (h *StbUserHandler) GetStbUserByUUID(ctx context.Context, params server.GetStbUserByUUIDParams) (server.GetStbUserByUUIDRes, error) {
	user, err := StbUserRepo.GetStbUserByUUID(ctx, params.StbUserUUID)

	return &server.StbUserResponse{
		StbUserUuid:   server.NewOptUUID(user.StbUserUuid),
		StbCustomerId: server.NewOptInt32(int32(user.StbCustomerID)),
		FirstName:     server.NewOptString(user.FirstName),
		MiddleName:    server.NewOptString(user.MiddleName),
		LastName:      server.NewOptString(user.LastName),
		Initials:      server.NewOptString(user.Initials),
		HasStatus:     server.NewOptInt32(int32(user.HasStatus)),
		HasAuthMethod: server.NewOptInt32(int32(user.HasAuthMethod)),
	}, err
}

func (h *StbUserHandler) UpdateStbUserByUUID(ctx context.Context, req *server.StbUserUpdateRequestBody, params server.UpdateStbUserByUUIDParams) (server.UpdateStbUserByUUIDRes, error) {
	mappedPsqlUser := mappers.MapStbUserToPgStbUser(params.StbUserUUID, *req)

	err := StbUserRepo.UpdateStbUser(ctx, mappedPsqlUser)
	if err != nil {
		return nil, err
	}

	user, err := StbUserRepo.GetStbUserByUUID(ctx, params.StbUserUUID)
	if err != nil {
		return nil, err
	}

	return &server.StbUserResponse{
		StbUserUuid:   server.NewOptUUID(user.StbUserUuid),
		StbCustomerId: server.NewOptInt32(int32(user.StbCustomerID)),
		FirstName:     server.NewOptString(user.FirstName),
		MiddleName:    server.NewOptString(user.MiddleName),
		LastName:      server.NewOptString(user.LastName),
		Initials:      server.NewOptString(user.Initials),
		HasStatus:     server.NewOptInt32(int32(user.HasStatus)),
		HasAuthMethod: server.NewOptInt32(int32(user.HasAuthMethod)),
	}, err
}

func (h *StbUserHandler) DeleteStbUserByUUID(ctx context.Context, req server.DeleteStbUserByUUIDParams) (server.DeleteStbUserByUUIDRes, error) {
	return nil, nil
}

var Handlers = StbUserHandler{}
