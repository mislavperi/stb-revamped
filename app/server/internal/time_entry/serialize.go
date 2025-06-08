package timeentry

import (
	"math/big"
	"stb/app/server/internal/server"
	sqlrw "stb/app/server/internal/time_entry/sql_rw"

	"github.com/jackc/pgx/v5/pgtype"
)

func deserializeCreatePayload(req *server.CreateTimeEntryRequestBody, memberSident string) sqlrw.CreateTimeEntryParams {
	timeEntry := sqlrw.CreateTimeEntryParams{
		MatterID:         req.MatterId,
		TrackingEntityID: req.TrackingEntityId,
		IsGratias:        req.IsGratias,
		TimeSpent:        pgtype.Numeric{Int: big.NewInt(int64(req.TimeSpent)), Valid: true},
		HasStatus:        req.HasStatus,
		InvoiceComment:   req.InvoiceComment.Value,
		InternalNote:     req.InternalNote.Value,
	}
	return timeEntry
}
