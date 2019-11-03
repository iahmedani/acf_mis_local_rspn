const fs = require('fs');
const {
    app
} = require('electron');

module.exports = (knex) => {
    // var _version = app.getVersion();
    // console.log({
    //     'Version From Update': _version
    // })

    fs.stat(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, (err, stat) => {
        if (err) {
            knex.raw(`PRAGMA [main].legacy_alter_table = 'on'`)
                .then(r => {
                    console.log(`Setp One Done`)
                    return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                }).then(r => {
                    console.log(`Setp two Done`)

                    return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                }).then(r => {
                    console.log(`Setp three Done`)
                    return knex.raw(`ALTER TABLE [main].[tblOtpAdd] RENAME TO [_sqliteexpert_temp_table_1];`)
                }).then(r => {
                    console.log(`Setp four Done`)

                    return knex.raw(`CREATE TABLE [main].[tblOtpAdd](
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
                    [hh_id] VARCHAR(20));`)
                }).then(r => {
                    console.log(`Setp five Done`)

                    return knex.raw(`INSERT INTO [main].[tblOtpAdd]([rowid], [otp_id], [client_id], [site_id], [site_village], [reg_date], [reg_id], [p_name], [f_or_h_name], [cnic], [address], [cnt_number], [age], [gender], [plw_type], [ent_reason], [ref_type], [oedema], [muac], [diarrhoea], [vomiting], [cough], [appetite], [daily_stool], [pass_urine], [b_Feeding], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [created_at], [updated_at], [upload_status], [username], [org_name], [project_name], [is_deleted], [other_com_name], [other_com_qty], [nsc_old_otp_id], [ref_type_other], [entry_reason_other], [travel_time_minutes], [is_mother_alive], [tehsil_id], [nsc_otp_id], [upload_date], [hh_id])
                SELECT [rowid], [otp_id], [client_id], [site_id], [site_village], [reg_date], [reg_id], [p_name], [f_or_h_name], [cnic], [address], [cnt_number], [age], [gender], [plw_type], [ent_reason], [ref_type], [oedema], [muac], [diarrhoea], [vomiting], [cough], [appetite], [daily_stool], [pass_urine], [b_Feeding], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [created_at], [updated_at], [upload_status], [username], [org_name], [project_name], [is_deleted], [other_com_name], [other_com_qty], [nsc_old_otp_id], [ref_type_other], [entry_reason_other], [travel_time_minutes], [is_mother_alive], [tehsil_id], [nsc_otp_id], [upload_date], [hh_id]
                FROM [main].[_sqliteexpert_temp_table_1];`)
                }).then(r => {
                    console.log(`Setp six Done`)

                    return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                }).then(r => {
                    console.log(`Setp seven Done`)

                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                }).then(r => {
                    console.log(`Setp eight Done`)

                    return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                }).then(r => {
                    console.log(`Setp nine Done`)

                    return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                }).then(r => {
                    console.log('Final Step')
                    var updateDetails = [{
                        update: 'Table OtpAdd remove reg_id unique contraint'
                    }]
                    fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '1', (err) => {
                        if (err) throw err;
                        console.log('Table OtpAdd remove reg_id unique contraint')
                        // app.relaunch();
                    })
                }).catch(e => {
                    console.log(e)
                })
        } else if (stat) {
            var updateCheck = fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`)

            if (updateCheck == '1') {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '2', (err) => {
                            if (err) throw err;
                            console.log('v_otpNotExitUpdated')
                        })
                    }).catch(e => {
                        console.log(e)
                    })
            } else if (updateCheck == '2') {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '3', (err) => {
                            if (err) throw err;
                            console.log('updated geo tables')
                        })
                    }).catch(e => {
                        console.log(e)
                    })


            } else if (updateCheck == '3') {

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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '4', (err) => {
                            if (err) throw err;
                            console.log('updated vSessionsFullForUpdate view')
                        })
                    }).catch(e => {
                        console.log(e)
                    })

            } else if (updateCheck == '4') {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '5', (err) => {
                            if (err) throw err;
                            console.log('updated views to remove data eerros')
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else if (updateCheck == '5') {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '6', (err) => {
                            if (err) throw err;
                            console.log('updated tblSupervisors tblLHW tblvillages')
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })





            } else if (updateCheck == '6') {
                knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                    .then(r => {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '7', (err) => {
                            if (err) throw err;
                            console.log('created two views to support new report')
                        })
                    }).catch(e => {
                        console.log(e)
                    })
            } else if (updateCheck == '7') {
                knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                    .then(r => {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '8', (err) => {
                            if (err) throw err;
                            console.log('created new view v_geo_active')
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else if (updateCheck == '8') {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '9', (err) => {
                            if (err) throw err;
                            console.log('created new view for new  report issues')
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else if (updateCheck == '9') {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '10', (err) => {
                            if (err) throw err;
                            console.log('created new view for vSessionForReportNew')
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else if (updateCheck == '10') {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '11', (err) => {
                            if (err) throw err;
                            console.log('created new view for sessions to correct report and entry')
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else if (updateCheck == '11') {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '12', (err) => {
                            if (err) throw err;
                            console.log('created new view for sessions to correct report and entry')
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else if (updateCheck == '12') {
                knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                    .then(r => {
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
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '13', (err) => {
                            if (err) throw err;
                            console.log('NSC DB Updates')
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else {
                console.log('v_otpNotExit already updated')
            }
        }
    })

}