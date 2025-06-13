package strctype

import (
	"context"
	sqldb "stb/app/server/internal/db/sql"
	sqlro "stb/app/server/internal/struct_type/sql_ro"
)

type structTypeRepoRepo struct {
	roQueries *sqlro.Queries
}

// These are good candidates for in mem caching

func (r *structTypeRepoRepo) GetByAttPubIdent(attPubIdent *string) (*sqlro.GetStructTypeByAttPubIdentRow, error) {
	structType, err := r.roQueries.GetStructTypeByAttPubIdent(context.Background(), *attPubIdent)
	if err != nil {
		return nil, err
	}
	return &structType, nil
}

func (r *structTypeRepoRepo) GetById(id *int16) (*sqlro.GetStructTypeByIDRow, error) {
	structType, err := r.roQueries.GetStructTypeByID(context.Background(), *id)
	if err != nil {
		return nil, err
	}
	return &structType, nil
}

func (r *structTypeRepoRepo) GetByAttValue(attValue *string) (*sqlro.GetStructTypeByAttValueRow, error) {
	structType, err := r.roQueries.GetStructTypeByAttValue(context.Background(), *attValue)
	if err != nil {
		return nil, err
	}
	return &structType, nil
}

func newStructTypeRepo() *structTypeRepoRepo {
	return &structTypeRepoRepo{
		roQueries: sqlro.New(sqldb.RoHandle.Pool),
	}
}

var StructTypeRepo = newStructTypeRepo()
