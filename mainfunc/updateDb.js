const knex = require('./db');
const fs = require('fs')
const {app} = require('electron');

// knex.schema.hasColumn('tblOtpAdd', 'uplaod_date')
//     .then( async (exists)=>{
//         if(exists){
//             fs.unlinkSync(`${process.env.APPDATA}/ACF MIS Local app/acf_mis_local.sqlite3`)
//             console.log('db deleted')
//             await require('../migrations/20190128163134_Screening').up(knex, Promise)
//             console.log('New Db Created')

//         }else{
//             console.log('Db is already updated')
//         }
//     })
//     .catch(e=> console.log(e))


