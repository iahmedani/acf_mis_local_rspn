var OTPTableUpdate = {};

OTPTableUpdate.tblOtpAdd = `PRAGMA [main].legacy_alter_table = 'on';

PRAGMA [main].foreign_keys = 'off';

SAVEPOINT [sqlite_expert_apply_design_transaction];

ALTER TABLE [main].[tblOtpAdd] RENAME TO [_sqliteexpert_temp_table_1];

CREATE TABLE [main].[tblOtpAdd](
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
  [hh_id] VARCHAR(20));

INSERT INTO [main].[tblOtpAdd]([rowid], [otp_id_old], [client_id], [site_id], [site_village], [reg_date], [reg_id], [p_name], [f_or_h_name], [cnic], [address], [cnt_number], [age], [gender], [plw_type], [ent_reason], [ref_type], [oedema], [muac], [diarrhoea], [vomiting], [cough], [appetite], [daily_stool], [pass_urine], [b_Feeding], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [created_at], [updated_at], [upload_status], [username], [org_name], [project_name], [is_deleted], [other_com_name], [other_com_qty], [nsc_old_otp_id], [ref_type_other], [entry_reason_other], [travel_time_minutes], [is_mother_alive], [tehsil_id], [nsc_otp_id], [upload_date], [hh_id])
SELECT [rowid], [otp_id] as otp_id_old, [client_id], [site_id], [site_village], [reg_date], [reg_id], [p_name], [f_or_h_name], [cnic], [address], [cnt_number], [age], [gender], [plw_type], [ent_reason], [ref_type], [oedema], [muac], [diarrhoea], [vomiting], [cough], [appetite], [daily_stool], [pass_urine], [b_Feeding], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [created_at], [updated_at], [upload_status], [username], [org_name], [project_name], [is_deleted], [other_com_name], [other_com_qty], [nsc_old_otp_id], [ref_type_other], [entry_reason_other], [travel_time_minutes], [is_mother_alive], [tehsil_id], [nsc_otp_id], [upload_date], [hh_id]
FROM [main].[_sqliteexpert_temp_table_1];

DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];

RELEASE [sqlite_expert_apply_design_transaction];

PRAGMA [main].foreign_keys = 'on';

PRAGMA [main].legacy_alter_table = 'off';`

OTPTableUpdate.tblOtpFollowup = `PRAGMA [main].legacy_alter_table = 'on';

PRAGMA [main].foreign_keys = 'off';

SAVEPOINT [sqlite_expert_apply_design_transaction];

ALTER TABLE [main].[tblOtpFollowup] RENAME TO [_sqliteexpert_temp_table_1];

CREATE TABLE [main].[tblOtpFollowup](
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

INSERT INTO [main].[tblOtpFollowup]([rowid], [followup_id_old], [otp_id_old], [client_id], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [curr_date], [status], [next_followup], [created_at], [updated_at], [muac], [upload_status], [is_deleted], [other_com_name], [other_com_qty], [upload_date])
SELECT [rowid], [followup_id] as followup_id_old, [otp_id] as followup_id_old, [client_id], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [prog_type], [curr_date], [status], [next_followup], [created_at], [updated_at], [muac], [upload_status], [is_deleted], [other_com_name], [other_com_qty], [upload_date]
FROM [main].[_sqliteexpert_temp_table_1];

DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];

RELEASE [sqlite_expert_apply_design_transaction];

PRAGMA [main].foreign_keys = 'on';

PRAGMA [main].legacy_alter_table = 'off';`

OTPTableUpdate.tblInterimOtp = `PRAGMA [main].legacy_alter_table = 'on';

PRAGMA [main].foreign_keys = 'off';

SAVEPOINT [sqlite_expert_apply_design_transaction];

ALTER TABLE [main].[tblInterimOtp] RENAME TO [_sqliteexpert_temp_table_1];

CREATE TABLE [main].[tblInterimOtp](
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

INSERT INTO [main].[tblInterimOtp]([rowid], [interim_id_old], [otp_id_old], [client_id], [muac], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [int_prog_type], [curr_date], [status], [next_followup], [created_at], [updated_at], [is_deleted], [other_com_name], [other_com_qty])
SELECT [rowid], [interim_id] as interim_id_old, [otp_id] as otp_id_old, [client_id], [muac], [weight], [height], [ration1], [quantity1], [ration2], [quantity2], [ration3], [quantity3], [int_prog_type], [curr_date], [status], [next_followup], [created_at], [updated_at], [is_deleted], [other_com_name], [other_com_qty]
FROM [main].[_sqliteexpert_temp_table_1];

DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];

RELEASE [sqlite_expert_apply_design_transaction];

PRAGMA [main].foreign_keys = 'on';

PRAGMA [main].legacy_alter_table = 'off';`;

OTPTableUpdate.tblOtpExit = `PRAGMA [main].legacy_alter_table = 'on';

PRAGMA [main].foreign_keys = 'off';

SAVEPOINT [sqlite_expert_apply_design_transaction];

ALTER TABLE [main].[tblOtpExit] RENAME TO [_sqliteexpert_temp_table_1];

CREATE TABLE [main].[tblOtpExit](
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

INSERT INTO [main].[tblOtpExit]([rowid], [exit_id_old], [otp_id_old], [client_id], [exit_muac], [exit_weight], [exit_height], [exit_ration1], [exit_quantity1], [exit_ration2], [exit_quantity2], [exit_ration3], [exit_quantity3], [exit_prog_type], [exit_date], [exit_reason], [created_at], [updated_at], [upload_status], [weight_gain], [days_in_program], [is_deleted], [exit_other_com_name], [exit_other_com_qty], [upload_date])
SELECT [rowid], [exit_id] as exit_id_old, [otp_id] as otp_id_old, [client_id], [exit_muac], [exit_weight], [exit_height], [exit_ration1], [exit_quantity1], [exit_ration2], [exit_quantity2], [exit_ration3], [exit_quantity3], [exit_prog_type], [exit_date], [exit_reason], [created_at], [updated_at], [upload_status], [weight_gain], [days_in_program], [is_deleted], [exit_other_com_name], [exit_other_com_qty], [upload_date]
FROM [main].[_sqliteexpert_temp_table_1];

DROP TABLE IF EXISTS [main].[_sqliteexpert_temp_table_1];

RELEASE [sqlite_expert_apply_design_transaction];

PRAGMA [main].foreign_keys = 'on';

PRAGMA [main].legacy_alter_table = 'off';`

module.exports = OTPTableUpdate;