SET client_min_messages TO WARNING;

\c steaby

SET search_path TO base;

INSERT INTO struct_type (struct_type_id, dt_created, dt_modified, display_order, group_name, att_pub_ident, att_value)
OVERRIDING SYSTEM VALUE
VALUES
-- Base Status - Used for: Customer, User
          (101, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 10, 'Base Status', '10', 'Active')
        , (102, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 20, 'Base Status', '20', 'Pending')
        , (103, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 30, 'Base Status', '30', 'Suspended')
        , (104, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 40, 'Base Status', '40', 'Deleted')
-- Time Entry 
        , (121, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 10, 'Time Entry Status', '10', 'Active')
        , (122, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 20, 'Time Entry Status', '20', 'To Be Invoiced')
        , (123, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 30, 'Time Entry Status', '30', 'Archived')
        , (124, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 40, 'Time Entry Status', '40', 'Deleted')
-- Matter
        , (131, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 10, 'Matter', '10', 'Litigation')
        , (132, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 20, 'Matter', '20', 'Non-Litigation')
        , (133, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 30, 'Matter', '30', 'Family Law')
        , (134, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 40, 'Matter', '40', 'Damages')
        , (135, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 50, 'Matter', '50', 'Tax')
        , (136, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 60, 'Matter', '60', 'Tax (other)')
        , (137, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 70, 'Matter', '70', 'Financial Reporting')
        , (138, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 80, 'Matter', '80', 'Estate & Gift')
        , (139, '2025-01-01 00:00:00', '2025-01-01 00:00:00', 90, 'Matter', '90', 'Merger & Accquitstion')
;


-- INSERT INTO trackig_entity (tracking_entity_id, dt_created, dt_modified, matter_id, att_pub_ident, att_value)
