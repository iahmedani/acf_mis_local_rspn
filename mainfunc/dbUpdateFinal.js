const fs = require('fs')
module.exports = (knex)=>{

    fs.stat(`${process.env.APPDATA}/ACF MIS Local app/updateHist.json`, (err, stat)=>{
        
        if(err){
            knex.raw(`PRAGMA [main].legacy_alter_table = 'on'`)
            .then(r=>{
                console.log(`Setp One Done`)
                return knex.raw(`PRAGMA [main].foreign_keys = 'off';`)
            }).then(r=>{
                console.log(`Setp two Done`)
        
                return  knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
            }).then(r=>{
                console.log(`Setp three Done`)
                return knex.raw(`ALTER TABLE [main].[tblOtpAdd] RENAME TO [_sqliteexpert_temp_table_1];`)  
            }).then(r=>{
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
            }).then(r=>{
                console.log(`Setp five Done`)
        
                return knex.raw(`INSERT INTO [main].[tblOtpAdd]([rowid], [otp_id], [client_id], [site_id], [site_village], [reg_date], [reg_id], [p_name], [f_or_h_name], [cnic], [address], [cnt_number], [age], [gender], [plw_type], [ent_reason], [ref_type], [oedema], [muac], [diarrhoea], [vomiting], [cough], [appetite], [daily_stool], [pass_urine], [b_Feeding], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [created_at], [updated_at], [upload_status], [username], [org_name], [project_name], [is_deleted], [other_com_name], [other_com_qty], [nsc_old_otp_id], [ref_type_other], [entry_reason_other], [travel_time_minutes], [is_mother_alive], [tehsil_id], [nsc_otp_id], [upload_date], [hh_id])
                SELECT [rowid], [otp_id], [client_id], [site_id], [site_village], [reg_date], [reg_id], [p_name], [f_or_h_name], [cnic], [address], [cnt_number], [age], [gender], [plw_type], [ent_reason], [ref_type], [oedema], [muac], [diarrhoea], [vomiting], [cough], [appetite], [daily_stool], [pass_urine], [b_Feeding], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [created_at], [updated_at], [upload_status], [username], [org_name], [project_name], [is_deleted], [other_com_name], [other_com_qty], [nsc_old_otp_id], [ref_type_other], [entry_reason_other], [travel_time_minutes], [is_mother_alive], [tehsil_id], [nsc_otp_id], [upload_date], [hh_id]
                FROM [main].[_sqliteexpert_temp_table_1];`)
            }).then(r=>{
                console.log(`Setp six Done`)
        
                return knex.raw(`DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];`)
            }).then(r=>{
                console.log(`Setp seven Done`)
        
                return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
            }).then(r=>{
                console.log(`Setp eight Done`)
        
                return knex.raw(`PRAGMA [main].foreign_keys = 'on';`)
            }).then(r=>{
                console.log(`Setp nine Done`)
        
                return knex.raw(`PRAGMA [main].legacy_alter_table = 'off';`)
            }).then(r=>{
                console.log('Final Step')
            }).catch(e=>{
                console.log(e)
            })
        }else{
            console.log('System Already updated')
        }
    })

}