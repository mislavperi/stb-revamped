-- name: CreateStbUser :one
INSERT INTO stb_user (
    stb_user_uuid,
    stb_customer_id,
    has_status,
    has_auth_method,
    first_name,
    middle_name,
    last_name,
    initials
) VALUES (
    @stb_user_uuid,
    @stb_customer_id,
    @has_status,
    @has_auth_method,
    @first_name,
    @middle_name,
    @last_name,
    @initials
)
RETURNING stb_user_id;

-- name: UpdateStbUser :exec
UPDATE stb_user
SET
    stb_user_uuid = COALESCE(sqlc.narg('stb_user_uuid'), stb_user_uuid),
    stb_customer_id = COALESCE(sqlc.narg('stb_customer_id'), stb_customer_id),
    has_status = COALESCE(sqlc.narg('has_status'), has_status),
    has_auth_method = COALESCE(sqlc.narg('has_auth_method'), has_auth_method),
    first_name = COALESCE(sqlc.narg('first_name'), first_name),
    middle_name = COALESCE(sqlc.narg('middle_name'), middle_name),
    last_name = COALESCE(sqlc.narg('last_name'), last_name),
    initials = COALESCE(sqlc.narg('initials'), initials)
WHERE
    stb_user_id = @stb_user_id;
