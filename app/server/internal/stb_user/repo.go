package stb_user

import (
	"context"

	stbuserro "stb/app/server/internal/stb_user/sql_ro"
	stbuserrw "stb/app/server/internal/stb_user/sql_rw"

	"github.com/google/uuid"
)

type stbUserRepo struct {
	ro  *stbuserro.Queries
	rw  *stbuserrw.Queries
	ctx context.Context
}

func NewstbUserRepo(ro *stbuserro.Queries, rw *stbuserrw.Queries, ctx context.Context) *stbUserRepo {
	return &stbUserRepo{
		ro:  ro,
		rw:  rw,
		ctx: ctx,
	}
}

func (r *stbUserRepo) CreateStbUser(ctx context.Context, params stbuserrw.CreateStbUserParams) error {
	_, err := r.rw.CreateStbUser(ctx, params) //ignore the incoming int variable for now, not a good practice tho
	return err
}

func (r *stbUserRepo) GetStbUserByUUID(ctx context.Context, uuid uuid.UUID) (stbuserro.GetStbUserByUUIDRow, error) {
	return r.ro.GetStbUserByUUID(ctx, uuid)
}

func (r *stbUserRepo) ListStbUsers(ctx context.Context) ([]stbuserro.ListStbUsersRow, error) {
	return r.ro.ListStbUsers(ctx)
}

func (r *stbUserRepo) UpdateStbUser(ctx context.Context, params stbuserrw.UpdateStbUserParams) error {
	return r.rw.UpdateStbUser(ctx, params)
}
