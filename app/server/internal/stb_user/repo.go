package stb_user

import (
	"context"

	"github.com/google/uuid"
	stbuserro "stb/app/server/internal/stb_user/sql_ro"
	stbuserrw "stb/app/server/internal/stb_user/sql_rw"

	sqldb "stb/app/server/internal/db/sql"
)

type stbUserRepo struct {
	ro  *stbuserro.Queries
	rw  *stbuserrw.Queries
	ctx context.Context
}

func NewstbUserRepo(ro *stbuserro.Queries, rw *stbuserrw.Queries) *stbUserRepo {
	return &stbUserRepo{
		ro: ro,
		rw: rw,
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

var StbUserRepo = &stbUserRepo{
	ro:  stbuserro.New(sqldb.RoHandle.Pool),
	rw:  stbuserrw.New(sqldb.RwHandle.Pool),
	ctx: context.Background(),
}
