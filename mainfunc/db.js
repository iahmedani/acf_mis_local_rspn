module.exports = require('knex')({
    client:'sqlite3',
    connection:{
        filename:`${process.env.APPDATA}/ACF MIS Local app/acf_mis_local.sqlite3`
    },
    useNullAsDefault:true
})

