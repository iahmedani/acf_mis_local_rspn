const fs = require('fs')
module.exports = (knex) => {

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
                    })
                }).catch(e => {
                    console.log(e)
                })
        } else if (stat) {
            var updateCheck = fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`)
            // Check for update 1 which if for updating tblOtpAdd to remove reg_id unique contraint 
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
            } else if(updateCheck == '2'){
                knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                    .then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                    }).then(r=>{
                        return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                    }).then(r=>{
                        return knex.raw(`ALTER TABLE [main].[tblGeoDistrict] RENAME TO [_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`CREATE TABLE [main].[tblGeoDistrict](
                            [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                            [districtName] varchar(255), 
                            [province_id] integer, 
                            [created_at] datetime, 
                            [updated_at] datetime, 
                            [isActive] BOOLEAN DEFAULT 1);`)
                    }).then(r=>{
                        return knex.raw(`INSERT INTO [main].[tblGeoDistrict]([rowid], [id], [districtName], [province_id], [created_at], [updated_at])
                        SELECT [rowid], [id], [districtName], [province_id], [created_at], [updated_at]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                    }).then(r=>{
                        return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                    }).then(r=>{
                        return knex.raw(`ALTER TABLE [main].[tblGeoProvince] RENAME TO [_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`CREATE TABLE [main].[tblGeoProvince](
                            [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                            [provinceName] varchar(255), 
                            [created_at] datetime, 
                            [updated_at] datetime, 
                            [isActive] BOOLEAN DEFAULT 1);`)
                    }).then(r=>{
                        return knex.raw(`INSERT INTO [main].[tblGeoProvince]([rowid], [id], [provinceName], [created_at], [updated_at])
                        SELECT [rowid], [id], [provinceName], [created_at], [updated_at]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                    }).then(r=>{
                        return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                    }).then(r=>{
                        return knex.raw(`ALTER TABLE [main].[tblGeoTehsil] RENAME TO [_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`CREATE TABLE [main].[tblGeoTehsil](
                            [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                            [tehsilName] varchar(255), 
                            [district_id] integer, 
                            [created_at] datetime, 
                            [updated_at] datetime, 
                            [isActive] BOOLEAN DEFAULT 1);`)
                    }).then(r=>{
                        return knex.raw(`INSERT INTO [main].[tblGeoTehsil]([rowid], [id], [tehsilName], [district_id], [created_at], [updated_at])
                        SELECT [rowid], [id], [tehsilName], [district_id], [created_at], [updated_at]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                    }).then(r=>{
                        return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                    }).then(r=>{
                        return knex.raw(`ALTER TABLE [main].[tblGeoUC] RENAME TO [_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`CREATE TABLE [main].[tblGeoUC](
                            [id] integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                            [ucName] varchar(255), 
                            [tehsil_id] integer, 
                            [created_at] datetime, 
                            [updated_at] datetime, 
                            [isActive] BOOLEAN DEFAULT 1);`)
                    }).then(r=>{
                        return knex.raw(`INSERT INTO [main].[tblGeoUC]([rowid], [id], [ucName], [tehsil_id], [created_at], [updated_at])
                        SELECT [rowid], [id], [ucName], [tehsil_id], [created_at], [updated_at]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].legacy_alter_table = 'on';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
                    }).then(r=>{
                        return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                    }).then(r=>{
                        return knex.raw(`ALTER TABLE [main].[tblGeoNutSite] RENAME TO [_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
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
                    }).then(r=>{
                        return knex.raw(`INSERT INTO [main].[tblGeoNutSite]([rowid], [id], [siteName], [province_id], [district_id], [tehsil_id], [uc_id], [OTP], [SFP], [SC], [created_at], [updated_at])
                        SELECT [rowid], [id], [siteName], [province_id], [district_id], [tehsil_id], [uc_id], [OTP], [SFP], [SC], [created_at], [updated_at]
                        FROM [main].[_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
                    }).then(r=>{
                        return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
                    }).then(r=>{
                        return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
                    }).then(r=>{
                        fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '3', (err) => {
                            if (err) throw err;
                            console.log('updated geo tables')
                        })
                    }).catch(e => {
                        console.log(e)
                    })
    
           
           }else if (updateCheck == '3'){

            knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction]`)
            .then(r=>{
                return knex.raw(`DROP VIEW IF EXISTS [main].[vSessionsFullForUpdate];`)
            })
            .then(r=>{
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
            .then(r=>{
                return knex.raw('RELEASE [sqlite_expert_apply_design_transaction];')
            })
            .then(r=>{
                fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '4', (err) => {
                    if (err) throw err;
                    console.log('updated vSessionsFullForUpdate view')
                })
            }).catch(e=>{
                console.log(e)
            })

           }else if(updateCheck == '4'){
               knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
               .then(r=>{
                   return knex.raw(`DROP VIEW IF EXISTS [main].[v_otpExit_full];`)
               })
               .then(r=>{
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
               .then(r=>{
                   return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
               })
               .then(r=>{
                return knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
                })
               .then(r=>{
                return knex.raw(`DROP VIEW IF EXISTS [main].[v_otpAdd_full];`)
                 })
                .then(r=>{
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
                .then(r=>{
                    return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
                })
                .then(r=>{
                    fs.writeFile(`${process.env.APPDATA}/ACF MIS Local app/updateHist.txt`, '5', (err) => {
                        if (err) throw err;
                        console.log('updated views to remove data eerros')
                    })
                })
                .catch(e=>{
                    console.log(e)
                })

               
               




         }else {
                console.log('v_otpNotExit already updated')
            }
        }
    })

}