PRAGMA [main].legacy_alter_table = 'on';

PRAGMA [main].foreign_keys = 'off';

SAVEPOINT [sqlite_expert_apply_design_transaction];

ALTER TABLE [main].[tblStokDistv2] RENAME TO [_sqliteexpert_temp_table_1];

CREATE TABLE [main].[tblStokDistv2](
  [dist_id_old] integer, 
  [dist_id] char(36), 
  [program_type] varchar(10), 
  [item_name] varchar(50) NOT NULL, 
  [item_id] integer NOT NULL, 
  [opening] decimal NOT NULL, 
  [received] decimal NOT NULL, 
  [distributed] decimal NOT NULL, 
  [retun_or_damage] DECIMAL DEFAULT 0, 
  [remaining] decimal NOT NULL, 
  [district_id] integer NOT NULL, 
  [tehsil_id] integer NOT NULL, 
  [site_id] integer NOT NULL, 
  [CHW_id] integer NOT NULL DEFAULT 0, 
  [CHS_id] integer NOT NULL DEFAULT 0, 
  [is_deleted] INT NOT NULL DEFAULT 0, 
  [upload_status] INT NOT NULL DEFAULT 0, 
  [created_at] DATETIME, 
  [updated_at] DATETIME, 
  [stockDistId] VARCHAR, 
  [damaged] DECIMAL NOT NULL DEFAULT 0, 
  [dist_month] VARCHAR, 
  [province_id] INTEGER, 
  [uc_id] INTEGER, 
  [client_id] VARCHAR, 
  [upload_date] DATE, 
  [org_name] VARCHAR(50), 
  [project_name] VARCHAR(50), 
  [return_or_damage_details] VARCHAR(250));

INSERT INTO [main].[tblStokDistv2]([rowid], [dist_id_old], [dist_id], [program_type], [item_name], [item_id], [opening], [received], [distributed], [remaining], [district_id], [tehsil_id], [site_id], [CHW_id], [CHS_id], [is_deleted], [upload_status], [created_at], [updated_at], [stockDistId], [damaged], [dist_month], [province_id], [uc_id], [client_id], [upload_date], [org_name], [project_name])
SELECT [rowid], [dist_id_old], [dist_id], [program_type], [item_name], [item_id], [opening], [received], [distributed], [remaining], [district_id], [tehsil_id], [site_id], [CHW_id], [CHS_id], [is_deleted], [upload_status], [created_at], [updated_at], [stockDistId], [damaged], [dist_month], [province_id], [uc_id], [client_id], [upload_date], [org_name], [project_name]
FROM [main].[_sqliteexpert_temp_table_1];

DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];

RELEASE [sqlite_expert_apply_design_transaction];

PRAGMA [main].foreign_keys = 'on';

PRAGMA [main].legacy_alter_table = 'off';