// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.29.0
// source: time_entry_read.sql

package timeentryro

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

const getTimeEntries = `-- name: GetTimeEntries :many
SELECT 
    te.dt_modified
  , te.matter_id
  , te.tracking_entity_id
  , te.is_gratias
  , te.time_spent
  , te.has_status
  , te.invoice_comment
  , te.internal_note
FROM 
  time_entry                                      AS te
`

type GetTimeEntriesRow struct {
	DtModified       time.Time      `json:"dtModified"`
	MatterID         int16          `json:"matterId"`
	TrackingEntityID int32          `json:"trackingEntityId"`
	IsGratias        bool           `json:"isGratias"`
	TimeSpent        pgtype.Numeric `json:"timeSpent"`
	HasStatus        int16          `json:"hasStatus"`
	InvoiceComment   string         `json:"invoiceComment"`
	InternalNote     string         `json:"internalNote"`
}

func (q *Queries) GetTimeEntries(ctx context.Context) ([]GetTimeEntriesRow, error) {
	rows, err := q.db.Query(ctx, getTimeEntries)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetTimeEntriesRow
	for rows.Next() {
		var i GetTimeEntriesRow
		if err := rows.Scan(
			&i.DtModified,
			&i.MatterID,
			&i.TrackingEntityID,
			&i.IsGratias,
			&i.TimeSpent,
			&i.HasStatus,
			&i.InvoiceComment,
			&i.InternalNote,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
