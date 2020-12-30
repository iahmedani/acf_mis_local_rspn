const { dialog } = require('electron');
var knex = require('../db')
const updateDatabase = require('./updUtils')
/**
 * 
 * @param {app} app is an application parameter;
 * 
 * This function helps to make new updates in database;
 * updateDatabase requires string of sql quries, it must have ';' to separete quries outherwise only one qury will run;
 * this function gets app element which is an electron mehtod, requires to get version of the application;
 * any update would require to have _checkVer define earlier than executing update;
 * than to run followin query
 *  var _check = await knex('tblUpdates').where({version:310});
 */

 async function chekAndExecuteUpdate (_checkVer, currentVersion, dbUpdateSqlString, dbUpdateMsg){
       var _check = await knex('tblUpdates').where({version:_checkVer});
       var _err = false;
       // && currentVersion < _checkVer
       if(!_check.length){
             try {
                     await updateDatabase(knex, dbUpdateSqlString);
             } catch (error) {
                    if(error.errno == 21){
                           _err = false
                    }else{
                           _err = true
                           var errLocationFunction = 'updateDatabase query for version :' +_checkVer;
                           error.customMsg = errLocationFunction
                           console.log(error.errno)
                           dialog.showErrorBox(`Database update`, `${error.customMsg} \n Please contact ACF team \n ${error}`)
                    }
             }
             if(!_err){
              await knex('tblUpdates').insert({version: _checkVer, description: dbUpdateMsg})
              console.log('Success Message '+dbUpdateMsg)
             }

        }
 }

module.exports = async function (app, dialog) {
       var currentVersion = app.getVersion();
       currentVersion = parseInt(currentVersion.replace(/[.]/g, ''));
       console.log({currentVersion})
      
    try {
           await knex.raw(`CREATE TABLE IF NOT EXISTS tblUpdates (id integer not null primary key autoincrement, version integer, description varchar(255));`)
       var _checkVer = 308;
       var v308Sql = `SAVEPOINT [sqlite_expert_apply_design_transaction];
       DROP VIEW IF EXISTS [main].[oneTable];
       CREATE VIEW [main].[oneTable]
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
            RELEASE [sqlite_expert_apply_design_transaction];
       `
       await chekAndExecuteUpdate(_checkVer,currentVersion,v308Sql,'Version 308 updates were made')
       var _checkVer = 310;
        var _check = await knex('tblUpdates').where({version:310});
        if(!_check.length ){
            await knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
            await knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
            await knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
            await knex.raw(`ALTER TABLE [main].[tblScrChildren] RENAME TO [_sqliteexpert_temp_table_1];`)
            await knex.raw(`CREATE TABLE [main].[tblScrChildren](
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
                [other_girls_2459] INTEGER);`)
            await knex.raw(`INSERT INTO [main].[tblScrChildren]([rowid], [ch_scr_id_old], [ch_scr_id], [site_id], [screening_date], [created_at], [catchment_population], [staff_name], [staff_code], [sup_name], [sup_code], [total_scr_girls], [total_scr_boys], [sam_without_comp_girls_623], [sam_without_comp_boys_623], [sam_with_comp_girls_623], [sam_with_comp_boys_623], [mam_girls_623], [mam_boys_623], [sam_without_comp_girls_2459], [sam_without_comp_boys_2459], [sam_with_comp_girls_2459], [sam_with_comp_boys_2459], [mam_girls_2459], [mam_boys_2459], [reffer_tsfp_girls], [reffer_otp_girls], [reffer_tsfp_boys], [reffer_otp_boys], [normal_boys_623], [normal_girls_623], [normal_boys_2459], [normal_girls_2459], [first_mnp_30_girls], [first_mnp_30_boys], [second_mnp_30_girls], [second_mnp_30_boys], [third_mnp_30_girls], [third_mnp_30_boys], [fourth_mnp_30_girls], [fourth_mnp_30_boys], [fifth_mnp_30_girls], [fifth_mnp_30_boys], [sixth_mnp_30_girls], [sixth_mnp_30_boys], [deworming_girls], [deworming_boys], [new_boys], [new_girls], [reScreened_boys], [reScreened_girls], [no_oedema_girls], [no_oedema_boys], [plus12_oedema_girls], [plus12_oedema_boys], [plus3_oedema_girls], [plus3_oedema_boys], [client_id], [username], [project], [upload_status], [approved], [is_deleted], [report_month], [followedup_boys], [followedup_girls], [exits_boys], [exits_girls], [other_specify], [other_boys], [other_girls], [upload_date], [site_one], [site_two], [reffer_otp_girls_s1], [reffer_otp_girls_s2], [reffer_otp_boys_s1], [reffer_otp_boys_s2], [reffer_tsfp_girls_s1], [reffer_tsfp_girls_s2], [total_hh], [uc_id], [reffer_tsfp_boys_s1], [reffer_tsfp_boys_s2], [mnp_boys], [mnp_girls], [total_followup], [total_exits], [ent_type], [org_name], [province_id], [district_id], [tehsil_id])
            SELECT [rowid], [ch_scr_id_old], [ch_scr_id], [site_id], [screening_date], [created_at], [catchment_population], [staff_name], [staff_code], [sup_name], [sup_code], [total_scr_girls], [total_scr_boys], [sam_without_comp_girls_623], [sam_without_comp_boys_623], [sam_with_comp_girls_623], [sam_with_comp_boys_623], [mam_girls_623], [mam_boys_623], [sam_without_comp_girls_2459], [sam_without_comp_boys_2459], [sam_with_comp_girls_2459], [sam_with_comp_boys_2459], [mam_girls_2459], [mam_boys_2459], [reffer_tsfp_girls], [reffer_otp_girls], [reffer_tsfp_boys], [reffer_otp_boys], [normal_boys_623], [normal_girls_623], [normal_boys_2459], [normal_girls_2459], [first_mnp_30_girls], [first_mnp_30_boys], [second_mnp_30_girls], [second_mnp_30_boys], [third_mnp_30_girls], [third_mnp_30_boys], [fourth_mnp_30_girls], [fourth_mnp_30_boys], [fifth_mnp_30_girls], [fifth_mnp_30_boys], [sixth_mnp_30_girls], [sixth_mnp_30_boys], [deworming_girls], [deworming_boys], [new_boys], [new_girls], [reScreened_boys], [reScreened_girls], [no_oedema_girls], [no_oedema_boys], [plus12_oedema_girls], [plus12_oedema_boys], [plus3_oedema_girls], [plus3_oedema_boys], [client_id], [username], [project], [upload_status], [approved], [is_deleted], [report_month], [followedup_boys], [followedup_girls], [exits_boys], [exits_girls], [other_specify], [other_boys], [other_girls], [upload_date], [site_one], [site_two], [reffer_otp_girls_s1], [reffer_otp_girls_s2], [reffer_otp_boys_s1], [reffer_otp_boys_s2], [reffer_tsfp_girls_s1], [reffer_tsfp_girls_s2], [total_hh], [uc_id], [reffer_tsfp_boys_s1], [reffer_tsfp_boys_s2], [mnp_boys], [mnp_girls], [total_followup], [total_exits], [ent_type], [org_name], [province_id], [district_id], [tehsil_id]
            FROM [main].[_sqliteexpert_temp_table_1];`)
            await knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
            await knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
            await knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
            await knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
            await knex('tblUpdates').insert({version:310, description:'Updated scrChilren to support v2 IM tools'})
            console.log('updated v310')
        }
        _checkVer = 313
        var _check = await knex('tblUpdates').where({version:313});
        if(!_check.length ){
            await knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
            await knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
            await knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
            await knex.raw(`ALTER TABLE [main].[tblSessions] RENAME TO [_sqliteexpert_temp_table_1];`)
            await knex.raw(`CREATE TABLE [main].[tblSessions](
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
                [ftfg] INTEGER);`)
            await knex.raw(`
            INSERT INTO [main].[tblSessions]([rowid], [session_id], [session_id_old], [site_id], [client_id], [session_date], [session_type], [male_participants], [female_participants], [session_location], [upload_status], [created_at], [updated_at], [old_participants], [new_participants], [username], [org_name], [project_name], [pragnent], [lactating], [is_deleted], [remarks], [CHS_id], [CHW_id], [upload_date], [prog_type], [total_session], [ind_session], [grp_sessions], [uc_id], [province_id], [district_id], [tehsil_id])
            SELECT [rowid], [session_id], [session_id_old], [site_id], [client_id], [session_date], [session_type], [male_participants], [female_participants], [session_location], [upload_status], [created_at], [updated_at], [old_participants], [new_participants], [username], [org_name], [project_name], [pragnent], [lactating], [is_deleted], [remarks], [CHS_id], [CHW_id], [upload_date], [prog_type], [total_session], [ind_session], [grp_sessions], [uc_id], [province_id], [district_id], [tehsil_id]
            FROM [main].[_sqliteexpert_temp_table_1];`)
            await knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
            await knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
            await knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
            await knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
            await knex('tblUpdates').insert({version:313, description:'Updated tblSessions to support v2 IM tools'})
            console.log('updated v313')
        }
        _checkVer = 400
        var v400Update = `CREATE VIEW allExitsNotDel as 
            select * from tblOtpExit where is_deleted = 0;
            CREATE VIEW allNSCAdmisions as
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
WHERE  [main].[tblOtpAdd].[is_deleted] = 0 and [tblOtpAdd].[prog_type] = 'sc'
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
WHERE  [main].[tblOtpAdd].[is_deleted] = 0 and [tblOtpAdd].[prog_type] = 'sc' and ([tblOtpAdd].[site_id] = '' or [tblOtpAdd].[site_id] is null);
CREATE VIEW allNSCExits as
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
WHERE  [tblOtpExit].[is_deleted] = 0 and [main].[tblOtpAdd].[prog_type] = 'sc'
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
WHERE  [tblOtpExit].[is_deleted] = 0 AND [tblOtpAdd].[prog_type] = 'sc' and ([main].[tblOtpAdd].[site_id] is null or [main].[tblOtpAdd].[site_id] = '');
CREATE VIEW allOtpAdmisions as
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
WHERE  [main].[tblOtpAdd].[is_deleted] = 0 and [tblOtpAdd].[prog_type] = 'otp';
CREATE VIEW allOtpExits as
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
WHERE  [tblOtpExit].[is_deleted] = 0 and [main].[tblOtpAdd].[prog_type] = 'otp';
SAVEPOINT [sqlite_expert_apply_design_transaction];

DROP VIEW IF EXISTS [main].[oneTable];

CREATE VIEW [main].[oneTable]
AS
SELECT 
       [tblOtpAdd].*, 
       [allExitsNotDel].[exit_muac], 
       [allExitsNotDel].[exit_weight], 
       [allExitsNotDel].[exit_height], 
       [allExitsNotDel].[exit_reason], 
       [allExitsNotDel].[days_in_program], 
       [allExitsNotDel].[weight_gain], 
       [allExitsNotDel].[exit_date]
FROM   [tblOtpAdd]
       LEFT JOIN [allExitsNotDel] ON [tblOtpAdd].[otp_id] = [allExitsNotDel].[otp_id]
WHERE  [tblOtpAdd].[is_deleted] = 0;

RELEASE [sqlite_expert_apply_design_transaction];

`
        var v400Msg = `Update Made to make changes for newly added features`
       //  var errUpdateMsg = 'Database update to version 4.0.0 failed, Please contact ACF team for further assistance'
       await chekAndExecuteUpdate(_checkVer, currentVersion, v400Update,v400Msg); 
    } catch (error) {

        console.log(error)
    }
}