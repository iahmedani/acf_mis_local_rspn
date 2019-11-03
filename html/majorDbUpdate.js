window.$ = window.jQuery = require('jquery');
const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const uuid = require('uuid/v4');
const fs = require('fs');
const db = require('../mainfunc/db');

fs.stat(`${process.env.APPDATA}/ACF MIS Local app/acf_mis_local_b4Update.db`, async (err, stat) => {
    if (err) {
        try {
            fs.copyFileSync(`${process.env.APPDATA}/ACF MIS Local app/acf_mis_local.sqlite3`, `${process.env.APPDATA}/ACF MIS Local app/acf_mis_local_b4Update.db`, 1);
            Swal.fire({
                type: 'success',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
            })

        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
            })
        }

    }
});

async function updateTable(tableName, id_col, newColName, qry) {
    try {
        // await db.raw(`select * into ${tableName}_old from ${tableName}`);
        await db.raw(`create table ${tableName}_old as select * from ${tableName};`);
        await db.schema.alterTable(tableName, function (t) {
            t.uuid(newColName)
        });
        var data_id_col = await db(tableName).select(id_col);
        for (x of data_id_col) {
            var _uuid = uuid();
            await db(tableName).update(newColName, _uuid).where(id_col, x[id_col]);
        }
        console.log(`${data_id_col.length} records are updated of ${tableName}`)
    } catch (error) {
        console.log(error)
    }
}

updateTable('tblOtpAdd', 'otp_id', 'new_otp_id', '')