module.exports = (ipcMain, knex, fs, sndMsg, async) => {
//   All Children Screening data which is not deleted (is_deleted = 0) from v_scrChildFull
  ipcMain.on('allScrChildren', (event, filter) => {
    // console.log(filter);
    var _limit = (filter.pageSize) ? filter.pageSize : 10;
    var _offset = (filter.pageIndex == 1) ? 0 : (filter.pageIndex - 1) * _limit;
    // console.log({ _limit, _offset })
    async.series({
      data: cb => {
        knex("v_ScrChildUpd")
          .where('province', 'like', `%${filter.province}%`)
          .where('district_name', 'like', `%${filter.district_name}%`)
          .where('tehsil_name', 'like', `%${filter.tehsil_name}%`)
          .where('uc_name', 'like', `%${filter.uc_name}%`)
          .where('report_month', 'like', `%${filter.report_month}%`)
          .where('sup_name', 'like', `%${filter.sup_name}%`)
          .where('staff_name', 'like', `%${filter.staff_name}%`)
          .where({ is_deleted: 0 })
          .limit(_limit)
          .offset(_offset)
          .then(result => cb(null, result))
          .catch(e => cb(e));
      },
      itemsCount: cb => {
        knex("v_ScrChildUpd")
          .where("province", "like", `%${filter.province}%`)
          .where("district_name", "like", `%${filter.district_name}%`)
          .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
          .where("uc_name", "like", `%${filter.uc_name}%`)
          .where("report_month", "like", `%${filter.report_month}%`)
          .where("sup_name", "like", `%${filter.sup_name}%`)
          .where("staff_name", "like", `%${filter.staff_name}%`)
          .where({ is_deleted: 0 })
          .count("ch_scr_id as total")
          .then(result => cb(null, result))
          .catch(e => cb(e));

      }
    }, (e, result) => {
      if (e) {
        event.sender.send("allScrChildren", { err: e });
        console.log(e)
      } else {
        event.sender.send("allScrChildren", { result });
        // console.log(result);
      }
    })
  })

//  Deleting Children Screening (is_deleted = 1 ) in tables tblScrChildren
  ipcMain.on("deleteScrChildren", (event, ch_scr_id) => {
    async.series({
      delScrCh: cb => {
        knex("tblScrChildren")
          .where({ ch_scr_id: ch_scr_id })
          .update({ is_deleted: 1 })
          .then(result => cb(null, result))
          .catch(e => cb(e));
      }
    }, (err, result) => {
      if (err) {
        // console.log(err);
        sndMsg.errMsg(event, "", "Unable to delte record");
        event.sender.send("deleteScrChildren", { err });
      } else {
        sndMsg.sucMsg(event, "", `Screening with id: ${ch_scr_id} is sucessfully delted`);
        event.sender.send("deleteScrChildren", { result });
      }
    });
  });
  
  // Screening Children update 
  function childrenScrUpdSave(event, data) {
    data.upload_status = 2;
    knex('tblScrChildren')
      .update(data)
      .where('ch_scr_id', data.ch_scr_id)
      .then(result => {
        sndMsg.sucMsg(event, "", "Record updated successfully");
        // console.log('func childrenScrUpdSave success', result)
      }).catch(e => {
        sndMsg.errMsg(event, "", "Record not updated, plz try again or contact admin");
        // console.log('func childrenScrUpdSave error', e)
      })
  }
  
  // children Screening updat Data
  ipcMain.on('scrChildrenUpd', (e, data) => {
    // console.log(data);
    childrenScrUpdSave(e, data);
    // (e,data);
  })

};