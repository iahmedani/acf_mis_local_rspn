var knex = require('./db');

// var fs = require('fs');
var OTPTableUpdate = require('./tblUpdate');
var otherTbs = require('./otherTabs').updScripts;


var elem = document.getElementById("myBar");

var prgWidth = 0;

function frame() {
    prgWidth = prgWidth + 2.5;
    elem.style.width = prgWidth + "%";
}




async function updateTable(qry, tableName) {
    var qry = qry.split(';');

    try {
        for (x of qry) {
            await knex.raw(x)
        }
        console.log('successfully updated ' + tableName);
    } catch (error) {
        console.log(error)
    }
}

async function updatePKIDWithUUID(tableName, old_id, id) {
    var records = await knex(tableName).select(old_id);
    try {
        for (record of records) {
            var _uuid = uuid();
            if (tableName == 'tblInterimOtp') {
                // upload_status: 0
                await knex(tableName).update({
                    [id]: _uuid,
                }).where(old_id, record[old_id]);
            } else {

                await knex(tableName).update({
                    [id]: _uuid,
                    upload_status: 0
                }).where(old_id, record[old_id]);
            }
        }
        console.log('successfully updated ' + tableName);
    } catch (error) {
        console.log(error)
    }
}

async function updateFKWithPKUUID(mainTable, old_id, id, assoTable, assoTableNewId, assoTableFKNew, assoTableFKOld) {
    var records = await knex(assoTable).select(`${mainTable}.${id}`, `${assoTable}.${assoTableNewId}`).innerJoin(mainTable, `${mainTable}.${old_id}`, `${assoTable}.${assoTableFKOld}`);
    // var records = await knex()
    try {
        for (record of records) {
            // var _uuid = uuid();
            await knex(assoTable).update(assoTableFKNew, record[id]).where(assoTableNewId, record[assoTableNewId]);
        }
        console.log(`successfully updated both tables mainTable ${mainTable} and forign key ${assoTable}`);
    } catch (error) {
        console.log(error)
    }
}

async function runUpdateOTP() {
    try {
        await updateTable(OTPTableUpdate.tblOtpAdd, `tblOtpAdd`)
        frame();
        await updateTable(OTPTableUpdate.tblOtpFollowup, `tblOtpFollowup`)
        frame();

        await updateTable(OTPTableUpdate.tblInterimOtp, `tblInterimOtp`)
        frame();

        await updateTable(OTPTableUpdate.tblOtpExit, `tblOtpExit`)
        frame();

        await updateTable(otherTbs.tblScrChildren, `tblScrChildren`)
        frame();

        await updateTable(otherTbs.tblScrPlw, `tblScrPlw`)
        frame();

        await updateTable(otherTbs.tblSessions, `tblSessions`)
        frame();

        await updateTable(otherTbs.tblSiteStock, `tblSiteStock`)
        frame();

        await updateTable(otherTbs.tblStock, `tblStock`)
        frame();

        await updateTable(otherTbs.tblStokDistv2, `tblStokDistv2`)
        frame();

        await updateTable(otherTbs.tblLhw, `tblLhw`)
        frame();

        await updateTable(otherTbs.tblSupervisors, `tblSupervisors`)
        frame();

        await updateTable(otherTbs.tblVillages, `tblVillages`)
        frame();

        console.log('all tables are updated')

        await updateUpdateTracker('tblOtpAdd', 'otp_id_old', 'otp_id');
        frame();
        await updatePKIDWithUUID('tblOtpAdd', 'otp_id_old', 'otp_id');
        frame();

        await updateUpdateTracker('tblOtpFollowup', 'followup_id_old', 'followup_id');

        frame();
        await updatePKIDWithUUID('tblOtpFollowup', 'followup_id_old', 'followup_id');
        frame();

        await updateUpdateTracker('tblInterimOtp', 'interim_id_old', 'interim_id');

        frame();
        await updatePKIDWithUUID('tblInterimOtp', 'interim_id_old', 'interim_id');
        frame();

        await updateUpdateTracker('tblOtpExit', 'exit_id_old', 'exit_id');

        frame();
        await updatePKIDWithUUID('tblOtpExit', 'exit_id_old', 'exit_id');
        frame();

        await updateUpdateTracker('tblScrChildren', 'ch_scr_id_old', 'ch_scr_id');

        frame();
        await updatePKIDWithUUID('tblScrChildren', 'ch_scr_id_old', 'ch_scr_id');
        frame();

        await updateUpdateTracker('tblScrPlw', 'plw_scr_id_old', 'plw_scr_id');

        frame();
        await updatePKIDWithUUID('tblScrPlw', 'plw_scr_id_old', 'plw_scr_id');
        frame();

        await updateUpdateTracker('tblSessions', 'session_id_old', 'session_id');

        frame();
        await updatePKIDWithUUID('tblSessions', 'session_id_old', 'session_id');

        frame();
        await updateUpdateTracker('tblSiteStock', 'stock_out_id_old', 'stock_out_id');
        frame();
        await updatePKIDWithUUID('tblSiteStock', 'stock_out_id_old', 'stock_out_id');
        frame();
        await updateUpdateTracker('tblStock', 'id_old', 'id');
        frame();
        await updatePKIDWithUUID('tblStock', 'id_old', 'id');
        frame();
        await updateUpdateTracker('tblStokDistv2', 'dist_id_old', 'dist_id');
        frame();
        await updatePKIDWithUUID('tblStokDistv2', 'dist_id_old', 'dist_id');
        frame();
        await updateUpdateTracker('tblLhw', 'id_old', 'id');
        frame();
        await updatePKIDWithUUID('tblLhw', 'id_old', 'id');
        frame();
        await updateUpdateTracker('tblSupervisors', 'id_old', 'id');
        frame();
        await updatePKIDWithUUID('tblSupervisors', 'id_old', 'id');
        frame();
        await updateUpdateTracker('tblVillages', 'id_old', 'id');
        frame();
        await updatePKIDWithUUID('tblVillages', 'id_old', 'id');
        console.log('all tables are updated')

        await updateFKWithPKUUID('tblOtpAdd', 'otp_id_old', 'otp_id', 'tblOtpFollowup', 'followup_id', 'otp_id', 'otp_id_old')
        frame();
        await updateFKWithPKUUID('tblOtpAdd', 'otp_id_old', 'otp_id', 'tblInterimOtp', 'interim_id', 'otp_id', 'otp_id_old')
        frame();
        await updateFKWithPKUUID('tblOtpAdd', 'otp_id_old', 'otp_id', 'tblOtpExit', 'exit_id', 'otp_id', 'otp_id_old')
        // move();
        console.log('All associated tables are updated');
    } catch (error) {
        console.log(error)
    }
}

async function runUpdateOther() {
    try {
        await updateTable(otherTbs.tblScrChildren, `tblScrChildren`)
        await updateTable(otherTbs.tblScrPlw, `tblScrPlw`)
        await updateTable(otherTbs.tblSessions, `tblSessions`)
        await updateTable(otherTbs.tblSiteStock, `tblSiteStock`)
        await updateTable(otherTbs.tblStock, `tblStock`)
        await updateTable(otherTbs.tblStokDistv2, `tblStokDistv2`)
        await updateTable(otherTbs.tblLhw, `tblLhw`)
        await updateTable(otherTbs.tblSupervisors, `tblSupervisors`)
        await updateTable(otherTbs.tblVillages, `tblVillages`)
        console.log('all tables are updated')

        await updatePKIDWithUUID('tblScrChildren', 'ch_scr_id_old', 'ch_scr_id');
        await updatePKIDWithUUID('tblScrPlw', 'plw_scr_id_old', 'plw_scr_id');
        await updatePKIDWithUUID('tblSessions', 'session_id_old', 'session_id');
        await updatePKIDWithUUID('tblSiteStock', 'stock_out_id_old', 'stock_out_id');
        await updatePKIDWithUUID('tblStock', 'id_old', 'id');
        await updatePKIDWithUUID('tblStokDistv2', 'dist_id_old', 'dist_id');
        await updatePKIDWithUUID('tblLhw', 'id_old', 'id');
        await updatePKIDWithUUID('tblSupervisors', 'id_old', 'id');
        await updatePKIDWithUUID('tblVillages', 'id_old', 'id');

        console.log('all tables are added with uuid')
    } catch (error) {
        console.log(error)
    }
}

async function initProcess() {
    knex.schema.hasTable('tblUpdateTracker').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('tblUpdateTracker', function (t) {
                t.string('tableName', '100');
                t.string('old_id', '100');
                t.string('new_id', '100');
                t.string('backup_name', '100');
                // t.string('uploadProgress', '100');
            })
        }
    })
}

// runUpdateOTP();
// runUpdateOther();
// console.log(uuid());

async function updateUpdateTracker(tN, _old, _new) {

    var backup_name = tN + '_old';
    try {
        await initProcess()
        await knex.raw(`create table ${backup_name} as select * from ${tN}`);
        await knex('tblUpdateTracker').insert({
            tableName: tN,
            old_id: _old,
            new_id: _new,
            backup_name: backup_name
        })
        // await knex.raw(``)
        console.log('Backup Done')
    } catch (error) {
        console.log(error)
    }
}

fs.stat(`${process.env.APPDATA}/acf_mis_local_rspn/nims_maj_update`, async (err, stat) => {
    if (err) {
        try {
            fs.copyFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/acf_mis_local.sqlite3`, `${process.env.APPDATA}/acf_mis_local_rspn/nims_maj_update`);
            await runUpdateOTP();
            console.log('update complete')

            ipc.send('major-update-done', '');

        } catch (error) {
            console.log(error)
        }
    }
});