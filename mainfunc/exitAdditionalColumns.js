var knex = require('./db');

async function toUpdateOtpAdd(otp_id) {
    try {
        var addCols = await knex('tblOtpExit').select('exit_date', 'exit_reason', 'days_in_program').where({
            otp_id: otp_id,
            is_deleted: 0
        })
        var totalFollowups = await knex('tblOtpFollowup').count({
            total_followups: 'followup_id'
        }).where({
            otp_id: otp_id,
            is_deleted: 0
        })

        const updAddmision = {
            exit_date: addCols[0].exit_date,
            exit_reason: addCols[0].exit_reason,
            total_days: addCols[0].days_in_program,
            total_followups: totalFollowups[0].total_followups
        }
        var upStatus = await knex.select('upload_status').from('tblOtpAdd').where('otp_id', otp_id).where('is_deleted', 0);
        if (upStatus[0].upload_status == '1') {
            updAddmision.upload_status = 2;
            return knex('tblOtpAdd').update(updAddmision).where('otp_id', otp_id)
        } else {
            return knex('tblOtpAdd').update(updAddmision).where('otp_id', otp_id)
        }

    } catch (error) {
        console.log(error)
    }
}

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
                    await knex('tblUpdates').insert({version: 1544, description:'OTP Additional Columns updated successfully'})
                    console.log('OTP ADDITIONAL COLUMN UPDATED SUCCESSFULLY')

                } catch (error) {
                    console.log(error)
                }
            }else{
                console.log('OTP ADDITIONAL COLUMN ALLREADY UPDATED')
            }
        }
    });
}