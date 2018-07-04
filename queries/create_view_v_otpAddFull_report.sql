select province_id, province, district_id, district_name, tehsil_id, tehsil_name, uc_id, uc_name, site_name, site_id, reg_date, 
       count( case when muac < 11.5 then '' END ) as 'MUAC < 11.5',
       count( case when oedema != 'absent' then '' END ) as 'Oedema',
       count( case when ent_reason = 'no_prv_pro' then '' END ) as 'New Addmision',
       count( case when ent_reason = 'relapse' then '' END ) as 'Relapse',
       count( case when ent_reason = 'def_sfp' then '' END ) as 'Def SFP',
       count( case when ent_reason = 'def_otp' then '' END ) as 'Def OTP',
       count( case when ent_reason = 'abb_inp' then '' END ) as 'Abbondon',
       count( case when ent_reason = 'promotion_in_from_sc' then '' END ) as 'Promotion in from SC',
       count( case when ent_reason = 'tranfer_in_other_otp' then '' END ) as 'Transfer in from other OTP',
       count( case when ent_reason = 'tranfer_in_from_sfp' then '' END ) as 'Transfer in from SFP',
       count( case when ent_reason = 'other' then '' END ) as 'Other',
       strftime('%m',reg_date) as 'Month',
       strftime('%Y',reg_date) as 'Year',
       strftime('%d',reg_date) as 'Day'
from v_otpAdd_full
where muac < 11.5
group by otp_id