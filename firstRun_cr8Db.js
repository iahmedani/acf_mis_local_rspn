const knex = require('./mainfunc/db');


module.exports.createdb = function(){
  // create screenning table
  knex.schema.hasTable('Screening')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE [Screening](
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
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create Screening table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblGeoProvince table
  knex.schema.hasTable('tblGeoProvince')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE "tblGeoProvince" ("id" integer not null primary key autoincrement, "provinceName" varchar(255), "created_at" datetime, "updated_at" datetime);

      CREATE UNIQUE INDEX "tblgeoprovince_id_unique" on "tblGeoProvince" ("id");      
      `
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblGeoProvince table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblGeoDistrict table
  knex.schema.hasTable('tblGeoDistrict')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE "tblGeoDistrict" ("id" integer not null primary key autoincrement, "districtName" varchar(255), "province_id" integer, "created_at" datetime, "updated_at" datetime);

      CREATE UNIQUE INDEX "tblgeodistrict_id_unique" on "tblGeoDistrict" ("id");
          
      `
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblGeoDistrict table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblGeoTehsil table
  knex.schema.hasTable('tblGeoTehsil')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE "tblGeoTehsil" ("id" integer not null primary key autoincrement, "tehsilName" varchar(255), "district_id" integer, "created_at" datetime, "updated_at" datetime);

      CREATE UNIQUE INDEX "tblgeotehsil_id_unique" on "tblGeoTehsil" ("id");
      `
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblGeoTehsil table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblGeoUC table
  knex.schema.hasTable('tblGeoUC')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE "tblGeoUC" ("id" integer not null primary key autoincrement, "ucName" varchar(255), "tehsil_id" integer, "created_at" datetime, "updated_at" datetime);

      CREATE UNIQUE INDEX "tblgeouc_id_unique" on "tblGeoUC" ("id");
      `
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblGeoUC table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblGeoNutSite table
  knex.schema.hasTable('tblGeoNutSite')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE "tblGeoNutSite" ("id" integer not null primary key autoincrement, "siteName" varchar(255), "province_id" integer, "district_id" integer, "tehsil_id" integer, "uc_id" integer, "OTP" integer, "SFP" integer, "SC" integer, "created_at" datetime, "updated_at" datetime);

CREATE UNIQUE INDEX "tblgeonutsite_id_unique" on "tblGeoNutSite" ("id");
`
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblGeoNutSite table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblInterimOtp table
  knex.schema.hasTable('tblInterimOtp')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE [tblInterimOtp](
        [interim_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        [otp_id] integer, 
        [client_id] integer, 
        [muac] integer, 
        [weight] integer, 
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
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblInterimOtp table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblOtpAdd table
  knex.schema.hasTable('tblOtpAdd')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE [tblOtpAdd](
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
        [age] varchar(255), 
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
        [od_swol_time] varchar(255), 
        [weight] integer, 
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
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblOtpAdd table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblOtpExit table
  knex.schema.hasTable('tblOtpExit')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE [tblOtpExit](
  [exit_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [otp_id] integer, 
  [client_id] integer, 
  [exit_muac] integer, 
  [exit_weight] integer, 
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
  [upload_status] INTEGER);`
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblOtpExit table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblOtpFollowup table
  knex.schema.hasTable('tblOtpFollowup')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE [tblOtpFollowup](
  [followup_id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [otp_id] integer, 
  [client_id] integer, 
  [weight] integer, 
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
  [upload_status] INTEGER);`
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblOtpFollowup table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblSessions table
  knex.schema.hasTable('tblSessions')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE [tblSessions](
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
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblSessions table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create tblVillage table
  knex.schema.hasTable('tblVillage')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE TABLE 'tblVillage' ('vill_id' integer not null primary key autoincrement, 'site_id' integer, 'village' varchar(255), 'created_at' datetime, 'updated_at' datetime);

CREATE UNIQUE INDEX 'tblvillage_vill_id_unique' on 'tblVillage' ('vill_id');`
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create tblVillage table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create scr_report_final table
  knex.schema.hasTable('scr_report_final')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW scr_report_final as
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
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create scr_report_final table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create v_defaulter table
  knex.schema.hasTable('v_defaulter')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW v_defaulter as SELECT [v_default_initial].*
FROM   [main].[v_default_initial]
WHERE  [main].[v_default_initial].[Days since last follow up] >= 60;
`
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create v_defaulter table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create v_default_initial table
  knex.schema.hasTable('v_default_initial')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW v_default_initial as
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
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create v_default_initial table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create v_geo table
  knex.schema.hasTable('v_geo')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW v_geo AS
      SELECT       tblGeoProvince.id AS province_id, tblGeoProvince.provinceName AS province, tblGeoDistrict.id AS district_id, tblGeoDistrict.districtName AS district_name, tblGeoTehsil.id AS tehsil_id, 
                               tblGeoTehsil.tehsilName AS tehsil_name, tblGeoUC.id AS uc_id, tblGeoUC.ucName AS uc_name, tblGeoNutSite.siteName AS site_name, tblGeoNutSite.OTP, tblGeoNutSite.SFP, tblGeoNutSite.SC, 
                               tblGeoNutSite.id AS site_id
      FROM            tblGeoDistrict INNER JOIN
                               tblGeoProvince ON tblGeoDistrict.province_id = tblGeoProvince.id INNER JOIN
                               tblGeoTehsil ON tblGeoDistrict.id = tblGeoTehsil.district_id INNER JOIN
                               tblGeoUC ON tblGeoTehsil.id = tblGeoUC.tehsil_id INNER JOIN
                               tblGeoNutSite ON tblGeoUC.id = tblGeoNutSite.uc_id;
      `
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create v_geo table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create v_otpAddFull_report table
  knex.schema.hasTable('v_otpAddFull_report')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW v_otpAddFull_report as
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
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create v_otpAddFull_report table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create v_otpAdd_full table
  knex.schema.hasTable('v_otpAdd_full')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW v_otpAdd_full as SELECT 
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
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create v_otpAdd_full table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create v_OtpExit table
  knex.schema.hasTable('v_OtpExit')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW v_OtpExit as select tblOtpExit.*,tblOtpAdd.* from tblOtpExit inner join tblOtpAdd on tblOtpExit.otp_id = tblOtpAdd.otp_id;
      `
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create v_OtpExit table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create v_otpExit_full table
  knex.schema.hasTable('v_otpExit_full')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW v_otpExit_full as
      SELECT 
             [v_geo].*, 
             [v_OtpExit].*
      FROM   [main].[v_geo]
             INNER JOIN [main].[v_OtpExit] ON [main].[v_OtpExit].[site_id] = [main].[v_geo].[site_id];
      `
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create v_otpExit_full table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create v_otpExit_knex table
  knex.schema.hasTable('v_otpExit_knex')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW v_otpExit_knex as
      SELECT 
             [v_geo].*, 
             [v_OtpExit].*
      FROM   [main].[v_geo]
             INNER JOIN [main].[v_OtpExit] ON [main].[v_OtpExit].[site_id] = [main].[v_geo].[site_id];
  `
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create v_otpExit_knex table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create v_screening table
  knex.schema.hasTable('v_screening')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW v_screening as
      SELECT        v_geo.province_id, v_geo.province, v_geo.district_id, v_geo.district_name, v_geo.tehsil_id, v_geo.tehsil_name, v_geo.uc_id, v_geo.uc_name, v_geo.site_name, v_geo.otp, 
                               v_geo.sfp, v_geo.sc, v_geo.site_id, Screening.screening_id, Screening.client_id, Screening.screening_type, Screening.screening_date, Screening.data_entry_date,
                                Screening.site_id AS Expr1, Screening.site_village, Screening.staff_name, Screening.name, Screening.f_or_h_name, Screening.address, Screening.age, Screening.gender, 
                               Screening.muac, Screening.oedema, Screening.no_mm_sch, Screening.deworming, Screening.status, Screening.is_plw, Screening.plw_type, Screening.no_mm_tabs
      FROM            Screening INNER JOIN
                               v_geo ON Screening.site_id = v_geo.site_id;
      `
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create v_screening table', result});    
  }).catch((err) => {
    console.log(err);
  });

  // create v_session_full table
  knex.schema.hasTable('v_session_full')
  .then(exists=>{
    if(!exists){
      var qry = `CREATE VIEW v_session_full as
      SELECT 
             [v_geo].*, 
             [tblSessions].*
      FROM   [main].[v_geo]
             INNER JOIN [main].[tblSessions] ON [main].[tblSessions].[site_id] = [main].[v_geo].[site_id];
      `
      return knex.raw(qry)
    }
  })
  .then((result) => {
    console.log({action:'create v_session_full table', result});    
  }).catch((err) => {
    console.log(err);
  });





  
}