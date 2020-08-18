var knex = require('../db');
var fs = require('fs');
// const { app } = require('electron');
var appConfig = JSON.parse(fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, 'utf8'))
module.exports = function (app) {
knex.schema.hasTable('tblUpdates').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('tblUpdates', function(t) {
        t.increments('id');
        t.integer('version');
        t.string('description');
      });
    }
})
.then(r=>{
    return knex('tblUpdates').where({version:308})
})
.then(r=>{
    if(!r.length){
        knex.raw(`SAVEPOINT [sqlite_expert_apply_design_transaction];`)
        .then(r=>{
            return knex.raw(`DROP VIEW IF EXISTS [main].[oneTable];`)
        })
        .then(r=>{
            return knex.raw(`CREATE VIEW [main].[oneTable]
            AS
            SELECT 
                   [tblOtpAdd].*, 
                   [tblOtpExit].[exit_muac], 
                   [tblOtpExit].[exit_weight], 
                   [tblOtpExit].[exit_height], 
                   [tblOtpExit].[exit_reason], 
                   [tblOtpExit].[exit_date]
            FROM   [tblOtpAdd]
                   LEFT JOIN [tblOtpExit] ON [tblOtpAdd].[otp_id] = [tblOtpExit].[otp_id]
            WHERE  [tblOtpAdd].[is_deleted] = 0;`)
        })
        .then(r=>{
            return knex.raw(`RELEASE [sqlite_expert_apply_design_transaction];`)
        })
        .then(r=>{
            return knex('tblUpdates').insert({
                version: 308,
                description: `view oneTable was updated which was causing error while deleting exit (hiding the record), and tblUpdates created id not existed`
            })
        })
        .then(r=>{
            console.log('tables and views are updated for v3.0.8')
        })
        .catch(e=>{
            console.log('error while updating view oneTabel',{e})
        })
    }else{
      return 'v3.0.8 tables already updated';
    }
})
.catch(e=>{
    console.log('error while querying tblUpdates',{e});
})
}();