create view v_otpAddFull_report as
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
group by otp_id