module.exports = (ipcMain, knex, fs, sndMsg, async) => {
  // All OTP Addmision records which are not deleted (is_deleted = 0)
  ipcMain.on('allOtpTest', (event, filter) => {
    // console.log(filter);
    var _limit = (filter.pageSize) ? filter.pageSize : 10;
    var _offset = (filter.pageIndex == 1) ? 0 : (filter.pageIndex - 1) * _limit;
    // console.log({ _limit, _offset })
    // console.log(`%${filter.site_village}%`);
    async.series({
      data: cb => {
        knex("v_otpAddmision2")
          .where("p_name", "like", `%${filter.p_name}%`)
          // .where("site_village", "like", `%${filter.site_village}%`)
          .where("reg_id", "like", `%${filter.reg_id}%`)
          .where("province", "like", `%${filter.province}%`)
          .where("district_name", "like", `%${filter.district_name}%`)
          .where("uc_name", "like", `%${filter.uc_name}%`)
          .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
          .where("prog_type", "like", `%${filter.prog_type}%`)
          .where({
            is_deleted: 0
          })
          .whereRaw(`otp_id NOT IN (select otp_id from tblOtpExit where is_deleted = 0)`)
          .limit(_limit)
          .offset(_offset)
          .then(result => cb(null, result))
          .catch(e => cb(e));
      },
      itemsCount: cb => {
        knex("v_otpAddmision2")
          .where("p_name", "like", `%${filter.p_name}%`)
          // .where("site_village", "like", `%${filter.site_village}%`)
          .where("reg_id", "like", `%${filter.reg_id}%`)
          .where("province", "like", `%${filter.province}%`)
          .where("district_name", "like", `%${filter.district_name}%`)
          .where("uc_name", "like", `%${filter.uc_name}%`)
          .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
          .where("prog_type", "like", `%${filter.prog_type}%`)
          .where({
            is_deleted: 0
          })
          .whereRaw(`otp_id NOT IN (select otp_id from tblOtpExit where is_deleted = 0) `)
          .count("otp_id as total")
          .then(result => cb(null, result))
          .catch(e => cb(e));

      }
    }, (e, result) => {
      if (e) {
        event.sender.send("allOtpTest", {
          err: e
        });
      } else {
        event.sender.send('allOtpTest', {
          result
        })
      }
    })
  });

  //  Deleting OTP Addmision (is_deleted = 1) where patient is not exirws in tables tblOtpFollowup, tblInterimOtp , tblOtpAdd
  ipcMain.on('deleteOtpAdd', (event, otp_id) => {
    knex('tblOtpExit')
      .where({
        otp_id
      })
      .then(result => {
        if (result.length > 0) {
          sndMsg.errMsg(event, "", `Patient with id: ${otp_id} couldn't be delted as patient is exited. To delete first delete it from exit `);
        } else {
          async.series({
            delFollowup: cb => {
              knex('tblOtpFollowup')
                .where({
                  otp_id: otp_id
                })
                .update({
                  is_deleted: 1
                })
                .then(result => cb(null, result))
                .catch(e => cb(e));
            },
            delInterim: cb => {
              knex("tblInterimOtp")
                .where({
                  otp_id: otp_id
                })
                .update({
                  is_deleted: 1
                })
                .then(result => cb(null, result))
                .catch(e => cb(e));
            },
            delAddmision: cb => {
              knex('tblOtpAdd')
                .where({
                  otp_id: otp_id
                })
                .update({
                  is_deleted: 1
                })
                .then(result => cb(null, result))
                .catch(e => cb(e));
            }
          }, (err, result) => {
            if (err) {
              // console.log(err);
              sndMsg.errMsg(event, "", "Unable to delte record");
              event.sender.send("deleteOtpAdd", {
                err
              });
            } else {
              sndMsg.sucMsg(event, "", `Addmision with id: ${otp_id} is sucessfully delted`);
              event.sender.send("deleteOtpAdd", {
                result
              });
            }
          })
        }
      })

  })

  // Admission Update: Edit (update) one record
  function otpAddUpdDataSave(event, item) {
    console.log(item);
    item.upload_status = 2;
    knex('tblOtpAdd')
      .update(item)
      .where('otp_id', item.otp_id)
      .then(result => {
        sndMsg.sucMsg(event, "", "Record successfully updated");
        // console.log(result);
      })
      .catch(e => {
        console.log(e)
        sndMsg.errMsg(event, "", "Record no updated, plz try again or contact admin");
      })
  }

  // Event to save updated admision  
  ipcMain.on('submitOtpAddUpd', (e, otpAddFormData) => {
    // console.log(otpAddFormData);
    otpAddUpdDataSave(e, otpAddFormData);
  });
};