const knex = require('./db');
const {app} = require('electron');

 async function _updateDb_v14 (knex, Promise){
    if(app.getVersion() != '1.4.0'){
        
        await  require('../migrations/20190210085428_alter_tables').up(knex, Promise);

    }
}
_updateDb_v14(knex, Promise)
