module.exports = (ipcMain, knex, fs, sndMsg, async) => {

  // ipcMain.on("getAvailableCommodity", (event) => {
  //   knex("v_availableCom")
  //     // .where("reamining", '>', 0)
  //     .then(result => {
  //       event.sender.send("availableCommodity", { commodity: result });
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       sndMsg.errMsg(event, "", "Unable to query available commodities");
  //     });
  // });
  ipcMain.on("stockDistEntry", async (event, data) => {
    // console.log(data);
    const { client, mac } = JSON.parse(
      fs.readFileSync(__dirname + "/../config.json", "utf8")
    );
    async.waterfall([function(cb) {
        var n = new Date().valueOf();
        data.forEach((el, i, allData) => {
          el.stockDistId = n;
          el.client_id= client;
          // delete el.avalable_stock;
          delete el.disp_sub_unit;
          delete el.item_desc;
          delete el.disp_unit;
          el.program_type = el.prog_type;
          delete el.prog_type;
          if (allData.length - 1 == i) {
            cb(null, allData);
          }
        });
      }, function(newdata, cb) {
        console.log(newdata);
        knex("tblStokDistv2")
          .insert(newdata)
          .then(result => cb(null, result))
          .catch(e => cb(e));
      }], function(err, result) {
      if (err) {
        console.log(err);
        sndMsg.errMsg(event, "", "Unable to save stock Distribution");
      } else {
        sndMsg.sucMsg(event, "", "Record Saved Successfully");
      }
    });
  });

  ipcMain.on("getAllStockDist", (event, filter) => {
    var _limit = filter.pageSize ? filter.pageSize : 10;
    var _offset = filter.pageIndex == 1 ? 0 : (filter.pageIndex - 1) * _limit;
    console.log(filter);
    async.series({ data: cb => {
      knex("tblStokDistv2")
        .sum({ total_distribution: "distributed" })
        .column("stockReportID", "dist_month", "upload_status", "program_type")
        .where({ is_deleted: 0 })
        .where("program_type", "like", `%${filter.program_type}%`)
        .where("district_id", "like", `%${filter.district_id}%`)
        .where("tehsil_id", "like", `%${filter.tehsil_id}%`)
        // .where("uc_id", "like", `%${filter.uc_id}%`)
        .where("site_id", "like", `%${filter.site_id}%`)
        .where("dist_month", "like", `%${filter.dist_month}%`)
        .where("CHW_id", "like", `%${filter.CHW_id}%`)
        .where("CHS_id", "like", `%${filter.CHS_id}%`)
        .groupBy("stockReportID", "dist_month", "upload_status", "program_type")
        .offset(_offset)
        .limit(_limit)
        .then(result => {
          cb(null, result);
          // event.sender.send("getSessionsAll", { result: result });
        })
        .catch(e => {
          cb(e);
          // event.sender.send("getSessionsAll", { err: e });
        });
      }, itemsCount: cb => {
        // knex("tblSessions")
        knex("tblStokDistv2")
          .column("stockReportID", "dist_month", "upload_status", "program_type")
          .where({ is_deleted: 0 })
          .where("program_type", "like", `%${filter.program_type}%`)
          .where("district_id", "like", `%${filter.district_id}%`)
          .where("tehsil_id", "like", `%${filter.tehsil_id}%`)
          // .where("uc_id", "like", `%${filter.uc_id}%`)
          .where("site_id", "like", `%${filter.site_id}%`)
          .where("dist_month", "like", `%${filter.dist_month}%`)
          .where("CHW_id", "like", `%${filter.CHW_id}%`)
          .where("CHS_id", "like", `%${filter.CHS_id}%`)
          .groupBy("stockReportID", "dist_month", "upload_status", "program_type")
          .countDistinct({ total: "stockReportID" })
          // .groupBy("stockReportID", "dist_month")
          .then(result => {
            cb(null, result);
            // event.sender.send("getSessionsAll", { result: result });
          })
          .catch(e => {
            cb(e);
            // event.sender.send("getSessionsAll", { err: e });
          });
      } }, (e, result) => {
      if (e) {
        event.sender.send("getAllStockDist", { err: e });
        console.log(e);
      } else {
        event.sender.send("getAllStockDist", { result });
        console.log(result);
      }
    });
  });

  ipcMain.on("getStockDist", (event, filter) => {
    console.log(filter)
    var _limit = filter.pageSize ? filter.pageSize : 10;
    var _offset = filter.pageIndex == 1 ? 0 : (filter.pageIndex - 1) * _limit;
    console.log(filter);
    async.series({
      data: cb => {
        knex("tblStokDistv2")
          .where({ is_deleted: 0 })
          .where({ stockReportID: filter})
          .offset(_offset)
          .limit(_limit)
          .then(result => {
            cb(null, result);
          })
          .catch(e => {
            cb(e);
          });
      }, itemsCount: cb => {
        // knex("tblSessions")
        knex("tblStokDistv2")
          .where({ is_deleted: 0 })
          .where({ stockReportID: filter })
          .count({total: 'dist_id'})
          .then(result => {
            cb(null, result);
          })
          .catch(e => {
            cb(e);
          });
      }
    }, (err, result) => {
      if (err) {
        event.sender.send("getStockDist", { err });
        console.log(e);
      } else {
        event.sender.send("getStockDist", { result });
        console.log(result);
      }
    });
  });

  ipcMain.on("addItemToStockDist", (event, item) => {
    console.log(item);
    delete item.disp_sub_unit;
    delete item.item_desc;
    delete item.disp_unit;
    async.waterfall([
      function (cb) {
        knex("tblStokDistv2")
          .insert(item)
          .then(result => { 
            console.log(result+'157')
            cb(null, result[0])
          })
          .catch(e=>cb(e));
      },
      function (id, cb) {
        knex("tblStokDistv2")
          .where({dist_id: id})
          .then(result => {
            console.log(result+'169')
            cb(null, result[0]);
          } )
          .catch(e => cb(e));
      }
    ], (err, result) => {
        if (err) {
          console.log(err)
          event.sender.send("addItemToStockDist", {err});
        } else {
          event.sender.send("addItemToStockDist", { result });
        }
    })
  });
  ipcMain.on("updateSingleItem", (event, item) => {
    console.log(item + '181');
    delete item.disp_sub_unit;
    delete item.item_desc;
    delete item.disp_unit;
    async.waterfall([
      function (cb) {
        knex("tblStokDistv2")
          .update(item)
          .where({ dist_id: item.dist_id, stockReportID: item.stockReportID })
          .then(result => { 
            console.log(result+'194')
            cb(null, result)
          })
          .catch(e=> cb(e));
      },
      function (id, cb) {
        knex("tblStokDistv2")
          .where({ dist_id: id })
          .then(result => cb(null, result[0]))
          .catch(e => cb(e));
      }
    ], (err, result) => {
      if (err) {
        console.log(err)
        event.sender.send("updateSingleItem", { err });
      } else {
        event.sender.send("updateSingleItem", { result });
      }
    })
  });
  ipcMain.on("deleteStockDistItem", (event, item) => {
    console.log({msg:215, item})
    knex("tblStokDistv2")
      .where({ stockReportID: item.stockReportID, dist_id: item.dist_id })
      .update({ is_deleted: 1 })
      .then(result => {
        // console.log(result + "219");
        event.sender.send("deleteStockDistItem", { result });
      })
      .catch(err => {
        event.sender.send("deleteStockDistItem", { err });
      });
  });
  ipcMain.on('deleteStockDist', (event, report) => {
    knex('tblStokDistv2')
      .where({ stockReportID: report.stockReportID })
      .update({is_deleted: 1})
      .then(result => {
        event.sender.send("deleteStockDist", { result });
        sndMsg.sucMsg(event,'','Stock report deleted successfully')
      })
      .catch(e => {
        event.sender.send("deleteStockDistItem", { err });
        sndMsg.errMsg(event, '', 'Stock report could not be deleted')
      })
  })
  ipcMain.on("getAllDistReports", (event, data) => {
    console.log(data);
    knex("vStockDistReport")
      .where('Month', 'like', `%${data.dist_month}%`)
      .where('Program', 'like', `%${data.program}%`)
      .where('Province', 'like', `%${data.province}%`)
      .where('District', 'like', `%${data.district}%`)
      .where('Tehsil', 'like', `%${data.tehsil}%`)
      .where('UC', 'like', `%${data.uc}%`)
      .where('Health House', 'like', `%${data.site}%`)
      .where('CHW', 'like', `%${data.chw}%`)
      .where('CHS', 'like', `%${data.chs}%`)
      .then(result => {
        console.log(result)
        event.sender.send("getAllDistReports", { result });
      })
      .catch(e => {
        console.log(e)
        sndMsg.errMsg(event, '', 'Unable to fetch data')
      })
  });
};
