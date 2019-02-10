const knex = require('./mainfunc/db');


knex.select(
  knex.raw(`SUM(total_scr_girls + total_scr_boys) as total_scr,
  SUM(new_boys + new_girls) as total_new,
  sum(normal_boys_623 + normal_girls_623) as total_normal_623,
  sum(mam_girls_623 + mam_boys_623) as total_mam_623,     
  sum(sam_without_comp_girls_623 + sam_without_comp_boys_623) as total_sam_without_comp_623,
  sum(sam_with_comp_girls_623 + sam_with_comp_boys_623) as total_sam_with_comp_623,
  sum(normal_boys_2459 + normal_girls_2459) as total_normal_2459,
  sum(mam_girls_2459 + mam_boys_2459) as total_mam_2459,
  sum(sam_without_comp_girls_2459 + sam_without_comp_boys_2459) as total_sam_without_comp_2459,
  sum(sam_with_comp_girls_2459 + sam_with_comp_boys_2459) as total_sam_with_comp_2459,
  sum(no_oedema_girls + no_oedema_boys) as total_no_oedema,
  sum(plus12_oedema_girls + plus12_oedema_boys) as total_plus12_oedema,
  sum(plus3_oedema_girls + plus3_oedema_boys) as total_plus3_oedema,
  sum(reffer_tsfp_girls + reffer_tsfp_boys) as total_tsfp,
  sum(reffer_otp_girls + reffer_otp_boys) as total_otp,
  sum(reffer_sc_girls + reffer_sc_boys) as total_sc,
  sum(mnp_30_girls + mnp_30_boys) as total_mnp_sch
`)).from('v_tblScrChildrenFull')
  .sum({mnp_30_boys:'mnp_30_boys'})
  .sum({total_scr_boys:'total_scr_boys'})
  .sum({new_boys:'new_boys'})
  .sum({normal_boys_623:'normal_boys_623'})
  .sum({mam_boys_623:'mam_boys_623'})
  .sum({sam_without_comp_boys_623:'sam_without_comp_boys_623'})
  .sum({sam_with_comp_boys_623:'sam_with_comp_boys_623'})
  .sum({normal_boys_2459:'normal_boys_2459'})
  .sum({mam_boys_2459:'mam_boys_2459'})
  .sum({sam_without_comp_boys_2459:'sam_without_comp_boys_2459'})
  .sum({sam_with_comp_boys_2459:'sam_with_comp_boys_2459'})
  .sum({no_oedema_boys:'no_oedema_boys'})
  .sum({plus12_oedema_boys:'plus12_oedema_boys'})
  .sum({plus3_oedema_boys:'plus3_oedema_boys'})
  .sum({reffer_tsfp_boys:'reffer_tsfp_boys'})
  .sum({reffer_otp_boys:'reffer_otp_boys'})
  .sum({reffer_sc_boys:'reffer_sc_boys'})
  .sum({mnp_30_boys:'mnp_30_boys'})
  .sum({mnp_30_girls:'mnp_30_girls'})
  .sum({total_scr_girls:'total_scr_girls'})
  .sum({new_girls:'new_girls'})
  .sum({normal_girls_623:'normal_girls_623'})
  .sum({mam_girls_623:'mam_girls_623'})
  .sum({sam_without_comp_girls_623:'sam_without_comp_girls_623'})
  .sum({sam_with_comp_girls_623:'sam_with_comp_girls_623'})
  .sum({normal_girls_2459:'normal_girls_2459'})
  .sum({mam_girls_2459:'mam_girls_2459'})
  .sum({sam_without_comp_girls_2459:'sam_without_comp_girls_2459'})
  .sum({sam_with_comp_girls_2459:'sam_with_comp_girls_2459'})
  .sum({no_oedema_girls:'no_oedema_girls'})
  .sum({plus12_oedema_girls:'plus12_oedema_girls'})
  .sum({plus3_oedema_girls:'plus3_oedema_girls'})
  .sum({reffer_tsfp_girls:'reffer_tsfp_girls'})
  .sum({reffer_otp_girls:'reffer_otp_girls'})
  .sum({reffer_sc_girls:'reffer_sc_girls'})
  .sum({mnp_30_girls:'mnp_30_girls'})
      .then(result=>{
        console.log(result)
      })
      .catch(err=>{
        console.log(err);
      })