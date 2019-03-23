module.exports = (ipcMain, knex, fs, sndMsg, async) => {
  //  All Plw Screenings which are not deleted (is_deleted = 0)
  ipcMain.on("allScrPlw", (event, filter) => {
    // console.log(filter);
    var _limit = filter.pageSize ? filter.pageSize : 10;
    var _offset = filter.pageIndex == 1 ? 0 : (filter.pageIndex - 1) * _limit;
    // console.log({ _limit, _offset });
    // console.log(`%${filter.site_village}%`);
    async.series(
      {
        data: cb => {
          knex("v_ScrPlwUpd")
            .where("province", "like", `%${filter.province}%`)
            .where("district_name", "like", `%${filter.district_name}%`)
            .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
            .where("uc_name", "like", `%${filter.uc_name}%`)
            .where("report_month", "like", `%${filter.report_month}%`)
            .where("sup_name", "like", `%${filter.sup_name}%`)
            .where("staff_name", "like", `%${filter.staff_name}%`)
            .where({ is_deleted: 0 })
            .limit(_limit)
            .offset(_offset)
            .then(result => cb(null, result))
            .catch(e => cb(e));
        },
        itemsCount: cb => {
          knex("v_ScrPlwUpd")
            .where("province", "like", `%${filter.province}%`)
            .where("district_name", "like", `%${filter.district_name}%`)
            .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
            .where("uc_name", "like", `%${filter.uc_name}%`)
            .where("report_month", "like", `%${filter.report_month}%`)
            .where("sup_name", "like", `%${filter.sup_name}%`)
            .where("staff_name", "like", `%${filter.staff_name}%`)
            .where({ is_deleted: 0 })
            .count("plw_scr_id as total")
            .then(result => cb(null, result))
            .catch(e => cb(e));
        }
      },
      (e, result) => {
        if (e) {
          event.sender.send("allScrPlw", { err: e });
          // console.log(e);
        } else {
          event.sender.send("allScrPlw", { result });
          // console.log(result);
        }
      }
    );
  });
  // Deleting Plw Screening (is_deleted = 1) in tables - tblScrPlw
  ipcMain.on("deleteScrPlw", (event, plw_scr_id) => {
    async.series(
      {
        delScrPlw: cb => {
          knex("tblScrPlw")
            .where({ plw_scr_id: plw_scr_id })
            .update({ is_deleted: 1 })
            .then(result => cb(null, result))
            .catch(e => cb(e));
        }
      },
      (err, result) => {
        if (err) {
          // console.log(err);
          sndMsg.errMsg(event, "", "Unable to delte record");
          event.sender.send("deleteScrPlw", { err });
        } else {
          sndMsg.sucMsg(event, "", `PLW Screening with id: ${plw_scr_id} is sucessfully delted`);
          event.sender.send("deleteScrPlw", { result });
        }
      }
    );
  });

  // Screening PLW NEW update
  function plwNewScrUpdSave(event, data) {
    data.upload_status = 2;
    knex("tblScrPlw")
      .update(data)
      .where("plw_scr_id", data.plw_scr_id)
      .then(result => {
        sndMsg.sucMsg(event, "", "Record updated successfully");
        // console.log("func plwNewScrUpdSave success", result);
      })
      .catch(e => {
       sndMsg.errMsg(event, "", "Record not updated, plz try again or contact admin");
        // console.log("func plwNewScrUpdSave error", e);
      });
  }

  // PLW New Screening update data
  ipcMain.on("scrPlwNewUpd", (e, data) => {
    plwNewScrUpdSave(e, data);
  });
};