function createNewTable(knex, tabName, qry) {
  knex.schema.hasTable(tabName).then(function (exists) {
    if (!exists) {
      return knex.schema.raw(qry)
    }
  }).then(result => {
    console.log(tabName + ' created sucessfully')
  }).catch(e => {
    console.log(tabName + ' not created')
  })
}

module.exports.firstCreateDb = function (knex) {
  var qryScreening = `CREATE TABLE [Screening](
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
  `
  createNewTable(knex, 'Screening', qryScreening);
  var qryDistrict = `CREATE TABLE "tblGeoDistrict" ("id" integer not null primary key autoincrement, "districtName" varchar(255), "province_id" integer, "created_at" datetime, "updated_at" datetime);

  CREATE UNIQUE INDEX "tblgeodistrict_id_unique" on "tblGeoDistrict" ("id");
  `
  createNewTable(knex, 'tblGeoDistrict', qryDistrict);

  var qryNutSite = `CREATE TABLE "tblGeoNutSite" ("id" integer not null primary key autoincrement, "siteName" varchar(255), "province_id" integer, "district_id" integer, "tehsil_id" integer, "uc_id" integer, "OTP" integer, "SFP" integer, "SC" integer, "created_at" datetime, "updated_at" datetime);

  CREATE UNIQUE INDEX "tblgeonutsite_id_unique" on "tblGeoNutSite" ("id");
  `
  createNewTable(knex, 'tblGeoNutSite', qryNutSite);
  var qryProvince = `CREATE TABLE "tblGeoProvince" ("id" integer not null primary key autoincrement, "provinceName" varchar(255), "created_at" datetime, "updated_at" datetime);

  CREATE UNIQUE INDEX "tblgeoprovince_id_unique" on "tblGeoProvince" ("id");
  `
  createNewTable(knex, 'tblGeoProvince', qryProvince);
  var qryTehsil = `CREATE TABLE "tblGeoTehsil" ("id" integer not null primary key autoincrement, "tehsilName" varchar(255), "district_id" integer, "created_at" datetime, "updated_at" datetime);

  CREATE UNIQUE INDEX "tblgeotehsil_id_unique" on "tblGeoTehsil" ("id");
  `
  createNewTable(knex, 'tblGeoTehsil', qryTehsil);

  var qryUc = `CREATE TABLE "tblGeoUC" ("id" integer not null primary key autoincrement, "ucName" varchar(255), "tehsil_id" integer, "created_at" datetime, "updated_at" datetime);

  CREATE UNIQUE INDEX "tblgeouc_id_unique" on "tblGeoUC" ("id");
  `
  createNewTable(knex, 'tblGeoUC', qryUc);
  var qryInterm = `CREATE TABLE [tblInterimOtp](
  [interim_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [otp_id] integer, 
  [client_id] integer, 
  [muac] integer, 
  [weight] integer, 
  [height] integer, 
  [ration1] varchar(255), 
  [quantity1] integer, 
  [ration2] varchar(255), 
  [quantity2] integer, 
  [ration3] varchar(255), 
  [quantity3] integer, 
  [prog_type] varchar(255), 
  [curr_date] date, 
  [status] varchar(255), 
  [next_followup] date, 
  [created_at] datetime, 
  [updated_at] datetime, 
  [is_deleted] INT(1) NOT NULL DEFAULT 0, 
  [other_com_name] VARCHAR(20), 
  [other_com_qty] DECIMAL DEFAULT 0);
  `;
  createNewTable(knex, 'tblInterimOtp', qryInterm);

  var tblLhwQry = `CREATE TABLE [tblLhw](
  [site] INT NOT NULL, 
  [uc] INT NOT NULL, 
  [tehsil] INT NOT NULL, 
  [district] INT NOT NULL, 
  [staff_name] VARCHAR(50) NOT NULL, 
  [staff_code] VARCHAR(10) NOT NULL UNIQUE, 
  [province] INT NOT NULL, 
  [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [client_id] VARCHAR NOT NULL, 
  [upload_status] INT NOT NULL DEFAULT 0, 
  [created_at] DATE);
`;
  createNewTable(knex, "tblLhw", tblLhwQry);

  var tblScrStockDistQry = `CREATE TABLE [tblScrStockDist](
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
`;
  createNewTable(knex, "tblScrStockDist", tblScrStockDistQry);
  var qryAdmission = `CREATE TABLE [tblOtpAdd](
  [otp_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [client_id] integer, 
  [site_id] integer, 
  [site_village] varchar(255), 
  [reg_date] date, 
  [reg_id] varchar(255), 
  [p_name] varchar(255), 
  [f_or_h_name] varchar(255), 
  [cnic] integer, 
  [address] varchar(255), 
  [cnt_number] varchar(255), 
  [age] integer, 
  [gender] varchar(255), 
  [plw_type] varchar(255), 
  [ent_reason] varchar(255), 
  [ref_type] varchar(255), 
  [oedema] varchar(255), 
  [muac] integer, 
  [diarrhoea] integer, 
  [vomiting] integer, 
  [cough] integer, 
  [appetite] varchar(255), 
  [daily_stool] varchar(255), 
  [pass_urine] integer, 
  [b_Feeding] integer, 
  [weight] integer, 
  [height] integer, 
  [ration1] varchar(255), 
  [quantity1] integer, 
  [ration2] varchar(255), 
  [quantity2] integer, 
  [ration3] varchar(255), 
  [quantity3] integer, 
  [prog_type] varchar(255), 
  [created_at] datetime, 
  [updated_at] datetime, 
  [upload_status] INTEGER, 
  [username] VARCHAR(50), 
  [org_name] VARCHAR(50), 
  [project_name] VARCHAR(50), 
  [is_deleted] INT NOT NULL DEFAULT 0, 
  [other_com_name] VARCHAR(20), 
  [other_com_qty] DECIMAL DEFAULT 0, 
  [nsc_old_otp_id] VARCHAR DEFAULT 0);
  `;
  createNewTable(knex, 'tblOtpAdd', qryAdmission);
  var qryExit = `CREATE TABLE [tblOtpExit](
  [exit_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [otp_id] integer REFERENCES [tblOtpAdd]([otp_id]) ON DELETE RESTRICT ON UPDATE NO ACTION, 
  [client_id] integer, 
  [exit_muac] integer, 
  [exit_weight] integer, 
  [exit_height] integer, 
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
  [weight_gain] INTEGER(7), 
  [days_in_program] INTEGER(7), 
  [is_deleted] INT(1) NOT NULL DEFAULT 0, 
  [exit_other_com_name] VARCHAR(20), 
  [exit_other_com_qty] DECIMAL DEFAULT 0);

  `;
  createNewTable(knex, 'tblOtpExit', qryExit);
  var qryFollowup = `CREATE TABLE [tblOtpFollowup](
  [followup_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [otp_id] integer, 
  [client_id] integer, 
  [weight] integer, 
  [height] integer, 
  [ration1] varchar(255), 
  [quantity1] integer, 
  [ration2] varchar(255), 
  [quantity2] integer, 
  [ration3] varchar(255), 
  [quantity3] integer, 
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
  [other_com_qty] DECIMAL DEFAULT 0);

  `;
  createNewTable(knex, 'tblOtpFollowup', qryFollowup);
  var qrySession = `CREATE TABLE [tblSessions](
  [session_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [site_id] integer, 
  [client_id] varchar(255), 
  [session_date] date, 
  [session_type] varchar(255), 
  [old_male_participants] INTEGER,
  [new_male_participants] INTEGER, 
  [session_location] varchar(255), 
  [upload_status] integer, 
  [created_at] datetime, 
  [updated_at] datetime, 
  [old_female_participants] INTEGER,
  [new_female_participants] INTEGER, 
  [username] VARCHAR(50), 
  [org_name] VARCHAR(50), 
  [project_name] VARCHAR(50), 
  [pragnent] INT, 
  [lactating] INT,
  [is_deleted] INTEGER(1) NOT NULL DEFAULT 0);
  `;
  createNewTable(knex, 'tblSessions', qrySession);
  var qryVillage = `CREATE TABLE [tblVillage] ([vill_id] integer not null primary key autoincrement, [site_id] integer, [village] varchar(255), [created_at] datetime, [updated_at] datetime);

  CREATE UNIQUE INDEX "tblvillage_vill_id_unique" on "tblVillage" ("vill_id");
  `
  createNewTable(knex, 'tblVillage', qryVillage);
  var tblVillagesQry = `CREATE TABLE [tblVillages](
  [site] INT NOT NULL, 
  [uc] INT NOT NULL, 
  [tehsil] INT NOT NULL, 
  [district] INT NOT NULL, 
  [villageName] VARCHAR(50) NOT NULL, 
  [province] INT NOT NULL, 
  [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [client_id] VARCHAR NOT NULL, 
  [upload_status] INT NOT NULL DEFAULT 0, 
  [created_at] DATE);
`;
  createNewTable(knex, 'tblVillages', tblVillagesQry);
  
  
  var qryScrReportFinal = `CREATE VIEW scr_report_final as
  SELECT        province_id, district_id, tehsil_id, uc_id, site_id, screening_date, COUNT(CASE WHEN is_plw = 0 AND gender = 1 AND screening_type = 1 THEN 1 ELSE NULL END) AS tChildScrActive_M, COUNT(CASE WHEN is_plw = 0 AND 
                           gender = 2 AND screening_type = 1 THEN 1 ELSE NULL END) AS tChildScrActive_F, COUNT(CASE WHEN is_plw = 1 AND screening_type = 1 AND plw_type = 1 THEN 1 ELSE NULL END) AS tPlwScrActive_P, 
                           COUNT(CASE WHEN is_plw = 1 AND screening_type = 1 AND plw_type = 2 THEN 1 ELSE NULL END) AS tPlwScrActive_L, COUNT(CASE WHEN is_plw = 0 AND gender = 1 AND screening_type = 0 THEN 1 ELSE NULL END) 
                           AS tChildScrPassive_M, COUNT(CASE WHEN is_plw = 0 AND gender = 2 AND screening_type = 0 THEN 1 ELSE NULL END) AS tChildScrPassive_F, COUNT(CASE WHEN is_plw = 1 AND screening_type = 0 AND 
                           plw_type = 1 THEN 1 ELSE NULL END) AS tPlwScrPassive_P, COUNT(CASE WHEN is_plw = 1 AND screening_type = 0 AND plw_type = 2 THEN 1 ELSE NULL END) AS tPlwScrPassive_L, COUNT(CASE WHEN is_plw = 0 AND 
                           gender = 1 AND screening_type = 1 AND muac <= 11.5 THEN 1 ELSE NULL END) AS ChildScrActive_M115, COUNT(CASE WHEN is_plw = 0 AND gender = 2 AND screening_type = 1 AND muac <= 11.5 THEN 1 ELSE NULL END) 
                           AS ChildScrActive_F115, COUNT(CASE WHEN is_plw = 0 AND gender = 1 AND screening_type = 1 AND muac > 11.5 AND muac < 12.4 THEN 1 ELSE NULL END) AS ChildScrActive_M115124, COUNT(CASE WHEN is_plw = 0 AND 
                           gender = 2 AND screening_type = 1 AND muac > 11.5 AND muac < 12.4 THEN 1 ELSE NULL END) AS ChildScrActive_F115124, COUNT(CASE WHEN is_plw = 1 AND screening_type = 1 AND plw_type = 1 AND 
                           muac < 21 THEN 1 ELSE NULL END) AS PlwScrActive_P21, COUNT(CASE WHEN is_plw = 1 AND screening_type = 1 AND plw_type = 2 AND muac < 21 THEN 1 ELSE NULL END) AS PlwScrActive_L21, 
                           COUNT(CASE WHEN is_plw = 0 AND gender = 1 AND screening_type = 0 AND muac <= 11.5 THEN 1 ELSE NULL END) AS ChildScrPassive_M115, COUNT(CASE WHEN is_plw = 0 AND gender = 2 AND screening_type = 0 AND 
                           muac <= 11.5 THEN 1 ELSE NULL END) AS ChildScrPassive_F115, COUNT(CASE WHEN is_plw = 0 AND gender = 1 AND screening_type = 0 AND muac > 11.5 AND muac < 12.5 THEN 1 ELSE NULL END) 
                           AS ChildScrPassive_M115124, COUNT(CASE WHEN is_plw = 0 AND gender = 2 AND screening_type = 0 AND muac > 11.5 AND muac < 12.5 THEN 1 ELSE NULL END) AS tChildScrPassive_F115124, 
                           COUNT(CASE WHEN is_plw = 1 AND screening_type = 0 AND plw_type = 1 AND muac < 21 THEN 1 ELSE NULL END) AS PlwScrPassive_P21, COUNT(CASE WHEN is_plw = 1 AND screening_type = 0 AND plw_type = 2 AND 
                           muac < 21 THEN 1 ELSE NULL END) AS PlwScrPassive_L21
  FROM            v_screening
  GROUP BY province_id, district_id, tehsil_id, uc_id, site_id, screening_date;`;
  createNewTable(knex, 'scr_report_final', qryScrReportFinal);
  var vSessionsFullForUpdateQry = `CREATE VIEW [vSessionsFullForUpdate]
AS
SELECT 
       [main].[v_geo].[province], 
       [main].[v_geo].[province_id], 
       [main].[v_geo].[district_id], 
       [main].[v_geo].[district_name], 
       [main].[v_geo].[tehsil_id], 
       [main].[v_geo].[tehsil_name], 
       [main].[v_geo].[uc_id], 
       [main].[v_geo].[uc_name], 
       [main].[v_geo].[site_name], 
       [tblSessions].*
FROM   [main].[tblSessions]
       INNER JOIN [main].[v_geo] ON [main].[v_geo].[site_id] = [main].[tblSessions].[site_id];
`;

  createNewTable(knex, "vSessionsFullForUpdate", vSessionsFullForUpdateQry);
  
  
  var qryDefaulter = `CREATE VIEW v_defaulter as SELECT [v_default_initial].*
  FROM   [main].[v_default_initial]
  WHERE  [main].[v_default_initial].[Days since last follow up] >= 60;`;
  createNewTable(knex, 'v_defaulter', qryDefaulter);
  var qryDefaultInitial = `CREATE VIEW v_default_initial as
  SELECT 
         [main].[v_otpAdd_full].[province], 
         [main].[v_otpAdd_full].[district_name], 
         [main].[v_otpAdd_full].[tehsil_name], 
         [main].[v_otpAdd_full].[uc_name], 
         [main].[v_otpAdd_full].[site_name], 
         [main].[v_otpAdd_full].[site_village], 
         [main].[v_otpAdd_full].[reg_date], 
         [main].[v_otpAdd_full].[reg_id], 
         [main].[v_otpAdd_full].[p_name] as 'Patient Name', 
         [main].[v_otpAdd_full].[f_or_h_name]'Father/Husband Name', 
         [main].[v_otpAdd_full].[cnic], 
         [main].[v_otpAdd_full].[address], 
         [main].[v_otpAdd_full].[cnt_number]as 'Contact number', 
         [main].[v_otpAdd_full].[age], 
         [main].[v_otpAdd_full].[gender], 
         [main].[tblInterimOtp].[muac] as 'MUAC', 
         [main].[tblInterimOtp].[curr_date]as 'Last followup date', 
         [main].[tblInterimOtp].[next_followup],
         round( julianday() - julianday([main].[tblInterimOtp].[curr_date])  )as 'Days since last follow up'
  FROM   [main].[tblInterimOtp]
         INNER JOIN [main].[v_otpAdd_full] ON [main].[tblInterimOtp].[otp_id] = [main].[v_otpAdd_full].[otp_id]
  WHERE  [main].[tblInterimOtp].[status] = 'open';
  `;
  createNewTable(knex, 'v_default_initial', qryDefaultInitial);
  var qryGeo = `CREATE VIEW v_geo AS
  SELECT       tblGeoProvince.id AS province_id, tblGeoProvince.provinceName AS province, tblGeoDistrict.id AS district_id, tblGeoDistrict.districtName AS district_name, tblGeoTehsil.id AS tehsil_id, 
                           tblGeoTehsil.tehsilName AS tehsil_name, tblGeoUC.id AS uc_id, tblGeoUC.ucName AS uc_name, tblGeoNutSite.siteName AS site_name, tblGeoNutSite.OTP, tblGeoNutSite.SFP, tblGeoNutSite.SC, 
                           tblGeoNutSite.id AS site_id
  FROM            tblGeoDistrict INNER JOIN
                           tblGeoProvince ON tblGeoDistrict.province_id = tblGeoProvince.id INNER JOIN
                           tblGeoTehsil ON tblGeoDistrict.id = tblGeoTehsil.district_id INNER JOIN
                           tblGeoUC ON tblGeoTehsil.id = tblGeoUC.tehsil_id INNER JOIN
                           tblGeoNutSite ON tblGeoUC.id = tblGeoNutSite.uc_id;
  `;
  createNewTable(knex, 'v_geo', qryGeo);
  var qryOtpAddFull = `CREATE VIEW [v_otpAddFull_report]
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
GROUP  BY [otp_id];
  `;
  createNewTable(knex, "v_otpAddFull_report", qryOtpAddFull);

  var v_otpAddmisionQry = `CREATE VIEW v_otpAddmision as
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
`;
  createNewTable(knex, "v_otpAddmision", v_otpAddmisionQry);
  var v_otpAddmision1Qry = `CREATE VIEW [v_otpAddmision1]
AS
SELECT 
       [v_geo].*, 
       [tblOtpAdd].*
FROM   [main].[v_geo]
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
WHERE  [main].[tblOtpAdd].[is_deleted] = 0;
`;
  createNewTable(knex, "v_otpAddmision1", v_otpAddmision1Qry);

  var v_otpAddNewReportQry = `CREATE VIEW [v_otpAddNewReport]
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
`;
  createNewTable(knex, "v_otpAddNewReport", v_otpAddNewReportQry);
  
  var qryOtpAddFullNonReport = `CREATE VIEW [v_otpAdd_full]
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
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id];
`;
  createNewTable(knex, 'v_otpAdd_full', qryOtpAddFullNonReport);
  var qryOtpExit = `CREATE VIEW v_OtpExit as select tblOtpExit.*,tblOtpAdd.* from tblOtpExit inner join tblOtpAdd on tblOtpExit.otp_id = tblOtpAdd.otp_id;`;
  createNewTable(knex, 'v_OtpExit', qryOtpExit);
  var v_otpExitFullForUpdateQry = `CREATE VIEW [v_otpExitFullForUpdate]
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
`;
  createNewTable(knex, "v_otpExitFullForUpdate", v_otpExitFullForUpdateQry);
  var qryOtpExitFull = `CREATE VIEW [v_otpExitFull_report]
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
`;
  createNewTable(knex, "v_otpExitFull_report", qryOtpExitFull);
  
  
  var v_otpExitReportNewQry = `CREATE VIEW [v_otpExitReportNew]
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
`;
  
  createNewTable(knex, "v_otpExitReportNew", v_otpExitReportNewQry);

  var qryOtpExitFullv2 = `CREATE VIEW [v_otpExit_full]
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
       INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id];

`;
  createNewTable(knex, 'v_otpExit_full', qryOtpExitFullv2);
  var qryOtpExitKnex = `CREATE VIEW v_otpExit_knex as
SELECT 
       [v_geo].*, 
       [v_OtpExit].*
FROM   [main].[v_geo]
       INNER JOIN [main].[v_OtpExit] ON [main].[v_OtpExit].[site_id] = [main].[v_geo].[site_id];

`;
  createNewTable(knex, 'v_otpExit_knex', qryOtpExitKnex);
  var qryVScreening = `CREATE VIEW v_screening as
SELECT        v_geo.province_id, v_geo.province, v_geo.district_id, v_geo.district_name, v_geo.tehsil_id, v_geo.tehsil_name, v_geo.uc_id, v_geo.uc_name, v_geo.site_name, v_geo.otp, 
                         v_geo.sfp, v_geo.sc, v_geo.site_id, Screening.screening_id, Screening.client_id, Screening.screening_type, Screening.screening_date, Screening.data_entry_date,
                          Screening.site_id AS Expr1, Screening.site_village, Screening.staff_name, Screening.name, Screening.f_or_h_name, Screening.address, Screening.age, Screening.gender, 
                         Screening.muac, Screening.oedema, Screening.no_mm_sch, Screening.deworming, Screening.status, Screening.is_plw, Screening.plw_type, Screening.no_mm_tabs
FROM            Screening INNER JOIN
                         v_geo ON Screening.site_id = v_geo.site_id;
`
  createNewTable(knex, 'v_screening', qryVScreening);
  var v_scrChildFullQry = `CREATE VIEW [v_scrChildFull]
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
`;
  createNewTable(knex, "v_scrChildFull", v_scrChildFullQry);
  var v_screeningQry = `CREATE VIEW v_screening as
SELECT        v_geo.province_id, v_geo.province, v_geo.district_id, v_geo.district_name, v_geo.tehsil_id, v_geo.tehsil_name, v_geo.uc_id, v_geo.uc_name, v_geo.site_name, v_geo.otp, 
                         v_geo.sfp, v_geo.sc, v_geo.site_id, Screening.screening_id, Screening.client_id, Screening.screening_type, Screening.screening_date, Screening.data_entry_date,
                          Screening.site_id AS Expr1, Screening.site_village, Screening.staff_name, Screening.name, Screening.f_or_h_name, Screening.address, Screening.age, Screening.gender, 
                         Screening.muac, Screening.oedema, Screening.no_mm_sch, Screening.deworming, Screening.status, Screening.is_plw, Screening.plw_type, Screening.no_mm_tabs
FROM            Screening INNER JOIN
                         v_geo ON Screening.site_id = v_geo.site_id;
`;
  createNewTable(knex, "v_screening", v_screeningQry);

  var v_scrPlwFullQry = `CREATE VIEW v_scrPlwFull as

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
WHERE [main].[tblScrPlw].[is_deleted]=0;
`;
  createNewTable(knex, "v_scrPlwFull", v_scrPlwFullQry);
  var qryVScreeningFull = `CREATE VIEW v_session_full as
SELECT 
       [v_geo].*, 
       [tblSessions].*
FROM   [main].[v_geo]
       INNER JOIN [main].[tblSessions] ON [main].[tblSessions].[site_id] = [main].[v_geo].[site_id];

`;
  createNewTable(knex, 'v_session_full', qryVScreeningFull)

  var qryScrNewChildren = `CREATE TABLE [tblScrChildren](
  [ch_scr_id] INTEGER PRIMARY KEY AUTOINCREMENT, 
  [site_id] INTEGER, 
  [screening_date] DATE, 
  [created_at] DATE, 
  [village] VARCHAR(50), 
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
  [report_month] VARCHAR);
`;
  createNewTable(knex, 'tblScrChildren', qryScrNewChildren);

  var qryScrPlwNew = `CREATE TABLE [tblScrPlw](
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
  [first_ifa_tabs_rec_pragnent] INTEGER, 
  [first_ifa_tabs_rec_lactating] INTEGER, 
  [second_ifa_tabs_rec_pragnent] INTEGER, 
  [second_ifa_tabs_rec_lactating] INTEGER, 
  [third_ifa_tabs_rec_pragnent] INTEGER, 
  [third_ifa_tabs_rec_lactating] INTEGER, 
  [fourth_ifa_tabs_rec_pragnent] INTEGER, 
  [fourth_ifa_tabs_rec_lactating] INTEGER, 
  [fifth_ifa_tabs_rec_pragnent] INTEGER, 
  [fifth_ifa_tabs_rec_lactating] INTEGER, 
  [sixth_ifa_tabs_rec_pragnent] INTEGER, 
  [sixth_ifa_tabs_rec_lactating] INTEGER, 
  [muac_gt_21_pragnent] INTEGER, 
  [muac_gt_21_lactating] INTEGER, 
  [muac_le_21_pragnent] INTEGER, 
  [muac_le_21_lactating] INTEGER, 
  [client_id] INTEGER, 
  [username] VARCHAR, 
  [project] VARCHAR, 
  [upload_status] INTEGER DEFAULT 0, 
  [approved] INTEGER, 
  [is_deleted] INTEGER(1) NOT NULL DEFAULT 0,
  [report_month] VARCHAR);
`;
  createNewTable(knex, 'tblScrPlw', qryScrPlwNew);

  var v_stockDistQry = `CREATE VIEW v_stockDist as 
select ration, month, year, sum(quantity) as tQuantity from (select ration1 as ration, quantity1 as quantity, STRFTIME('%m',[main].[tblOtpAdd].[reg_date]) AS [month], STRFTIME('%Y',[main].[tblOtpAdd].[reg_date]) AS [year] from tblOtpAdd WHERE ration1 <> ''
UNION ALL
select ration2 as ration, quantity2 as quantity,  STRFTIME('%m',[main].[tblOtpAdd].[reg_date]) AS [month], STRFTIME('%Y',[main].[tblOtpAdd].[reg_date]) AS [year] from tblOtpAdd WHERE ration2
<> ''
UNION ALL 
select ration3 as ration, quantity3 as quantity,  STRFTIME('%m',[main].[tblOtpAdd].[reg_date]) AS [month], STRFTIME('%Y',[main].[tblOtpAdd].[reg_date]) AS [year] from tblOtpAdd WHERE ration3
<> ''
UNION ALL
select ration1 as ration, quantity1 as quantity,  STRFTIME('%m',[main].[tblOtpFollowup].[curr_date]) AS [month], STRFTIME('%Y',[main].[tblOtpFollowup].[curr_date]) AS [year] from tblOtpFollowup WHERE ration1
<> ''
UNION ALL
select ration2 as ration, quantity2 as quantity, STRFTIME('%m',[main].[tblOtpFollowup].[curr_date]) AS [month], STRFTIME('%Y',[main].[tblOtpFollowup].[curr_date]) AS [year]  from tblOtpFollowup WHERE ration2
<> ''
UNION ALL 
select ration3 as ration, quantity3 as quantity, STRFTIME('%m',[main].[tblOtpFollowup].[curr_date]) AS [month], STRFTIME('%Y',[main].[tblOtpFollowup].[curr_date]) AS [year]  from tblOtpFollowup WHERE ration3
<> ''
)
where ration is not null  and quantity > 0
group by ration, month, year;
`;
  
  createNewTable(knex, "v_stockDist", v_stockDistQry);

  var v_stockInQry = `CREATE VIEW v_stockIn as
SELECT 
       [main].[tblStock].[item_name], 
       sum([main].[tblStock].[rec_qty]) as rec_qty, 
       STRFTIME('%m',[main].[tblStock].[dn_date]) as [month],
       STRFTIME('%Y',[main].[tblStock].[dn_date]) as [Year]
FROM   [main].[tblStock]
group by [main].[tblStock].[item_name], [month], [Year];
`;
createNewTable(knex, "v_stockIn", v_stockInQry);
  var v_StockMovementQry = `CREATE VIEW v_StockMovement as
select ifnull(item_name,ration) as item, ifnull(rec_qty,0) as recQty, ifnull(month,dist_month) as month, ifnull(year, dist_year) as year, ifnull(ration,item_name) as ration, ifnull(dist_month,month) as dist_month,  ifnull(dist_year,year) as dist_year, ifnull(tQuantity, 0) dist_qty from (SELECT 
       [main].[v_stockIn].[item_name], 
       [main].[v_stockIn].[rec_qty], 
       [main].[v_stockIn].[month], 
       [main].[v_stockIn].[Year], 
       [main].[v_stockDist].[ration], 
       [main].[v_stockDist].[month] AS [dist_month], 
       [main].[v_stockDist].[year] AS [dist_year], 
       [main].[v_stockDist].[tQuantity],
       ([main].[v_stockIn].[rec_qty] - [main].[v_stockDist].[tQuantity]) as rem
FROM   [main].[v_stockIn]
       LEFT JOIN [main].[v_stockDist] ON [main].[v_stockIn].[item_name] = [main].[v_stockDist].[ration]and [main].[v_stockIn].[month]=[main].[v_stockDist].[month]
union all
SELECT 
       [main].[v_stockIn].[item_name], 
       [main].[v_stockIn].[rec_qty], 
       [main].[v_stockIn].[month], 
       [main].[v_stockIn].[Year], 
       [main].[v_stockDist].[ration], 
       [main].[v_stockDist].[month] AS [dist_month], 
       [main].[v_stockDist].[year] AS [dist_year], 
       [main].[v_stockDist].[tQuantity],
       ([main].[v_stockIn].[rec_qty] - [main].[v_stockDist].[tQuantity]) as rem
FROM   [main].[v_stockDist]
       LEFT JOIN [main].[v_stockIn] ON [main].[v_stockDist].[ration] = [main].[v_stockIn].[item_name]and [main].[v_stockIn].[month]=[main].[v_stockDist].[month]
       where [main].[v_stockIn].[item_name] is null);
`;
  createNewTable(knex, "v_StockMovement", v_StockMovementQry);

  var v_stockMovementsQry = `CREATE VIEW v_stockMovements as select year, month, ration, tQuantity, 'distributed' source from v_stockDist
union all
select year, month, item_name as ration, rec_qty as tQuantity, 'Stock' source from v_stockIn;
`
  createNewTable(knex, "v_stockMovements", v_stockMovementsQry);

  var qryScrNewChildrenFull = `CREATE VIEW v_tblScrChildrenFull as SELECT 
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
`;
  createNewTable(knex, 'v_tblScrChildrenFull', qryScrNewChildrenFull);

  var qryScrPlwNewFull = `CREATE VIEW v_tblScrPlwFull as SELECT 
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
`;
  createNewTable(knex, 'v_tblScrPlwFull', qryScrPlwNewFull);

  var qryStockEntryTable = `CREATE TABLE [tblStock](
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
  [expiry_date] DATE);`;
  createNewTable(knex, 'tblStock', qryStockEntryTable);

  var qryCommodityTable = `CREATE TABLE [tblCommodity](
  [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [item_name] VARCHAR, 
  [item_desc] VARCHAR, 
  [item_unit] VARCHAR, 
  [item_sub_unit] VARCHAR, 
  [prog_type] varchar(10));
`;
  createNewTable(knex, 'tblCommodity', qryCommodityTable);
  // createNewTable(knex, 'tblStock', qryStockEntryTable);

  var qrytblStockRequest = `CREATE TABLE [tblStockRequest](
  [id] INT PRIMARY KEY UNIQUE, 
  [req_date] DATE NOT NULL, 
  [req_district] VARCHAR NOT NULL, 
  [req_email] VARCHAR NOT NULL, 
  [req_sender] VARCHAR NOT NULL, 
  [req_data] TEXT NOT NULL, 
  [req_id] VARCHAR NOT NULL, 
  [client_id] VARCHAR, 
  [upload_status] INT DEFAULT 0);
`;
  createNewTable(knex, 'tblStockRequest', qrytblStockRequest);

  var tblSupervisorsQry = `CREATE TABLE [tblSupervisors](
  [site] INT NOT NULL, 
  [uc] INT NOT NULL, 
  [tehsil] INT NOT NULL, 
  [district] INT NOT NULL, 
  [sup_name] varchar(50) NOT NULL, 
  [sup_code] VARCHAR(10) NOT NULL UNIQUE, 
  [province] INT NOT NULL, 
  [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [client_id] VARCHAR NOT NULL, 
  [upload_status] VARCHAR NOT NULL DEFAULT 0, 
  [created_at] DATE NOT NULL);
`;
  createNewTable(knex, "tblSupervisors", tblSupervisorsQry);

  var qryv_stockDist = `create view v_stockDist as 
select ration, month, year, sum(quantity) as tQuantity from (select ration1 as ration, quantity1 as quantity, STRFTIME('%m',[main].[tblOtpAdd].[reg_date]) AS [month], STRFTIME('%Y',[main].[tblOtpAdd].[reg_date]) AS [year] from tblOtpAdd WHERE ration1 <> ''
UNION ALL
select ration2 as ration, quantity2 as quantity,  STRFTIME('%m',[main].[tblOtpAdd].[reg_date]) AS [month], STRFTIME('%Y',[main].[tblOtpAdd].[reg_date]) AS [year] from tblOtpAdd WHERE ration2
<> ''
UNION ALL 
select ration3 as ration, quantity3 as quantity,  STRFTIME('%m',[main].[tblOtpAdd].[reg_date]) AS [month], STRFTIME('%Y',[main].[tblOtpAdd].[reg_date]) AS [year] from tblOtpAdd WHERE ration3
<> ''
UNION ALL
select ration1 as ration, quantity1 as quantity,  STRFTIME('%m',[main].[tblOtpFollowup].[curr_date]) AS [month], STRFTIME('%Y',[main].[tblOtpFollowup].[curr_date]) AS [year] from tblOtpFollowup WHERE ration1
<> ''
UNION ALL
select ration2 as ration, quantity2 as quantity, STRFTIME('%m',[main].[tblOtpFollowup].[curr_date]) AS [month], STRFTIME('%Y',[main].[tblOtpFollowup].[curr_date]) AS [year]  from tblOtpFollowup WHERE ration2
<> ''
UNION ALL 
select ration3 as ration, quantity3 as quantity, STRFTIME('%m',[main].[tblOtpFollowup].[curr_date]) AS [month], STRFTIME('%Y',[main].[tblOtpFollowup].[curr_date]) AS [year]  from tblOtpFollowup WHERE ration3
<> ''
)
where ration is not null  and quantity > 0
group by ration, month, year;`
  createNewTable(knex, 'v_stockDist', qryv_stockDist);

  var v_otpAddNewReportQry = `CREATE VIEW [v_otpAddNewReport]
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
`;
  
  var tblSiteStockQry = `create table tblSiteStock (
stock_out_id integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
program_type varchar(10),
item_id integer not null,
stock_release_date date not null,
quantity_released decimal not null,
district_id integer not null,
tehsil_id integer not null,
site_id integer not null,
CHW_id integer not null default 0,
CHS_id integer not null default 0,
is_deleted INT NOT NULL DEFAULT 0,
upload_status INT NOT NULL DEFAULT 0,
created_at datetime,
updated_at datetime
);`;
  
  createNewTable(knex, "tblSiteStock", tblSiteStockQry);
  
}