
const knex = require('./mainfunc/db');

// knex('v_otpAddNewReport')
// .select(knex.raw(`count( case when ent_reason = 'no_prv_pro' then '' END ) as newAdmision,
// count( case when ent_reason = 'relapse' then '' END ) as 'Relapse',
// sum( case when ent_reason = 'def_sfp' or ent_reason = 'def_otp' then '' END) as 'default',
// count( case when ent_reason = 'abb_inp' then '' END ) as 'Abbondon',
// count( case when ent_reason = 'promotion_in_from_sc' then '' END ) as 'Pro_in_from_SC',
// count( case when ent_reason = 'tranfer_in_other_otp' then '' END ) as 'Trasfer_in_from_other_OTP',
// count( case when ent_reason = 'tranfer_in_from_sfp' then '' END ) as 'Transfer_in_from_SFP',
// count( case when ent_reason = 'other' then '' END ) as 'Other'`))
// .count({totalAd:'otp_id'})
// .select('age','gender')
// .andWhereNotBetween('age',['above59','below_6'])
// .groupBy('gender','age')
// .then(result=>console.log(result))
// .catch(e=>console.log(e))

// cured, deaths, defaulter, non_respondent, transfer_sc, transfer_otp, other, total_discharged

knex('v_otpExitReportNew')
.select({eAge:'age',eGender:'gender'})

  // .select('age','gender')
  .andWhereNotBetween('age',['above59','below_6'])
  .select(knex.raw(`count( case when exit_reason = 'cured' then '' END ) as 'cured',
  count( case when exit_reason = 'death' then '' END ) as 'death',
  count( case when exit_reason = 'defaulter' then '' END ) as 'defaulter',
  count( case when exit_reason = 'non_responder' then '' END ) as 'non_responder',
  count( case when exit_reason = 'medical_transfer_sc' then '' END ) as 'medical_transfer_SC',
  count( case when exit_reason = 'transfer_out_to_other_otp' then '' END ) as 'transfer_out_other_OTP',
  count( case when exit_reason = 'other' then '' END ) as 'eOther'`))
  .count({totalExit: 'otp_id'})
  .groupBy('gender','age')
  .then(result=>console.log(result))
  .catch(e=>console.log(e))

  // .where((builder)=>{
  //   if(!cond.date){
  //     builder.where(cond);
  //   } else {
  //     var newCond = cond;
  //     var date;
  //     if(newCond.date){
  //       date = newCond.date;
  //       delete newCond.date;
  //     } 
  //     if(date && isEmpty(newCond)){
  //       builder.whereBetween('reg_date', date.y);
  //     } else {
  //       console.log(date);
  //       builder.where(newCond).whereBetween('reg_date', date.y);
  //     }
  //   }
  // })