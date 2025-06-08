-- name: CreateTimeEntry :one
INSERT INTO time_entry (matter_id, tracking_entity_id, is_gratias, time_spent, has_status, invoice_comment, internal_note)
VALUES
  (
    @matter_id
  , @tracking_entity_id
  , @is_gratias
  , @time_spent
  , @has_status
  , @invoice_comment
  , @internal_note
  )
RETURNING time_entry_id;
;


-- name: UpdateTimeEntry :exec
UPDATE 
  time_entry 
SET 
    matter_id = coalesce(sqlc.narg('matter_id'), matter_id)
  , tracking_entity_id = coalesce(sqlc.narg('tracking_entity_id'), tracking_entity_id)
  , time_spent = coalesce(sqlc.narg('time_spent'), time_spent)
  , is_gratias = coalesce(sqlc.narg('is_gratias'), is_gratias)
  , has_status = coalesce(sqlc.narg('has_status'), has_status)
  , invoice_comment = coalesce(sqlc.narg('invoice_comment'), invoice_comment)
  , internal_note = coalesce(sqlc.narg('internal_note'), internal_note)
WHERE 
  time_entry_id = @time_entry_id
;
