module.exports = require('knex')({
    client:'sqlite3',
    connection:{
        filename:`${process.env.APPDATA}/acf_mis_local_rspn/acf_mis_local.sqlite3`
    },
    useNullAsDefault:true
})

