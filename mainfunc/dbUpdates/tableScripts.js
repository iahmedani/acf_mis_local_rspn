var strings = {};

strings.v_geo_active = `SAVEPOINT [sqlite_expert_apply_design_transaction];
DROP VIEW IF EXISTS [main].[v_geo_active];
CREATE VIEW [main].[v_geo_active]
        AS
        SELECT 
               [tblGeoProvince].[id] AS [province_id], 
               [tblGeoProvince].[provinceName] AS [province], 
               [tblGeoDistrict].[id] AS [district_id], 
               [tblGeoDistrict].[districtName] AS [district_name], 
               [tblGeoTehsil].[id] AS [tehsil_id], 
               [tblGeoTehsil].[tehsilName] AS [tehsil_name], 
               [tblGeoUC].[id] AS [uc_id], 
               [tblGeoUC].[ucName] AS [uc_name], 
               [tblGeoNutSite].[siteName] AS [site_name], 
               [tblGeoNutSite].[OTP], 
               [tblGeoNutSite].[SFP], 
               [tblGeoNutSite].[SC], 
               [tblGeoNutSite].[id] AS [site_id]
        FROM   [tblGeoDistrict]
               INNER JOIN [tblGeoProvince] ON [tblGeoDistrict].[province_id] = [tblGeoProvince].[id]
               INNER JOIN [tblGeoTehsil] ON [tblGeoDistrict].[id] = [tblGeoTehsil].[district_id]
               INNER JOIN [tblGeoUC] ON [tblGeoTehsil].[id] = [tblGeoUC].[tehsil_id]
               INNER JOIN [tblGeoNutSite] ON [tblGeoUC].[id] = [tblGeoNutSite].[uc_id]
        WHERE  [tblGeoUC].[isActive] = 1
                 AND [tblGeoTehsil].[isActive] = 1
                 AND [tblGeoNutSite].[isActive] = 1
                 AND [tblGeoDistrict].[isActive] = 1
        UNION ALL
        SELECT 
               [main].[tblGeoDistrict].[province_id], 
               [main].[tblGeoProvince].[provinceName] AS [province], 
               [main].[tblGeoTehsil].[district_id], 
               [main].[tblGeoDistrict].[districtName] AS [district_name], 
               [main].[tblGeoNutSite].[tehsil_id], 
               [main].[tblGeoTehsil].[tehsilName] AS [tehsil_name], 
               '' AS [uc_id], 
               '' AS [uc_name], 
               [main].[tblGeoNutSite].[siteName] AS [site_name], 
               [main].[tblGeoNutSite].[OTP], 
               [main].[tblGeoNutSite].[SFP], 
               [main].[tblGeoNutSite].[SC], 
               [tblGeoNutSite].[id] AS [site_id]
        FROM   [main].[tblGeoDistrict]
               INNER JOIN [main].[tblGeoTehsil] ON [main].[tblGeoDistrict].[id] = [main].[tblGeoTehsil].[district_id]
               INNER JOIN [main].[tblGeoNutSite] ON [main].[tblGeoTehsil].[id] = [main].[tblGeoNutSite].[tehsil_id]
               INNER JOIN [main].[tblGeoProvince] ON [main].[tblGeoProvince].[id] = [main].[tblGeoDistrict].[province_id]
        WHERE  [main].[tblGeoNutSite].[uc_id] IS NULL;
        RELEASE [sqlite_expert_apply_design_transaction];`

strings.tblOtpAdd = `PRAGMA [main].legacy_alter_table = 'on';
PRAGMA [main].foreign_keys = 'off';
SAVEPOINT [sqlite_expert_apply_design_transaction];
ALTER TABLE [main].[tblOtpAdd] RENAME TO [_sqliteexpert_temp_table_1];
CREATE TABLE [main].[tblOtpAdd](
    [otp_id] char(36), 
    [otp_id_old] integer, 
    [client_id] varchar(255), 
    [site_id] integer, 
    [site_village] varchar(255), 
    [reg_date] date, 
    [reg_id] varchar(255), 
    [p_name] varchar(255), 
    [f_or_h_name] varchar(255), 
    [cnic] VARCHAR(255), 
    [address] varchar(255), 
    [cnt_number] varchar(255), 
    [age] integer, 
    [gender] varchar(255), 
    [plw_type] varchar(255), 
    [ent_reason] varchar(255), 
    [ref_type] varchar(255), 
    [oedema] varchar(255), 
    [muac] FLOAT, 
    [diarrhoea] boolean, 
    [vomiting] boolean, 
    [cough] boolean, 
    [appetite] varchar(255), 
    [daily_stool] varchar(255), 
    [pass_urine] boolean, 
    [b_Feeding] boolean, 
    [weight] FLOAT, 
    [height] FLOAT, 
    [ration1] varchar(255), 
    [quantity1] integer, 
    [ration2] varchar(255), 
    [quantity2] integer, 
    [ration3] varchar(255), 
    [quantity3] integer, 
    [prog_type] varchar(255), 
    [created_at] datetime, 
    [updated_at] datetime, 
    [upload_status] INTEGER DEFAULT 0, 
    [username] VARCHAR(50), 
    [org_name] VARCHAR(50), 
    [project_name] VARCHAR(50), 
    [is_deleted] BOOLEAN NOT NULL DEFAULT 0, 
    [other_com_name] VARCHAR(20), 
    [other_com_qty] FLOAT, 
    [nsc_old_otp_id] VARCHAR DEFAULT 0, 
    [ref_type_other] VARCHAR, 
    [entry_reason_other] VARCHAR, 
    [travel_time_minutes] INTEGER NOT NULL DEFAULT 0, 
    [is_mother_alive] VARCHAR(3) NOT NULL DEFAULT Yes, 
    [tehsil_id] INTEGER, 
    [nsc_otp_id] VARCHAR, 
    [upload_date] DATE, 
    [hh_id] VARCHAR(20), 
    [exit_date] DATE, 
    [exit_reason] VARCHAR(50), 
    [total_days] INTEGER, 
    [total_followups] INTEGER, 
    [exit_muac] FLOAT, 
    [exit_weight] FLOAT(8, 2), 
    [province_id] INTEGER, 
    [district_id] VARCHAR, 
    [uc_id] INTEGER, 
    [old_otp_or_nsc_detail] VARCHAR(100), 
    [z_score] FLOAT(8, 2), 
    [ref_by_details] VARCHAR(100));
    INSERT INTO [main].[tblOtpAdd]([rowid], [otp_id], [otp_id_old], [client_id], [site_id], [site_village], [reg_date], [reg_id], [p_name], [f_or_h_name], [cnic], [address], [cnt_number], [age], [gender], [plw_type], [ent_reason], [ref_type], [oedema], [muac], [diarrhoea], [vomiting], [cough], [appetite], [daily_stool], [pass_urine], [b_Feeding], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [created_at], [updated_at], [upload_status], [username], [org_name], [project_name], [is_deleted], [other_com_name], [other_com_qty], [nsc_old_otp_id], [ref_type_other], [entry_reason_other], [travel_time_minutes], [is_mother_alive], [tehsil_id], [nsc_otp_id], [upload_date], [hh_id])
        SELECT [rowid], [otp_id], [otp_id_old], [client_id], [site_id], [site_village], [reg_date], [reg_id], [p_name], [f_or_h_name], [cnic], [address], [cnt_number], [age], [gender], [plw_type], [ent_reason], [ref_type], [oedema], [muac], [diarrhoea], [vomiting], [cough], [appetite], [daily_stool], [pass_urine], [b_Feeding], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [created_at], [updated_at], [upload_status], [username], [org_name], [project_name], [is_deleted], [other_com_name], [other_com_qty], [nsc_old_otp_id], [ref_type_other], [entry_reason_other], [travel_time_minutes], [is_mother_alive], [tehsil_id], [nsc_otp_id], [upload_date], [hh_id]
        FROM [main].[_sqliteexpert_temp_table_1];
    DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];
    RELEASE [sqlite_expert_apply_design_transaction];
    PRAGMA [main].foreign_keys = 'on';
    PRAGMA [main].legacy_alter_table = 'off';`

strings.tblLhw = `PRAGMA [main].legacy_alter_table = 'on';
    PRAGMA [main].foreign_keys = 'off';
 
    SAVEPOINT [sqlite_expert_apply_design_transaction];
    
    ALTER TABLE [main].[tblLhw] RENAME TO [_sqliteexpert_temp_table_1];
    
    CREATE TABLE [main].[tblLhw](
      [site] INT, 
      [uc] INT NOT NULL, 
      [tehsil] INT NOT NULL, 
      [district] INT NOT NULL, 
      [staff_name] VARCHAR(50) NOT NULL, 
      [staff_code] VARCHAR(10) NOT NULL UNIQUE, 
      [province] INT NOT NULL, 
      [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
      [client_id] VARCHAR NOT NULL, 
      [upload_status] INT NOT NULL DEFAULT 0, 
      [created_at] DATE, 
      [upload_date] DATE, 
      [is_deleted] BOOLEAN NOT NULL DEFAULT 0, 
      [org_name] VARCHAR(50), 
      [project_name] VARCHAR(50));
    
    INSERT INTO [main].[tblLhw]([rowid], [site], [uc], [tehsil], [district], [staff_name], [staff_code], [province], [id], [client_id], [upload_status], [created_at], [upload_date], [is_deleted])
    SELECT [rowid], [site], [uc], [tehsil], [district], [staff_name], [staff_code], [province], [id], [client_id], [upload_status], [created_at], [upload_date], [is_deleted]
    FROM [main].[_sqliteexpert_temp_table_1];
    
    DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];
    
    RELEASE [sqlite_expert_apply_design_transaction];
    
    PRAGMA [main].foreign_keys = 'on';
    
    PRAGMA [main].legacy_alter_table = 'off';`

strings.tblSupervisors = `PRAGMA [main].legacy_alter_table = 'on';

    PRAGMA [main].foreign_keys = 'off';
    
    SAVEPOINT [sqlite_expert_apply_design_transaction];
    
    ALTER TABLE [main].[tblSupervisors] RENAME TO [_sqliteexpert_temp_table_1];
    
    CREATE TABLE [main].[tblSupervisors](
      [site] INT, 
      [uc] INT NOT NULL, 
      [tehsil] INT NOT NULL, 
      [district] INT NOT NULL, 
      [sup_name] varchar(50) NOT NULL, 
      [sup_code] VARCHAR(10) NOT NULL UNIQUE, 
      [province] INT NOT NULL, 
      [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
      [client_id] VARCHAR NOT NULL, 
      [upload_status] VARCHAR NOT NULL DEFAULT 0, 
      [created_at] DATE NOT NULL, 
      [upload_date] DATE, 
      [is_deleted] BOOLEAN NOT NULL DEFAULT 0, 
      [org_name] VARCHAR(50), 
      [project_name] VARCHAR(50), 
      UNIQUE([sup_code], [district]) ON CONFLICT ROLLBACK);
    
    INSERT INTO [main].[tblSupervisors]([rowid], [site], [uc], [tehsil], [district], [sup_name], [sup_code], [province], [id], [client_id], [upload_status], [created_at], [upload_date], [is_deleted])
    SELECT [rowid], [site], [uc], [tehsil], [district], [sup_name], [sup_code], [province], [id], [client_id], [upload_status], [created_at], [upload_date], [is_deleted]
    FROM [main].[_sqliteexpert_temp_table_1];
    
    DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];
    
    RELEASE [sqlite_expert_apply_design_transaction];
    
    PRAGMA [main].foreign_keys = 'on';
    
    PRAGMA [main].legacy_alter_table = 'off';  
    `

strings.tblStokDistv2 = `PRAGMA [main].legacy_alter_table = 'on';

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
      [project_name] VARCHAR(50));
    
    INSERT INTO [main].[tblStokDistv2]([rowid], [dist_id_old], [dist_id], [program_type], [item_name], [item_id], [opening], [received], [distributed], [remaining], [district_id], [tehsil_id], [site_id], [CHW_id], [CHS_id], [is_deleted], [upload_status], [created_at], [updated_at], [stockDistId], [damaged], [dist_month], [province_id], [uc_id], [client_id], [upload_date])
    SELECT [rowid], [dist_id_old], [dist_id], [program_type], [item_name], [item_id], [opening], [received], [distributed], [remaining], [district_id], [tehsil_id], [site_id], [CHW_id], [CHS_id], [is_deleted], [upload_status], [created_at], [updated_at], [stockDistId], [damaged], [dist_month], [province_id], [uc_id], [client_id], [upload_date]
    FROM [main].[_sqliteexpert_temp_table_1];
    
    DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];
    
    RELEASE [sqlite_expert_apply_design_transaction];
    
    PRAGMA [main].foreign_keys = 'on';
    
    PRAGMA [main].legacy_alter_table = 'off';`

strings.tblVillages = `PRAGMA [main].legacy_alter_table = 'on';

    PRAGMA [main].foreign_keys = 'off';
    
    SAVEPOINT [sqlite_expert_apply_design_transaction];
    
    ALTER TABLE [main].[tblVillages] RENAME TO [_sqliteexpert_temp_table_1];
    
    CREATE TABLE [main].[tblVillages](
      [site] INT NOT NULL, 
      [uc] INT NOT NULL, 
      [tehsil] INT NOT NULL, 
      [district] INT NOT NULL, 
      [villageName] VARCHAR(50) NOT NULL, 
      [province] INT NOT NULL, 
      [id_old] INTEGER, 
      [id] char(36), 
      [client_id] VARCHAR NOT NULL, 
      [upload_status] INT NOT NULL DEFAULT 0, 
      [created_at] DATE, 
      [upload_date] DATE, 
      [is_deleted] BOOLEAN NOT NULL DEFAULT 0, 
      [org_name] VARCHAR(50), 
      [project_name] VARCHAR(50), 
      UNIQUE([uc], [villageName]) ON CONFLICT ROLLBACK);
    
    INSERT INTO [main].[tblVillages]([rowid], [site], [uc], [tehsil], [district], [villageName], [province], [id_old], [id], [client_id], [upload_status], [created_at], [upload_date], [is_deleted])
    SELECT [rowid], [site], [uc], [tehsil], [district], [villageName], [province], [id_old], [id], [client_id], [upload_status], [created_at], [upload_date], [is_deleted]
    FROM [main].[_sqliteexpert_temp_table_1];
    
    DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];
    
    RELEASE [sqlite_expert_apply_design_transaction];
    
    PRAGMA [main].foreign_keys = 'on';
    
    PRAGMA [main].legacy_alter_table = 'off';`

strings.tblSiteStock = `PRAGMA [main].legacy_alter_table = 'on';

    PRAGMA [main].foreign_keys = 'off';
    
    SAVEPOINT [sqlite_expert_apply_design_transaction];
    
    ALTER TABLE [main].[tblSiteStock] RENAME TO [_sqliteexpert_temp_table_1];
    
    CREATE TABLE [main].[tblSiteStock](
      [stock_out_id_old] integer, 
      [stock_out_id] char(36), 
      [program_type] varchar(10), 
      [item_id] integer, 
      [item_name] VARCHAR(50), 
      [stock_release_date] date NOT NULL, 
      [quantity_released] decimal NOT NULL, 
      [district_id] integer NOT NULL, 
      [tehsil_id] integer NOT NULL, 
      [site_id] integer NOT NULL, 
      [CHW_id] VARCHAR(50), 
      [CHS_id] VARCHAR(50), 
      [is_deleted] INT NOT NULL DEFAULT 0, 
      [upload_status] INT NOT NULL DEFAULT 0, 
      [created_at] datetime, 
      [updated_at] datetime, 
      [stockOutID] VARCHAR, 
      [client_id] VARCHAR, 
      [upload_date] DATE, 
      [uc_id] INT, 
      [province_id] INTEGER, 
      [org_name] VARCHAR(50), 
      [project_name] VARCHAR(50));
    
    INSERT INTO [main].[tblSiteStock]([rowid], [stock_out_id_old], [stock_out_id], [program_type], [item_id], [item_name], [stock_release_date], [quantity_released], [district_id], [tehsil_id], [site_id], [CHW_id], [CHS_id], [is_deleted], [upload_status], [created_at], [updated_at], [stockOutID], [client_id], [upload_date], [uc_id])
    SELECT [rowid], [stock_out_id_old], [stock_out_id], [program_type], [item_id], [item_name], [stock_release_date], [quantity_released], [district_id], [tehsil_id], [site_id], [CHW_id], [CHS_id], [is_deleted], [upload_status], [created_at], [updated_at], [stockOutID], [client_id], [upload_date], [uc_id]
    FROM [main].[_sqliteexpert_temp_table_1];
    
    DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];
    
    RELEASE [sqlite_expert_apply_design_transaction];
    
    PRAGMA [main].foreign_keys = 'on';
    
    PRAGMA [main].legacy_alter_table = 'off';`

strings.tblSessions = `PRAGMA [main].legacy_alter_table = 'on';

    PRAGMA [main].foreign_keys = 'off';
    
    SAVEPOINT [sqlite_expert_apply_design_transaction];
    
    ALTER TABLE [main].[tblSessions] RENAME TO [_sqliteexpert_temp_table_1];
    
    CREATE TABLE [main].[tblSessions](
      [session_id] char(36), 
      [session_id_old] integer, 
      [site_id] integer, 
      [client_id] varchar(255), 
      [session_date] date, 
      [session_type] varchar(255), 
      [male_participants] INTEGER, 
      [female_participants] INTEGER, 
      [session_location] varchar(255), 
      [upload_status] integer, 
      [created_at] datetime, 
      [updated_at] datetime, 
      [old_participants] INTEGER, 
      [new_participants] INTEGER, 
      [username] VARCHAR(50), 
      [org_name] VARCHAR(50), 
      [project_name] VARCHAR(50), 
      [pragnent] INT, 
      [lactating] INT, 
      [is_deleted] INTEGER(1) NOT NULL DEFAULT 0, 
      [remarks] VARCHAR NOT NULL DEFAULT "N/A", 
      [CHS_id] VARCHAR, 
      [CHW_id] VARCHAR, 
      [upload_date] DATE, 
      [prog_type] varchar(10), 
      [total_session] INTEGER DEFAULT 0, 
      [ind_session] INTEGER DEFAULT 0, 
      [grp_sessions] INTEGER DEFAULT 0, 
      [uc_id] INTEGER, 
      [province_id] INTEGER, 
      [district_id] INTEGER, 
      [tehsil_id] INTEGER);
    
    INSERT INTO [main].[tblSessions]([rowid], [session_id], [session_id_old], [site_id], [client_id], [session_date], [session_type], [male_participants], [female_participants], [session_location], [upload_status], [created_at], [updated_at], [old_participants], [new_participants], [username], [org_name], [project_name], [pragnent], [lactating], [is_deleted], [remarks], [CHS_id], [CHW_id], [upload_date], [prog_type], [total_session], [ind_session], [grp_sessions], [uc_id])
    SELECT [rowid], [session_id], [session_id_old], [site_id], [client_id], [session_date], [session_type], [male_participants], [female_participants], [session_location], [upload_status], [created_at], [updated_at], [old_participants], [new_participants], [username], [org_name], [project_name], [pragnent], [lactating], [is_deleted], [remarks], [CHS_id], [CHW_id], [upload_date], [prog_type], [total_session], [ind_session], [grp_sessions], [uc_id]
    FROM [main].[_sqliteexpert_temp_table_1];
    
    DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];
    
    RELEASE [sqlite_expert_apply_design_transaction];
    
    PRAGMA [main].foreign_keys = 'on';
    
    PRAGMA [main].legacy_alter_table = 'off';`

strings.tblScrChildren = `PRAGMA [main].legacy_alter_table = 'on';

    PRAGMA [main].foreign_keys = 'off';
    
    SAVEPOINT [sqlite_expert_apply_design_transaction];
    
    ALTER TABLE [main].[tblScrChildren] RENAME TO [_sqliteexpert_temp_table_1];
    
    CREATE TABLE [main].[tblScrChildren](
      [ch_scr_id_old] INTEGER, 
      [ch_scr_id] char(36), 
      [site_id] INTEGER, 
      [screening_date] DATE, 
      [created_at] DATE, 
      [catchment_population] INTEGER DEFAULT 0, 
      [staff_name] VARCHAR(50), 
      [staff_code] VARCHAR(50), 
      [sup_name] VARCHAR(50), 
      [sup_code] VARCHAR(50), 
      [total_scr_girls] INTEGER, 
      [total_scr_boys] INTEGER, 
      [sam_without_comp_girls_623] INTEGER, 
      [sam_without_comp_boys_623] INTEGER, 
      [sam_with_comp_girls_623] INTEGER, 
      [sam_with_comp_boys_623] INTEGER, 
      [mam_girls_623] INTEGER, 
      [mam_boys_623] INTEGER, 
      [sam_without_comp_girls_2459] INTEGER, 
      [sam_without_comp_boys_2459] INTEGER, 
      [sam_with_comp_girls_2459] INTEGER, 
      [sam_with_comp_boys_2459] INTEGER, 
      [mam_girls_2459] INTEGER, 
      [mam_boys_2459] INTEGER, 
      [reffer_tsfp_girls] INTEGER, 
      [reffer_otp_girls] INTEGER, 
      [reffer_tsfp_boys] INTEGER, 
      [reffer_otp_boys] INTEGER, 
      [normal_boys_623] INTEGER, 
      [normal_girls_623] INTEGER, 
      [normal_boys_2459] INTEGER, 
      [normal_girls_2459] INTEGER, 
      [first_mnp_30_girls] INTEGER, 
      [first_mnp_30_boys] INTEGER, 
      [second_mnp_30_girls] INTEGER, 
      [second_mnp_30_boys] INTEGER, 
      [third_mnp_30_girls] INTEGER, 
      [third_mnp_30_boys] INTEGER, 
      [fourth_mnp_30_girls] INTEGER, 
      [fourth_mnp_30_boys] INTEGER, 
      [fifth_mnp_30_girls] INTEGER, 
      [fifth_mnp_30_boys] INTEGER, 
      [sixth_mnp_30_girls] INTEGER, 
      [sixth_mnp_30_boys] INTEGER, 
      [deworming_girls] INTEGER, 
      [deworming_boys] INTEGER, 
      [new_boys] INTEGER, 
      [new_girls] INTEGER, 
      [reScreened_boys] INTEGER, 
      [reScreened_girls] INTEGER, 
      [no_oedema_girls] INTEGER, 
      [no_oedema_boys] INTEGER, 
      [plus12_oedema_girls] INTEGER, 
      [plus12_oedema_boys] INTEGER, 
      [plus3_oedema_girls] INTEGER, 
      [plus3_oedema_boys] INTEGER, 
      [client_id] CHAR(36), 
      [username] VARCHAR, 
      [project] VARCHAR, 
      [upload_status] INTEGER DEFAULT 0, 
      [approved] INTEGER, 
      [is_deleted] INTEGER(1) NOT NULL DEFAULT 0, 
      [report_month] VARCHAR, 
      [followedup_boys] INTEGER, 
      [followedup_girls] INTEGER, 
      [exits_boys] INTEGER, 
      [exits_girls] INTEGER, 
      [other_specify] VARCHAR, 
      [other_boys] INTEGER, 
      [other_girls] INTEGER, 
      [upload_date] DATE, 
      [site_one] VARCHAR(50), 
      [site_two] VARCHAR(50), 
      [reffer_otp_girls_s1] INTEGER DEFAULT 0, 
      [reffer_otp_girls_s2] INTEGER DEFAULT 0, 
      [reffer_otp_boys_s1] INTEGER DEFAULT 0, 
      [reffer_otp_boys_s2] INTEGER DEFAULT 0, 
      [reffer_tsfp_girls_s1] INTEGER DEFAULT 0, 
      [reffer_tsfp_girls_s2] INTEGER DEFAULT 0, 
      [total_hh] INTEGER DEFAULT 0, 
      [uc_id] INTEGER, 
      [reffer_tsfp_boys_s1] INTEGER DEFAULT 0, 
      [reffer_tsfp_boys_s2] INTEGER DEFAULT 0, 
      [mnp_boys] INTEGER DEFAULT 0, 
      [mnp_girls] INTEGER DEFAULT 0, 
      [total_followup] INTEGER DEFAULT 0, 
      [total_exits] INTEGER DEFAULT 0, 
      [ent_type] VARCHAR(10), 
      [province_id] INTEGER, 
      [district_id] INTEGER, 
      [tehsil_id] INTEGER);
    
    INSERT INTO [main].[tblScrChildren]([rowid], [ch_scr_id_old], [ch_scr_id], [site_id], [screening_date], [created_at], [catchment_population], [staff_name], [staff_code], [sup_name], [sup_code], [total_scr_girls], [total_scr_boys], [sam_without_comp_girls_623], [sam_without_comp_boys_623], [sam_with_comp_girls_623], [sam_with_comp_boys_623], [mam_girls_623], [mam_boys_623], [sam_without_comp_girls_2459], [sam_without_comp_boys_2459], [sam_with_comp_girls_2459], [sam_with_comp_boys_2459], [mam_girls_2459], [mam_boys_2459], [reffer_tsfp_girls], [reffer_otp_girls], [reffer_tsfp_boys], [reffer_otp_boys], [normal_boys_623], [normal_girls_623], [normal_boys_2459], [normal_girls_2459], [first_mnp_30_girls], [first_mnp_30_boys], [second_mnp_30_girls], [second_mnp_30_boys], [third_mnp_30_girls], [third_mnp_30_boys], [fourth_mnp_30_girls], [fourth_mnp_30_boys], [fifth_mnp_30_girls], [fifth_mnp_30_boys], [sixth_mnp_30_girls], [sixth_mnp_30_boys], [deworming_girls], [deworming_boys], [new_boys], [new_girls], [reScreened_boys], [reScreened_girls], [no_oedema_girls], [no_oedema_boys], [plus12_oedema_girls], [plus12_oedema_boys], [plus3_oedema_girls], [plus3_oedema_boys], [client_id], [username], [project], [upload_status], [approved], [is_deleted], [report_month], [followedup_boys], [followedup_girls], [exits_boys], [exits_girls], [other_specify], [other_boys], [other_girls], [upload_date], [site_one], [site_two], [reffer_otp_girls_s1], [reffer_otp_girls_s2], [reffer_otp_boys_s1], [reffer_otp_boys_s2], [reffer_tsfp_girls_s1], [reffer_tsfp_girls_s2], [total_hh], [uc_id], [reffer_tsfp_boys_s1], [reffer_tsfp_boys_s2], [mnp_boys], [mnp_girls], [total_followup], [total_exits])
    SELECT [rowid], [ch_scr_id_old], [ch_scr_id], [site_id], [screening_date], [created_at], [catchment_population], [staff_name], [staff_code], [sup_name], [sup_code], [total_scr_girls], [total_scr_boys], [sam_without_comp_girls_623], [sam_without_comp_boys_623], [sam_with_comp_girls_623], [sam_with_comp_boys_623], [mam_girls_623], [mam_boys_623], [sam_without_comp_girls_2459], [sam_without_comp_boys_2459], [sam_with_comp_girls_2459], [sam_with_comp_boys_2459], [mam_girls_2459], [mam_boys_2459], [reffer_tsfp_girls], [reffer_otp_girls], [reffer_tsfp_boys], [reffer_otp_boys], [normal_boys_623], [normal_girls_623], [normal_boys_2459], [normal_girls_2459], [first_mnp_30_girls], [first_mnp_30_boys], [second_mnp_30_girls], [second_mnp_30_boys], [third_mnp_30_girls], [third_mnp_30_boys], [fourth_mnp_30_girls], [fourth_mnp_30_boys], [fifth_mnp_30_girls], [fifth_mnp_30_boys], [sixth_mnp_30_girls], [sixth_mnp_30_boys], [deworming_girls], [deworming_boys], [new_boys], [new_girls], [reScreened_boys], [reScreened_girls], [no_oedema_girls], [no_oedema_boys], [plus12_oedema_girls], [plus12_oedema_boys], [plus3_oedema_girls], [plus3_oedema_boys], [client_id], [username], [project], [upload_status], [approved], [is_deleted], [report_month], [followedup_boys], [followedup_girls], [exits_boys], [exits_girls], [other_specify], [other_boys], [other_girls], [upload_date], [site_one], [site_two], [reffer_otp_girls_s1], [reffer_otp_girls_s2], [reffer_otp_boys_s1], [reffer_otp_boys_s2], [reffer_tsfp_girls_s1], [reffer_tsfp_girls_s2], [total_hh], [uc_id], [reffer_tsfp_boys_s1], [reffer_tsfp_boys_s2], [mnp_boys], [mnp_girls], [total_followup], [total_exits]
    FROM [main].[_sqliteexpert_temp_table_1];
    
    DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];
    
    RELEASE [sqlite_expert_apply_design_transaction];
    
    PRAGMA [main].foreign_keys = 'on';
    
    PRAGMA [main].legacy_alter_table = 'off';`

strings.tblScrPlw = `PRAGMA [main].legacy_alter_table = 'on';

    PRAGMA [main].foreign_keys = 'off';
    
    SAVEPOINT [sqlite_expert_apply_design_transaction];
    
    ALTER TABLE [main].[tblScrPlw] RENAME TO [_sqliteexpert_temp_table_1];
    
    CREATE TABLE [main].[tblScrPlw](
      [plw_scr_id_old] INTEGER, 
      [plw_scr_id] char(36), 
      [site_id] INTEGER, 
      [screening_date] DATE, 
      [created_at] DATE, 
      [village] VARCHAR(50), 
      [staff_name] VARCHAR(50), 
      [staff_code] VARCHAR(50), 
      [sup_name] VARCHAR(50), 
      [sup_code] VARCHAR(50), 
      [total_scr_pragnent] INTEGER, 
      [total_scr_lactating] INTEGER, 
      [new_scr_pragnent] INTEGER, 
      [new_scr_lactating] INTEGER, 
      [reScreened_scr_pragnent] INTEGER, 
      [reScreened_scr_lactating] INTEGER, 
      [muac_gt_21_pragnent] INTEGER, 
      [muac_gt_21_lactating] INTEGER, 
      [muac_le_21_pragnent] INTEGER, 
      [muac_le_21_lactating] INTEGER, 
      [client_id] varchar(255), 
      [username] VARCHAR, 
      [project] VARCHAR, 
      [upload_status] INTEGER DEFAULT 0, 
      [approved] INTEGER, 
      [is_deleted] INTEGER(1) NOT NULL DEFAULT 0, 
      [report_month] VARCHAR, 
      [ifa_first_time_pragnent] INTEGER NOT NULL DEFAULT 0, 
      [ifa_first_time_lactating] INTEGER NOT NULL DEFAULT 0, 
      [followup_pragnent] INTEGER NOT NULL DEFAULT 0, 
      [followup_lactating] INTEGER NOT NULL DEFAULT 0, 
      [exits_pragnent] INTEGER NOT NULL DEFAULT 0, 
      [exit_lactating] INTEGER NOT NULL DEFAULT 0, 
      [upload_date] DATE, 
      [uc_id] INTEGER, 
      [catchment_population] INTEGER, 
      [total_hh], 
      [total_followup] INTEGER DEFAULT 0, 
      [total_exits] INTEGER DEFAULT 0, 
      [ent_type] VARCHAR(10), 
      [province_id] INTEGER, 
      [district_id] INTEGER, 
      [tehsil_id] INTEGER);
    
    INSERT INTO [main].[tblScrPlw]([rowid], [plw_scr_id_old], [plw_scr_id], [site_id], [screening_date], [created_at], [village], [staff_name], [staff_code], [sup_name], [sup_code], [total_scr_pragnent], [total_scr_lactating], [new_scr_pragnent], [new_scr_lactating], [reScreened_scr_pragnent], [reScreened_scr_lactating], [muac_gt_21_pragnent], [muac_gt_21_lactating], [muac_le_21_pragnent], [muac_le_21_lactating], [client_id], [username], [project], [upload_status], [approved], [is_deleted], [report_month], [ifa_first_time_pragnent], [ifa_first_time_lactating], [followup_pragnent], [followup_lactating], [exits_pragnent], [exit_lactating], [upload_date], [uc_id], [catchment_population], [total_hh], [total_followup], [total_exits])
    SELECT [rowid], [plw_scr_id_old], [plw_scr_id], [site_id], [screening_date], [created_at], [village], [staff_name], [staff_code], [sup_name], [sup_code], [total_scr_pragnent], [total_scr_lactating], [new_scr_pragnent], [new_scr_lactating], [reScreened_scr_pragnent], [reScreened_scr_lactating], [muac_gt_21_pragnent], [muac_gt_21_lactating], [muac_le_21_pragnent], [muac_le_21_lactating], [client_id], [username], [project], [upload_status], [approved], [is_deleted], [report_month], [ifa_first_time_pragnent], [ifa_first_time_lactating], [followup_pragnent], [followup_lactating], [exits_pragnent], [exit_lactating], [upload_date], [uc_id], [catchment_population], [total_hh], [total_followup], [total_exits]
    FROM [main].[_sqliteexpert_temp_table_1];
    
    DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];
    
    RELEASE [sqlite_expert_apply_design_transaction];
    
    PRAGMA [main].foreign_keys = 'on';
    
    PRAGMA [main].legacy_alter_table = 'off';
    
    `

strings.oneTable = `CREATE VIEW "oneTable" AS SELECT
tblOtpAdd.*, 
tblOtpExit.exit_muac, 
tblOtpExit.exit_weight, 
tblOtpExit.exit_height, 
tblOtpExit.exit_reason,
tblOtpExit.exit_date
FROM
tblOtpAdd
LEFT JOIN
tblOtpExit
ON 
       tblOtpAdd.otp_id = tblOtpExit.otp_id
WHERE
tblOtpAdd.is_deleted = 0 AND
(tblOtpExit.is_deleted = 0 OR
tblOtpExit.is_deleted is null);`

strings.oneTableGeo = `CREATE VIEW oneTableGeo as
SELECT
	*
FROM
	oneTable
	INNER JOIN
	v_geo_active
	ON 
		oneTable.site_id = v_geo_active.site_id;`

strings.v_OtpAddmision3 = `CREATE VIEW [v_OtpAddmision3]
AS
SELECT 
       [main].[v_geo_active].[province_id], 
       [main].[v_geo_active].[province], 
       [main].[v_geo_active].[district_id], 
       [main].[v_geo_active].[district_name], 
       [main].[v_geo_active].[tehsil_id], 
       [main].[v_geo_active].[tehsil_name], 
       [main].[v_geo_active].[uc_id], 
       [main].[v_geo_active].[uc_name], 
       [main].[v_geo_active].[site_name], 
       [tblOtpAdd].*
FROM   [main].[v_geo_active]
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo_active].[site_id] = [main].[tblOtpAdd].[site_id]
WHERE  [main].[tblOtpAdd].[is_deleted] = 0
UNION ALL
SELECT 
       [main].[v_geo_active].[province_id], 
       [main].[v_geo_active].[province], 
       [main].[v_geo_active].[district_id], 
       [main].[v_geo_active].[district_name], 
       [main].[v_geo_active].[tehsil_id], 
       [main].[v_geo_active].[tehsil_name], 
       [main].[v_geo_active].[uc_id], 
       [main].[v_geo_active].[uc_name], 
       [main].[v_geo_active].[site_name], 
       [tblOtpAdd].*
FROM   [main].[v_geo_active]
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo_active].[tehsil_id] = [main].[tblOtpAdd].[tehsil_id]
WHERE  [main].[tblOtpAdd].[is_deleted] = 0
         AND [main].[v_geo_active].[SC] = 1
         AND ([main].[tblOtpAdd].[site_id] IS NULL
         OR [main].[tblOtpAdd].[site_id] = 'null')`

strings.v_otpExit_full = `SAVEPOINT [sqlite_expert_apply_design_transaction];

DROP VIEW IF EXISTS [main].[v_otpExit_full];

CREATE VIEW [main].[v_otpExit_full]
AS
SELECT 
       [main].[v_geo].[province_id], 
       [main].[v_geo].[province], 
       [main].[v_geo].[district_id], 
       [main].[v_geo].[district_name], 
       [main].[v_geo].[tehsil_id], 
       [main].[v_geo].[tehsil_name], 
       [main].[v_geo].[uc_id], 
       [main].[v_geo].[uc_name], 
       [main].[v_geo].[site_name], 
       [main].[v_geo].[site_id], 
       [main].[tblOtpAdd].[site_village], 
       [main].[tblOtpExit].[exit_date], 
       [main].[tblOtpExit].[exit_reason], 
       [main].[tblOtpExit].[exit_muac], 
       [main].[tblOtpExit].[exit_weight], 
       [main].[tblOtpExit].[is_deleted],
       [main].[tblOtpExit].[days_in_program], 
       [main].[tblOtpAdd].[p_name], 
       [main].[tblOtpAdd].[f_or_h_name], 
       [main].[tblOtpAdd].[gender], 
       [main].[tblOtpAdd].[reg_id], 
       [main].[tblOtpAdd].[reg_date], 
       [main].[tblOtpAdd].[plw_type]
FROM   [main].[v_geo]
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
       INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
WHERE  [main].[tblOtpExit].[is_deleted] = 0
         AND [main].[tblOtpAdd].[is_deleted] = 0;

RELEASE [sqlite_expert_apply_design_transaction];

`