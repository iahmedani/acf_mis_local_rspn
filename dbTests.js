const knex = require('./mainfunc/db');


knex.from('tblOtpAdd')
  .innerJoin('tblInterimOtp','tblInterimOtp.otp_id', 'tblOtpAdd.otp_id')
  .where('site_id',1)
  .then(result=>{
    console.log(result)
  })
  .catch(e=>{
    console.log(e);
  })



    knex('tblOtpAdd')
      .then(result=>{
        console.log(result)
      })
      .catch(e=>{
        console.log(e)
      })