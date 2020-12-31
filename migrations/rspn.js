var x = `CREATE TABLE IF NOT EXISTS  [Screening](
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
       [project_name] VARCHAR(50));
     
     CREATE TABLE IF NOT EXISTS  [tblCommodity](
       [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
       [item_name] VARCHAR, 
       [item_desc] VARCHAR, 
       [item_unit] VARCHAR, 
       [item_sub_unit] VARCHAR, 
       [prog_type] varchar(50));
     
     CREATE TABLE IF NOT EXISTS  'tblConfig'(
       'description' varchar(255), 
       'value' varchar(255));
     
     CREATE TABLE IF NOT EXISTS  [tblGeoDistrict](
       [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
       [districtName] varchar(255), 
       [province_id] integer, 
       [created_at] datetime, 
       [updated_at] datetime, 
       [isActive] BOOLEAN DEFAULT 1);
     
     CREATE TABLE IF NOT EXISTS  [tblGeoNutSite](
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
       [isActive] BOOLEAN DEFAULT 1);
     
     CREATE TABLE IF NOT EXISTS  [tblGeoProvince](
       [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
       [provinceName] varchar(255), 
       [created_at] datetime, 
       [updated_at] datetime, 
       [isActive] BOOLEAN DEFAULT 1);
     
     CREATE TABLE IF NOT EXISTS  [tblGeoTehsil](
       [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
       [tehsilName] varchar(255), 
       [district_id] integer, 
       [created_at] datetime, 
       [updated_at] datetime, 
       [isActive] BOOLEAN DEFAULT 1);
     
     CREATE TABLE IF NOT EXISTS  [tblGeoUC](
       [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
       [ucName] varchar(255), 
       [tehsil_id] integer, 
       [created_at] datetime, 
       [updated_at] datetime, 
       [isActive] BOOLEAN DEFAULT 1);
     
     CREATE TABLE IF NOT EXISTS  [tblInterimOtp](
       [interim_id] char(36), 
       [interim_id_old] integer, 
       [otp_id_old] integer, 
       [otp_id] char(36), 
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
       [other_com_qty] DECIMAL DEFAULT 0);
     
     CREATE TABLE IF NOT EXISTS  [tblInterimOtp_old](
       [interim_id] TEXT, 
       [interim_id_old] INT, 
       [otp_id_old] INT, 
       [otp_id] TEXT, 
       [client_id] TEXT, 
       [muac] INT, 
       [weight] INT, 
       [height] INT, 
       [ration1] TEXT, 
       [quantity1] INT, 
       [ration2] TEXT, 
       [quantity2] INT, 
       [ration3] TEXT, 
       [quantity3] INT, 
       [int_prog_type] TEXT, 
       [curr_date] NUM, 
       [status] TEXT, 
       [next_followup] NUM, 
       [created_at] NUM, 
       [updated_at] NUM, 
       [is_deleted] INT, 
       [other_com_name] TEXT, 
       [other_com_qty] NUM);
     
     CREATE TABLE IF NOT EXISTS  [tblLhw](
       [site] INT, 
       [uc] INT NOT NULL, 
       [tehsil] INT NOT NULL, 
       [district] INT NOT NULL, 
       [staff_name] VARCHAR(50) NOT NULL, 
       [staff_code] VARCHAR(10) NOT NULL UNIQUE, 
       [province] INT NOT NULL, 
       [id_old] INTEGER, 
       [id] char(36), 
       [client_id] VARCHAR NOT NULL, 
       [upload_status] INT NOT NULL DEFAULT 0, 
       [created_at] DATE, 
       [upload_date] DATE, 
       [is_deleted] BOOLEAN NOT NULL DEFAULT 0, 
       [org_name] VARCHAR(50), 
       [project_name] VARCHAR(50));
     
     CREATE TABLE IF NOT EXISTS  [tblLhw_old](
       [site] INT, 
       [uc] INT, 
       [tehsil] INT, 
       [district] INT, 
       [staff_name] TEXT, 
       [staff_code] TEXT, 
       [province] INT, 
       [id_old] INT, 
       [id] TEXT, 
       [client_id] TEXT, 
       [upload_status] INT, 
       [created_at] NUM, 
       [upload_date] NUM, 
       [is_deleted] NUM);
     
     CREATE TABLE IF NOT EXISTS  [tblOtpAdd](
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
     
     CREATE TABLE IF NOT EXISTS  [tblOtpAdd_old](
       [otp_id] TEXT, 
       [otp_id_old] INT, 
       [client_id] TEXT, 
       [site_id] INT, 
       [site_village] TEXT, 
       [reg_date] NUM, 
       [reg_id] TEXT, 
       [p_name] TEXT, 
       [f_or_h_name] TEXT, 
       [cnic] TEXT, 
       [address] TEXT, 
       [cnt_number] TEXT, 
       [age] INT, 
       [gender] TEXT, 
       [plw_type] TEXT, 
       [ent_reason] TEXT, 
       [ref_type] TEXT, 
       [oedema] TEXT, 
       [muac] REAL, 
       [diarrhoea] NUM, 
       [vomiting] NUM, 
       [cough] NUM, 
       [appetite] TEXT, 
       [daily_stool] TEXT, 
       [pass_urine] NUM, 
       [b_Feeding] NUM, 
       [weight] REAL, 
       [height] REAL, 
       [ration1] TEXT, 
       [quantity1] INT, 
       [ration2] TEXT, 
       [quantity2] INT, 
       [ration3] TEXT, 
       [quantity3] INT, 
       [prog_type] TEXT, 
       [created_at] NUM, 
       [updated_at] NUM, 
       [upload_status] INT, 
       [username] TEXT, 
       [org_name] TEXT, 
       [project_name] TEXT, 
       [is_deleted] NUM, 
       [other_com_name] TEXT, 
       [other_com_qty] REAL, 
       [nsc_old_otp_id] TEXT, 
       [ref_type_other] TEXT, 
       [entry_reason_other] TEXT, 
       [travel_time_minutes] INT, 
       [is_mother_alive] TEXT, 
       [tehsil_id] INT, 
       [nsc_otp_id] TEXT, 
       [upload_date] NUM, 
       [hh_id] TEXT);
     
     CREATE TABLE IF NOT EXISTS  [tblOtpExit](
       [exit_id_old] integer, 
       [exit_id] char(36), 
       [otp_id_old] integer, 
       [otp_id] char(36), 
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
     
     CREATE TABLE IF NOT EXISTS  [tblOtpExit_old](
       [exit_id_old] INT, 
       [exit_id] TEXT, 
       [otp_id_old] INT, 
       [otp_id] TEXT, 
       [client_id] TEXT, 
       [exit_muac] REAL, 
       [exit_weight] REAL, 
       [exit_height] REAL, 
       [exit_ration1] TEXT, 
       [exit_quantity1] INT, 
       [exit_ration2] TEXT, 
       [exit_quantity2] INT, 
       [exit_ration3] TEXT, 
       [exit_quantity3] INT, 
       [exit_prog_type] TEXT, 
       [exit_date] NUM, 
       [exit_reason] TEXT, 
       [created_at] NUM, 
       [updated_at] NUM, 
       [upload_status] INT, 
       [weight_gain] REAL, 
       [days_in_program] INT, 
       [is_deleted] NUM, 
       [exit_other_com_name] TEXT, 
       [exit_other_com_qty] REAL, 
       [upload_date] NUM);
     
     CREATE TABLE IF NOT EXISTS  [tblOtpFollowup](
       [followup_id] char(36), 
       [followup_id_old] integer, 
       [otp_id_old] integer, 
       [otp_id] char(36), 
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
       [upload_date] DATE);
     
     CREATE TABLE IF NOT EXISTS  [tblOtpFollowup_old](
       [followup_id] TEXT, 
       [followup_id_old] INT, 
       [otp_id_old] INT, 
       [otp_id] TEXT, 
       [client_id] TEXT, 
       [weight] NUM, 
       [height] NUM, 
       [ration1] TEXT, 
       [quantity1] INT, 
       [ration2] TEXT, 
       [quantity2] INT, 
       [ration3] TEXT, 
       [quantity3] INT, 
       [prog_type] TEXT, 
       [curr_date] NUM, 
       [status] TEXT, 
       [next_followup] NUM, 
       [created_at] NUM, 
       [updated_at] NUM, 
       [muac] INT, 
       [upload_status] INT, 
       [is_deleted] INT, 
       [other_com_name] TEXT, 
       [other_com_qty] REAL, 
       [upload_date] NUM);
     
     CREATE TABLE IF NOT EXISTS  [tblScrChildren](
       [ch_scr_id_old] INTEGER, 
       [ch_scr_id] char(36), 
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
       [total_exits] INTEGER DEFAULT 0, 
       [ent_type] CHAR(10), 
       [org_name] VARCHAR(50), 
       [province_id] INTEGER, 
       [district_id] INTEGER, 
       [tehsil_id] INTEGER, 
       [total_scr_boys_623] INTEGER, 
       [total_scr_girls_623] INTEGER, 
       [total_scr_boys_2459] INTEGER, 
       [total_scr_girls_2459] INTEGER, 
       [plus12_boys_623] INTEGER, 
       [plus12_girls_623] INTEGER, 
       [plus12_boys_2459] INTEGER, 
       [plus12_girls_2459] INTEGER, 
       [plus3_boys_623] INTEGER, 
       [plus3_girls_623] INTEGER, 
       [plus3_boys_2459] INTEGER, 
       [plus3_girls_2459] INTEGER, 
       [reffer_otp_boys_623_s1] INTEGER, 
       [reffer_otp_girls_623_s1] INTEGER, 
       [reffer_otp_boys_2459_s1] INTEGER, 
       [reffer_otp_girls_2459_s1] INTEGER, 
       [reffer_tsfp_boys_623_s1] INTEGER, 
       [reffer_tsfp_girls_623_s1] INTEGER, 
       [reffer_tsfp_boys_2459_s1] INTEGER, 
       [reffer_tsfp_girls_2459_s1] INTEGER, 
       [reffer_otp_boys_623_s2] INTEGER, 
       [reffer_otp_girls_623_s2] INTEGER, 
       [reffer_otp_boys_2459_s2] INTEGER, 
       [reffer_otp_girls_2459_s2] INTEGER, 
       [reffer_tsfp_boys_623_s2] INTEGER, 
       [reffer_tsfp_girls_623_s2] INTEGER, 
       [reffer_tsfp_boys_2459_s2] INTEGER, 
       [reffer_tsfp_girls_2459_s2] INTEGER, 
       [mnp_boys_623] INTEGER, 
       [mnp_girls_623] INTEGER, 
       [mnp_boys_2459] INTEGER, 
       [mnp_girls_2459] INTEGER, 
       [followup_boys_623] INTEGER, 
       [followup_girls_623] INTEGER, 
       [followup_boys_2459] INTEGER, 
       [followup_girls_2459] INTEGER, 
       [exits_boys_623] INTEGER, 
       [exits_girls_623] INTEGER, 
       [exits_boys_2459] INTEGER, 
       [exits_girls_2459] INTEGER, 
       [deworming_boys_623] INTEGER, 
       [deworming_girls_623] INTEGER, 
       [deworming_boys_2459] INTEGER, 
       [deworming_girls_2459] INTEGER, 
       [other_boys_623] INTEGER, 
       [other_girls_623] INTEGER, 
       [other_boys_2459] INTEGER, 
       [other_girls_2459] INTEGER);
     
     CREATE TABLE IF NOT EXISTS  [tblScrChildren_old](
       [ch_scr_id_old] INT, 
       [ch_scr_id] TEXT, 
       [site_id] INT, 
       [screening_date] NUM, 
       [created_at] NUM, 
       [catchment_population] INT, 
       [staff_name] TEXT, 
       [staff_code] TEXT, 
       [sup_name] TEXT, 
       [sup_code] TEXT, 
       [total_scr_girls] INT, 
       [total_scr_boys] INT, 
       [sam_without_comp_girls_623] INT, 
       [sam_without_comp_boys_623] INT, 
       [sam_with_comp_girls_623] INT, 
       [sam_with_comp_boys_623] INT, 
       [mam_girls_623] INT, 
       [mam_boys_623] INT, 
       [sam_without_comp_girls_2459] INT, 
       [sam_without_comp_boys_2459] INT, 
       [sam_with_comp_girls_2459] INT, 
       [sam_with_comp_boys_2459] INT, 
       [mam_girls_2459] INT, 
       [mam_boys_2459] INT, 
       [reffer_tsfp_girls] INT, 
       [reffer_otp_girls] INT, 
       [reffer_tsfp_boys] INT, 
       [reffer_otp_boys] INT, 
       [normal_boys_623] INT, 
       [normal_girls_623] INT, 
       [normal_boys_2459] INT, 
       [normal_girls_2459] INT, 
       [first_mnp_30_girls] INT, 
       [first_mnp_30_boys] INT, 
       [second_mnp_30_girls] INT, 
       [second_mnp_30_boys] INT, 
       [third_mnp_30_girls] INT, 
       [third_mnp_30_boys] INT, 
       [fourth_mnp_30_girls] INT, 
       [fourth_mnp_30_boys] INT, 
       [fifth_mnp_30_girls] INT, 
       [fifth_mnp_30_boys] INT, 
       [sixth_mnp_30_girls] INT, 
       [sixth_mnp_30_boys] INT, 
       [deworming_girls] INT, 
       [deworming_boys] INT, 
       [new_boys] INT, 
       [new_girls] INT, 
       [reScreened_boys] INT, 
       [reScreened_girls] INT, 
       [no_oedema_girls] INT, 
       [no_oedema_boys] INT, 
       [plus12_oedema_girls] INT, 
       [plus12_oedema_boys] INT, 
       [plus3_oedema_girls] INT, 
       [plus3_oedema_boys] INT, 
       [client_id] INT, 
       [username] TEXT, 
       [project] TEXT, 
       [upload_status] INT, 
       [approved] INT, 
       [is_deleted] INT, 
       [report_month] TEXT, 
       [followedup_boys] INT, 
       [followedup_girls] INT, 
       [exits_boys] INT, 
       [exits_girls] INT, 
       [other_specify] TEXT, 
       [other_boys] INT, 
       [other_girls] INT, 
       [upload_date] NUM, 
       [site_one] TEXT, 
       [site_two] TEXT, 
       [reffer_otp_girls_s1] INT, 
       [reffer_otp_girls_s2] INT, 
       [reffer_otp_boys_s1] INT, 
       [reffer_otp_boys_s2] INT, 
       [reffer_tsfp_girls_s1] INT, 
       [reffer_tsfp_girls_s2] INT, 
       [total_hh] INT, 
       [uc_id] INT, 
       [reffer_tsfp_boys_s1] INT, 
       [reffer_tsfp_boys_s2] INT, 
       [mnp_boys] INT, 
       [mnp_girls] INT, 
       [total_followup] INT, 
       [total_exits] INT);
     
     CREATE TABLE IF NOT EXISTS  [tblScrPlw](
       [plw_scr_id_old] INTEGER, 
       [plw_scr_id] char(36), 
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
       [total_exits] INTEGER DEFAULT 0, 
       [org_name] VARCHAR(50), 
       [province_id] INTEGER, 
       [district_id] INTEGER, 
       [tehsil_id] VARCHAR, 
       [ent_type] CHAR(10), 
       [new_scr_plw] INTEGER, 
       [reScreened_scr_plw] INTEGER, 
       [muac_gt_21_plw] INTEGER, 
       [muac_le_21_plw] INTEGER, 
       [ifa_first_time_plw] INTEGER, 
       [total_scr_plw] INTEGER);
     
     CREATE TABLE IF NOT EXISTS  [tblScrPlw_old](
       [plw_scr_id_old] INT, 
       [plw_scr_id] TEXT, 
       [site_id] INT, 
       [screening_date] NUM, 
       [created_at] NUM, 
       [village] TEXT, 
       [staff_name] TEXT, 
       [staff_code] TEXT, 
       [sup_name] TEXT, 
       [sup_code] TEXT, 
       [total_scr_pragnent] INT, 
       [total_scr_lactating] INT, 
       [new_scr_pragnent] INT, 
       [new_scr_lactating] INT, 
       [reScreened_scr_pragnent] INT, 
       [reScreened_scr_lactating] INT, 
       [muac_gt_21_pragnent] INT, 
       [muac_gt_21_lactating] INT, 
       [muac_le_21_pragnent] INT, 
       [muac_le_21_lactating] INT, 
       [client_id] TEXT, 
       [username] TEXT, 
       [project] TEXT, 
       [upload_status] INT, 
       [approved] INT, 
       [is_deleted] INT, 
       [report_month] TEXT, 
       [ifa_first_time_pragnent] INT, 
       [ifa_first_time_lactating] INT, 
       [followup_pragnent] INT, 
       [followup_lactating] INT, 
       [exits_pragnent] INT, 
       [exit_lactating] INT, 
       [upload_date] NUM, 
       [uc_id] INT, 
       [catchment_population] INT, 
       [total_hh], 
       [total_followup] INT, 
       [total_exits] INT);
     
     CREATE TABLE IF NOT EXISTS  [tblScrStockDist](
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
       [upload_status] INT NOT NULL DEFAULT 0);
     
     CREATE TABLE IF NOT EXISTS  [tblSessions](
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
       [tehsil_id] INTEGER, 
       [mtmg] INTEGER, 
       [ftfg] INTEGER);
     
     CREATE TABLE IF NOT EXISTS  [tblSessions_old](
       [session_id] TEXT, 
       [session_id_old] INT, 
       [site_id] INT, 
       [client_id] TEXT, 
       [session_date] NUM, 
       [session_type] TEXT, 
       [male_participants] INT, 
       [female_participants] INT, 
       [session_location] TEXT, 
       [upload_status] INT, 
       [created_at] NUM, 
       [updated_at] NUM, 
       [old_participants] INT, 
       [new_participants] INT, 
       [username] TEXT, 
       [org_name] TEXT, 
       [project_name] TEXT, 
       [pragnent] INT, 
       [lactating] INT, 
       [is_deleted] INT, 
       [remarks] TEXT, 
       [CHS_id] TEXT, 
       [CHW_id] TEXT, 
       [upload_date] NUM, 
       [prog_type] TEXT, 
       [total_session] INT, 
       [ind_session] INT, 
       [grp_sessions] INT, 
       [uc_id] INT);
     
     CREATE TABLE IF NOT EXISTS  [tblSiteStock](
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
     
     CREATE TABLE IF NOT EXISTS  [tblSiteStock_old](
       [stock_out_id_old] INT, 
       [stock_out_id] TEXT, 
       [program_type] TEXT, 
       [item_id] INT, 
       [item_name] TEXT, 
       [stock_release_date] NUM, 
       [quantity_released] NUM, 
       [district_id] INT, 
       [tehsil_id] INT, 
       [site_id] INT, 
       [CHW_id] TEXT, 
       [CHS_id] TEXT, 
       [is_deleted] INT, 
       [upload_status] INT, 
       [created_at] NUM, 
       [updated_at] NUM, 
       [stockOutID] TEXT, 
       [client_id] TEXT, 
       [upload_date] NUM, 
       [uc_id] INT);
     
     CREATE TABLE IF NOT EXISTS  [tblStock](
       [id] char(36), 
       [id_old] integer, 
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
       [upload_date] DATE, 
       [org_name] VARCHAR(50), 
       [project_name] VARCHAR(50));
     
     CREATE TABLE IF NOT EXISTS  [tblStockRequest](
       [id] INT PRIMARY KEY UNIQUE, 
       [req_date] DATE NOT NULL, 
       [req_district] VARCHAR NOT NULL, 
       [req_email] VARCHAR NOT NULL, 
       [req_sender] VARCHAR NOT NULL, 
       [req_data] TEXT NOT NULL, 
       [req_id] VARCHAR NOT NULL, 
       [client_id] VARCHAR, 
       [upload_status] INT DEFAULT 0);
     
     CREATE TABLE IF NOT EXISTS  [tblStock_old](
       [id] TEXT, 
       [id_old] INT, 
       [dn_number] TEXT, 
       [dn_date] NUM, 
       [item_name] TEXT, 
       [item_desc] TEXT, 
       [disp_qty] INT, 
       [disp_unit] TEXT, 
       [disp_sub_unit] TEXT, 
       [rec_qty] INT, 
       [rec_obs] TEXT, 
       [lost_and_damage] NUM, 
       [expiry_date] NUM, 
       [client_id] TEXT, 
       [upload_status] INT, 
       [upload_date] NUM);
     
     CREATE TABLE IF NOT EXISTS  [tblStokDistv2](
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
     
     CREATE TABLE IF NOT EXISTS  [tblStokDistv2_old](
       [dist_id_old] INT, 
       [dist_id] TEXT, 
       [program_type] TEXT, 
       [item_name] TEXT, 
       [item_id] INT, 
       [opening] NUM, 
       [received] NUM, 
       [distributed] NUM, 
       [remaining] NUM, 
       [district_id] INT, 
       [tehsil_id] INT, 
       [site_id] INT, 
       [CHW_id] INT, 
       [CHS_id] INT, 
       [is_deleted] INT, 
       [upload_status] INT, 
       [created_at] NUM, 
       [updated_at] NUM, 
       [stockDistId] TEXT, 
       [damaged] NUM, 
       [dist_month] TEXT, 
       [province_id] INT, 
       [uc_id] INT, 
       [client_id] TEXT, 
       [upload_date] NUM);
     
     CREATE TABLE IF NOT EXISTS  [tblSupervisors](
       [site] INT, 
       [uc] INT NOT NULL, 
       [tehsil] INT NOT NULL, 
       [district] INT NOT NULL, 
       [sup_name] varchar(50) NOT NULL, 
       [sup_code] VARCHAR(10) NOT NULL UNIQUE, 
       [province] INT NOT NULL, 
       [id_old] INTEGER, 
       [id] char(36), 
       [client_id] VARCHAR NOT NULL, 
       [upload_status] VARCHAR NOT NULL DEFAULT 0, 
       [created_at] DATE NOT NULL, 
       [upload_date] DATE, 
       [is_deleted] BOOLEAN NOT NULL DEFAULT 0, 
       [org_name] VARCHAR(50), 
       [project_name] VARCHAR(50), 
       UNIQUE([sup_code], [district]) ON CONFLICT ROLLBACK);
     
     CREATE TABLE IF NOT EXISTS  [tblSupervisors_old](
       [site] INT, 
       [uc] INT, 
       [tehsil] INT, 
       [district] INT, 
       [sup_name] TEXT, 
       [sup_code] TEXT, 
       [province] INT, 
       [id_old] INT, 
       [id] TEXT, 
       [client_id] TEXT, 
       [upload_status] TEXT, 
       [created_at] NUM, 
       [upload_date] NUM, 
       [is_deleted] NUM);
     
     CREATE TABLE IF NOT EXISTS  'tblUpdates'(
       'id' integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
       'version' integer, 
       'description' varchar(255));
     
     CREATE TABLE IF NOT EXISTS  'tblUpdateTracker'(
       'tableName' varchar(100), 
       'old_id' varchar(100), 
       'new_id' varchar(100), 
       'backup_name' varchar(100));
     
     CREATE TABLE IF NOT EXISTS  [tblVillage](
       [vill_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
       [site_id] integer, 
       [village] varchar(255), 
       [created_at] datetime, 
       [updated_at] datetime);
     
     CREATE TABLE IF NOT EXISTS  [tblVillages](
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
     
     CREATE TABLE IF NOT EXISTS  [tblVillages_old](
       [site] INT, 
       [uc] INT, 
       [tehsil] INT, 
       [district] INT, 
       [villageName] TEXT, 
       [province] INT, 
       [id_old] INT, 
       [id] TEXT, 
       [client_id] TEXT, 
       [upload_status] INT, 
       [created_at] NUM, 
       [upload_date] NUM, 
       [is_deleted] NUM);
     
     CREATE VIEW IF NOT EXISTS  [allExitsNotDel]
     AS
     SELECT *
     FROM   [tblOtpExit]
     WHERE  [is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_geo_active]
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
     
     CREATE VIEW IF NOT EXISTS  [allNSCAdmisions]
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
              AND [tblOtpAdd].[prog_type] = 'sc'
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
              AND [tblOtpAdd].[prog_type] = 'sc'
              AND ([tblOtpAdd].[site_id] = ''
              OR [tblOtpAdd].[site_id] IS NULL);
     
     CREATE VIEW IF NOT EXISTS  [v_geo]
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
            INNER JOIN [tblGeoNutSite] ON [tblGeoUC].[id] = [tblGeoNutSite].[uc_id];
     
     CREATE VIEW IF NOT EXISTS  [v_geo_tehsil]
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
              AND [main].[tblGeoTehsil].[isActive] = 1;
     
     CREATE VIEW IF NOT EXISTS  [allNSCExits]
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
              AND [main].[tblOtpAdd].[prog_type] = 'sc'
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
              AND [tblOtpAdd].[prog_type] = 'sc'
              AND ([main].[tblOtpAdd].[site_id] IS NULL
              OR [main].[tblOtpAdd].[site_id] = '');
     
     CREATE VIEW IF NOT EXISTS  [allOtpAdmisions]
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
              AND [tblOtpAdd].[prog_type] = 'otp';
     
     CREATE VIEW IF NOT EXISTS  [allOtpExits]
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
              AND [main].[tblOtpAdd].[prog_type] = 'otp';
     
     CREATE VIEW IF NOT EXISTS  [oneTable]
     AS
     SELECT 
            [tblOtpAdd].*, 
            [tblOtpExit].[exit_muac], 
            [tblOtpExit].[exit_weight], 
            [tblOtpExit].[exit_height], 
            [tblOtpExit].[exit_reason], 
            [tblOtpExit].[exit_date]
     FROM   [tblOtpAdd]
            LEFT JOIN [tblOtpExit] ON [tblOtpAdd].[otp_id] = [tblOtpExit].[otp_id]
     WHERE  [tblOtpAdd].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [oneTableGeo]
     AS
     SELECT *
     FROM   [oneTable]
            INNER JOIN [v_geo_active] ON [oneTable].[site_id] = [v_geo_active].[site_id];
     
     CREATE VIEW IF NOT EXISTS  [v_screening]
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
            INNER JOIN [v_geo] ON [Screening].[site_id] = [v_geo].[site_id];
     
     CREATE VIEW IF NOT EXISTS  [scr_report_final]
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
               [screening_date];
     
     CREATE VIEW IF NOT EXISTS  [v_geo_uc]
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
     
     CREATE VIEW IF NOT EXISTS  [v_geo_lhw]
     AS
     SELECT 
            [v_geo_uc].*, 
            [main].[tblLhw].[staff_name], 
            [main].[tblLhw].[staff_code]
     FROM   [main].[v_geo_uc]
            INNER JOIN [main].[tblLhw] ON [main].[tblLhw].[uc] = [main].[v_geo_uc].[uc_id];
     
     CREATE VIEW IF NOT EXISTS  [vSessionsFullForUpdate]
     AS
     SELECT 
            [main].[v_geo_active].[province], 
            [main].[v_geo_active].[province_id], 
            [main].[v_geo_active].[district_id], 
            [main].[v_geo_active].[district_name], 
            [main].[v_geo_active].[tehsil_id], 
            [main].[v_geo_active].[tehsil_name], 
            [main].[v_geo_active].[uc_name], 
            [main].[v_geo_active].[site_name] AS [site_name], 
            [tblSessions].*
     FROM   [main].[tblSessions]
            INNER JOIN [main].[v_geo_active] ON ([main].[v_geo_active].[site_id] = [main].[tblSessions].[site_id])
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
            '' AS [site_name], 
            [tblSessions].*
     FROM   [main].[tblSessions]
            INNER JOIN [main].[v_geo_lhw] ON ([main].[v_geo_lhw].[uc_id] = [main].[tblSessions].[uc_id]
                 AND [main].[tblSessions].[CHW_id] = [main].[v_geo_lhw].[staff_code])
     WHERE  [tblsessions].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [vSessionForReportNew]
     AS
     SELECT 
            [vSessionsFullForUpdate].*, 
            [main].[tblSupervisors].[sup_name], 
            [main].[tblLhw].[staff_name]
     FROM   [main].[vSessionsFullForUpdate]
            LEFT JOIN [main].[tblSupervisors] ON [main].[vSessionsFullForUpdate].[CHS_id] = [main].[tblSupervisors].[sup_code]
            LEFT JOIN [main].[tblLhw] ON [main].[vSessionsFullForUpdate].[CHW_id] = [main].[tblLhw].[staff_code];
     
     CREATE VIEW IF NOT EXISTS  [vStockDistReport]
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
     WHERE  [main].[tblStokDistv2].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_totalSiteStock]
     AS
     SELECT 
            [main].[tblSiteStock].[item_name], 
            SUM ([main].[tblSiteStock].[quantity_released]) AS [released]
     FROM   [main].[tblSiteStock]
     WHERE  [tblSiteStock].[is_deleted] = 0
     GROUP  BY [main].[tblSiteStock].[item_name];
     
     CREATE VIEW IF NOT EXISTS  [v_totlStockIn]
     AS
     SELECT 
            [main].[tblStock].[item_name], 
            SUM ([main].[tblStock].[rec_qty]) AS [recieved]
     FROM   [main].[tblStock]
     GROUP  BY [main].[tblStock].[item_name];
     
     CREATE VIEW IF NOT EXISTS  [v_availableCom]
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
     
     CREATE VIEW IF NOT EXISTS  'v_comm_otp_add_and_followup'
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
     
     CREATE VIEW IF NOT EXISTS  [v_otpAdd_full]
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
     WHERE  [main].[tblOtpAdd].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_default_initial]
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
     WHERE  [main].[tblInterimOtp].[status] = 'open';
     
     CREATE VIEW IF NOT EXISTS  [v_defaulter]
     AS
     SELECT [v_default_initial].*
     FROM   [main].[v_default_initial]
     WHERE  [main].[v_default_initial].[Days since last follow up] > 21;
     
     CREATE VIEW IF NOT EXISTS  [v_exitNSCReport]
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
              AND [main].[tblOtpExit].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_exitNSCReportInterval]
     AS
     SELECT 
            [vnc].*, 
            [vg].[province_id], 
            [vg].[district_id]
     FROM   [v_exitNSCReport] [vnc]
            INNER JOIN [v_geo_tehsil] [vg] ON [vnc].[tehsil_id] = [vg].[tehsil_id];
     
     CREATE VIEW IF NOT EXISTS  [v_exitOtpReport]
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
     
     CREATE VIEW IF NOT EXISTS  [v_exitOtpReportInterval]
     AS
     SELECT 
            [ve].*, 
            [vg].[province_id], 
            [vg].[tehsil_id], 
            [vg].[district_id], 
            [vg].[uc_id]
     FROM   [v_exitOtpReport] [ve]
            INNER JOIN [v_geo] [vg] ON [ve].[site_id] = [vg].[site_id];
     
     CREATE VIEW IF NOT EXISTS  [v_NSCAdd_yearmonth]
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
               [gender];
     
     CREATE VIEW IF NOT EXISTS  [v_nscExit_full]
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
              AND [main].[tblOtpAdd].[is_deleted] = 0
              AND [main].[tblOtpAdd].[prog_type] = 'sc';
     
     CREATE VIEW IF NOT EXISTS  [v_NSCExit_yearmonth]
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
     
     CREATE VIEW IF NOT EXISTS  [v_nsc_remaining]
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
     
     CREATE VIEW IF NOT EXISTS  [v_nsc_remaining_geo]
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
     
     CREATE VIEW IF NOT EXISTS  [v_otpAddFull_report]
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
              OR [ent_reason] = 'def_otp' THEN '' END) AS 'default', 
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
     GROUP  BY [otp_id];
     
     CREATE VIEW IF NOT EXISTS  [v_otpAddInterval]
     AS
     SELECT 
            [vg].[province_id], 
            [t].*, 
            [vg].[district_id], 
            [vg].[tehsil_id], 
            [vg].[uc_id]
     FROM   [tblOtpAdd] [t]
            INNER JOIN [v_geo] [vg] ON [vg].[site_id] = [t].[site_id]
     WHERE  [t].[prog_type] = 'otp' AND [t].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_otpAddmision]
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
            FROM   [tblOtpExit]);
     
     CREATE VIEW IF NOT EXISTS  [v_otpAddmision1]
     AS
     SELECT 
            [v_geo].*, 
            [tblOtpAdd].*
     FROM   [main].[v_geo]
            INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
     WHERE  [main].[tblOtpAdd].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  'v_otpAddmision2'
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
     
     CREATE VIEW IF NOT EXISTS  [v_OtpAddmision3]
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
              OR [main].[tblOtpAdd].[site_id] = 'null');
     
     CREATE VIEW IF NOT EXISTS  [v_otpAddNewReport]
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
            INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id];
     
     CREATE VIEW IF NOT EXISTS  [v_OtpAdd_yearmonth]
     AS
     SELECT 
            [site_id], 
            STRFTIME ('%Y-%m', [reg_date]) AS [Year_month], 
            (CASE WHEN [age] > 5
              AND [age] < 24 THEN '6_23' WHEN [age] > 23
              AND [age] < 60 THEN '24_59' END) AS [age_grp], 
            [gender], 
            COUNT ([otp_id]) AS [tAdd]
     FROM   [tblOtpAdd]
     WHERE  [is_deleted] = 0 AND [prog_type] = 'otp'
     GROUP  BY
               [site_id], 
               [Year_month], 
               [age_grp], 
               [gender];
     
     CREATE VIEW IF NOT EXISTS  [v_OtpExit]
     AS
     SELECT 
            [tblOtpExit].*, 
            [tblOtpAdd].*
     FROM   [tblOtpExit]
            INNER JOIN [tblOtpAdd] ON [tblOtpExit].[otp_id] = [tblOtpAdd].[otp_id];
     
     CREATE VIEW IF NOT EXISTS  [v_otpExitFullForUpdate]
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
     WHERE  [tblOtpExit].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  'v_otpExitFullForUpdateNSC'
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
     
     CREATE VIEW IF NOT EXISTS  [v_otpExit_full]
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
              AND [main].[tblOtpAdd].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_otpExitFull_report]
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
     GROUP  BY [prog_type];
     
     CREATE VIEW IF NOT EXISTS  [v_otpExitReportNew]
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
            INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpExit].[otp_id] = [main].[tblOtpAdd].[otp_id];
     
     CREATE VIEW IF NOT EXISTS  [v_otpExit_knex]
     AS
     SELECT 
            [v_geo].*, 
            [v_OtpExit].*
     FROM   [main].[v_geo]
            INNER JOIN [main].[v_OtpExit] ON [main].[v_OtpExit].[site_id] = [main].[v_geo].[site_id];
     
     CREATE VIEW IF NOT EXISTS  [v_OtpExit_yearmonth]
     AS
     SELECT 
            [main].[tblOtpAdd].[site_id], 
            STRFTIME ('%Y-%m', [main].[tblOtpExit].[exit_date]) AS [Year_month], 
            (CASE WHEN [main].[tblOtpAdd].[age] > 6
              AND [main].[tblOtpAdd].[age] < 24 THEN '6_23' WHEN [main].[tblOtpAdd].[age] > 23
              AND [main].[tblOtpAdd].[age] < 60 THEN '24_59' END) AS [age_grp], 
            [main].[tblOtpAdd].[gender], 
            COUNT ([main].[tblOtpExit].[exit_id]) AS [tExit]
     FROM   [main].[tblOtpExit]
            INNER JOIN [main].[tblOtpAdd] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
     WHERE  [main].[tblOtpAdd].[is_deleted] = 0
              AND [main].[tblOtpExit].[is_deleted] = 0
              AND [main].[tblOtpAdd].[prog_type] = 'otp'
     GROUP  BY
               [main].[tblOtpAdd].[site_id], 
               [Year_month], 
               [age_grp], 
               [main].[tblOtpAdd].[gender];
     
     CREATE VIEW IF NOT EXISTS  [v_otpFollowupUpdate]
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
            INNER JOIN [main].[v_geo] ON [main].[tblOtpAdd].[site_id] = [main].[v_geo].[site_id];
     
     CREATE VIEW IF NOT EXISTS  [v_otpNotExit]
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
              AND [main].[tblOtpAdd].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_otpNotExitInterval]
     AS
     SELECT 
            [v_otpNotExit].*, 
            [main].[v_geo].[province_id], 
            [main].[v_geo].[district_id], 
            [main].[v_geo].[tehsil_id], 
            [main].[v_geo].[uc_id]
     FROM   [main].[v_otpNotExit]
            INNER JOIN [main].[v_geo] ON [main].[v_otpNotExit].[site_id] = [main].[v_geo].[site_id];
     
     CREATE VIEW IF NOT EXISTS  'v_otp_add_followup_report'
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
     
     CREATE VIEW IF NOT EXISTS  [v_otp_remaining]
     AS
     SELECT 
            [main].[v_OtpAdd_yearmonth].[site_id], 
            [main].[v_OtpAdd_yearmonth].[Year_month], 
            [main].[v_OtpAdd_yearmonth].[age_grp], 
            [main].[v_OtpAdd_yearmonth].[gender], 
            SUM ([main].[v_OtpAdd_yearmonth].[tAdd]) AS [tAdd], 
            SUM ([main].[v_OtpExit_yearmonth].[tExit]) AS [tExit], 
            (SUM ([main].[v_OtpAdd_yearmonth].[tAdd]) - CASE WHEN SUM ([main].[v_OtpExit_yearmonth].[tExit]) IS NULL THEN 0 ELSE SUM ([main].[v_OtpExit_yearmonth].[tExit]) END) AS [rem]
     FROM   [main].[v_OtpAdd_yearmonth]
            LEFT JOIN [main].[v_OtpExit_yearmonth] ON [main].[v_OtpAdd_yearmonth].[site_id] = [main].[v_OtpExit_yearmonth].[site_id]
                 AND [main].[v_OtpAdd_yearmonth].[Year_month] = [main].[v_OtpExit_yearmonth].[Year_month]
                 AND [main].[v_OtpAdd_yearmonth].[age_grp] = [main].[v_OtpExit_yearmonth].[age_grp]
                 AND [main].[v_OtpAdd_yearmonth].[gender] = [main].[v_OtpExit_yearmonth].[gender]
     GROUP  BY
               [main].[v_OtpAdd_yearmonth].[site_id], 
               [main].[v_OtpAdd_yearmonth].[Year_month], 
               [main].[v_OtpAdd_yearmonth].[age_grp], 
               [main].[v_OtpAdd_yearmonth].[gender];
     
     CREATE VIEW IF NOT EXISTS  [v_otp_remaining_geo]
     AS
     SELECT 
            [main].[v_geo].[province_id], 
            [main].[v_geo].[district_id], 
            [main].[v_geo].[tehsil_id], 
            [main].[v_geo].[uc_id], 
            [main].[v_geo].[site_id], 
            [main].[v_otp_remaining].[Year_month], 
            [main].[v_otp_remaining].[age_grp] AS [age_group], 
            [main].[v_otp_remaining].[gender], 
            [main].[v_otp_remaining].[tAdd], 
            [main].[v_otp_remaining].[tExit], 
            [main].[v_otp_remaining].[rem]
     FROM   [main].[v_geo]
            INNER JOIN [main].[v_otp_remaining] ON [main].[v_geo].[site_id] = [main].[v_otp_remaining].[site_id];
     
     CREATE VIEW IF NOT EXISTS  [v_scrChildFull]
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
     WHERE  [main].[tblScrChildren].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_ScrChildUpd]
     AS
     SELECT 
            [v_geo_uc].*, 
            [tblScrChildren].*
     FROM   [main].[v_geo_uc]
            INNER JOIN [main].[tblScrChildren] ON [main].[v_geo_uc].[uc_id] = [main].[tblScrChildren].[uc_id]
     WHERE  [tblScrChildren].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_scrPlwFull]
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
     WHERE  [main].[tblScrPlw].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_ScrPlwUpd]
     AS
     SELECT 
            [v_geo_uc].*, 
            [tblScrPlw].*
     FROM   [main].[v_geo_uc]
            INNER JOIN [main].[tblScrPlw] ON [main].[v_geo_uc].[uc_id] = [main].[tblScrPlw].[uc_id]
     WHERE  [tblScrPlw].[is_deleted] = 0;
     
     CREATE VIEW IF NOT EXISTS  [v_session_full]
     AS
     SELECT 
            [v_geo].*, 
            [tblSessions].*
     FROM   [main].[v_geo]
            INNER JOIN [main].[tblSessions] ON [main].[tblSessions].[site_id] = [main].[v_geo].[site_id];
     
     CREATE VIEW IF NOT EXISTS  [v_stockDist]
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
     WHERE  [ration] IS NOT NULL AND [quantity] > 0
     GROUP  BY
               [ration], 
               [month], 
               [year];
     
     CREATE VIEW IF NOT EXISTS  [v_stockDistv2]
     AS
     SELECT 
            [item_name] AS [ration], 
            SUM ([distributed]) [tQuantity], 
            SUBSTR ([dist_month], 0, 5) AS [year], 
            SUBSTR ([dist_month], 6, 2) AS [month]
     FROM   [tblStokDistv2]
     WHERE  [is_deleted] = 0
     GROUP  BY
               [ration], 
               [month], 
               [year];
     
     CREATE VIEW IF NOT EXISTS  [v_stockIn]
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
               [Year];
     
     CREATE VIEW IF NOT EXISTS  [v_StockMovement]
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
             WHERE  [main].[v_stockIn].[item_name] IS NULL);
     
     CREATE VIEW IF NOT EXISTS  [v_stockMovements]
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
     FROM   [v_stockIn];
     
     CREATE VIEW IF NOT EXISTS  [v_StockMovementv2]
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
             WHERE  [main].[v_stockIn].[item_name] IS NULL);
     
     CREATE VIEW IF NOT EXISTS  [v_stockReport]
     AS
     SELECT 
            [tblSiteStock].[stock_out_id], 
            [tblSiteStock].[program_type], 
            [tblSiteStock].[item_name], 
            [tblSiteStock].[stock_release_date], 
            [tblSiteStock].[quantity_released], 
            [tblSiteStock].[district_id], 
            [tblGeoDistrict].[districtName], 
            [tblSiteStock].[tehsil_id], 
            [tblGeoTehsil].[tehsilName], 
            [tblSiteStock].[uc_id], 
            [tblGeoUC].[ucName], 
            [tblSiteStock].[site_id], 
            [tblGeoNutSite].[siteName], 
            [tblSiteStock].[is_deleted], 
            [tblSiteStock].[upload_status], 
            [tblSiteStock].[created_at], 
            [tblSiteStock].[updated_at], 
            [tblSiteStock].[stockOutID], 
            [tblSiteStock].[client_id], 
            [tblSiteStock].[upload_date], 
            "" AS [staff_code], 
            "" AS [staff_name], 
            "" AS [sup_code], 
            "" AS [sup_name], 
            [tblGeoProvince].[id] AS [province_id], 
            [tblGeoProvince].[provinceName]
     FROM   (((([tblGeoDistrict]
                INNER JOIN [tblSiteStock] ON [tblGeoDistrict].[id] = [tblSiteStock].[district_id])
               INNER JOIN [tblGeoTehsil] ON [tblSiteStock].[tehsil_id] = [tblGeoTehsil].[id])
              INNER JOIN [tblGeoUC] ON [tblSiteStock].[uc_id] = [tblGeoUC].[id])
             INNER JOIN [tblGeoNutSite] ON [tblSiteStock].[site_id] = [tblGeoNutSite].[id])
            INNER JOIN [tblGeoProvince] ON [tblGeoDistrict].[province_id] = [tblGeoProvince].[id]
     UNION ALL
     SELECT 
            [tblSiteStock].[stock_out_id], 
            [tblSiteStock].[program_type], 
            [tblSiteStock].[item_name], 
            [tblSiteStock].[stock_release_date], 
            [tblSiteStock].[quantity_released], 
            [tblSiteStock].[district_id], 
            [tblGeoDistrict].[districtName], 
            [tblSiteStock].[tehsil_id], 
            [tblGeoTehsil].[tehsilName], 
            [tblSiteStock].[uc_id], 
            [tblGeoUC].[ucName], 
            [tblSiteStock].[site_id], 
            "" AS [siteName], 
            [tblSiteStock].[is_deleted], 
            [tblSiteStock].[upload_status], 
            [tblSiteStock].[created_at], 
            [tblSiteStock].[updated_at], 
            [tblSiteStock].[stockOutID], 
            [tblSiteStock].[client_id], 
            [tblSiteStock].[upload_date], 
            [tblLhw].[staff_code], 
            [tblLhw].[staff_name], 
            [tblSupervisors].[sup_code], 
            [tblSupervisors].[sup_name], 
            [tblGeoProvince].[id] AS [province_id], 
            [tblGeoProvince].[provinceName]
     FROM   ([tblSupervisors]
             INNER JOIN ([tblLhw]
              INNER JOIN ((([tblGeoDistrict]
                 INNER JOIN [tblSiteStock] ON [tblGeoDistrict].[id] = [tblSiteStock].[district_id])
                INNER JOIN [tblGeoTehsil] ON [tblSiteStock].[tehsil_id] = [tblGeoTehsil].[id])
               INNER JOIN [tblGeoUC] ON [tblSiteStock].[uc_id] = [tblGeoUC].[id]) ON [tblLhw].[staff_code] = [tblSiteStock].[CHW_id]) ON [tblSupervisors].[sup_code] = [tblSiteStock].[CHS_id])
            INNER JOIN [tblGeoProvince] ON [tblGeoDistrict].[province_id] = [tblGeoProvince].[id];
     
     CREATE VIEW IF NOT EXISTS  [v_tblScrChildrenFull]
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
            INNER JOIN [main].[v_geo] ON [main].[tblScrChildren].[site_id] = [main].[v_geo].[site_id];
     
     CREATE VIEW IF NOT EXISTS  [v_tblScrPlwFull]
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
            INNER JOIN [main].[tblScrPlw] ON [main].[tblScrPlw].[site_id] = [main].[v_geo].[site_id];
     
     `

module.exports = async function(knex){
    var y = x.split(';');
      try {
          
            for (one of y){
                if(one.length > 1){
                    await knex.raw(one)
                    console.log(one.substring(0,30))
                }

            }
            await knex('tblUpdates').insert({version:400, description:'Update Made to make changes for newly added features'})
            console.log('updated v400')
            // process.exit();
      } catch (error) {
          console.log({error})
          
      }
}