module.exports = (ipcMain, knex, fs, sndMsg, async) => {
  //  Calling all data in table  
  ipcMain.on("allOtpExit", (event, filter) => {
    // console.log(filter);
    var _limit = filter.pageSize ? filter.pageSize : 10;
    var _offset = filter.pageIndex == 1 ? 0 : (filter.pageIndex - 1) * _limit;
    // console.log({ _limit, _offset });
    // console.log(`%${filter.site_village}%`);
    async.series(
      {
        data: cb => {
          knex("v_otpExitFullForUpdate")
            .where("p_name", "like", `%${filter.p_name}%`)
            .where("site_village", "like", `%${filter.site_village}%`)
            .where("reg_id", "like", `%${filter.reg_id}%`)
            .where("province", "like", `%${filter.province}%`)
            .where("district_name", "like", `%${filter.district_name}%`)
            .where("uc_name", "like", `%${filter.uc_name}%`)
            .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
            .where("prog_type", "like", `%${filter.prog_type}%`)
            // .where('report_month', 'like', `%${filter.report_month}%`)

            .where({ is_deleted: 0 })
            .limit(_limit)
            .offset(_offset)
            .then(result => cb(null, result))
            .catch(e => cb(e));
        },
        itemsCount: cb => {
          knex("v_otpExitFullForUpdate")
            .where("p_name", "like", `%${filter.p_name}%`)
            .where("site_village", "like", `%${filter.site_village}%`)
            .where("reg_id", "like", `%${filter.reg_id}%`)
            .where("province", "like", `%${filter.province}%`)
            .where("district_name", "like", `%${filter.district_name}%`)
            .where("uc_name", "like", `%${filter.uc_name}%`)
            .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
            .where("prog_type", "like", `%${filter.prog_type}%`)
            .where({ is_deleted: 0 })
            .count("exit_id as total")
            .then(result => cb(null, result))
            .catch(e => cb(e));
        }
      },
      (e, result) => {
        if (e) {
          event.sender.send("allOtpExit", { err: e });
          // console.log(e);
        } else {
          event.sender.send("allOtpExit", { result });
          // console.log(result);
        }
      }
    );
  });
  // Method to delete (is_deleted = 1) for required tables (tblOtpExit and tblInterimOtp)
  ipcMain.on("deleteOtpExit", (event, item) => {
    // console.log(item);
    async.series(
      {
        delSOtpExit: cb => {
          knex("tblOtpExit")
            .where({ exit_id: item.exit_id })
            .update({ is_deleted: 1 })
            .then(result => {
              if (result) {
                knex("tblInterimOtp")
                  .where({ otp_id: item.otp_id })
                  .update({ status: "open" })
                  .then(result => {
                    cb(null, result);
                  });
              }
            })
            .catch(e => cb(e));
        }
      },
      (err, result) => {
        if (err) {
          // console.log(err);
          event.sender.send("deleteOtpExit", { err });
          sndMsg.errMsg(event, "", "Unable to delte record");
        } else {
          // console.log(result);
          event.sender.send("deleteOtpExit", { result });
          sndMsg.sucMsg(event, "", `Patient with id: ${item.exit_id} is sucessfully delted`);
        }
      }
    );
  });
  // Exit Update: Edit (update) one record
  function exitUpdDataSave(event, data, client) {
    data.client_id = client;
    data.upload_status = 2;
    const otpExitAddData = data;
    console.log(otpExitAddData);

    knex('tblOtpExit')
      .where('otp_id', otpExitAddData.otp_id)
      .update(otpExitAddData)
      .then(result => {
        console.log(result);
        sndMsg.sucMsg(event, "", "Record updated Successfully");
        return knex('tblInterimOtp')
          .where('otp_id', otpExitAddData.otp_id)
          .update({
            status: otpExitAddData.exit_reason
          })
      })
      .then(result => {
        console.log({
          msg: 'interm table updated',
          data: result
        })
      })
      .catch(e => {
        console.log(e);
        sndMsg.errMsg(event, "", "Record not updated, plz try again or contact admin");
      })
  }
  //Exit Update: Edit (update) one record
  ipcMain.on('otpExitUpdate', (e, data) => {
    exitUpdDataSave(e, data, imran.client);
  })
};