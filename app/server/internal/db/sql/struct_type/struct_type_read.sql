-- name: GetStructTypeByID :one
SELECT 
      struct_type_id
    , att_pub_ident
    , att_value
    , display_order
    , group_name
FROM 
	struct_type
WHERE 
	struct_type_id = @struct_type_id
;

-- name: GetStructTypeByAttPubIdent :one
SELECT 
      struct_type_id
    , att_pub_ident
    , att_value
    , display_order
    , group_name
FROM 
	struct_type
WHERE 
    att_pub_ident = @att_pub_ident
;

-- name: GetStructTypeByAttValue :one
	SELECT 
      struct_type_id
    , att_pub_ident
    , att_value
    , display_order
    , group_name
FROM 
	struct_type
WHERE 
    att_value = @att_value
;