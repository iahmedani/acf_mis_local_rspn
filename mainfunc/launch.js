
const knex = require('./db');
const fs = require('fs')
// const {app} = require('electron')


async function _firstRunDb (knex, Promise){
    await  require('../migrations/20190128163134_Screening').up(knex, Promise);
    await fs.writeFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/update.txt`, 'Test')
}

module.exports.updateVersion =  async()=>{
    fs.unlinkSync(`${process.env.APPDATA}/acf_mis_local_rspn/acf_mis_local.sqlite3`)
    fs.unlinkSync(`${process.env.APPDATA}/acf_mis_local_rspn/config.json`)

     await _firstRunDb(knex, Promise);
    //  fs.writeFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/updated.txt`, 'Version Updated' )
}