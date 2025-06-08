package stb_user

import (
    "context"

    "github.com/google/uuid"
    stbuserro "stb/app/server/internal/stb_user/sql_ro"
    stbuserrw "stb/app/server/internal/stb_user/sql_rw"
)

type Repository struct {
    ro *stbuserro.Queries
    rw *stbuserrw.Queries
}

func NewRepository(ro *stbuserro.Queries, rw *stbuserrw.Queries) *Repository {
    return &Repository{
        ro: ro,
        rw: rw,
    }
}

func (r *Repository) CreateStbUser(ctx context.Context, params stbuserrw.CreateStbUserParams) error {
    return r.rw.CreateStbUser(ctx, params)
}

func (r *Repository) GetStbUserByUUID(ctx context.Context, uuid uuid.UUID) (stbuserro.GetStbUserByUUIDRow, error) {
    return r.ro.GetStbUserByUUID(ctx, uuid)
}

func (r *Repository) ListStbUsers(ctx context.Context) ([]stbuserro.ListStbUsersByCustomerRow, error) {
    return r.ro.ListStbUsers(ctx)
}

func (r *Repository) UpdateStbUser(ctx context.Context, params stbuserrw.UpdateStbUserParams) error {
    return r.rw.UpdateStbUser(ctx, params)
}
