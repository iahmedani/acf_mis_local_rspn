const { dialog } = require('electron');
var knex = require('../db')
const updateDatabase = require('./updUtils')
/**
 * 
 * @param {app} app is an application parameter;
 * 
 * This function helps to make new updates in database;
 * updateDatabase requires string of sql quries, it must have ';' to separete quries outherwise only one qury will run;
 * this function gets app element which is an electron mehtod, requires to get version of the application;
 * any update would require to have _checkVer define earlier than executing update;
 * than to run followin query
 *  var _check = await knex('tblUpdates').where({version:310});
 */

 async function chekAndExecuteUpdate (_checkVer, currentVersion, dbUpdateSqlString, dbUpdateMsg){
       var _check = await knex('tblUpdates').where({version:_checkVer});
       var _err = false;
       // && currentVersion < _checkVer
       if(!_check.length){
             try {
                     await updateDatabase(knex, dbUpdateSqlString);
             } catch (error) {
                    if(error.errno == 21){
                           _err = false
                    }else{
                           _err = true
                           var errLocationFunction = 'updateDatabase query for version :' +_checkVer;
                           error.customMsg = errLocationFunction
                           console.log(error.errno)
                           dialog.showErrorBox(`Database update`, `${error.customMsg} \n Please contact ACF team \n ${error}`)
                    }
             }
             if(!_err){
              await knex('tblUpdates').insert({version: _checkVer, description: dbUpdateMsg})
              console.log('Success Message '+dbUpdateMsg)
             }

        }
 }

module.exports = async function (app, dialog) {
       var currentVersion = app.getVersion();
       currentVersion = parseInt(currentVersion.replace(/[.]/g, ''));
       console.log({currentVersion})
      
    try {
           var _check = await knex('tblUpdates');
           console.log({_check})
    } catch (error) {
        console.log(error)
    }
}