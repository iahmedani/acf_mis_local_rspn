// const knex = require('./db');
const fs = require('fs')
const {app, dialog} = require('electron');

// async function _firstRunDb (knex, Promise){
//     try {
//         await  require('../migrations/20190128163134_Screening').down(knex, Promise);
//         await  require('../migrations/20190128163134_Screening').up(knex, Promise);
        
//     } catch (error) {
//         await  require('../migrations/20190128163134_Screening').up(knex, Promise);
        
//     }
//    }
// async function _firstRunDbDown (knex, Promise){
//    }

module.exports.dbCreate =  async()=>{
    try {
            fs.stat(`${process.env.APPDATA}/ACF MIS Local app/config.json`,(err, stat)=>{
                if(!err){
                    dialog.showMessageBox(null,{
                        type:'info',
                        message:'APP is updating'
                    }, async(res)=>{
                        if(res == 0){
                            var version = app.getVersion();
      var regex = /([/./])/g;
      version.replace(regex, '');
                            // try {                    
                                // knex.disconnect();
                                fs.writeFileSync(`${process.env.APPDATA}/ACF MIS Local app/.nv`, version, 'utf8');
                                // fs.unlinkSync(`${process.env.APPDATA}/ACF MIS Local app/acf_mis_local.sqlite3`)
                                fs.unlinkSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`)
                                app.quit();
                                app.relaunch();
                                // } catch (error) {
                                    // console.log(error)
                                // }
                        }
                        
                    })

                }
                
            })

    } catch (error) {
        console.log(error)
    }
    
}