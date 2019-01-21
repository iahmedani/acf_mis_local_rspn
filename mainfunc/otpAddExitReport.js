module.exports = (ipcMain, knex, fs, sndMsg, async) => {
  ipcMain.on('getReport', (event, data) => {
    console.log(data);
    async.series({
      last: (cb) => {
        knex("v_otpNotExit")
          .select('age_group', 'gender')
          .count({ a: 'otp_id' })
          .where('reg_date', '<', data.report_month)
          .where({site_id: data.site_id})
          .groupBy('age_group', 'gender')
          .then(result => {
            cb(null, result)
          })
          .catch(e => {
            console.log(e)
            cb(e)
         })
      },
      add: (cb) => {
        knex("tblOtpAdd")
          .select(knex.raw(`(case when age > 23 then '24_59' when age <24 then '6_23' end) as age_group,
gender,
  count(case when muac < 11.5  and ent_reason = 'no_prv_pro' then 1 end) as b1,  
   count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end) as b2,
   ( count(case when muac < 11.5  and ent_reason = 'no_prv_pro' then 1 end) + count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end)) as b,
   count(case when ent_reason = 'return_def' then 1 end) as c1,
   count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) as c2,
   count(case when (ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def') and ent_reason <> 'relapse' and ent_reason = 'no_prv_pro' then 1 end) as c3,
   count(case when ent_reason = 'relapse' then 1 end) as cc,
   (  count(case when ent_reason = 'return_def' then 1 end) + count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) + count(case when ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason = 'no_prv_pro' then 1 end) )  as c,
   (( count(case when muac < 11.5  and ent_reason = 'no_prv_pro' then 1 end) + count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end)) + (count(case when ent_reason = 'relapse' then 1 end)) + (count(case when ent_reason = 'return_def' then 1 end) + count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) + count(case when ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason = 'no_prv_pro' then 1 end))) as d`))
          .where("reg_date", "like", `${data.report_month}%`)
          // // .where("reg_date", "like", `'data.report_month%'`)
          .where({ site_id: data.site_id })
          .groupBy("age_group", "gender")
          .then(result => {
            cb(null, result);
          })
          .catch(e => {
            console.log(e);
            cb(e);
          });
      }, exit: (cb) => {
        knex('v_exitOtpReport')
          .select(knex.raw(`(case when age > 23 then '24_59' when age <24 then '6_23' end) as age_group,
gender,
count(case when exit_reason = 'cured' then 1 end) as e1,
count(case when exit_reason = 'death' then 1 end) as e2,
count(case when exit_reason = 'defaulter' then 1 end) as e3,
count(case when exit_reason = 'non_respondent' then 1 end) as e4,
(count(case when exit_reason = 'cured' then 1 end)+ count(case when exit_reason = 'death' then 1 end) + count(case when exit_reason = 'defaulter' then 1 end) + count(case when exit_reason = 'non_respondent' then 1 end)) as e,
count(case when exit_reason = 'medical_transfer' then 1 end) as f1,
count(case when exit_reason = 'medical_transfer_sc' then 1 end) as f2,
count(case when exit_reason <> 'cured' and exit_reason <> 'death' and exit_reason <> 'defaulter' and exit_reason <> 'non_respondent' and exit_reason <> 'medical_transfer' and exit_reason <> 'medical_transfer_sc' then 1 end) as f3,
(count(case when exit_reason = 'medical_transfer' then 1 end) + count(case when exit_reason = 'medical_transfer_sc' then 1 end) + count(case when exit_reason <> 'cured' and exit_reason <> 'death' and exit_reason <> 'defaulter' and exit_reason <> 'non_respondent' and exit_reason <> 'medical_transfer' and exit_reason <> 'medical_transfer_sc' then 1 end)) as f,
((count(case when exit_reason = 'medical_transfer' then 1 end) + count(case when exit_reason = 'medical_transfer_sc' then 1 end) + count(case when exit_reason <> 'cured' and exit_reason <> 'death' and exit_reason <> 'defaulter' and exit_reason <> 'non_respondent' and exit_reason <> 'medical_transfer' and exit_reason <> 'medical_transfer_sc' then 1 end)) +(count(case when exit_reason = 'cured' then 1 end)+ count(case when exit_reason = 'death' then 1 end) + count(case when exit_reason = 'defaulter' then 1 end) + count(case when exit_reason = 'non_respondent' then 1 end))) as g `))
          .where("exit_date", "like", `${data.report_month}%`)
          .where({ site_id: data.site_id })          
          .groupBy('age_group', 'gender')
          .then(result => {
            cb(null, result)
          })
          .catch(e => {
            console.log(e)
            cb(e)
          })
      }
    }, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
          event.sender.send("getReport", {result});
        }
    })
 })
}
