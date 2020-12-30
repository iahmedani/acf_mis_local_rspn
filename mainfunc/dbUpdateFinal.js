const fs = require('fs');
const {
    app
} = require('electron');

var regex = /([/./])/g;

module.exports = (knex) => {
    var _version = app.getVersion();
    _version = parseInt(_version.replace(regex, ''));
    fs.stat(`${process.env.APPDATA}/acf_mis_local_rspn/.nv`, (err, stat) => {
        if (err) {
            fs.writeFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/.nv`, _version, 'utf8')
        } else if (stat) {
            var oldV = fs.readFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/.nv`, {
                encoding: 'utf8'
            });
            oldV = parseInt(oldV.replace(regex, ''));
            console.log(oldV)


            for (_vold = oldV; _vold <= _version; _vold++) {
                console.log(_vold)
                if (_vold == 1514) {
                    knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        .then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_otpNotExit];`)
                        }).then(r => {
                            return knex.raw(`CREATE VIEW [main].[v_otpNotExit]
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
                            `)
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            console.log('v_otpNotExitUpdated')
                        }).catch(e => {
                            console.log(e)
                        })
                } else if (_vold == 1515) {
                    knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        }).then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblGeoDistrict] RENAME TO [_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblGeoDistrict](
                                [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                                [districtName] varchar(255), 
                                [province_id] integer, 
                                [created_at] datetime, 
                                [updated_at] datetime, 
                                [isActive] BOOLEAN DEFAULT 1);`)
                        }).then(r => {
                            return knex.raw(`INSERT INTO [main].[tblGeoDistrict]([rowid], [id], [districtName], [province_id], [created_at], [updated_at])
                            SELECT [rowid], [id], [districtName], [province_id], [created_at], [updated_at]
                            FROM [main].[_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        }).then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblGeoProvince] RENAME TO [_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblGeoProvince](
                                [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                                [provinceName] varchar(255), 
                                [created_at] datetime, 
                                [updated_at] datetime, 
                                [isActive] BOOLEAN DEFAULT 1);`)
                        }).then(r => {
                            return knex.raw(`INSERT INTO [main].[tblGeoProvince]([rowid], [id], [provinceName], [created_at], [updated_at])
                            SELECT [rowid], [id], [provinceName], [created_at], [updated_at]
                            FROM [main].[_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        }).then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblGeoTehsil] RENAME TO [_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblGeoTehsil](
                                [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                                [tehsilName] varchar(255), 
                                [district_id] integer, 
                                [created_at] datetime, 
                                [updated_at] datetime, 
                                [isActive] BOOLEAN DEFAULT 1);`)
                        }).then(r => {
                            return knex.raw(`INSERT INTO [main].[tblGeoTehsil]([rowid], [id], [tehsilName], [district_id], [created_at], [updated_at])
                            SELECT [rowid], [id], [tehsilName], [district_id], [created_at], [updated_at]
                            FROM [main].[_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        }).then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblGeoUC] RENAME TO [_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblGeoUC](
                                [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                                [ucName] varchar(255), 
                                [tehsil_id] integer, 
                                [created_at] datetime, 
                                [updated_at] datetime, 
                                [isActive] BOOLEAN DEFAULT 1);`)
                        }).then(r => {
                            return knex.raw(`INSERT INTO [main].[tblGeoUC]([rowid], [id], [ucName], [tehsil_id], [created_at], [updated_at])
                            SELECT [rowid], [id], [ucName], [tehsil_id], [created_at], [updated_at]
                            FROM [main].[_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        }).then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblGeoNutSite] RENAME TO [_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblGeoNutSite](
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
                                [isActive] BOOLEAN DEFAULT 1);`)
                        }).then(r => {
                            return knex.raw(`INSERT INTO [main].[tblGeoNutSite]([rowid], [id], [siteName], [province_id], [district_id], [tehsil_id], [uc_id], [OTP], [SFP], [SC], [created_at], [updated_at])
                            SELECT [rowid], [id], [siteName], [province_id], [district_id], [tehsil_id], [uc_id], [OTP], [SFP], [SC], [created_at], [updated_at]
                            FROM [main].[_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        }).then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        }).then(r => {
                            console.log('updated geo tables')
                        }).catch(e => {
                            console.log(e)
                        })


                } else if (_vold == 1521) {

                    knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction]`)
                        .then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[vSessionsFullForUpdate];`)
                        })
                        .then(r => {
                            return knex.raw(`CREATE VIEW [main].[vSessionsFullForUpdate]
                    AS
                    SELECT 
           [main].[v_geo].[province], 
           [main].[v_geo].[province_id], 
           [main].[v_geo].[district_id], 
           [main].[v_geo].[district_name], 
           [main].[v_geo].[tehsil_id], 
           [main].[v_geo].[tehsil_name], 
           [main].[v_geo].[uc_name], 
           [main].[v_geo].[site_name], 
           [tblSessions].*
        FROM   [main].[tblSessions]
           INNER JOIN [main].[v_geo] ON ([main].[v_geo].[site_id] = [main].[tblSessions].[site_id]) OR ([main].[v_geo].[uc_id] = [main].[tblSessions].[uc_id] and  [main].[tblSessions].[site_id] = '')
        WHERE  [tblsessions].[is_deleted] = 0`)
                        })
                        .then(r => {
                            return knex.raw('RELEASE [sqlite_expert_apply_design_transaction];')
                        })
                        .then(r => {
                            console.log('updated vSessionsFullForUpdate view')
                        }).catch(e => {
                            console.log(e)
                        })

                } else if (_vold == 1522) {
                    knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        .then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_otpExit_full];`)
                        })
                        .then(r => {
                            return knex.raw(`CREATE VIEW [main].[v_otpExit_full]
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
                              AND [main].[tblOtpAdd].[is_deleted] = 0;`)
                        })
                        .then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_otpAdd_full];`)
                        })
                        .then(r => {
                            return knex.raw(`CREATE VIEW [main].[v_otpAdd_full]
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
                    WHERE  [main].[tblOtpAdd].[is_deleted] = 0;`)
                        })
                        .then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            console.log('updated views to remove data eerros')
                        })
                        .catch(e => {
                            console.log(e)
                        })
                } else if (_vold == 1524) {
                    knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        })
                        .then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblLhw] RENAME TO [_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblLhw](
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
                            [is_deleted] BOOLEAN NOT NULL DEFAULT 0);`)
                        })
                        .then(r => {
                            return knex.raw(`INSERT INTO [main].[tblLhw]([rowid], [site], [uc], [tehsil], [district], [staff_name], [staff_code], [province], [id], [client_id], [upload_status], [created_at], [upload_date])
                        SELECT [rowid], [site], [uc], [tehsil], [district], [staff_name], [staff_code], [province], [id], [client_id], [upload_status], [created_at], [upload_date]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        })
                        .then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblSupervisors] RENAME TO [_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblSupervisors](
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
                            UNIQUE([sup_code], [district]) ON CONFLICT ROLLBACK);`)
                        })
                        .then(r => {
                            return knex.raw(`INSERT INTO [main].[tblSupervisors]([rowid], [site], [uc], [tehsil], [district], [sup_name], [sup_code], [province], [id], [client_id], [upload_status], [created_at], [upload_date])
                        SELECT [rowid], [site], [uc], [tehsil], [district], [sup_name], [sup_code], [province], [id], [client_id], [upload_status], [created_at], [upload_date]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        })
                        .then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblVillages] RENAME TO [_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblVillages](
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
                            UNIQUE([uc], [villageName]) ON CONFLICT ROLLBACK);`)
                        })
                        .then(r => {
                            return knex.raw(`INSERT INTO [main].[tblVillages]([rowid], [site], [uc], [tehsil], [district], [villageName], [province], [id], [client_id], [upload_status], [created_at], [upload_date])
                        SELECT [rowid], [site], [uc], [tehsil], [district], [villageName], [province], [id], [client_id], [upload_status], [created_at], [upload_date]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        })
                        .then(r => {
                            console.log('updated tblSupervisors tblLHW tblvillages')
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_comm_otp_add_and_followup];`)
                        }).then(r => {
                            return knex.raw(`CREATE VIEW 'v_comm_otp_add_and_followup'
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
                        WHERE  [main].[tblOtpFollowup].[is_deleted] = 0;`)
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_otp_add_followup_report];`)
                        }).then(r => {
                            return knex.raw(`CREATE VIEW 'v_otp_add_followup_report'
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
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            console.log('created two views to support new report')
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_geo_active];`)
                        })
                        .then(r => {
                            return knex.raw(`CREATE VIEW [main].[v_geo_active]
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
                                   [tblGeoNutSite].[SC] , 
                                   [tblGeoNutSite].[id] AS [site_id]
                            FROM   [tblGeoDistrict]
                                   INNER JOIN [tblGeoProvince] ON [tblGeoDistrict].[province_id] = [tblGeoProvince].[id]
                                   INNER JOIN [tblGeoTehsil] ON [tblGeoDistrict].[id] = [tblGeoTehsil].[district_id]
                                   INNER JOIN [tblGeoUC] ON [tblGeoTehsil].[id] = [tblGeoUC].[tehsil_id]
                                   INNER JOIN [tblGeoNutSite] ON [tblGeoUC].[id] = [tblGeoNutSite].[uc_id]
                            WHERE  [tblGeoUC].[isActive] = 1
                                   AND [tblGeoTehsil].[isActive] = 1
                                   AND [tblGeoNutSite].[isActive] = 1
                                   AND [tblGeoDistrict].[isActive] = 1;`)
                        })
                        .then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];
                            `)
                        })
                        .then(r => {
                            console.log('created new view v_geo_active')
                        })
                        .catch(e => {
                            console.log(e)
                        })

                } else if (_vold == 1533) {
                    knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        .then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_OtpAdd_yearmonth];`)
                        }).then(r => {
                            return knex.raw(`create view v_OtpAdd_yearmonth as
                        select site_id, strftime('%Y-%m', reg_date) as Year_month, (case when age>5 and age <24 then '6_23' when age>23 and age < 60 then '24_59' end) as age_grp, gender, count(otp_id) as tAdd
                        from tblOtpAdd
                        where is_deleted = 0 and prog_type = 'otp'
                        group by site_id, Year_month, age_grp, gender;
                        `)
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_OtpExit_yearmonth];`)
                        }).then(r => {
                            return knex.raw(`create view v_OtpExit_yearmonth as SELECT 
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
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_otp_remaining];`)
                        }).then(r => {
                            return knex.raw(`create view v_otp_remaining as SELECT 
                        [main].[v_OtpAdd_yearmonth].[site_id], 
                        [main].[v_OtpAdd_yearmonth].[Year_month], 
                        [main].[v_OtpAdd_yearmonth].[age_grp] , 
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
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_otp_remaining_geo];`)
                        }).then(r => {
                            return knex.raw(`create view v_otp_remaining_geo as SELECT 
                        [main].[v_geo].[province_id], 
                        [main].[v_geo].[district_id], 
                        [main].[v_geo].[tehsil_id], 
                        [main].[v_geo].[uc_id], 
                        [main].[v_geo].[site_id], 
                        [main].[v_otp_remaining].[Year_month], 
                        [main].[v_otp_remaining].[age_grp] as age_group, 
                        [main].[v_otp_remaining].[gender], 
                        [main].[v_otp_remaining].[tAdd], 
                        [main].[v_otp_remaining].[tExit], 
                        [main].[v_otp_remaining].[rem]
                 FROM   [main].[v_geo]
                        INNER JOIN [main].[v_otp_remaining] ON [main].[v_geo].[site_id] = [main].[v_otp_remaining].[site_id];`)
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {
                            console.log('created new view for new  report issues')
                        })
                        .catch(e => {
                            console.log(e)
                        })
                } else if (_vold == 1536) {
                    knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        .then(r => {
                            return knex.raw(`DROP VIEW IF EXISTS [main].[vSessionForReportNew];`)
                        }).then(r => {
                            return knex.raw(`create view vSessionForReportNew as 
                            SELECT 
                                   [vSessionsFullForUpdate].*, 
                                   [main].[tblSupervisors].[sup_name], 
                                   [main].[tblLhw].[staff_name]
                            FROM   [main].[vSessionsFullForUpdate]
                                   LEFT JOIN [main].[tblSupervisors] ON [main].[vSessionsFullForUpdate].[CHS_id] = [main].[tblSupervisors].[sup_code]
                                   LEFT JOIN [main].[tblLhw] ON [main].[vSessionsFullForUpdate].[CHW_id] = [main].[tblLhw].[staff_code];`)
                        }).then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        }).then(r => {

                            console.log('created new view for vSessionForReportNew')
                        })
                        .catch(e => {
                            console.log(e)
                        })
                } else if ((_vold > 1537 && _vold <= 1543)) {
                    knex.schema.hasTable('tblUpdateTracker').then(function (exists) {
                        if (exists) {
                            knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                .then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_geo_lhw];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW [v_geo_lhw]
                                AS
                                SELECT 
                                       [v_geo_uc].*, 
                                       [main].[tblLhw].[staff_name], 
                                       [main].[tblLhw].[staff_code]
                                FROM   [main].[v_geo_uc]
                                       INNER JOIN [main].[tblLhw] ON [main].[tblLhw].[uc] = [main].[v_geo_uc].[uc_id];`)
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[vSessionsFullForUpdate];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW [main].[vSessionsFullForUpdate]
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
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    console.log('created new view for sessions to correct report and entry')
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_exitNSCReport];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW [v_exitNSCReport]
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
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_geo_tehsil];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW [v_geo_tehsil]
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
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_exitNSCReportInterval];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW [v_exitNSCReportInterval]
                                    AS
                                    SELECT 
                                           [vnc].*, 
                                           [vg].[province_id], 
                                           [vg].[district_id]
                                    FROM   [v_exitNSCReport] [vnc]
                                           INNER JOIN [v_geo_tehsil] [vg] ON [vnc].[tehsil_id] = [vg].[tehsil_id];`)
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_NSCAdd_yearmonth];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW [v_NSCAdd_yearmonth]
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
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_nscExit_full];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW [v_nscExit_full]
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
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_NSCExit_yearmonth];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW [v_NSCExit_yearmonth]
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
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_nsc_remaining];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW [v_nsc_remaining]
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
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_nsc_remaining_geo];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW [v_nsc_remaining_geo]
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
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_otpAddmision2];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW 'v_otpAddmision2'
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
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    return knex.raw(`DROP VIEW IF EXISTS [main].[v_otpExitFullForUpdateNSC];`)
                                }).then(r => {
                                    return knex.raw(`CREATE VIEW 'v_otpExitFullForUpdateNSC'
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
                                }).then(r => {
                                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                                }).then(r => {
                                    console.log(`database updated till version ${_vold} for NSC reporting`)
                                })
                                .catch(e => {
                                    console.log(e)
                                })
                        }
                    })

                } else if ((_vold > 1543 && _vold <= 1544)) {
                    knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        })
                        .then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblOtpAdd] RENAME TO [_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblOtpAdd](
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
                            [exit_reason] CHAR(50), 
                            [total_days] INTEGER, 
                            [total_followups] INTEGER);`)
                        })
                        .then(r => {
                            return knex.raw(`INSERT INTO [main].[tblOtpAdd]([rowid], [otp_id], [otp_id_old], [client_id], [site_id], [site_village], [reg_date], [reg_id], [p_name], [f_or_h_name], [cnic], [address], [cnt_number], [age], [gender], [plw_type], [ent_reason], [ref_type], [oedema], [muac], [diarrhoea], [vomiting], [cough], [appetite], [daily_stool], [pass_urine], [b_Feeding], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [created_at], [updated_at], [upload_status], [username], [org_name], [project_name], [is_deleted], [other_com_name], [other_com_qty], [nsc_old_otp_id], [ref_type_other], [entry_reason_other], [travel_time_minutes], [is_mother_alive], [tehsil_id], [nsc_otp_id], [upload_date], [hh_id])
                        SELECT [rowid], [otp_id], [otp_id_old], [client_id], [site_id], [site_village], [reg_date], [reg_id], [p_name], [f_or_h_name], [cnic], [address], [cnt_number], [age], [gender], [plw_type], [ent_reason], [ref_type], [oedema], [muac], [diarrhoea], [vomiting], [cough], [appetite], [daily_stool], [pass_urine], [b_Feeding], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [created_at], [updated_at], [upload_status], [username], [org_name], [project_name], [is_deleted], [other_com_name], [other_com_qty], [nsc_old_otp_id], [ref_type_other], [entry_reason_other], [travel_time_minutes], [is_mother_alive], [tehsil_id], [nsc_otp_id], [upload_date], [hh_id]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        })
                        .then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblScrChildren] RENAME TO [_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblScrChildren](
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
                            [ent_type] char(10));`)
                        })
                        .then(r => {
                            return knex.raw(`INSERT INTO [main].[tblScrChildren]([rowid], [ch_scr_id_old], [ch_scr_id], [site_id], [screening_date], [created_at], [catchment_population], [staff_name], [staff_code], [sup_name], [sup_code], [total_scr_girls], [total_scr_boys], [sam_without_comp_girls_623], [sam_without_comp_boys_623], [sam_with_comp_girls_623], [sam_with_comp_boys_623], [mam_girls_623], [mam_boys_623], [sam_without_comp_girls_2459], [sam_without_comp_boys_2459], [sam_with_comp_girls_2459], [sam_with_comp_boys_2459], [mam_girls_2459], [mam_boys_2459], [reffer_tsfp_girls], [reffer_otp_girls], [reffer_tsfp_boys], [reffer_otp_boys], [normal_boys_623], [normal_girls_623], [normal_boys_2459], [normal_girls_2459], [first_mnp_30_girls], [first_mnp_30_boys], [second_mnp_30_girls], [second_mnp_30_boys], [third_mnp_30_girls], [third_mnp_30_boys], [fourth_mnp_30_girls], [fourth_mnp_30_boys], [fifth_mnp_30_girls], [fifth_mnp_30_boys], [sixth_mnp_30_girls], [sixth_mnp_30_boys], [deworming_girls], [deworming_boys], [new_boys], [new_girls], [reScreened_boys], [reScreened_girls], [no_oedema_girls], [no_oedema_boys], [plus12_oedema_girls], [plus12_oedema_boys], [plus3_oedema_girls], [plus3_oedema_boys], [client_id], [username], [project], [upload_status], [approved], [is_deleted], [report_month], [followedup_boys], [followedup_girls], [exits_boys], [exits_girls], [other_specify], [other_boys], [other_girls], [upload_date], [site_one], [site_two], [reffer_otp_girls_s1], [reffer_otp_girls_s2], [reffer_otp_boys_s1], [reffer_otp_boys_s2], [reffer_tsfp_girls_s1], [reffer_tsfp_girls_s2], [total_hh], [uc_id], [reffer_tsfp_boys_s1], [reffer_tsfp_boys_s2], [mnp_boys], [mnp_girls], [total_followup], [total_exits])
                        SELECT [rowid], [ch_scr_id_old], [ch_scr_id], [site_id], [screening_date], [created_at], [catchment_population], [staff_name], [staff_code], [sup_name], [sup_code], [total_scr_girls], [total_scr_boys], [sam_without_comp_girls_623], [sam_without_comp_boys_623], [sam_with_comp_girls_623], [sam_with_comp_boys_623], [mam_girls_623], [mam_boys_623], [sam_without_comp_girls_2459], [sam_without_comp_boys_2459], [sam_with_comp_girls_2459], [sam_with_comp_boys_2459], [mam_girls_2459], [mam_boys_2459], [reffer_tsfp_girls], [reffer_otp_girls], [reffer_tsfp_boys], [reffer_otp_boys], [normal_boys_623], [normal_girls_623], [normal_boys_2459], [normal_girls_2459], [first_mnp_30_girls], [first_mnp_30_boys], [second_mnp_30_girls], [second_mnp_30_boys], [third_mnp_30_girls], [third_mnp_30_boys], [fourth_mnp_30_girls], [fourth_mnp_30_boys], [fifth_mnp_30_girls], [fifth_mnp_30_boys], [sixth_mnp_30_girls], [sixth_mnp_30_boys], [deworming_girls], [deworming_boys], [new_boys], [new_girls], [reScreened_boys], [reScreened_girls], [no_oedema_girls], [no_oedema_boys], [plus12_oedema_girls], [plus12_oedema_boys], [plus3_oedema_girls], [plus3_oedema_boys], [client_id], [username], [project], [upload_status], [approved], [is_deleted], [report_month], [followedup_boys], [followedup_girls], [exits_boys], [exits_girls], [other_specify], [other_boys], [other_girls], [upload_date], [site_one], [site_two], [reffer_otp_girls_s1], [reffer_otp_girls_s2], [reffer_otp_boys_s1], [reffer_otp_boys_s2], [reffer_tsfp_girls_s1], [reffer_tsfp_girls_s2], [total_hh], [uc_id], [reffer_tsfp_boys_s1], [reffer_tsfp_boys_s2], [mnp_boys], [mnp_girls], [total_followup], [total_exits]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                        })
                        .then(r => {
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`ALTER TABLE [main].[tblScrPlw] RENAME TO [_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`CREATE TABLE [main].[tblScrPlw](
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
                            [ent_type] CHAR(10));`)
                        })
                        .then(r => {
                            return knex.raw(`INSERT INTO [main].[tblScrPlw]([rowid], [plw_scr_id_old], [plw_scr_id], [site_id], [screening_date], [created_at], [village], [staff_name], [staff_code], [sup_name], [sup_code], [total_scr_pragnent], [total_scr_lactating], [new_scr_pragnent], [new_scr_lactating], [reScreened_scr_pragnent], [reScreened_scr_lactating], [muac_gt_21_pragnent], [muac_gt_21_lactating], [muac_le_21_pragnent], [muac_le_21_lactating], [client_id], [username], [project], [upload_status], [approved], [is_deleted], [report_month], [ifa_first_time_pragnent], [ifa_first_time_lactating], [followup_pragnent], [followup_lactating], [exits_pragnent], [exit_lactating], [upload_date], [uc_id], [catchment_population], [total_hh], [total_followup], [total_exits])
                        SELECT [rowid], [plw_scr_id_old], [plw_scr_id], [site_id], [screening_date], [created_at], [village], [staff_name], [staff_code], [sup_name], [sup_code], [total_scr_pragnent], [total_scr_lactating], [new_scr_pragnent], [new_scr_lactating], [reScreened_scr_pragnent], [reScreened_scr_lactating], [muac_gt_21_pragnent], [muac_gt_21_lactating], [muac_le_21_pragnent], [muac_le_21_lactating], [client_id], [username], [project], [upload_status], [approved], [is_deleted], [report_month], [ifa_first_time_pragnent], [ifa_first_time_lactating], [followup_pragnent], [followup_lactating], [exits_pragnent], [exit_lactating], [upload_date], [uc_id], [catchment_population], [total_hh], [total_followup], [total_exits]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                        })
                        .then(r => {
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                        })
                        .then(r => {
                            return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                        })
                        .then(r=>{
                            return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r=>{
                            return knex.raw(`DROP VIEW IF EXISTS [main].[v_otpExitFullForUpdateNSC];`)
                        })
                        .then(r=>{
                            return knex.raw(`CREATE VIEW [main].[v_otpExitFullForUpdateNSC]
                            AS
                            SELECT 
                                   [main].[tblOtpAdd].[site_id], 
                                   [main].[tblOtpAdd].[p_name], 
                                   [main].[tblOtpAdd].[reg_id], 
                                   [main].[tblOtpAdd].[site_village], 
                                   [main].[tblOtpAdd].[prog_type], 
                                   [main].[tblOtpAdd].[reg_date] AS [add_date], 
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
                                   [main].[tblOtpAdd].[reg_date] AS [add_date], 
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
                                     AND [tblOtpAdd].[prog_type] = 'sc';`)
                        })
                        .then(r=>{
                            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                        })
                        .then(r => {
                            console.log('db updated till version 1.5.44')
                        })
                        .catch(e => {
                            console.log(e)
                        })
                } else {
                    console.log('database allready updated')
                }

                if (_vold == _version) {
                    fs.writeFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/.nv`, _version, 'utf8')
                }
            }
        }
    })

}