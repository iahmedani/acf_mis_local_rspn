var knex = require('./db');
var fs = require('fs');
var upd_config = JSON.parse(fs.readFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/config.json`, {
    encoding: 'utf8'
}))

// function to update the new columns of tblotpadd
async function toUpdateOtpAdd(otp_id) {
    try {
        var addCols = await knex('tblOtpExit').select('exit_date', 'exit_reason', 'days_in_program', 'exit_muac', 'exit_weight').where({
            otp_id: otp_id,
            is_deleted: 0
        })
        var totalFollowups = await knex('tblOtpFollowup').count({
            total_followups: 'followup_id'
        }).where({
            otp_id: otp_id,
            is_deleted: 0
        })

        var geoDetails = await knex('v_geo_active').select('province_id', 'district_id', 'tehsil_id', 'uc_id').whereRaw(`site_id in (select site_id from tblOtpAdd where otp_id = ${otp_id} and is_deleted = 0)`)

        const updAddmision = {
            exit_date: addCols[0].exit_date,
            exit_reason: addCols[0].exit_reason,
            exit_muac: addCols[0].exit_muac,
            exit_weight: addCols[0].exit_weight,
            total_days: addCols[0].days_in_program,
            total_followups: totalFollowups[0].total_followups,
            province_id: geoDetails[0].province_id,
            tehsil_id: geoDetails[0].tehsil_id,
            district_id: geoDetails[0].district_id,
            uc_id: geoDetails[0].uc_id

        }
        var upStatus = await knex.select('upload_status').from('tblOtpAdd').where('otp_id', otp_id).where('is_deleted', 0);
        if (upStatus) {
            if (upStatus[0].upload_status == '1') {
                updAddmision.upload_status = 2;
                await knex('tblOtpAdd').update(updAddmision).where('otp_id', otp_id)
            } else {
                await knex('tblOtpAdd').update(updAddmision).where('otp_id', otp_id)
            }
        }

    } catch (error) {
        console.log(error)
    }
}
// loop function execution to update the new columns of tblotpadd
async function finalToUpdateOtpAdd() {
    try {
        var otp_id_array = await knex('tblOtpExit').select('otp_id').where({
            is_deleted: 0
        });

        for (otpid of otp_id_array) {
            await toUpdateOtpAdd(otpid['otp_id']);
        }

    } catch (error) {
        console.log(error)
    }
}

// find additional data for scr table and create run update 
async function toUpdateScrTables(tbaleName, screening_id, id_col, org_name) {
    try {
        var geoDetails = await knex('v_geo_uc').select('province_id', 'district_id', 'tehsil_id').whereRaw(`uc_id in (select uc_id from ${tbaleName} where is_deleted = 0 and ${id_col} = ${screening_id})`)

        const upd = {
            province_id: geoDetails[0].province_id,
            tehsil_id: geoDetails[0].tehsil_id,
            district_id: geoDetails[0].district_id,
            org_name: org_name
        }
        var upStatus = await knex.select('upload_status').from(tbaleName).where(id_col, screening_id).where('is_deleted', 0);
        if (upStatus) {
            if (upStatus[0].upload_status == '1') {
                upd.upload_status = 2;
                await knex(tbaleName).update(upd).where(id_col, screening_id)
            } else {
                await knex(tbaleName).update(upd).where(id_col, screening_id)
            }
        }

    } catch (error) {
        console.log(error)

    }
}
// loop function execution to update new columns in scr table having tableName as param
async function updateScrTableLoop(tbaleName, id_col, org_name) {
    try {
        var scr_id_array = await knex(tbaleName).select(id_col).where({
            is_deleted: 0
        });

        for (scr_id of scr_id_array) {
            await toUpdateScrTables(tableName, scr_id[id_col], id_col, org_name);
        }

    } catch (error) {
        console.log(error)
    }
}
// find additional data for session table and create run update 
async function toUpdateSession(tbaleName, id_val, id_col, prog_type) {
    try {
        if (prog_type == 'sc') {
            var geoDetails = await knex('v_geo_uc').select('province_id', 'district_id', 'tehsil_id').whereRaw(`uc_id in (select uc_id from ${tbaleName} where is_deleted = 0 and ${id_col} = ${id_val})`)
            const upd = {
                province_id: geoDetails[0].province_id,
                tehsil_id: geoDetails[0].tehsil_id,
                district_id: geoDetails[0].district_id,
            }

        } else {
            var geoDetails = await knex('v_geo_active').select('province_id', 'district_id', 'tehsil_id', 'uc_id').whereRaw(`site_id in (select site_id from ${tbaleName} where is_deleted = 0 and ${id_col} = ${id_val})`)
            const upd = {
                province_id: geoDetails[0].province_id,
                tehsil_id: geoDetails[0].tehsil_id,
                district_id: geoDetails[0].district_id,
                uc_id: geoDetails[0].uc_id,
            }
        }

        var upStatus = await knex.select('upload_status').from(tbaleName).where(id_col, id_val).where('is_deleted', 0);
        if (upStatus) {
            if (upStatus[0].upload_status == '1') {
                upd.upload_status = 2;
                await knex(tbaleName).update(upd).where(id_col, id_val)
            } else {
                await knex(tbaleName).update(upd).where(id_col, id_val)
            }
        }

    } catch (error) {
        console.log(error)

    }
}
// loop function execution to update new columns in session table having tableName as param
async function updateSessionLoop(tbaleName, id_col) {
    try {
        var scr_id_array = await knex(tbaleName).select(id_col, 'prog_type').where({
            is_deleted: 0
        });

        for (scr_id of scr_id_array) {
            await toUpdateSession(tableName, scr_id[id_col], id_col, scr_id['prog_type']);
        }

    } catch (error) {
        console.log(error)
    }
}

// Find additional column and add to tblSiteStock
async function updateSiteStock(prog_type, id_val) {
    try {
        var province_id = 1;
        if (prog_type == 'sc') {
            const upd = {
                province_id: province_id,
                org_name: upd_config.org_name,
                project_name: upd_config.project_name,
            }

        } else {
            var geoDetails = await knex('v_geo_active').select('uc_id').whereRaw(`site_id in (select site_id from tblSiteStock where is_deleted = 0 and stock_out_id = ${id_val})`)
            const upd = {
                province_id: province_id,
                org_name: upd_config.org_name,
                project_name: upd_config.project_name,
                uc_id: geoDetails[0].uc_id,
            }
        }
        var upStatus = await knex.select('upload_status').from('tblSiteStock').where('stock_out_id', id_val).where('is_deleted', 0);
        if (upStatus) {
            if (upStatus[0].upload_status == '1') {
                upd.upload_status = 2;
                await knex('tblSiteStock').update(upd).where('stock_out_id', id_val)
            } else {
                await knex('tblSiteStock').update(upd).where('stock_out_id', id_val)
            }
        }
    } catch (error) {
        console.log(error)

    }
}

// loop function Find additional column and add to tblSiteStock
async function updateSiteStockLoop() {
    try {
        var scr_id_array = await knex('tblSiteStock').select('stock_out_id', 'prog_type').where({
            is_deleted: 0
        });

        for (scr_id of scr_id_array) {
            await updateSiteStock(scr_id['prog_type'], scr_id['stock_out_id']);
        }

    } catch (error) {
        console.log(error)
    }
}


async function addOrgAndProject(tableName) {
    try {
        var data = await knex(tbaleName).where('is_deleted', 0);
        for (datum of data) {
            try {
                if (datum.upload_status) {
                    await knex(tbaleName).update({
                        org_name: upd_config.org_name,
                        project_name: upd_config.project_name,
                        upload_status: 2
                    })
                } else {
                    await knex(tbaleName).update({
                        org_name: upd_config.org_name,
                        project_name: upd_config.project_name
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        await knex(tableName).update({
            org_name: upd_config.org_name,
            project_name: upd_config.project_name
        })
    } catch (error) {
        console.log(error)
    }
}
// lets work on it

module.exports = async () => {

    knex.schema.hasTable('tblUpdates').then(async function (exists) {
        if (!exists) {
            return knex.schema.createTable('tblUpdates', function (t) {
                t.integer('version');
                t.string('description');
            });
        } else {
            var versionCheck = await knex('tblUpdates').where({
                version: 1544
            })
            if (!versionCheck.length) {
                try {
                    await finalToUpdateOtpAdd();
                    await knex('tblUpdates').insert({
                        version: 1544,
                        description: 'OTP Additional Columns updated successfully'
                    })
                    console.log('OTP ADDITIONAL COLUMN UPDATED SUCCESSFULLY')

                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log('OTP ADDITIONAL COLUMN ALREADY UPDATED')
            }
        }
    });
}