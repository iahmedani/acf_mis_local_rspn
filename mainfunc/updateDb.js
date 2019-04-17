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
        const {
            _url
        } = JSON.parse(
            fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, "utf8")
        );
        if(_url){

            await _firstRunDbDown(knex, Promise);
            await _firstRunDb(knex, Promise);
            await knex('tblConfig').insert({description:'url', value:_url});
            fs.writeFileSync(`${process.env.APPDATA}/ACF MIS Local app/.version`, 'Updated Version', 'utf8');
            app.quit();
            app.relaunch();
        }
    } catch (error) {
        console.log(error)
    }
    
}