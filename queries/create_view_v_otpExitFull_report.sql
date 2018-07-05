create view v_otpExitFull_report as
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
group by prog_type
