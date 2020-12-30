const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: `${process.env.APPDATA}/acf_mis_local_rspn/devs/acf_mis_local.sqlite3`
    },
    useNullAsDefault: true
})

var _x = ``


module.exports.v3Database = function () {
    knex.schema.hasTable('tblv3UpdateTracker').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('tblv3UpdateTracker', function (t) {
                t.increments('id').primary();
                t.string('table_name', 100);
                t.string('changes', 200);
                t.boolean('done').defaultTo(1);
            });
        }
    });

    knex('tblv3UpdateTracker').where({
            changes: 'Updated view to support v3',
            table_name: 'v_geo_active'
        })
        .then(r => {
            if (r.length < 1) {
                // Changing v_geo_active
                return knex.raw('')
            }
        })
        .then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex('tblv3UpdateTracker').insert({
                table_name: 'v_geo_activee',
                changes: 'Updated view to support v3'
            }).then(console.log).catch(console.log)
        })
        .then(r => {
            return knex('tblv3UpdateTracker').where({
                changes: 'Updated view to support v3',
                table_name: 'tblOtpAdd'
            })
        }).then(r => {
            if (r.length < 1) {
                return knex.raw(``)
            }
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex.raw(``)
        }).then(r => {
            return knex('').insert({
                table_name: 'tblOtpAdd',
                changes: 'Updated view to support v3',
            })
        })
        .catch(console.log)

};