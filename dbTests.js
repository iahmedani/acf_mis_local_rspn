var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: 'acf_mis_local.sqlite3'
    
    
    // filename: './acf_mis_local.sqlite3'
  }
});

knex.from('tblOtpAdd')
  .innerJoin('tblInterimOtp','tblInterimOtp.otp_id', 'tblOtpAdd.otp_id')
  .where('site_id',1)
  .then(result=>{
    console.log(result)
  })
  .catch(e=>{
    console.log(e);
  })