
select province_id, province, district_id, district_name, tehsil_id, tehsil_name, uc_id, uc_name, site_name, site_id, exit_date, exit_id, exit_muac, exit_weight, 
       count( case when exit_reason = 'cured' then '' END ) as 'Cured',
       count( case when exit_reason = 'defaulter' then '' END ) as 'Defaulter',
       count( case when exit_reason = 'non_responder' then '' END ) as 'Non Responder',
       count( case when exit_reason = 'death' then '' END ) as 'Death',
       count( case when exit_reason = 'medical_transfer_sc' then '' END ) as 'Medical Transfer To SC',
       count( case when exit_reason = 'transfer_out_to_other_otp' then '' END ) as 'Transfer Out to other OTP',
       count( case when exit_reason = 'other' then '' END ) as 'Other',
       strftime('%m',exit_date) as 'Month',
       strftime('%Y',exit_date) as 'Year',
       strftime('%d',exit_date) as 'Day'
from v_otpExit_full
group by otp_id

update 