-- name: GetStbUserByID :one
SELECT
    stb_user_id,
    stb_user_uuid,
    stb_customer_id,
    has_status,
    has_auth_method,
    first_name,
    middle_name,
    last_name,
    initials,
    dt_created,
    dt_modified
FROM
    stb_user
WHERE
    stb_user_id = @stb_user_id;

-- name: GetStbUserByUUID :one
SELECT
    stb_user_id,
    stb_user_uuid,
    stb_customer_id,
    has_status,
    has_auth_method,
    first_name,
    middle_name,
    last_name,
    initials,
    dt_created,
    dt_modified
FROM
    stb_user
WHERE
    stb_user_uuid = @stb_user_uuid;

-- name: ListStbUsersByCustomer :many
SELECT
    stb_user_id,
    stb_user_uuid,
    stb_customer_id,
    has_status,
    has_auth_method,
    first_name,
    middle_name,
    last_name,
    initials,
    dt_created,
    dt_modified
FROM
    stb_user
WHERE
    stb_customer_id = @stb_customer_id;

-- name: ListStbUsers :many
SELECT
    stb_user_id,
    stb_user_uuid,
    stb_customer_id,
    has_status,
    has_auth_method,
    first_name,
    middle_name,
    last_name,
    initials,
    dt_created,
    dt_modified
FROM
    stb_user;