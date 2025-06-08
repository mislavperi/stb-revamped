-- name: GetTimeEntries :many
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
;

