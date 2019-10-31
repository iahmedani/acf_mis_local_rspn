exports.up = function (knex, Promise) {
  return knex.schema
    .raw(
      `CREATE TABLE [Screening](
    [screening_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
    [client_id] integer, 
    [screening_type] integer, 
    [screening_date] integer, 
    [data_entry_date] integer, 
    [site_id] integer, 
    [site_village] integer, 
    [staff_name] integer, 
    [name] integer, 
    [f_or_h_name] integer, 
    [address] integer, 
    [age] integer, 
    [gender] integer, 
    [muac] integer, 
    [oedema] integer, 
    [no_mm_sch] integer, 
    [deworming] integer, 
    [status] integer, 
    [is_plw] integer, 
    [plw_type] integer, 
    [no_mm_tabs] integer, 
    [upload_status] INTEGER, 
    [username] VARCHAR(50), 
    [org_name] VARCHAR(50), 
    [project_name] VARCHAR(50));`
    )
    .raw(
      `CREATE TABLE [tblCommodity](
       [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
       [item_name] VARCHAR, 
       [item_desc] VARCHAR, 
       [item_unit] VARCHAR, 
       [item_sub_unit] VARCHAR, 
       [prog_type] varchar(50));`
    )
    .raw(
      `CREATE TABLE [main].[tblGeoDistrict](
        [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        [districtName] varchar(255), 
        [province_id] integer, 
        [created_at] datetime, 
        [updated_at] datetime, 
        [isActive] BOOLEAN DEFAULT 1);`
    )
    .raw(
      `CREATE TABLE [main].[tblGeoNutSite](
        [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        [siteName] varchar(255), 
        [province_id] integer, 
        [district_id] integer, 
        [tehsil_id] integer, 
        [uc_id] integer, 
        [OTP] integer, 
        [SFP] integer, 
        [SC] integer, 
        [created_at] datetime, 
        [updated_at] datetime, 
        [isActive] BOOLEAN DEFAULT 1);`
    )
    .raw(
      `CREATE TABLE [main].[tblGeoProvince](
        [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        [provinceName] varchar(255), 
        [created_at] datetime, 
        [updated_at] datetime, 
        [isActive] BOOLEAN DEFAULT 1);`
    )
    .raw(
      `CREATE TABLE [main].[tblGeoTehsil](
        [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        [tehsilName] varchar(255), 
        [district_id] integer, 
        [created_at] datetime, 
        [updated_at] datetime, 
        [isActive] BOOLEAN DEFAULT 1);`
    )
    .raw(
      `CREATE TABLE [main].[tblGeoUC](
        [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        [ucName] varchar(255), 
        [tehsil_id] integer, 
        [created_at] datetime, 
        [updated_at] datetime, 
        [isActive] BOOLEAN DEFAULT 1);`
    )
    .raw(
      `CREATE TABLE [tblInterimOtp](
       [interim_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
       [otp_id] integer, 
       [client_id] varchar(255), 
       [muac] integer, 
       [weight] integer, 
       [height] integer, 
       [ration1] varchar(255), 
       [quantity1] integer, 
       [ration2] varchar(255), 
       [quantity2] integer, 
       [ration3] varchar(255), 
       [quantity3] integer, 
       [int_prog_type] varchar(255), 
       [curr_date] date, 
       [status] varchar(255), 
       [next_followup] date, 
       [created_at] datetime, 
       [updated_at] datetime, 
       [is_deleted] INT(1) NOT NULL DEFAULT 0, 
       [other_com_name] VARCHAR(20), 
       [other_com_qty] DECIMAL DEFAULT 0);`
    )
    .raw(
      `CREATE TABLE [tblLhw](
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
        [is_deleted] BOOLEAN NOT NULL DEFAULT 0);      
      `
    )
    .raw(
      `CREATE TABLE [tblOtpAdd](
        [otp_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
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
        UNIQUE([reg_id]));                 
      `
    )
    .raw(
      `CREATE TABLE [tblOtpExit](
        [exit_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        [otp_id] integer REFERENCES [tblOtpAdd]([otp_id]) ON DELETE RESTRICT ON UPDATE NO ACTION, 
        [client_id] varchar(255), 
        [exit_muac] FLOAT, 
        [exit_weight] FLOAT, 
        [exit_height] FLOAT, 
        [exit_ration1] varchar(255), 
        [exit_quantity1] integer, 
        [exit_ration2] varchar(255), 
        [exit_quantity2] integer, 
        [exit_ration3] varchar(255), 
        [exit_quantity3] integer, 
        [exit_prog_type] varchar(255), 
        [exit_date] date, 
        [exit_reason] varchar(255), 
        [created_at] datetime, 
        [updated_at] datetime, 
        [upload_status] INTEGER, 
        [weight_gain] FLOAT(7), 
        [days_in_program] INTEGER(7), 
        [is_deleted] BOOLEAN(1) NOT NULL DEFAULT 0, 
        [exit_other_com_name] VARCHAR(20), 
        [exit_other_com_qty] FLOAT DEFAULT 0, 
        [upload_date] DATE);
      
      `
    )
    .raw(
      `CREATE TABLE [tblOtpFollowup](
        [followup_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        [otp_id] integer, 
        [client_id] varchar(255), 
        [weight] DECIMAL, 
        [height] DECIMAL, 
        [ration1] varchar(255), 
        [quantity1] integer DEFAULT 0, 
        [ration2] varchar(255), 
        [quantity2] integer DEFAULT 0, 
        [ration3] varchar(255), 
        [quantity3] integer DEFAULT 0, 
        [prog_type] varchar(255), 
        [curr_date] date, 
        [status] varchar(255), 
        [next_followup] date, 
        [created_at] datetime, 
        [updated_at] datetime, 
        [muac] INTEGER, 
        [upload_status] INTEGER, 
        [is_deleted] INT(1) NOT NULL DEFAULT 0, 
        [other_com_name] varchar(20), 
        [other_com_qty] float(7), 
        [upload_date] DATE);`
    )
    .raw(
      `CREATE TABLE [tblScrChildren](
        [ch_scr_id] INTEGER PRIMARY KEY AUTOINCREMENT, 
        [site_id] INTEGER, 
        [screening_date] DATE, 
        [created_at] DATE, 
        [catchment_population] INTEGER DEFAULT 0, 
        [staff_name] VARCHAR(50), 
        [staff_code] VARCHAR(10), 
        [sup_name] VARCHAR(50), 
        [sup_code] VARCHAR(10), 
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
        [client_id] INTEGER, 
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
        [total_exits] INTEGER DEFAULT 0);      
      `
    )
    .raw(
      `CREATE TABLE [tblScrPlw](
        [plw_scr_id] INTEGER PRIMARY KEY AUTOINCREMENT, 
        [site_id] INTEGER, 
        [screening_date] DATE, 
        [created_at] DATE, 
        [village] VARCHAR(50), 
        [staff_name] VARCHAR(50), 
        [staff_code] VARCHAR(10), 
        [sup_name] VARCHAR(50), 
        [sup_code] VARCHAR(10), 
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
        [total_exits] INTEGER DEFAULT 0);      
      `
    )
    .raw(
      `CREATE TABLE [tblScrStockDist](
       [siteName] VARCHAR NOT NULL, 
       [ucName] VARCHAR NOT NULL, 
       [tehsilName] VARCHAR NOT NULL, 
       [districtName] VARCHAR NOT NULL, 
       [village_count] int NOT NULL, 
       [provinceName] VARCHAR NOT NULL, 
       [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
       [staff_code] varchar NOT NULL, 
       [staff_name] varchar NOT NULL, 
       [sup_code] varchar NOT NULL, 
       [sup_name] varchar NOT NULL, 
       [entry_date] varchar NOT NULL, 
       [report_month] varchar NOT NULL, 
       [mnp_opening] int NOT NULL, 
       [mnp_rec] int NOT NULL, 
       [mnp_dist] int NOT NULL, 
       [mnp_rem] int NOT NULL, 
       [mnp_lost] int, 
       [ifa_opening] int NOT NULL, 
       [ifa_rec] int NOT NULL, 
       [ifa_dist] int NOT NULL, 
       [ifa_rem] int NOT NULL, 
       [ifa_lost] int, 
       [deworming_opening] int NOT NULL, 
       [deworming_rec] int NOT NULL, 
       [deworming_dist] int NOT NULL, 
       [deworming_rem] int NOT NULL, 
       [deworming_lost] int, 
       [upload_status] INT NOT NULL DEFAULT 0);`
    )
    .raw(
      `CREATE TABLE [tblSessions](
        [session_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
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
        [uc_id] INTEGER);     
      `
    )
    .raw(
      `CREATE TABLE [tblSiteStock](
        [stock_out_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
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
        [uc_id] INT);      
      `
    )
    .raw(
      `CREATE TABLE [tblStock](
        [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        [dn_number] VARCHAR, 
        [dn_date] DATE, 
        [item_name] VARCHAR, 
        [item_desc] VARCHAR, 
        [disp_qty] INTEGER, 
        [disp_unit] VARCHAR, 
        [disp_sub_unit] VARCHAR, 
        [rec_qty] INTEGER, 
        [rec_obs] VARCHAR, 
        [lost_and_damage] DECIMAL NOT NULL DEFAULT 0, 
        [expiry_date] DATE, 
        [client_id] VARCHAR, 
        [upload_status] INTEGER DEFAULT 0,
        [upload_date] DATE);`
    )
    .raw(
      `CREATE TABLE [tblStockRequest](
              [id] INT PRIMARY KEY UNIQUE, 
              [req_date] DATE NOT NULL, 
              [req_district] VARCHAR NOT NULL, 
              [req_email] VARCHAR NOT NULL, 
              [req_sender] VARCHAR NOT NULL, 
              [req_data] TEXT NOT NULL, 
              [req_id] VARCHAR NOT NULL, 
              [client_id] VARCHAR, 
              [upload_status] INT DEFAULT 0);`
    )
    .raw(
      `CREATE TABLE [tblStokDistv2](
        [dist_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
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
        [upload_date] DATE);

      `
    )
    .raw(
      `CREATE TABLE [tblSupervisors](
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
        UNIQUE([sup_code], [district]) ON CONFLICT ROLLBACK);  
      `
    )
    .raw(
      `CREATE TABLE [tblVillage](
       [vill_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
       [site_id] integer, 
       [village] varchar(255), 
       [created_at] datetime, 
       [updated_at] datetime);`
    )
    .raw(
      `CREATE TABLE [tblVillages](
        [site] INT NOT NULL, 
        [uc] INT NOT NULL, 
        [tehsil] INT NOT NULL, 
        [district] INT NOT NULL, 
        [villageName] VARCHAR(50) NOT NULL, 
        [province] INT NOT NULL, 
        [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        [client_id] VARCHAR NOT NULL, 
        [upload_status] INT NOT NULL DEFAULT 0, 
        [created_at] DATE, 
        [upload_date] DATE, 
        [is_deleted] BOOLEAN NOT NULL DEFAULT 0, 
        UNIQUE([uc], [villageName]) ON CONFLICT ROLLBACK);
          `
    )
    .raw(
      `CREATE VIEW [v_geo]
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
       INNER JOIN [tblGeoNutSite] ON [tblGeoUC].[id] = [tblGeoNutSite].[uc_id];`
    )
    .raw(
      `CREATE VIEW [v_screening]
       AS
       SELECT 
       [v_geo].[province_id], 
       [v_geo].[province], 
       [v_geo].[district_id], 
       [v_geo].[district_name], 
       [v_geo].[tehsil_id], 
       [v_geo].[tehsil_name], 
       [v_geo].[uc_id], 
       [v_geo].[uc_name], 
       [v_geo].[site_name], 
       [v_geo].[otp], 
       [v_geo].[sfp], 
       [v_geo].[sc], 
       [v_geo].[site_id], 
       [Screening].[screening_id], 
       [Screening].[client_id], 
       [Screening].[screening_type], 
       [Screening].[screening_date], 
       [Screening].[data_entry_date], 
       [Screening].[site_id] AS [Expr1], 
       [Screening].[site_village], 
       [Screening].[staff_name], 
       [Screening].[name], 
       [Screening].[f_or_h_name], 
       [Screening].[address], 
       [Screening].[age], 
       [Screening].[gender], 
       [Screening].[muac], 
       [Screening].[oedema], 
       [Screening].[no_mm_sch], 
       [Screening].[deworming], 
       [Screening].[status], 
       [Screening].[is_plw], 
       [Screening].[plw_type], 
       [Screening].[no_mm_tabs]
       FROM   [Screening]
       INNER JOIN [v_geo] ON [Screening].[site_id] = [v_geo].[site_id];`
    )
    .raw(
      `CREATE VIEW [scr_report_final]
       AS
       SELECT 
       [province_id], 
       [district_id], 
       [tehsil_id], 
       [uc_id], 
       [site_id], 
       [screening_date], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 1
       AND [screening_type] = 1 THEN 1 ELSE NULL END) AS [tChildScrActive_M], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 2
       AND [screening_type] = 1 THEN 1 ELSE NULL END) AS [tChildScrActive_F], 
       COUNT (CASE WHEN [is_plw] = 1
       AND [screening_type] = 1
       AND [plw_type] = 1 THEN 1 ELSE NULL END) AS [tPlwScrActive_P], 
       COUNT (CASE WHEN [is_plw] = 1
       AND [screening_type] = 1
       AND [plw_type] = 2 THEN 1 ELSE NULL END) AS [tPlwScrActive_L], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 1
       AND [screening_type] = 0 THEN 1 ELSE NULL END) AS [tChildScrPassive_M], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 2
       AND [screening_type] = 0 THEN 1 ELSE NULL END) AS [tChildScrPassive_F], 
       COUNT (CASE WHEN [is_plw] = 1
       AND [screening_type] = 0
       AND [plw_type] = 1 THEN 1 ELSE NULL END) AS [tPlwScrPassive_P], 
       COUNT (CASE WHEN [is_plw] = 1
       AND [screening_type] = 0
       AND [plw_type] = 2 THEN 1 ELSE NULL END) AS [tPlwScrPassive_L], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 1
       AND [screening_type] = 1
       AND [muac] <= 11.5 THEN 1 ELSE NULL END) AS [ChildScrActive_M115], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 2
       AND [screening_type] = 1
       AND [muac] <= 11.5 THEN 1 ELSE NULL END) AS [ChildScrActive_F115], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 1
       AND [screening_type] = 1
       AND [muac] > 11.5
       AND [muac] < 12.4 THEN 1 ELSE NULL END) AS [ChildScrActive_M115124], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 2
       AND [screening_type] = 1
       AND [muac] > 11.5
       AND [muac] < 12.4 THEN 1 ELSE NULL END) AS [ChildScrActive_F115124], 
       COUNT (CASE WHEN [is_plw] = 1
       AND [screening_type] = 1
       AND [plw_type] = 1
       AND [muac] < 21 THEN 1 ELSE NULL END) AS [PlwScrActive_P21], 
       COUNT (CASE WHEN [is_plw] = 1
       AND [screening_type] = 1
       AND [plw_type] = 2
       AND [muac] < 21 THEN 1 ELSE NULL END) AS [PlwScrActive_L21], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 1
       AND [screening_type] = 0
       AND [muac] <= 11.5 THEN 1 ELSE NULL END) AS [ChildScrPassive_M115], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 2
       AND [screening_type] = 0
       AND [muac] <= 11.5 THEN 1 ELSE NULL END) AS [ChildScrPassive_F115], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 1
       AND [screening_type] = 0
       AND [muac] > 11.5
       AND [muac] < 12.5 THEN 1 ELSE NULL END) AS [ChildScrPassive_M115124], 
       COUNT (CASE WHEN [is_plw] = 0
       AND [gender] = 2
       AND [screening_type] = 0
       AND [muac] > 11.5
       AND [muac] < 12.5 THEN 1 ELSE NULL END) AS [tChildScrPassive_F115124], 
       COUNT (CASE WHEN [is_plw] = 1
       AND [screening_type] = 0
       AND [plw_type] = 1
       AND [muac] < 21 THEN 1 ELSE NULL END) AS [PlwScrPassive_P21], 
       COUNT (CASE WHEN [is_plw] = 1
       AND [screening_type] = 0
       AND [plw_type] = 2
       AND [muac] < 21 THEN 1 ELSE NULL END) AS [PlwScrPassive_L21]
       FROM   [v_screening]
       GROUP  BY
              [province_id], 
              [district_id], 
              [tehsil_id], 
              [uc_id], 
              [site_id], 
              [screening_date];`
    )
    .raw(
      `CREATE VIEW [v_geo_lhw]
      AS
      SELECT 
             [v_geo_uc].*, 
             [main].[tblLhw].[staff_name], 
             [main].[tblLhw].[staff_code]
      FROM   [main].[v_geo_uc]
             INNER JOIN [main].[tblLhw] ON [main].[tblLhw].[uc] = [main].[v_geo_uc].[uc_id];`
    )
    .raw(`CREATE VIEW [main].[vSessionsFullForUpdate]
    AS
    SELECT 
           [main].[v_geo].[province], 
           [main].[v_geo].[province_id], 
           [main].[v_geo].[district_id], 
           [main].[v_geo].[district_name], 
           [main].[v_geo].[tehsil_id], 
           [main].[v_geo].[tehsil_name], 
           [main].[v_geo].[uc_name], 
           [main].[v_geo].[site_name] as site_name, 
           [tblSessions].*
    FROM   [main].[tblSessions]
           INNER JOIN [main].[v_geo] ON ([main].[v_geo].[site_id] = [main].[tblSessions].[site_id])
    WHERE  [tblsessions].[is_deleted] = 0
    UNION ALL
    SELECT 
           [main].[v_geo_lhw].[province], 
           [main].[v_geo_lhw].[province_id], 
           [main].[v_geo_lhw].[district_id], 
           [main].[v_geo_lhw].[district_name], 
           [main].[v_geo_lhw].[tehsil_id], 
           [main].[v_geo_lhw].[tehsil_name], 
           [main].[v_geo_lhw].[uc_name],
           '' as site_name, 
           [tblSessions].*
    FROM   [main].[tblSessions]
           INNER JOIN [main].[v_geo_lhw] ON ([main].[v_geo_lhw].[uc_id] = [main].[tblSessions].[uc_id]
                AND [main].[tblSessions].[CHW_id] = [main].[v_geo_lhw].[staff_code])
    WHERE  [tblsessions].[is_deleted] = 0;
    
    `)
    .raw(
      `CREATE VIEW [vStockDistReport]
      AS
      SELECT 
             [main].[tblStokDistv2].[stockDistId] AS [Report ID], 
             [main].[tblStokDistv2].[program_type] AS [Program], 
             [main].[tblGeoProvince].[provinceName] AS [Province], 
             [main].[tblGeoDistrict].[districtName] AS [District], 
             [main].[tblStokDistv2].[dist_month] AS [Month], 
             [main].[tblGeoTehsil].[tehsilName] AS [Tehsil], 
             IFNULL ([main].[tblGeoUC].[ucName], '') AS [UC], 
             IFNULL ([main].[tblGeoNutSite].[siteName], '') AS [Health House], 
             IFNULL ([main].[tblLhw].[staff_name], '') AS [CHW], 
             IFNULL ([main].[tblSupervisors].[sup_name], '') AS [CHS], 
             [main].[tblStokDistv2].[dist_id], 
             [main].[tblStokDistv2].[item_name] AS [Item], 
             [main].[tblStokDistv2].[opening], 
             [main].[tblStokDistv2].[received], 
             [main].[tblStokDistv2].[distributed], 
             [main].[tblStokDistv2].[damaged], 
             [main].[tblStokDistv2].[remaining], 
             [main].[tblStokDistv2].[created_at] AS [Created], 
             [main].[tblStokDistv2].[upload_status]
      FROM   [main].[tblStokDistv2]
             LEFT JOIN [main].[tblGeoDistrict] ON [main].[tblGeoDistrict].[id] = [main].[tblStokDistv2].[district_id]
             LEFT JOIN [main].[tblGeoTehsil] ON [main].[tblGeoTehsil].[id] = [main].[tblStokDistv2].[tehsil_id]
             LEFT JOIN [main].[tblGeoNutSite] ON [main].[tblGeoNutSite].[id] = [main].[tblStokDistv2].[site_id]
             LEFT JOIN [main].[tblLhw] ON [main].[tblLhw].[staff_code] = [main].[tblStokDistv2].[CHW_id]
             LEFT JOIN [main].[tblSupervisors] ON [main].[tblSupervisors].[sup_code] = [main].[tblStokDistv2].[CHS_id]
             LEFT JOIN [main].[tblGeoProvince] ON [main].[tblStokDistv2].[province_id] = [main].[tblGeoProvince].[id]
             LEFT JOIN [main].[tblGeoUC] ON [main].[tblStokDistv2].[uc_id] = [main].[tblGeoUC].[id]
      WHERE  [main].[tblStokDistv2].[is_deleted] = 0;`
    )
    .raw(
      `CREATE VIEW [v_totalSiteStock]
       AS
       SELECT 
       [main].[tblSiteStock].[item_name], 
       SUM ([main].[tblSiteStock].[quantity_released]) AS [released]
       FROM   [main].[tblSiteStock]
       WHERE  [tblSiteStock].[is_deleted] = 0
       GROUP  BY [main].[tblSiteStock].[item_name];`
    )
    .raw(
      `CREATE VIEW [v_totlStockIn]
       AS
       SELECT 
       [main].[tblStock].[item_name], 
       SUM ([main].[tblStock].[rec_qty]) AS [recieved]
       FROM   [main].[tblStock]
       GROUP  BY [main].[tblStock].[item_name];`
    )
    .raw(
      `CREATE VIEW [v_availableCom]
      AS
      SELECT 
             [main].[tblCommodity].[item_name], 
             [main].[tblCommodity].[item_desc], 
             [main].[tblCommodity].[item_unit], 
             [main].[tblCommodity].[item_sub_unit], 
             [main].[tblCommodity].[prog_type], 
             [main].[v_totlStockIn].[recieved], 
             [main].[v_totalSiteStock].[released], 
             [recieved] - IFNULL ([released], 0) AS [remaining]
      FROM   [main].[v_totlStockIn]
             LEFT JOIN [main].[v_totalSiteStock] ON [main].[v_totlStockIn].[item_name] = [main].[v_totalSiteStock].[item_name]
             INNER JOIN [main].[tblCommodity] ON [main].[v_totlStockIn].[item_name] = [main].[tblCommodity].[item_name];
      `
    )
    .raw(
      `CREATE VIEW [main].[v_otpAdd_full]
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
             [main].[tblOtpAdd].[client_id], 
             [main].[tblOtpAdd].[site_village], 
             [main].[tblOtpAdd].[p_name], 
             [main].[tblOtpAdd].[otp_id], 
             [main].[tblOtpAdd].[f_or_h_name], 
             [main].[tblOtpAdd].[cnic], 
             [main].[tblOtpAdd].[cnt_number], 
             [main].[tblOtpAdd].[address], 
             [main].[tblOtpAdd].[reg_date], 
             [main].[tblOtpAdd].[reg_id], 
             [main].[tblOtpAdd].[gender], 
             [main].[tblOtpAdd].[age], 
             [main].[tblOtpAdd].[ent_reason], 
             [main].[tblOtpAdd].[ref_type], 
             [main].[tblOtpAdd].[oedema], 
             [main].[tblOtpAdd].[muac], 
             [main].[tblOtpAdd].[weight], 
             [main].[tblOtpAdd].[height], 
             [main].[tblOtpAdd].[diarrhoea], 
             [main].[tblOtpAdd].[vomiting], 
             [main].[tblOtpAdd].[cough], 
             [main].[tblOtpAdd].[appetite], 
             [main].[tblOtpAdd].[daily_stool], 
             [main].[tblOtpAdd].[pass_urine], 
             [main].[tblOtpAdd].[b_Feeding], 
             [main].[tblOtpAdd].[prog_type], 
             [main].[tblOtpAdd].[is_deleted], 
             [main].[tblOtpAdd].[plw_type]
      FROM   [main].[v_geo]
             INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
      WHERE  [main].[tblOtpAdd].[is_deleted] = 0;`
    )
    .raw(
      `CREATE VIEW [v_default_initial]
       AS
       SELECT 
       [main].[v_otpAdd_full].[province], 
       [main].[v_otpAdd_full].[district_name], 
       [main].[v_otpAdd_full].[tehsil_name], 
       [main].[v_otpAdd_full].[uc_name], 
       [main].[v_otpAdd_full].[site_name], 
       [main].[v_otpAdd_full].[site_village], 
       [main].[v_otpAdd_full].[reg_date], 
       [main].[v_otpAdd_full].[reg_id], 
       [main].[v_otpAdd_full].[p_name] AS 'Patient Name', 
       [main].[v_otpAdd_full].[f_or_h_name] 'Father/Husband Name', 
       [main].[v_otpAdd_full].[cnic], 
       [main].[v_otpAdd_full].[address], 
       [main].[v_otpAdd_full].[cnt_number] AS 'Contact number', 
       [main].[v_otpAdd_full].[age], 
       [main].[v_otpAdd_full].[gender], 
       [main].[tblInterimOtp].[muac] AS 'MUAC', 
       [main].[tblInterimOtp].[curr_date] AS 'Last followup date', 
       [main].[tblInterimOtp].[next_followup], 
       ROUND (JULIANDAY () - JULIANDAY ([main].[tblInterimOtp].[curr_date])) AS 'Days since last follow up'
       FROM   [main].[tblInterimOtp]
       INNER JOIN [main].[v_otpAdd_full] ON [main].[tblInterimOtp].[otp_id] = [main].[v_otpAdd_full].[otp_id]
       WHERE  [main].[tblInterimOtp].[status] = 'open';`
    )
    .raw(
      `CREATE VIEW [v_defaulter]
       AS
       SELECT [v_default_initial].*
       FROM   [main].[v_default_initial]
       WHERE  [main].[v_default_initial].[Days since last follow up] > 21;`
    )
    .raw(
      `SELECT 
      [main].[tblOtpExit].[exit_id], 
      [main].[tblOtpAdd].[otp_id], 
      [main].[tblOtpAdd].[site_id], 
      [main].[tblOtpAdd].[age], 
      [main].[tblOtpAdd].[gender], 
      [main].[tblOtpAdd].[prog_type], 
      [main].[tblOtpExit].[exit_reason], 
      [main].[tblOtpExit].[exit_date]
FROM   [main].[tblOtpAdd]
      INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
WHERE  [main].[tblOtpAdd].[prog_type] = 'otp'
      AND [main].[tblOtpExit].[is_deleted] = 0
      AND [main].[tblOtpAdd].[is_deleted] = 0;`
    )
    .raw(
      `CREATE VIEW [v_exitOtpReportInterval]
       AS
       SELECT 
       [ve].*, 
       [vg].[province_id], 
       [vg].[tehsil_id], 
       [vg].[district_id], 
       [vg].[uc_id]
       FROM   [v_exitOtpReport] [ve]
       INNER JOIN [v_geo] [vg] ON [ve].[site_id] = [vg].[site_id];`
    )
    .raw(
      `CREATE VIEW [v_otpAddFull_report]
       AS
       SELECT 
       [province_id], 
       [province], 
       [district_id], 
       [district_name], 
       [tehsil_id], 
       [tehsil_name], 
       [uc_id], 
       [uc_name], 
       [site_name], 
       [site_id], 
       [reg_date], 
       COUNT (CASE WHEN [muac] < 11.5 THEN '' END) AS 'MUAC115', 
       COUNT (CASE WHEN [oedema] != 'absent' THEN '' END) AS 'Oedema', 
       COUNT (CASE WHEN [ent_reason] = 'no_prv_pro' THEN '' END) AS 'New_Addmision', 
       COUNT (CASE WHEN [ent_reason] = 'relapse' THEN '' END) AS 'Relapse', 
       COUNT (CASE WHEN [ent_reason] = 'def_sfp' THEN '' END) AS 'Def_SFP', 
       COUNT (CASE WHEN [ent_reason] = 'def_otp' THEN '' END) AS 'Def_OTP', 
       SUM (CASE WHEN [ent_reason] = 'def_sfp'
       OR  [ent_reason] = 'def_otp' THEN '' END) AS 'default', 
       COUNT (CASE WHEN [ent_reason] = 'abb_inp' THEN '' END) AS 'Abbondon', 
       COUNT (CASE WHEN [ent_reason] = 'promotion_in_from_sc' THEN '' END) AS 'Pro_in_from_SC', 
       COUNT (CASE WHEN [ent_reason] = 'tranfer_in_other_otp' THEN '' END) AS 'Trasfer_in_from_other_OTP', 
       COUNT (CASE WHEN [ent_reason] = 'tranfer_in_from_sfp' THEN '' END) AS 'Transfer_in_from_SFP', 
       COUNT (CASE WHEN [ent_reason] = 'other' THEN '' END) AS 'Other', 
       STRFTIME ('%m', [reg_date]) AS 'Month', 
       STRFTIME ('%Y', [reg_date]) AS 'Year', 
       STRFTIME ('%d', [reg_date]) AS 'Day', 
       COUNT ([otp_id]) AS 'add_Total'
       FROM   [v_otpAdd_full]
       WHERE  [muac] < 11.5
       GROUP  BY [otp_id];`
    )
    .raw(
      `CREATE VIEW [v_otpAddInterval]
       AS
       SELECT 
       [vg].[province_id], 
       [t].*, 
       [vg].[district_id], 
       [vg].[tehsil_id], 
       [vg].[uc_id]
       FROM   [tblOtpAdd] [t]
       INNER JOIN [v_geo] [vg] ON [vg].[site_id] = [t].[site_id]
       WHERE  [t].[prog_type] = 'otp'
       AND [t].[is_deleted] = 0;`
    )
    .raw(
      `CREATE VIEW [v_otpAddmision]
       AS
       SELECT 
       [v_geo].*, 
       [tblOtpAdd].*, 
       [main].[tblOtpAdd].[otp_id] AS [otp_id1], 
       [main].[tblOtpAdd].[client_id] AS [client_id1], 
       [main].[tblOtpAdd].[site_village] AS [site_village1], 
       [main].[tblOtpAdd].[reg_date] AS [reg_date1], 
       [main].[tblOtpAdd].[reg_id] AS [reg_id1], 
       [main].[tblOtpAdd].[p_name] AS [p_name1], 
       [main].[tblOtpAdd].[f_or_h_name] AS [f_or_h_name1], 
       [main].[tblOtpAdd].[cnic] AS [cnic1], 
       [main].[tblOtpAdd].[address] AS [address1], 
       [main].[tblOtpAdd].[cnt_number] AS [cnt_number1], 
       [main].[tblOtpAdd].[age] AS [age1], 
       [main].[tblOtpAdd].[gender] AS [gender1], 
       [main].[tblOtpAdd].[plw_type] AS [plw_type1], 
       [main].[tblOtpAdd].[ent_reason] AS [ent_reason1], 
       [main].[tblOtpAdd].[ref_type] AS [ref_type1], 
       [main].[tblOtpAdd].[oedema] AS [oedema1], 
       [main].[tblOtpAdd].[muac] AS [muac1], 
       [main].[tblOtpAdd].[diarrhoea] AS [diarrhoea1], 
       [main].[tblOtpAdd].[vomiting] AS [vomiting1], 
       [main].[tblOtpAdd].[cough] AS [cough1], 
       [main].[tblOtpAdd].[appetite] AS [appetite1], 
       [main].[tblOtpAdd].[daily_stool] AS [daily_stool1], 
       [main].[tblOtpAdd].[pass_urine] AS [pass_urine1], 
       [main].[tblOtpAdd].[b_Feeding] AS [b_Feeding1], 
       [main].[tblOtpAdd].[weight] AS [weight1], 
       [main].[tblOtpAdd].[height] AS [height1], 
       [main].[tblOtpAdd].[ration1] AS [ration11], 
       [main].[tblOtpAdd].[quantity1] AS [quantity11], 
       [main].[tblOtpAdd].[ration2] AS [ration21], 
       [main].[tblOtpAdd].[quantity2] AS [quantity21], 
       [main].[tblOtpAdd].[ration3] AS [ration31], 
       [main].[tblOtpAdd].[quantity3] AS [quantity31], 
       [main].[tblOtpAdd].[prog_type] AS [prog_type1], 
       [main].[tblOtpAdd].[created_at] AS [created_at1], 
       [main].[tblOtpAdd].[updated_at] AS [updated_at1], 
       [main].[tblOtpAdd].[upload_status] AS [upload_status1], 
       [main].[tblOtpAdd].[username] AS [username1], 
       [main].[tblOtpAdd].[org_name] AS [org_name1], 
       [main].[tblOtpAdd].[project_name] AS [project_name1]
       FROM   [main].[v_geo]
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
       WHERE  [main].[tblOtpAdd].[otp_id] NOT IN (SELECT [tblOtpExit].[otp_id]
       FROM   [tblOtpExit]);`
    )
    .raw(
      `CREATE VIEW [v_otpAddmision1]
       AS
       SELECT 
       [v_geo].*, 
       [tblOtpAdd].*
       FROM   [main].[v_geo]
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
       WHERE  [main].[tblOtpAdd].[is_deleted] = 0;`
    )
    .raw(
      `CREATE VIEW [v_otpAddNewReport]
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
       [main].[tblOtpAdd].[age], 
       [main].[tblOtpAdd].[gender], 
       [main].[tblOtpAdd].[plw_type], 
       [main].[tblOtpAdd].[ent_reason], 
       [main].[tblOtpAdd].[is_deleted], 
       [main].[tblOtpAdd].[prog_type], 
       [main].[tblOtpAdd].[reg_date], 
       [main].[tblOtpAdd].[reg_id], 
       [main].[tblOtpAdd].[otp_id]
       FROM   [main].[v_geo]
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id];`
    )
    .raw(
      `CREATE VIEW [v_OtpExit]
       AS
       SELECT 
       [tblOtpExit].*, 
       [tblOtpAdd].*
       FROM   [tblOtpExit]
       INNER JOIN [tblOtpAdd] ON [tblOtpExit].[otp_id] = [tblOtpAdd].[otp_id];`
    )
    .raw(
      `CREATE VIEW [v_otpExitFullForUpdate]
       AS
       SELECT 
       [main].[tblOtpAdd].[site_id], 
       [main].[tblOtpAdd].[p_name], 
       [main].[tblOtpAdd].[reg_id], 
       [main].[tblOtpAdd].[site_village], 
       [main].[tblOtpAdd].[prog_type], 
       [main].[v_geo].[province_id], 
       [main].[v_geo].[province], 
       [main].[v_geo].[district_id], 
       [main].[v_geo].[district_name], 
       [main].[v_geo].[tehsil_id], 
       [main].[v_geo].[tehsil_name], 
       [main].[v_geo].[uc_id], 
       [main].[v_geo].[uc_name], 
       [main].[v_geo].[site_name], 
       [tblOtpExit].*
       FROM   [main].[tblOtpAdd]
       INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
       INNER JOIN [main].[v_geo] ON [main].[tblOtpAdd].[site_id] = [main].[v_geo].[site_id]
       WHERE  [tblOtpExit].[is_deleted] = 0;`
    )
    .raw(
      `CREATE VIEW [main].[v_otpExit_full]
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
             [main].[tblOtpExit].[is_deleted], 
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
             AND [main].[tblOtpAdd].[is_deleted] = 0;`
    )
    .raw(
      `CREATE VIEW [v_otpExitFull_report]
       AS
       SELECT 
       [province_id], 
       [province], 
       [district_id], 
       [district_name], 
       [tehsil_id], 
       [tehsil_name], 
       [uc_id], 
       [uc_name], 
       [site_name], 
       [site_id], 
       [exit_date], 
       [exit_weight], 
       COUNT (CASE WHEN [exit_reason] = 'cured' THEN '' END) AS 'cured', 
       COUNT (CASE WHEN [exit_reason] = 'defaulter' THEN '' END) AS 'defaulter', 
       COUNT (CASE WHEN [exit_reason] = 'non_responder' THEN '' END) AS 'non_responder', 
       COUNT (CASE WHEN [exit_reason] = 'death' THEN '' END) AS 'death', 
       COUNT (CASE WHEN [exit_reason] = 'medical_transfer_sc' THEN '' END) AS 'medical_transfer_SC', 
       COUNT (CASE WHEN [exit_reason] = 'transfer_out_to_other_otp' THEN '' END) AS 'transfer_out_other_OTP', 
       COUNT (CASE WHEN [exit_reason] = 'other' THEN '' END) AS 'Other', 
       STRFTIME ('%m', [exit_date]) AS 'Month', 
       STRFTIME ('%Y', [exit_date]) AS 'Year', 
       STRFTIME ('%d', [exit_date]) AS 'Day', 
       COUNT ([otp_id]) AS 'exit_total', 
       [prog_type]
       FROM   [v_otpExit_full]
       GROUP  BY [prog_type];`
    )
    .raw(
      `CREATE VIEW [v_otpExitReportNew]
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
       [main].[tblOtpExit].[exit_id], 
       [main].[tblOtpExit].[exit_reason], 
       [main].[tblOtpExit].[is_deleted], 
       [main].[tblOtpAdd].[age], 
       [main].[tblOtpAdd].[gender], 
       [main].[tblOtpAdd].[prog_type], 
       [main].[tblOtpAdd].[plw_type]
       FROM   [main].[v_geo]
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
       INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpExit].[otp_id] = [main].[tblOtpAdd].[otp_id];`
    )
    .raw(
      `CREATE VIEW [v_otpExit_knex]
       AS
       SELECT 
       [v_geo].*, 
       [v_OtpExit].*
       FROM   [main].[v_geo]
       INNER JOIN [main].[v_OtpExit] ON [main].[v_OtpExit].[site_id] = [main].[v_geo].[site_id];
       `
    )
    .raw(`CREATE VIEW [v_exitOtpReport]
    AS
    SELECT 
           [main].[tblOtpExit].[exit_id], 
           [main].[tblOtpAdd].[otp_id], 
           [main].[tblOtpAdd].[site_id], 
           [main].[tblOtpAdd].[age], 
           [main].[tblOtpAdd].[gender], 
           [main].[tblOtpAdd].[prog_type], 
           [main].[tblOtpExit].[exit_reason], 
           [main].[tblOtpExit].[exit_date]
    FROM   [main].[tblOtpAdd]
           INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
    WHERE  [main].[tblOtpAdd].[prog_type] = 'otp'
           AND [main].[tblOtpAdd].[is_deleted] = 0
           AND [main].[tblOtpExit].[is_deleted] = 0;
      `)
    .raw(
      `CREATE VIEW [main].[v_otpNotExit]
      AS
      SELECT 
             [main].[tblOtpAdd].[otp_id], 
             [main].[tblOtpAdd].[site_id], 
             [main].[tblOtpExit].[exit_id], 
             [main].[tblOtpExit].[exit_date], 
             (CASE WHEN [main].[tblOtpAdd].[age] > 23 THEN '24_59' WHEN [main].[tblOtpAdd].[age] < 24 THEN '6_23' END) AS [age_group], 
             [main].[tblOtpAdd].[gender], 
             STRFTIME ('%Y', [reg_date]) AS [year], 
             STRFTIME ('%m', [reg_date]) AS [month], 
             [reg_date]
      FROM   [main].[tblOtpAdd]
             LEFT JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
      WHERE  [main].[tblOtpExit].[exit_id] IS NULL
             AND [main].[tblOtpAdd].[prog_type] = 'otp'
             AND [main].[tblOtpAdd].[is_deleted] = 0;`
    )
    .raw(
      `CREATE VIEW [v_otpNotExitInterval]
      AS
      SELECT 
             [v_otpNotExit].*, 
             [main].[v_geo].[province_id], 
             [main].[v_geo].[district_id], 
             [main].[v_geo].[tehsil_id], 
             [main].[v_geo].[uc_id]
      FROM   [main].[v_otpNotExit]
             INNER JOIN [main].[v_geo] ON [main].[v_otpNotExit].[site_id] = [main].[v_geo].[site_id];`
    )
    .raw(
      `CREATE VIEW [v_scrChildFull]
       AS
       SELECT 
       [main].[v_geo].[province_id], 
       [main].[v_geo].[province], 
       [main].[v_geo].[district_id], 
       [main].[v_geo].[tehsil_id], 
       [main].[v_geo].[district_name], 
       [main].[v_geo].[tehsil_name], 
       [main].[v_geo].[uc_id], 
       [main].[v_geo].[uc_name], 
       [main].[v_geo].[site_name], 
       [tblScrChildren].*
       FROM   [main].[tblScrChildren]
       INNER JOIN [main].[v_geo] ON [main].[v_geo].[site_id] = [main].[tblScrChildren].[site_id]
       WHERE  [main].[tblScrChildren].[is_deleted] = 0;`
    )
    .raw(
      `CREATE VIEW [v_scrPlwFull]
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
       [tblScrPlw].*
       FROM   [main].[tblScrPlw]
       INNER JOIN [main].[v_geo] ON [main].[v_geo].[site_id] = [main].[tblScrPlw].[site_id]
       WHERE  [main].[tblScrPlw].[is_deleted] = 0;`
    )
    .raw(
      `CREATE VIEW [v_session_full]
       AS
       SELECT 
       [v_geo].*, 
       [tblSessions].*
       FROM   [main].[v_geo]
       INNER JOIN [main].[tblSessions] ON [main].[tblSessions].[site_id] = [main].[v_geo].[site_id];`
    )
    .raw(
      `CREATE VIEW [v_stockDist]
       AS
       SELECT 
       [ration], 
       [month], 
       [year], 
       SUM ([quantity]) AS [tQuantity]
       FROM   (SELECT 
              [ration1] AS [ration], 
              [quantity1] AS [quantity], 
              STRFTIME ('%m', [main].[tblOtpAdd].[reg_date]) AS [month], 
              STRFTIME ('%Y', [main].[tblOtpAdd].[reg_date]) AS [year]
       FROM   [tblOtpAdd]
       WHERE  [ration1] <> ''
       UNION ALL
       SELECT 
              [ration2] AS [ration], 
              [quantity2] AS [quantity], 
              STRFTIME ('%m', [main].[tblOtpAdd].[reg_date]) AS [month], 
              STRFTIME ('%Y', [main].[tblOtpAdd].[reg_date]) AS [year]
       FROM   [tblOtpAdd]
       WHERE  [ration2] <> ''
       UNION ALL
       SELECT 
              [ration3] AS [ration], 
              [quantity3] AS [quantity], 
              STRFTIME ('%m', [main].[tblOtpAdd].[reg_date]) AS [month], 
              STRFTIME ('%Y', [main].[tblOtpAdd].[reg_date]) AS [year]
       FROM   [tblOtpAdd]
       WHERE  [ration3] <> ''
       UNION ALL
       SELECT 
              [ration1] AS [ration], 
              [quantity1] AS [quantity], 
              STRFTIME ('%m', [main].[tblOtpFollowup].[curr_date]) AS [month], 
              STRFTIME ('%Y', [main].[tblOtpFollowup].[curr_date]) AS [year]
       FROM   [tblOtpFollowup]
       WHERE  [ration1] <> ''
       UNION ALL
       SELECT 
              [ration2] AS [ration], 
              [quantity2] AS [quantity], 
              STRFTIME ('%m', [main].[tblOtpFollowup].[curr_date]) AS [month], 
              STRFTIME ('%Y', [main].[tblOtpFollowup].[curr_date]) AS [year]
       FROM   [tblOtpFollowup]
       WHERE  [ration2] <> ''
       UNION ALL
       SELECT 
              [ration3] AS [ration], 
              [quantity3] AS [quantity], 
              STRFTIME ('%m', [main].[tblOtpFollowup].[curr_date]) AS [month], 
              STRFTIME ('%Y', [main].[tblOtpFollowup].[curr_date]) AS [year]
       FROM   [tblOtpFollowup]
       WHERE  [ration3] <> '')
       WHERE  [ration] IS NOT NULL
       AND [quantity] > 0
       GROUP  BY
       [ration], 
       [month], 
       [year];`
    )
    .raw(
      `CREATE VIEW [v_stockDistv2]
       AS
       SELECT 
       [item_name] AS [ration], 
       SUM ([distributed]) [tQuantity], 
       SUBSTR ([dist_month], 0, 5) AS [year], 
       SUBSTR ([dist_month], 6, 2) AS [month]
       FROM   [tblStokDistv2]
       GROUP  BY
       [ration], 
       [month], 
       [year];`
    )
    .raw(
      `CREATE VIEW [v_stockIn]
       AS
       SELECT 
       [main].[tblStock].[item_name], 
       SUM ([main].[tblStock].[rec_qty]) AS [rec_qty], 
       STRFTIME ('%m', [main].[tblStock].[dn_date]) AS [month], 
       STRFTIME ('%Y', [main].[tblStock].[dn_date]) AS [Year]
       FROM   [main].[tblStock]
       GROUP  BY
       [main].[tblStock].[item_name], 
       [month], 
       [Year];`
    )
    .raw(
      `CREATE VIEW [v_StockMovement]
       AS
       SELECT 
       IFNULL ([item_name], [ration]) AS [item], 
       IFNULL ([rec_qty], 0) AS [recQty], 
       IFNULL ([month], [dist_month]) AS [month], 
       IFNULL ([year], [dist_year]) AS [year], 
       IFNULL ([ration], [item_name]) AS [ration], 
       IFNULL ([dist_month], [month]) AS [dist_month], 
       IFNULL ([dist_year], [year]) AS [dist_year], 
       IFNULL ([tQuantity], 0) [dist_qty]
       FROM   (SELECT 
       [main].[v_stockIn].[item_name], 
       [main].[v_stockIn].[rec_qty], 
       [main].[v_stockIn].[month], 
       [main].[v_stockIn].[Year], 
       [main].[v_stockDist].[ration], 
       [main].[v_stockDist].[month] AS [dist_month], 
       [main].[v_stockDist].[year] AS [dist_year], 
       [main].[v_stockDist].[tQuantity], 
       ([main].[v_stockIn].[rec_qty] - [main].[v_stockDist].[tQuantity]) AS [rem]
       FROM   [main].[v_stockIn]
       LEFT JOIN [main].[v_stockDist] ON [main].[v_stockIn].[item_name] = [main].[v_stockDist].[ration]
       AND [main].[v_stockIn].[month] = [main].[v_stockDist].[month]
       UNION ALL
       SELECT 
       [main].[v_stockIn].[item_name], 
       [main].[v_stockIn].[rec_qty], 
       [main].[v_stockIn].[month], 
       [main].[v_stockIn].[Year], 
       [main].[v_stockDist].[ration], 
       [main].[v_stockDist].[month] AS [dist_month], 
       [main].[v_stockDist].[year] AS [dist_year], 
       [main].[v_stockDist].[tQuantity], 
       ([main].[v_stockIn].[rec_qty] - [main].[v_stockDist].[tQuantity]) AS [rem]
       FROM   [main].[v_stockDist]
       LEFT JOIN [main].[v_stockIn] ON [main].[v_stockDist].[ration] = [main].[v_stockIn].[item_name]
       AND [main].[v_stockIn].[month] = [main].[v_stockDist].[month]
       WHERE  [main].[v_stockIn].[item_name] IS NULL);`
    )
    .raw(
      `CREATE VIEW [v_stockMovements]
       AS
       SELECT 
       [year], 
       [month], 
       [ration], 
       [tQuantity], 
       'distributed' [source]
       FROM   [v_stockDist]
       UNION ALL
       SELECT 
       [year], 
       [month], 
       [item_name] AS [ration], 
       [rec_qty] AS [tQuantity], 
       'Stock' [source]
       FROM   [v_stockIn];`
    )
    .raw(
      `CREATE VIEW [v_StockMovementv2]
       AS
       SELECT 
       IFNULL ([item_name], [ration]) AS [item], 
       IFNULL ([rec_qty], 0) AS [recQty], 
       IFNULL ([month], [dist_month]) AS [month], 
       IFNULL ([year], [dist_year]) AS [year], 
       IFNULL ([ration], [item_name]) AS [ration], 
       IFNULL ([dist_month], [month]) AS [dist_month], 
       IFNULL ([dist_year], [year]) AS [dist_year], 
       IFNULL ([tQuantity], 0) [dist_qty]
       FROM   (SELECT 
       [main].[v_stockIn].[item_name], 
       [main].[v_stockIn].[rec_qty], 
       [main].[v_stockIn].[month], 
       [main].[v_stockIn].[Year], 
       [main].[v_stockDistv2].[ration], 
       [main].[v_stockDistv2].[month] AS [dist_month], 
       [main].[v_stockDistv2].[year] AS [dist_year], 
       [main].[v_stockDistv2].[tQuantity], 
       ([main].[v_stockIn].[rec_qty] - [main].[v_stockDistv2].[tQuantity]) AS [rem]
       FROM   [main].[v_stockIn]
       LEFT JOIN [main].[v_stockDistv2] ON [main].[v_stockIn].[item_name] = [main].[v_stockDistv2].[ration]
       AND [main].[v_stockIn].[month] = [main].[v_stockDistv2].[month]
       UNION ALL
       SELECT 
       [main].[v_stockIn].[item_name], 
       [main].[v_stockIn].[rec_qty], 
       [main].[v_stockIn].[month], 
       [main].[v_stockIn].[Year], 
       [main].[v_stockDistv2].[ration], 
       [main].[v_stockDistv2].[month] AS [dist_month], 
       [main].[v_stockDistv2].[year] AS [dist_year], 
       [main].[v_stockDistv2].[tQuantity], 
       ([main].[v_stockIn].[rec_qty] - [main].[v_stockDistv2].[tQuantity]) AS [rem]
       FROM   [main].[v_stockDistv2]
       LEFT JOIN [main].[v_stockIn] ON [main].[v_stockDistv2].[ration] = [main].[v_stockIn].[item_name]
       AND [main].[v_stockIn].[month] = [main].[v_stockDistv2].[month]
       WHERE  [main].[v_stockIn].[item_name] IS NULL);`
    )
    .raw(
      `CREATE VIEW [v_tblScrChildrenFull]
       AS
       SELECT 
       [main].[v_geo].[province], 
       [main].[v_geo].[district_name], 
       [main].[v_geo].[province_id], 
       [main].[v_geo].[district_id], 
       [main].[v_geo].[tehsil_id], 
       [main].[v_geo].[tehsil_name], 
       [main].[v_geo].[uc_id], 
       [main].[v_geo].[uc_name], 
       [main].[v_geo].[site_name], 
       [tblScrChildren].*
       FROM   [main].[tblScrChildren]
       INNER JOIN [main].[v_geo] ON [main].[tblScrChildren].[site_id] = [main].[v_geo].[site_id];`
    )
    .raw(
      `CREATE VIEW [v_tblScrPlwFull]
       AS
       SELECT 
       [main].[v_geo].[province], 
       [main].[v_geo].[district_name], 
       [main].[v_geo].[province_id], 
       [main].[v_geo].[district_id], 
       [main].[v_geo].[tehsil_id], 
       [main].[v_geo].[tehsil_name], 
       [main].[v_geo].[uc_id], 
       [main].[v_geo].[uc_name], 
       [main].[v_geo].[site_name], 
       [tblScrPlw].*
       FROM   [main].[v_geo]
       INNER JOIN [main].[tblScrPlw] ON [main].[tblScrPlw].[site_id] = [main].[v_geo].[site_id];`
    )
    .createTable("tblConfig", t => {
      t.string("description");
      t.string("value");
    })
    .raw(`CREATE VIEW [v_otpFollowupUpdate]
  AS
  SELECT 
         [tblOtpFollowup].*, 
         [main].[tblOtpAdd].[site_village], 
         [main].[tblOtpAdd].[reg_id], 
         [main].[tblOtpAdd].[p_name], 
         [main].[tblOtpAdd].[f_or_h_name], 
         [main].[v_geo].[province_id], 
         [main].[v_geo].[district_id], 
         [main].[v_geo].[tehsil_id], 
         [main].[v_geo].[uc_id], 
         [main].[v_geo].[site_id]
  FROM   [main].[tblOtpAdd]
         INNER JOIN [main].[tblOtpFollowup] ON [main].[tblOtpFollowup].[otp_id] = [main].[tblOtpAdd].[otp_id]
         INNER JOIN [main].[v_geo] ON [main].[tblOtpAdd].[site_id] = [main].[v_geo].[site_id];`)
    .raw(`CREATE VIEW [v_geo_uc]
  AS
  SELECT 
         [main].[tblGeoProvince].[provinceName] AS [province], 
         [main].[tblGeoDistrict].[province_id], 
         [main].[tblGeoDistrict].[districtName] AS [district_name], 
         [main].[tblGeoTehsil].[district_id], 
         [main].[tblGeoTehsil].[tehsilName] AS [tehsil_name], 
         [main].[tblGeoUC].[tehsil_id], 
         [main].[tblGeoUC].[ucName] AS [uc_name], 
         [main].[tblGeoUC].[id] AS [uc_id]
  FROM   [main].[tblGeoDistrict]
         INNER JOIN [main].[tblGeoProvince] ON [main].[tblGeoProvince].[id] = [main].[tblGeoDistrict].[province_id]
         INNER JOIN [main].[tblGeoTehsil] ON [main].[tblGeoDistrict].[id] = [main].[tblGeoTehsil].[district_id]
         INNER JOIN [main].[tblGeoUC] ON [main].[tblGeoTehsil].[id] = [main].[tblGeoUC].[tehsil_id];
  `)
    .raw(`CREATE VIEW v_ScrChildUpd as  SELECT 
  [v_geo_uc].*, 
  [tblScrChildren].*
FROM   [main].[v_geo_uc]
  INNER JOIN [main].[tblScrChildren] ON [main].[v_geo_uc].[uc_id] = [main].[tblScrChildren].[uc_id]
  where [tblScrChildren].[is_deleted]=0;
`)
    .raw(`CREATE VIEW v_ScrPlwUpd as SELECT 
[v_geo_uc].*, 
[tblScrPlw].*
FROM   [main].[v_geo_uc]
INNER JOIN [main].[tblScrPlw] ON [main].[v_geo_uc].[uc_id] = [main].[tblScrPlw].[uc_id]
where tblScrPlw.is_deleted=0;
`)
    .raw(`create view v_stockReport as
SELECT tblSiteStock.stock_out_id, tblSiteStock.program_type, tblSiteStock.item_name, tblSiteStock.stock_release_date, tblSiteStock.quantity_released, tblSiteStock.district_id, tblGeoDistrict.districtName, tblSiteStock.tehsil_id, tblGeoTehsil.tehsilName, tblSiteStock.uc_id, tblGeoUC.ucName, tblSiteStock.site_id, tblGeoNutSite.siteName, tblSiteStock.is_deleted, tblSiteStock.upload_status, tblSiteStock.created_at, tblSiteStock.updated_at, tblSiteStock.stockOutID, tblSiteStock.client_id, tblSiteStock.upload_date, "" AS staff_code, "" AS staff_name, "" AS sup_code, "" AS sup_name, tblGeoProvince.id AS province_id, tblGeoProvince.provinceName
FROM ((((tblGeoDistrict INNER JOIN tblSiteStock ON tblGeoDistrict.id = tblSiteStock.district_id) INNER JOIN tblGeoTehsil ON tblSiteStock.tehsil_id = tblGeoTehsil.id) INNER JOIN tblGeoUC ON tblSiteStock.uc_id = tblGeoUC.id) INNER JOIN tblGeoNutSite ON tblSiteStock.site_id = tblGeoNutSite.id) INNER JOIN tblGeoProvince ON tblGeoDistrict.province_id = tblGeoProvince.id

UNION ALL

SELECT tblSiteStock.stock_out_id, tblSiteStock.program_type, tblSiteStock.item_name, tblSiteStock.stock_release_date, tblSiteStock.quantity_released, tblSiteStock.district_id, tblGeoDistrict.districtName, tblSiteStock.tehsil_id, tblGeoTehsil.tehsilName, tblSiteStock.uc_id, tblGeoUC.ucName, tblSiteStock.site_id, "" AS siteName, tblSiteStock.is_deleted, tblSiteStock.upload_status, tblSiteStock.created_at, tblSiteStock.updated_at, tblSiteStock.stockOutID, tblSiteStock.client_id, tblSiteStock.upload_date, tblLhw.staff_code, tblLhw.staff_name, tblSupervisors.sup_code, tblSupervisors.sup_name, tblGeoProvince.id AS province_id, tblGeoProvince.provinceName
FROM (tblSupervisors INNER JOIN (tblLhw INNER JOIN (((tblGeoDistrict INNER JOIN tblSiteStock ON tblGeoDistrict.id = tblSiteStock.district_id) INNER JOIN tblGeoTehsil ON tblSiteStock.tehsil_id = tblGeoTehsil.id) INNER JOIN tblGeoUC ON tblSiteStock.uc_id = tblGeoUC.id) ON tblLhw.staff_code = tblSiteStock.CHW_id) ON tblSupervisors.sup_code = tblSiteStock.CHS_id) INNER JOIN tblGeoProvince ON tblGeoDistrict.province_id = tblGeoProvince.id;`)
    .raw(`CREATE VIEW 'v_comm_otp_add_and_followup'
AS
SELECT ALL 
           [main].[tblOtpAdd].[otp_id], 
           [main].[tblOtpAdd].[muac], 
           [main].[tblOtpAdd].[weight], 
           [main].[tblOtpAdd].[ration1], 
           [main].[tblOtpAdd].[quantity1], 
           [main].[tblOtpAdd].[ration2], 
           [main].[tblOtpAdd].[quantity2], 
           [main].[tblOtpAdd].[ration3], 
           [main].[tblOtpAdd].[quantity3], 
           [main].[tblOtpAdd].[reg_date] AS [date], 
           '' AS [status], 
           'Admision' AS [record_type]
FROM   [main].[tblOtpAdd]
WHERE  [main].[tblOtpAdd].[prog_type] = 'otp'
       AND [main].[tblOtpAdd].[is_deleted] = 0
UNION ALL
SELECT ALL 
           [main].[tblOtpFollowup].[otp_id], 
           [main].[tblOtpFollowup].[muac], 
           [main].[tblOtpFollowup].[weight], 
           [main].[tblOtpFollowup].[ration1], 
           [main].[tblOtpFollowup].[quantity1], 
           [main].[tblOtpFollowup].[ration2], 
           [main].[tblOtpFollowup].[quantity2], 
           [main].[tblOtpFollowup].[ration3], 
           [main].[tblOtpFollowup].[quantity3], 
           [main].[tblOtpFollowup].[curr_date] AS [date], 
           [main].[tblOtpFollowup].[status], 
           'Follow Up' AS [record_type]
FROM   [main].[tblOtpFollowup]
WHERE  [main].[tblOtpFollowup].[is_deleted] = 0;

`)
    .raw(`CREATE VIEW 'v_otp_add_followup_report'
AS
SELECT ALL 
           [main].[v_geo].[province], 
           [main].[v_geo].[province_id], 
           [main].[v_geo].[district_name], 
           [main].[v_geo].[district_id], 
           [main].[v_geo].[tehsil_name], 
           [main].[v_geo].[tehsil_id], 
           [main].[v_geo].[uc_name], 
           [main].[v_geo].[uc_id], 
           [main].[v_geo].[site_name], 
           [main].[v_geo].[site_id], 
           [main].[tblOtpAdd].[reg_id], 
           [main].[tblOtpAdd].[p_name], 
           [main].[tblOtpAdd].[f_or_h_name], 
           [main].[tblOtpAdd].[cnic], 
           [main].[tblOtpAdd].[cnt_number], 
           [main].[tblOtpAdd].[address], 
           [main].[tblOtpAdd].[age], 
           [main].[tblOtpAdd].[gender], 
           [main].[tblOtpAdd].[ent_reason], 
           [main].[tblOtpAdd].[ref_type], 
           [main].[tblOtpAdd].[oedema], 
           [main].[tblOtpAdd].[diarrhoea], 
           [main].[tblOtpAdd].[vomiting], 
           [main].[tblOtpAdd].[cough], 
           [main].[tblOtpAdd].[appetite], 
           [main].[tblOtpAdd].[daily_stool], 
           [main].[tblOtpAdd].[pass_urine], 
           [main].[tblOtpAdd].[b_Feeding], 
           [main].[tblOtpAdd].[is_mother_alive], 
           [main].[v_comm_otp_add_and_followup].[muac], 
           [main].[v_comm_otp_add_and_followup].[weight], 
           [main].[v_comm_otp_add_and_followup].[ration1], 
           [main].[v_comm_otp_add_and_followup].[quantity1], 
           [main].[v_comm_otp_add_and_followup].[ration2], 
           [main].[v_comm_otp_add_and_followup].[quantity2], 
           [main].[v_comm_otp_add_and_followup].[ration3], 
           [main].[v_comm_otp_add_and_followup].[quantity3], 
           [main].[v_comm_otp_add_and_followup].[date], 
           [main].[v_comm_otp_add_and_followup].[status], 
           [main].[v_comm_otp_add_and_followup].[record_type]
FROM   [main].[tblOtpAdd]
       INNER JOIN [main].[v_geo] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
       LEFT JOIN [main].[v_comm_otp_add_and_followup] ON [main].[v_comm_otp_add_and_followup].[otp_id] = [main].[tblOtpAdd].[otp_id]
WHERE  [main].[tblOtpAdd].[is_deleted] = 0
       AND [main].[tblOtpAdd].[prog_type] = 'otp';

`)
    .raw(`create view v_geo_active as SELECT 
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
where tblGeoUC.isActive = 1 and [tblGeoTehsil].isActive = 1 and [tblGeoNutSite].isActive = 1 and [tblGeoDistrict].isActive = 1;
`)
    .raw(`create view v_OtpAdd_yearmonth as
select site_id, strftime('%Y-%m', reg_date) as Year_month, (case when age>5 and age <24 then '6_23' when age>23 and age < 60 then '24_59' end) as age_grp, gender, count(otp_id) as tAdd
from tblOtpAdd
where is_deleted = 0 and prog_type = 'otp'
group by site_id, Year_month, age_grp, gender;`)
    .raw(`create view v_OtpExit_yearmonth as SELECT 
[main].[tblOtpAdd].[site_id], 
strftime('%Y-%m',[main].[tblOtpExit].[exit_date]) as Year_month, 
(case when [main].[tblOtpAdd].[age] > 6  and [main].[tblOtpAdd].[age] <24 then '6_23' when [main].[tblOtpAdd].[age]> 23 and [main].[tblOtpAdd].[age] < 60 then '24_59' end) as age_grp, 
[main].[tblOtpAdd].[gender], 
COUNT ([main].[tblOtpExit].[exit_id]) AS [tExit]
FROM   [main].[tblOtpExit]
INNER JOIN [main].[tblOtpAdd] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
WHERE  [main].[tblOtpAdd].[is_deleted] = 0
  AND [main].[tblOtpExit].[is_deleted] = 0 and [main].[tblOtpAdd].[prog_type] = 'otp'
GROUP  BY
   [main].[tblOtpAdd].[site_id], 
   Year_month, 
   age_grp, 
   [main].[tblOtpAdd].[gender]`)
    .raw(`create view v_otp_remaining as SELECT 
   [main].[v_OtpAdd_yearmonth].[site_id], 
   [main].[v_OtpAdd_yearmonth].[Year_month], 
   [main].[v_OtpAdd_yearmonth].[age_grp], 
   [main].[v_OtpAdd_yearmonth].[gender], 
   SUM ([main].[v_OtpAdd_yearmonth].[tAdd]) as tAdd, 
   SUM ([main].[v_OtpExit_yearmonth].[tExit]) as tExit,
   (SUM ([main].[v_OtpAdd_yearmonth].[tAdd]) -  case when SUM ([main].[v_OtpExit_yearmonth].[tExit]) is null then 0 else SUM ([main].[v_OtpExit_yearmonth].[tExit]) end) as rem
FROM   [main].[v_OtpAdd_yearmonth]
   LEFT JOIN [main].[v_OtpExit_yearmonth] ON [main].[v_OtpAdd_yearmonth].[site_id] = [main].[v_OtpExit_yearmonth].[site_id]
        AND [main].[v_OtpAdd_yearmonth].[Year_month] = [main].[v_OtpExit_yearmonth].[Year_month]
        AND [main].[v_OtpAdd_yearmonth].[age_grp] = [main].[v_OtpExit_yearmonth].[age_grp]
        AND [main].[v_OtpAdd_yearmonth].[gender] = [main].[v_OtpExit_yearmonth].[gender]
GROUP  BY
      [main].[v_OtpAdd_yearmonth].[site_id], 
      [main].[v_OtpAdd_yearmonth].[Year_month], 
      [main].[v_OtpAdd_yearmonth].[age_grp], 
      [main].[v_OtpAdd_yearmonth].[gender];`)
    .raw(`create view v_otp_remaining_geo as SELECT 
      [main].[v_geo].[province_id], 
      [main].[v_geo].[district_id], 
      [main].[v_geo].[tehsil_id], 
      [main].[v_geo].[uc_id], 
      [main].[v_geo].[site_id], 
      [main].[v_otp_remaining].[Year_month], 
      [main].[v_otp_remaining].[age_grp], 
      [main].[v_otp_remaining].[gender], 
      [main].[v_otp_remaining].[tAdd], 
      [main].[v_otp_remaining].[tExit], 
      [main].[v_otp_remaining].[rem]
FROM   [main].[v_geo]
      INNER JOIN [main].[v_otp_remaining] ON [main].[v_geo].[site_id] = [main].[v_otp_remaining].[site_id];`)
    .raw(`create view vSessionForReportNew as 
      SELECT 
             [vSessionsFullForUpdate].*, 
             [main].[tblSupervisors].[sup_name], 
             [main].[tblLhw].[staff_name]
      FROM   [main].[vSessionsFullForUpdate]
             LEFT JOIN [main].[tblSupervisors] ON [main].[vSessionsFullForUpdate].[CHS_id] = [main].[tblSupervisors].[sup_code]
             LEFT JOIN [main].[tblLhw] ON [main].[vSessionsFullForUpdate].[CHW_id] = [main].[tblLhw].[staff_code];`)
    .raw(`CREATE VIEW [v_exitNSCReport]
    AS
    SELECT 
           [main].[tblOtpExit].[exit_id], 
           [main].[tblOtpAdd].[otp_id], 
           [main].[tblOtpAdd].[tehsil_id], 
           [main].[tblOtpAdd].[age], 
           [main].[tblOtpAdd].[gender], 
           [main].[tblOtpAdd].[prog_type], 
           [main].[tblOtpExit].[exit_reason], 
           [main].[tblOtpExit].[exit_date]
    FROM   [main].[tblOtpAdd]
           INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
    WHERE  [main].[tblOtpAdd].[prog_type] = 'sc'
             AND [main].[tblOtpAdd].[is_deleted] = 0
             AND [main].[tblOtpExit].[is_deleted] = 0;`)
    .raw(`CREATE VIEW [v_geo_tehsil]
             AS
             SELECT 
                    [main].[tblGeoProvince].[provinceName] AS [province_name], 
                    [main].[tblGeoDistrict].[province_id], 
                    [main].[tblGeoDistrict].[districtName] AS [district_name], 
                    [main].[tblGeoTehsil].[district_id], 
                    [main].[tblGeoTehsil].[tehsilName] AS [tehsil_name], 
                    [main].[tblGeoTehsil].[id] AS [tehsil_id]
             FROM   [main].[tblGeoProvince]
                    INNER JOIN [main].[tblGeoDistrict] ON [main].[tblGeoProvince].[id] = [main].[tblGeoDistrict].[province_id]
                    INNER JOIN [main].[tblGeoTehsil] ON [main].[tblGeoDistrict].[id] = [main].[tblGeoTehsil].[district_id]
             WHERE  [main].[tblGeoProvince].[isActive] = 1
                      AND [main].[tblGeoDistrict].[isActive] = 1
                      AND [main].[tblGeoTehsil].[isActive] = 1;`)
    .raw(`CREATE VIEW [v_exitNSCReportInterval]
                        AS
                        SELECT 
                               [vnc].*, 
                               [vg].[province_id], 
                               [vg].[district_id]
                        FROM   [v_exitNSCReport] [vnc]
                               INNER JOIN [v_geo_tehsil] [vg] ON [vnc].[tehsil_id] = [vg].[tehsil_id];`)
    .raw(`CREATE VIEW [v_NSCAdd_yearmonth]
                        AS
                        SELECT 
                               [tehsil_id], 
                               STRFTIME ('%Y-%m', [reg_date]) AS [Year_month], 
                               (CASE WHEN [age] < 7 THEN '06' WHEN [age] > 6
                                 AND [age] < 24 THEN '623' WHEN [age] > 23 THEN '2459' END) AS [age_group], 
                               [gender], 
                               COUNT ([otp_id]) AS [tAdd]
                        FROM   [tblOtpAdd]
                        WHERE  [is_deleted] = 0 AND [prog_type] = 'sc'
                        GROUP  BY
                                  [tehsil_id], 
                                  [Year_month], 
                                  [age_group], 
                                  [gender];`)
    .raw(`CREATE VIEW [v_nscExit_full]
                        AS
                        SELECT 
                               [main].[v_geo_tehsil].[province_id], 
                               [main].[v_geo_tehsil].[province_name] AS [province], 
                               [main].[v_geo_tehsil].[district_id], 
                               [main].[v_geo_tehsil].[district_name], 
                               [main].[v_geo_tehsil].[tehsil_id], 
                               [main].[v_geo_tehsil].[tehsil_name], 
                               [main].[tblOtpAdd].[address], 
                               [main].[tblOtpExit].[exit_date], 
                               [main].[tblOtpExit].[exit_reason], 
                               [main].[tblOtpAdd].[p_name], 
                               [main].[tblOtpAdd].[f_or_h_name], 
                               [main].[tblOtpAdd].[gender], 
                               [main].[tblOtpAdd].[reg_id], 
                               [main].[tblOtpAdd].[reg_date]
                        FROM   [main].[v_geo_tehsil]
                               INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo_tehsil].[tehsil_id] = [main].[tblOtpAdd].[tehsil_id]
                               INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
                        WHERE  [main].[tblOtpExit].[is_deleted] = 0
                                 AND [main].[tblOtpAdd].[is_deleted] = 0  AND [main].[tblOtpAdd].[prog_type] = 'sc';`)
    .raw(`CREATE VIEW [v_NSCExit_yearmonth]
                                 AS
                                 SELECT 
                                        [main].[tblOtpAdd].[tehsil_id], 
                                        STRFTIME ('%Y-%m', [main].[tblOtpExit].[exit_date]) AS [Year_month], 
                                        (CASE WHEN [age] < 7 THEN '06' WHEN [age] > 6
                                          AND [age] < 24 THEN '623' WHEN [age] > 23 THEN '2459' END) AS [age_group], 
                                        [main].[tblOtpAdd].[gender], 
                                        COUNT ([main].[tblOtpExit].[exit_id]) AS [tExit]
                                 FROM   [main].[tblOtpExit]
                                        INNER JOIN [main].[tblOtpAdd] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
                                 WHERE  [main].[tblOtpAdd].[is_deleted] = 0
                                          AND [main].[tblOtpExit].[is_deleted] = 0
                                          AND [main].[tblOtpAdd].[prog_type] = 'sc'
                                 GROUP  BY
                                           [main].[tblOtpAdd].[tehsil_id], 
                                           [Year_month], 
                                           [age_group], 
                                           [main].[tblOtpAdd].[gender];
                                 `)
    .raw(`CREATE VIEW [v_nsc_remaining]
                        AS
                        SELECT 
                               [main].[v_NSCAdd_yearmonth].[tehsil_id], 
                               [main].[v_NSCAdd_yearmonth].[Year_month], 
                               [main].[v_NSCAdd_yearmonth].[age_group], 
                               [main].[v_NSCAdd_yearmonth].[gender], 
                               SUM ([main].[v_NSCAdd_yearmonth].[tAdd]) AS [tAdd], 
                               SUM ([main].[v_NSCExit_yearmonth].[tExit]) AS [tExit], 
                               (SUM ([main].[v_NSCAdd_yearmonth].[tAdd]) - CASE WHEN SUM ([main].[v_NSCExit_yearmonth].[tExit]) IS NULL THEN 0 ELSE SUM ([main].[v_NSCExit_yearmonth].[tExit]) END) AS [rem]
                        FROM   [main].[v_NSCAdd_yearmonth]
                               LEFT JOIN [main].[v_NSCExit_yearmonth] ON [main].[v_NSCAdd_yearmonth].[tehsil_id] = [main].[v_NSCExit_yearmonth].[tehsil_id]
                                    AND [main].[v_NSCAdd_yearmonth].[Year_month] = [main].[v_NSCExit_yearmonth].[Year_month]
                                    AND [main].[v_NSCAdd_yearmonth].[age_group] = [main].[v_NSCExit_yearmonth].[age_group]
                                    AND [main].[v_NSCAdd_yearmonth].[gender] = [main].[v_NSCExit_yearmonth].[gender]
                        GROUP  BY
                                  [main].[v_NSCAdd_yearmonth].[tehsil_id], 
                                  [main].[v_NSCAdd_yearmonth].[Year_month], 
                                  [main].[v_NSCAdd_yearmonth].[age_group], 
                                  [main].[v_NSCAdd_yearmonth].[gender];
                        
                        `)
    .raw(`CREATE VIEW [v_nsc_remaining_geo]
                        AS
                        SELECT 
                               [main].[v_geo_tehsil].[province_id], 
                               [main].[v_geo_tehsil].[district_id], 
                               [main].[v_geo_tehsil].[tehsil_id], 
                               [main].[v_nsc_remaining].[Year_month], 
                               [main].[v_nsc_remaining].[age_group] AS [age_group], 
                               [main].[v_nsc_remaining].[gender], 
                               [main].[v_nsc_remaining].[tAdd], 
                               [main].[v_nsc_remaining].[tExit], 
                               [main].[v_nsc_remaining].[rem]
                        FROM   [main].[v_geo_tehsil]
                               INNER JOIN [main].[v_nsc_remaining] ON [main].[v_geo_tehsil].[tehsil_id] = [main].[v_nsc_remaining].[tehsil_id];
                        `)
    .raw(`CREATE VIEW 'v_otpAddmision2'
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
                               [tblOtpAdd].*
                        FROM   [main].[v_geo]
                               INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
                        WHERE  [main].[tblOtpAdd].[is_deleted] = 0
                        UNION ALL
                        SELECT 
                               [v_geo_tehsil].[province_id], 
                               [v_geo_tehsil].[province_name] AS [province], 
                               [v_geo_tehsil].[district_id], 
                               [v_geo_tehsil].[district_name], 
                               [v_geo_tehsil].[tehsil_id], 
                               [v_geo_tehsil].[tehsil_name], 
                               '' AS [uc_id], 
                               '' AS [uc_name], 
                               '' AS [site_name], 
                               [tblOtpAdd].*
                        FROM   [main].[v_geo_tehsil]
                               INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo_tehsil].[tehsil_id] = [main].[tblOtpAdd].[tehsil_id]
                        WHERE  [main].[tblOtpAdd].[is_deleted] = 0
                                 AND [main].[tblOtpAdd].[prog_type] = 'sc';
                        `)
    .raw(`CREATE VIEW 'v_otpExitFullForUpdateNSC'
                        AS
                        SELECT 
                               [main].[tblOtpAdd].[site_id], 
                               [main].[tblOtpAdd].[p_name], 
                               [main].[tblOtpAdd].[reg_id], 
                               [main].[tblOtpAdd].[site_village], 
                               [main].[tblOtpAdd].[prog_type], 
                               [main].[v_geo].[province_id], 
                               [main].[v_geo].[province], 
                               [main].[v_geo].[district_id], 
                               [main].[v_geo].[district_name], 
                               [main].[v_geo].[tehsil_id], 
                               [main].[v_geo].[tehsil_name], 
                               [main].[v_geo].[uc_id], 
                               [main].[v_geo].[uc_name], 
                               [main].[v_geo].[site_name], 
                               [tblOtpExit].*
                        FROM   [main].[tblOtpAdd]
                               INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
                               INNER JOIN [main].[v_geo] ON [main].[tblOtpAdd].[site_id] = [main].[v_geo].[site_id]
                        WHERE  [tblOtpExit].[is_deleted] = 0
                        UNION ALL
                        SELECT 
                               [main].[tblOtpAdd].[site_id], 
                               [main].[tblOtpAdd].[p_name], 
                               [main].[tblOtpAdd].[reg_id], 
                               [main].[tblOtpAdd].[site_village], 
                               [main].[tblOtpAdd].[prog_type], 
                               [main].[v_geo_tehsil].[province_id], 
                               [main].[v_geo_tehsil].[province_name] AS [province], 
                               [main].[v_geo_tehsil].[district_id], 
                               [main].[v_geo_tehsil].[district_name], 
                               [main].[v_geo_tehsil].[tehsil_id], 
                               [main].[v_geo_tehsil].[tehsil_name], 
                               '' AS [uc_id], 
                               '' AS [uc_name], 
                               '' AS [site_name], 
                               [tblOtpExit].*
                        FROM   [main].[tblOtpAdd]
                               INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
                               INNER JOIN [main].[v_geo_tehsil] ON [main].[tblOtpAdd].[tehsil_id] = [main].[v_geo_tehsil].[tehsil_id]
                        WHERE  [tblOtpExit].[is_deleted] = 0
                                 AND [tblOtpAdd].[prog_type] = 'sc';
                        `)
};

exports.down = function (knex, Promise) {
  return knex.schema
    .raw(`drop view v_otpExitFullForUpdateNSC`)
    .raw(`drop view v_otpAddmision2`)
    .raw(`drop view v_nsc_remaining_geo`)
    .raw(`drop view v_nsc_remaining`)
    .raw(`drop view v_NSCExit_yearmonth`)
    .raw(`drop view v_nscExit_full`)
    .raw(`drop view v_NSCAdd_yearmonth`)
    .raw(`drop view v_exitNSCReportInterval`)
    .raw(`drop view v_geo_tehsil`)
    .raw(`drop view v_exitNSCReport`)
    .raw(`drop view vSessionForReportNew`)
    .raw('drop view v_OtpAdd_yearmonth')
    .raw('drop view v_OtpExit_yearmonth')
    .raw('drop view v_otp_remaining')
    .raw('drop view v_otp_remaining_geo')
    .raw("DROP VIEW v_geo_active")
    .raw("DROP VIEW v_otp_add_followup_report")
    .raw("DROP VIEW v_comm_otp_add_and_followup")
    .raw("DROP VIEW v_stockReport")
    .raw("DROP VIEW v_ScrPlwUpd")
    .raw("DROP VIEW v_ScrChildUpd")
    .raw("DROP VIEW v_geo_uc")
    .dropTable("tblConfig")
    .raw("DROP VIEW v_otpFollowupUpdate")
    .raw("DROP VIEW v_tblScrPlwFull")
    .raw("DROP VIEW v_tblScrChildrenFull")
    .raw("DROP VIEW v_StockMovementv2")
    .raw("DROP VIEW v_stockMovements")
    .raw("DROP VIEW v_StockMovement")
    .raw("DROP VIEW v_stockIn")
    .raw("DROP VIEW v_stockDistv2")
    .raw("DROP VIEW v_stockDist")
    .raw("DROP VIEW v_session_full")
    .raw("DROP VIEW v_scrPlwFull")
    .raw("DROP VIEW v_scrChildFull")
    .raw("DROP VIEW v_otpNotExitInterval")
    .raw("DROP VIEW v_otpNotExit")
    .raw("DROP VIEW v_otpExit_knex")
    // .raw("DROP VIEW v_exitOtpReport")
    .raw("DROP VIEW v_otpExitReportNew")
    .raw("DROP VIEW v_otpExitFull_report")
    .raw("DROP VIEW v_otpExit_full")
    .raw("DROP VIEW v_otpExitFullForUpdate")
    .raw("DROP VIEW v_OtpExit")
    .raw("DROP VIEW v_otpAddNewReport")
    .raw("DROP VIEW v_otpAddmision1")
    .raw("DROP VIEW v_otpAddmision")
    .raw("DROP VIEW v_otpAddInterval")
    .raw("DROP VIEW v_otpAddFull_report")
    .raw("DROP VIEW v_exitOtpReportInterval")
    .raw("DROP VIEW v_exitOtpReport")
    .raw("DROP VIEW v_defaulter")
    .raw("DROP VIEW v_default_initial")
    .raw("DROP VIEW v_otpAdd_full")
    .raw("DROP VIEW v_availableCom")
    .raw("DROP VIEW v_totlStockIn")
    .raw("DROP VIEW v_totalSiteStock")
    .raw("DROP VIEW vStockDistReport")
    .raw('drop view v_geo_lhw')
    .raw("DROP VIEW vSessionsFullForUpdate")
    .raw("DROP VIEW scr_report_final")
    .raw("DROP VIEW v_screening")
    .raw("DROP VIEW v_geo")
    .dropTable(`tblVillages`)
    .dropTable(`tblVillage`)
    .dropTable(`tblSupervisors`)
    .dropTable(`tblStokDistv2`)
    .dropTable(`tblStockRequest`)
    .dropTable(`tblStock`)
    .dropTable(`tblSiteStock`)
    .dropTable(`tblSessions`)
    .dropTable(`tblScrStockDist`)
    .dropTable(`tblScrPlw`)
    .dropTable(`tblScrChildren`)
    .dropTable(`tblOtpFollowup`)
    .dropTable(`tblOtpExit`)
    .dropTable(`tblOtpAdd`)
    .dropTable(`tblLhw`)
    .dropTable(`tblInterimOtp`)
    .dropTable(`tblGeoUC`)
    .dropTable(`tblGeoTehsil`)
    .dropTable(`tblGeoProvince`)
    .dropTable("tblGeoNutSite")
    .dropTable("tblGeoDistrict")
    .dropTable(`tblCommodity`)
    .dropTable("Screening");
};