SET client_min_messages TO WARNING;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

/**
	TODO:
		Create client_group
		Bill at either matter level or client level. Selected at matter creation time.

 **/

/**
 *
 *  Extensions, Functions, and Storted Procedures
 *
 **/
--
-- Function to automate updated of `date_modified` columns so that the appilcation is not responsible for managing that value.
--
CREATE OR REPLACE FUNCTION set_date_modified_column()
RETURNS TRIGGER AS
$$
	BEGIN
		NEW.date_modified = NOW();
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION update_dt_modified_column(tablename REGCLASS)
RETURNS VOID AS
$$
	BEGIN
		EXECUTE FORMAT('CREATE TRIGGER set_date_modified_column BEFORE UPDATE ON %s FOR EACH ROW WHEN (OLD IS DISTINCT FROM NEW) EXECUTE FUNCTION set_date_modified_column();', CONCAT('"', tablename, '"'));
	END;
$$
LANGUAGE 'plpgsql';

/**
 *
 *  Table Definitions
 *
 **/


DROP TABLE IF EXISTS struct_type CASCADE;
CREATE TABLE struct_type (
      struct_type_id                    									SMALLINT                						NOT NULL GENERATED ALWAYS AS IDENTITY
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , display_order                     									SMALLINT                						NOT NULL DEFAULT 1000
    , group_name                        									TEXT                    						NOT NULL
    , att_pub_ident                     									TEXT                    						NOT NULL
    , att_value                         									TEXT                    						NOT NULL
    , PRIMARY KEY (struct_type_id)
)
;
CREATE UNIQUE INDEX idx_struct_type_att_pub_ident               			ON struct_type                        			USING btree (group_name, att_pub_ident);
SELECT update_dt_modified_column('struct_type');


DROP TABLE IF EXISTS stb_customer CASCADE;
CREATE TABLE stb_customer (
      stb_customer_id                   									SMALLINT                						NOT NULL GENERATED ALWAYS AS IDENTITY
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
	, stb_customer_uuid														UUID											NOT NULL										/** External Identifier */
    , has_status                   											SMALLINT                						NOT NULL
	, PRIMARY KEY (stb_customer_id)
	, CONSTRAINT fk_stb_customer_has_status                    				FOREIGN KEY (has_status)						REFERENCES struct_type (struct_type_id)			/** Group: Base Status */
)
;
SELECT update_dt_modified_column('stb_customer');


DROP TABLE IF EXISTS stb_user CASCADE;
CREATE TABLE stb_user (
      stb_user_id                   										INTEGER                 						NOT NULL GENERATED ALWAYS AS IDENTITY
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
	, stb_user_uuid															UUID											NOT NULL										/** External Identifier */
    , stb_customer_id                   									SMALLINT                						NOT NULL
    , has_status                   											SMALLINT                						NOT NULL
    , has_auth_method              											SMALLINT                						NOT NULL
	, first_name															TEXT											NOT NULL
	, middle_name															TEXT											NOT NULL
	, last_name																TEXT											NOT NULL
	, initials 																TEXT											NOT NULL
	, PRIMARY KEY (stb_user_id)
	, CONSTRAINT fk_stb_user_stb_customer_id               					FOREIGN KEY (stb_customer_id)					REFERENCES stb_customer	(stb_customer_id)
	, CONSTRAINT fk_stb_user_has_status                    					FOREIGN KEY (has_status)						REFERENCES struct_type	(struct_type_id)		/** Group: Base Status */
	, CONSTRAINT fk_stb_user_has_auth_method               					FOREIGN KEY (has_auth_method)					REFERENCES struct_type	(struct_type_id)		
)
;
CREATE INDEX		idx_stb_user_stb_customer_id     						ON stb_user                        			USING btree (stb_customer_id);
SELECT update_dt_modified_column('stb_user');


DROP TABLE IF EXISTS stb_customer_work CASCADE;
CREATE TABLE stb_customer_work (
      stb_customer_work_id                     								INTEGER                							NOT NULL GENERATED ALWAYS AS IDENTITY
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
	, stb_customer_work_uuid												UUID											NOT NULL										/** External Identifier */
	, stb_customer_id                                               		SMALLINT                                        NOT NULL
    , display_order                     									SMALLINT                						NOT NULL DEFAULT 1000
    , work_description                  									TEXT                    						NOT NULL
    , rate                              									DECIMAL(6,2)            						NOT NULL
    , PRIMARY KEY (stb_customer_work_id)
	, CONSTRAINT fk_stb_customer_work_stb_customer_id      					FOREIGN KEY (stb_customer_id)					REFERENCES stb_customer	(stb_customer_id)
)
;
CREATE INDEX		idx_stb_customer_work_stb_customer_id 					ON stb_customer_work               						USING btree (stb_customer_id);
SELECT update_dt_modified_column('stb_customer_work');


DROP TABLE IF EXISTS stb_customer_work_stb_user_rate CASCADE;
CREATE TABLE stb_customer_work_stb_user_rate (
      stb_customer_work_id                 									INTEGER                							NOT NULL
    , stb_user_id                   										INTEGER                 						NOT NULL
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
	, user_work_rate_uuid													UUID											NOT NULL										/** External Identifier */
    , display_order                     									SMALLINT                						NOT NULL DEFAULT 1000
    , work_description                  									TEXT                    						NOT NULL
    , rate                              									DECIMAL(6,2)            						NOT NULL
    , PRIMARY KEY (stb_customer_work_id, stb_user_id)
	, CONSTRAINT fk_stb_customer_work_stb_user_rate_stb_customer_work_id	FOREIGN KEY (stb_customer_work_id)				REFERENCES stb_customer_work	(stb_customer_work_id)
	, CONSTRAINT fk_stb_customer_work_stb_user_rate_stb_user_id     		FOREIGN KEY (stb_user_id)						REFERENCES stb_user				(stb_user_id)
)
;
CREATE INDEX		idx_stb_user_work_rate_stb_user_id 						ON stb_customer_work_stb_user_rate				USING btree (stb_user_id);
SELECT update_dt_modified_column('stb_customer_work_stb_user_rate');


DROP TABLE IF EXISTS stb_customer_user CASCADE;
CREATE TABLE stb_customer_user (
      stb_customer_id                   									SMALLINT                						NOT NULL
    , stb_user_id                   										INTEGER                 						NOT NULL
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , has_status                   											SMALLINT                						NOT NULL								/** This may not be needed. */
	, PRIMARY KEY (stb_customer_id, stb_user_id)
	, CONSTRAINT fk_stb_customer_user_stb_customer_id               		FOREIGN KEY (stb_customer_id)					REFERENCES stb_customer		(stb_customer_id)
	, CONSTRAINT fk_stb_user_user_stb_user_id               				FOREIGN KEY (stb_user_id)						REFERENCES stb_user			(stb_user_id)
	, CONSTRAINT fk_stb_customer_user_has_status                    		FOREIGN KEY (has_status)						REFERENCES struct_type		(struct_type_id)
)
;
SELECT update_dt_modified_column('stb_customer_user');
CREATE INDEX		idx_stb_customer_user_stb_user_id 						ON stb_customer_user									USING btree (stb_user_id);


DROP TABLE IF EXISTS client CASCADE;
CREATE TABLE client (
      client_id                   											INTEGER                 						NOT NULL GENERATED ALWAYS AS IDENTITY
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
	, client_uuid															UUID											NOT NULL										/** External Identifier */
    , stb_customer_id                   									SMALLINT                						NOT NULL
    , has_status                   											SMALLINT                						NOT NULL
	, PRIMARY KEY (client_id)
	, CONSTRAINT fk_client_stb_customer_id                   				FOREIGN KEY (stb_customer_id)      				REFERENCES stb_customer		(stb_customer_id)
	, CONSTRAINT fk_client_has_status                    					FOREIGN KEY (has_status)						REFERENCES struct_type		(struct_type_id)
)
;
SELECT update_dt_modified_column('client');


DROP TABLE IF EXISTS matter CASCADE;
CREATE TABLE matter (
      matter_id                   											INTEGER                 						NOT NULL GENERATED ALWAYS AS IDENTITY
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , client_id                         									INTEGER                 						NOT NULL
    , has_status                   											SMALLINT                						NOT NULL
-- matter-type: litigation, non-lit, family law, damages, tax, tax(others), financial report, estate and gift, merge and accquistion 
	, PRIMARY KEY (matter_id)
	, CONSTRAINT fk_matter_client_id                                		FOREIGN KEY (client_id)      					REFERENCES client 			(client_id)
	, CONSTRAINT fk_matter_has_status                    					FOREIGN KEY (has_status)						REFERENCES struct_type 		(struct_type_id)
)
;
SELECT update_dt_modified_column('matter');


DROP TABLE IF EXISTS tracking_entity CASCADE;
CREATE TABLE tracking_entity (
      tracking_entity_id                   									INTEGER                 						NOT NULL GENERATED ALWAYS AS IDENTITY
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , matter_id                   											SMALLINT                						NOT NULL
	, PRIMARY KEY (tracking_entity_id)
	, CONSTRAINT fk_tracking_entity_matter_id                       		FOREIGN KEY (matter_id)      					REFERENCES matter			(matter_id)
)
;
SELECT update_dt_modified_column('tracking_entity');


DROP TABLE IF EXISTS time_entry CASCADE;
CREATE TABLE time_entry (
      time_entry_id                   										INTEGER                 						NOT NULL GENERATED ALWAYS AS IDENTITY
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , matter_id                   											SMALLINT                						NOT NULL
-- work-type: phone, email, map and source, research, analysis, writing, document management,
    , tracking_entity_id                   									INTEGER                 						NOT NULL
	, is_gratias   															BOOLEAN											NOT NULL											/** UI, default to False.		*/
	, time_spent   															DECIMAL(5,3)									NOT NULL											/** Value in minutes.    		*/
    , has_status                   											SMALLINT                						NOT NULL
	, invoice_comment														TEXT											NOT NULL											/** Should never be blank.		*/
	, internal_note															TEXT											NOT NULL											/** Defult to '' for empty.		*/
	, PRIMARY KEY (time_entry_id)
	, CONSTRAINT fk_time_entry_matter_id                       				FOREIGN KEY (matter_id)      					REFERENCES matter (matter_id)
	, CONSTRAINT fk_time_entry_tracking_entity_id            				FOREIGN KEY (tracking_entity_id)				REFERENCES tracking_entity (tracking_entity_id)
	, CONSTRAINT fk_time_entry_has_status                    				FOREIGN KEY (has_status)						REFERENCES struct_type (struct_type_id)
)
;
CREATE INDEX idx_time_entry_matter_id                    					ON time_entry                       				USING btree (matter_id);
SELECT update_dt_modified_column('time_entry');
COMMENT ON COLUMN time_entry.time_spent IS 'Value in minutes, round up to bill-increment.';


DROP TABLE IF EXISTS additional_charge CASCADE;
CREATE TABLE additional_charge (
      additional_charge_id                   								INTEGER                 						NOT NULL GENERATED ALWAYS AS IDENTITY
    , dt_created                      										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , dt_modified                     										TIMESTAMPTZ             						NOT NULL DEFAULT CURRENT_TIMESTAMP
    , matter_id                   											SMALLINT                						NOT NULL
-- work-type: phone, email, map and source, research, analysis, writing, document management,
    , tracking_entity_id                   									INTEGER                 						NOT NULL
	, is_gratias   															BOOLEAN											NOT NULL											/** UI, default to False.		*/
	, time_spent   															DECIMAL(5,3)									NOT NULL											/** Value in minutes.    		*/
    , has_status                   											SMALLINT                						NOT NULL
	, invoice_comment														TEXT											NOT NULL											/** Should never be blank.		*/
	, internal_note															TEXT											NOT NULL											/** Defult to '' for empty.		*/
	, PRIMARY KEY (additional_charge_id)
	, CONSTRAINT fk_additional_charge_matter_id                       		FOREIGN KEY (matter_id)      					REFERENCES matter (matter_id)
	, CONSTRAINT fk_additional_charge_tracking_entity_id            		FOREIGN KEY (tracking_entity_id)				REFERENCES tracking_entity (tracking_entity_id)
	, CONSTRAINT fk_additional_charge_has_status                    		FOREIGN KEY (has_status)						REFERENCES struct_type (struct_type_id)
)
;
CREATE INDEX idx_additional_charge_matter_id                    			ON additional_charge                       				USING btree (matter_id);
SELECT update_dt_modified_column('additional_charge');

