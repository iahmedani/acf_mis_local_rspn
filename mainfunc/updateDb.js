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
        await _firstRunDbDown(knex, Promise);
    await _firstRunDb(knex, Promise);
    fs.writeFileSync(`${process.env.APPDATA}/ACF MIS Local app/.version`, 'Updated Version', 'utf8');
    app.quit();
    app.relaunch();
    } catch (error) {
        console.log(error)
    }
    
}