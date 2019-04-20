const knex = require('./db');
const fs = require('fs')
const {app} = require('electron');

async function _firstRunDb (knex, Promise){
    await  require('../migrations/20190128163134_Screening').up(knex, Promise);
   }
async function _firstRunDbDown (knex, Promise){
    await  require('../migrations/20190128163134_Screening').down(knex, Promise);
   }

module.exports.dbCreate =  async()=>{
    try {
        fs.unlinkSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`)
        // const {
        //     _url
        // } = JSON.parse(
        //     fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, "utf8")
        // );
        // if(_url){

            // await _firstRunDbDown(knex, Promise);
            // await _firstRunDb(knex, Promise);
            // if(_url){
            //     fs.unlinkSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`)
            // }
            // await knex('tblConfig').insert({description:'url', value:_url});
            var version = app.getVersion();
            var regex = /([/./])/g;
            version.replace(regex, '');
            app.quit();
            fs.writeFileSync(`${process.env.APPDATA}/ACF MIS Local app/.version`, version, 'utf8');
            fs.unlinkSync(`${process.env.APPDATA}/ACF MIS Local app/acf_mis_local.sqlite3`)
            app.relaunch();
        // }
    } catch (error) {
        console.log(error)
    }
    
}