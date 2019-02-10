const knex = require('./mainfunc/db');


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


const firstCreateDb = function (knex) {
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
    [updated_at] datetime);
  `
  createNewTable(knex, 'tblInterimOtp', qryInterm);
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
    [project_name] VARCHAR(50));
  `
  createNewTable(knex, 'tblOtpAdd', qryAdmission);
  var qryExit = `CREATE TABLE [tblOtpExit](
    [exit_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
    [otp_id] integer, 
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
    [days_in_program] INTEGER(7));
  `
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
    [upload_status] INTEGER);
  `
  createNewTable(knex, 'tblOtpFollowup', qryFollowup);
  var qrySession = `CREATE TABLE [tblSessions](
    [session_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
    [site_id] integer, 
    [client_id] varchar(255), 
    [session_date] date, 
    [session_type] varchar(255), 
    [male_participants] INTEGER, 
    [session_location] varchar(255), 
    [upload_status] integer, 
    [created_at] datetime, 
    [updated_at] datetime, 
    [female_participants] INTEGER, 
    [username] VARCHAR(50), 
    [org_name] VARCHAR(50), 
    [project_name] VARCHAR(50));
  `
  createNewTable(knex, 'tblSessions', qrySession);
  var qryVillage = `CREATE TABLE [tblVillage] ([vill_id] integer not null primary key autoincrement, [site_id] integer, [village] varchar(255), [created_at] datetime, [updated_at] datetime);

  CREATE UNIQUE INDEX "tblvillage_vill_id_unique" on "tblVillage" ("vill_id");
  `
  createNewTable(knex, 'tblVillage', qryVillage);
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
  GROUP BY province_id, district_id, tehsil_id, uc_id, site_id, screening_date;
  `
  createNewTable(knex, 'scr_report_final', qryScrReportFinal);
  var qryDefaulter = `CREATE VIEW v_defaulter as SELECT [v_default_initial].*
  FROM   [main].[v_default_initial]
  WHERE  [main].[v_default_initial].[Days since last follow up] >= 60;
  `
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
  `
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
  `
  createNewTable(knex, 'v_geo', qryGeo);
  var qryOtpAddFull = `CREATE VIEW v_otpAddFull_report as
  select province_id, province, district_id, district_name, tehsil_id, tehsil_name, uc_id, uc_name, site_name, site_id, reg_date, 
         count( case when muac < 11.5 then '' END ) as 'MUAC115',
         count( case when oedema != 'absent' then '' END ) as 'Oedema',
         count( case when ent_reason = 'no_prv_pro' then '' END ) as 'New_Addmision',
         count( case when ent_reason = 'relapse' then '' END ) as 'Relapse',
         count( case when ent_reason = 'def_sfp' then '' END ) as 'Def_SFP',
         count( case when ent_reason = 'def_otp' then '' END ) as 'Def_OTP',
         sum( case when ent_reason = 'def_sfp' or ent_reason = 'def_otp' then '' END) as 'default',
         count( case when ent_reason = 'abb_inp' then '' END ) as 'Abbondon',
         count( case when ent_reason = 'promotion_in_from_sc' then '' END ) as 'Pro_in_from_SC',
         count( case when ent_reason = 'tranfer_in_other_otp' then '' END ) as 'Trasfer_in_from_other_OTP',
         count( case when ent_reason = 'tranfer_in_from_sfp' then '' END ) as 'Transfer_in_from_SFP',
         count( case when ent_reason = 'other' then '' END ) as 'Other',
         strftime('%m',reg_date) as 'Month',
         strftime('%Y',reg_date) as 'Year',
         strftime('%d',reg_date) as 'Day',
         count( otp_id ) as 'add_Total' 
  from v_otpAdd_full
  where muac < 11.5
  group by otp_id;
  `
  createNewTable(knex, 'v_otpAddFull_report', qryOtpAddFull);
  var qryOtpAddFullNonReport = `CREATE VIEW v_otpAdd_full as SELECT 
  [v_geo].*, 
  [main].[tblOtpAdd].[otp_id], 
  [main].[tblOtpAdd].[client_id], 
  [main].[tblOtpAdd].[site_village], 
  [main].[tblOtpAdd].[site_id] AS [site_id1], 
  [main].[tblOtpAdd].[reg_date], 
  [main].[tblOtpAdd].[reg_id], 
  [main].[tblOtpAdd].[p_name], 
  [main].[tblOtpAdd].[f_or_h_name], 
  [main].[tblOtpAdd].[cnic], 
  [main].[tblOtpAdd].[address], 
  [main].[tblOtpAdd].[cnt_number], 
  [main].[tblOtpAdd].[age], 
  [main].[tblOtpAdd].[gender], 
  [main].[tblOtpAdd].[plw_type], 
  [main].[tblOtpAdd].[ent_reason], 
  [main].[tblOtpAdd].[ref_type], 
  [main].[tblOtpAdd].[oedema], 
  [main].[tblOtpAdd].[muac], 
  [main].[tblOtpAdd].[diarrhoea], 
  [main].[tblOtpAdd].[vomiting], 
  [main].[tblOtpAdd].[cough], 
  [main].[tblOtpAdd].[appetite], 
  [main].[tblOtpAdd].[daily_stool], 
  [main].[tblOtpAdd].[pass_urine], 
  [main].[tblOtpAdd].[b_Feeding], 
  [main].[tblOtpAdd].[od_swol_time], 
  [main].[tblOtpAdd].[weight], 
  [main].[tblOtpAdd].[ration1], 
  [main].[tblOtpAdd].[quantity1], 
  [main].[tblOtpAdd].[ration2], 
  [main].[tblOtpAdd].[quantity2], 
  [main].[tblOtpAdd].[ration3], 
  [main].[tblOtpAdd].[quantity3], 
  [main].[tblOtpAdd].[prog_type], 
  [main].[tblOtpAdd].[created_at], 
  [main].[tblOtpAdd].[updated_at]
FROM   [main].[v_geo]
  INNER JOIN [main].[tblOtpAdd] ON [main].[tblOtpAdd].[site_id] = [main].[v_geo].[site_id];
`
  createNewTable(knex, 'v_otpAdd_full', qryOtpAddFullNonReport);
  var qryOtpExit = `CREATE VIEW v_OtpExit as select tblOtpExit.*,tblOtpAdd.* from tblOtpExit inner join tblOtpAdd on tblOtpExit.otp_id = tblOtpAdd.otp_id;
`
  createNewTable(knex, 'v_OtpExit', qryOtpExit);
  var qryOtpExitFull = `CREATE VIEW v_otpExitFull_report as
select province_id, province, district_id, district_name, tehsil_id, tehsil_name, uc_id, uc_name, site_name, site_id, exit_date, exit_id, exit_muac, exit_weight, 
       count( case when exit_reason = 'cured' then '' END ) as 'cured',
       count( case when exit_reason = 'defaulter' then '' END ) as 'defaulter',
       count( case when exit_reason = 'non_responder' then '' END ) as 'non_responder',
       count( case when exit_reason = 'death' then '' END ) as 'death',
       count( case when exit_reason = 'medical_transfer_sc' then '' END ) as 'medical_transfer_SC',
       count( case when exit_reason = 'transfer_out_to_other_otp' then '' END ) as 'transfer_out_other_OTP',
       count( case when exit_reason = 'other' then '' END ) as 'Other',
       strftime('%m',exit_date) as 'Month',
       strftime('%Y',exit_date) as 'Year',
       strftime('%d',exit_date) as 'Day',
       count(otp_id) as 'exit_total',
       prog_type
from v_otpExit_full
group by prog_type;
`
  createNewTable(knex, 'v_otpExitFull_report', qryOtpExitFull);

  var qryOtpExitFullv2 = `CREATE VIEW v_otpExit_full as
SELECT 
       [v_geo].*, 
       [v_OtpExit].*
FROM   [main].[v_geo]
       INNER JOIN [main].[v_OtpExit] ON [main].[v_OtpExit].[site_id] = [main].[v_geo].[site_id];
`
  createNewTable(knex, 'v_otpExit_full', qryOtpExitFullv2);
  var qryOtpExitKnex = `CREATE VIEW v_otpExit_knex as
SELECT 
       [v_geo].*, 
       [v_OtpExit].*
FROM   [main].[v_geo]
       INNER JOIN [main].[v_OtpExit] ON [main].[v_OtpExit].[site_id] = [main].[v_geo].[site_id];
`
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
  var qryVScreeningFull = `CREATE VIEW v_session_full as
SELECT 
       [v_geo].*, 
       [tblSessions].*
FROM   [main].[v_geo]
       INNER JOIN [main].[tblSessions] ON [main].[tblSessions].[site_id] = [main].[v_geo].[site_id];
`
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
    [upload_status] INTEGER, 
    [approved] INTEGER, 
    [is_deleted] INTEGER);
  `
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
    [upload_status] INTEGER, 
    [approved] INTEGER, 
    [is_deleted] INTEGER);
  `
  createNewTable(knex, 'tblScrPlw', qryScrPlwNew);

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
`
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
`
  createNewTable(knex, 'v_tblScrPlwFull', qryScrPlwNewFull);

  var qryOtpExitReportNew = `create view v_otpExitReportNew as
SELECT 
       [v_geo].*, 
       [tblOtpExit].*, 
       [tblOtpAdd].[gender], 
       [tblOtpAdd].[age]
FROM   [main].[v_geo]
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
       INNER JOIN [main].[tblOtpExit] ON [main].[tblOtpAdd].[otp_id] = [main].[tblOtpExit].[otp_id]
`;
  
  createNewTable(knex, 'v_otpExitReportNew', qryOtpExitReportNew);

  var qryotpAddNewReport = `SELECT 
       [v_geo].*, 
       [main].[tblOtpAdd].[site_village], 
       [main].[tblOtpAdd].[otp_id], 
       [main].[tblOtpAdd].[reg_date], 
       [main].[tblOtpAdd].[reg_id], 
       [main].[tblOtpAdd].[p_name], 
       [main].[tblOtpAdd].[f_or_h_name], 
       [main].[tblOtpAdd].[cnic], 
       [main].[tblOtpAdd].[address], 
       [main].[tblOtpAdd].[cnt_number], 
       [main].[tblOtpAdd].[age], 
       [main].[tblOtpAdd].[gender], 
       [main].[tblOtpAdd].[plw_type], 
       [main].[tblOtpAdd].[ent_reason], 
       [main].[tblOtpAdd].[ref_type], 
       [main].[tblOtpAdd].[oedema], 
       [main].[tblOtpAdd].[muac], 
       [main].[tblOtpAdd].[diarrhoea], 
       [main].[tblOtpAdd].[vomiting], 
       [main].[tblOtpAdd].[cough], 
       [main].[tblOtpAdd].[appetite], 
       [main].[tblOtpAdd].[daily_stool], 
       [main].[tblOtpAdd].[pass_urine], 
       [main].[tblOtpAdd].[b_Feeding], 
       [main].[tblOtpAdd].[weight], 
       [main].[tblOtpAdd].[height], 
       [main].[tblOtpAdd].[ration1], 
       [main].[tblOtpAdd].[quantity1], 
       [main].[tblOtpAdd].[ration2], 
       [main].[tblOtpAdd].[quantity2], 
       [main].[tblOtpAdd].[ration3], 
       [main].[tblOtpAdd].[quantity3], 
       [main].[tblOtpAdd].[prog_type], 
       [main].[tblOtpAdd].[upload_status], 
       [main].[tblOtpAdd].[username], 
       [main].[tblOtpAdd].[org_name], 
       [main].[tblOtpAdd].[project_name]
FROM   [main].[v_geo]
       INNER JOIN [main].[tblOtpAdd] ON [main].[v_geo].[site_id] = [main].[tblOtpAdd].[site_id]
`;
  createNewTable(knex, 'v_otpAddNewReport', qryotpAddNewReport);
  
  
}

firstCreateDb(knex);

module.exports = firstCreateDb;