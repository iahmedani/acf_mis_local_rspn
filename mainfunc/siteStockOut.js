module.exports = (ipcMain, knex, fs, sndMsg, async) => {
  // if(fs.existsSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`)){

  //   const { client, mac } = JSON.parse(
  //     fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, "utf8")
      
  //   );
  // }
//  if(fs.existsSync(__dirname + "/../config.json")){
  
//    const { client, mac } = JSON.parse(
//      fs.readFileSync(__dirname + "/../config.json", "utf8")
//    );
//  }
  ipcMain.on("getAvailableCommodity", (event, prog_type) => {
    knex("v_availableCom")
      .where("remaining", '>', 0)
      .where('prog_type', 'like', `%${prog_type}%`)
      .then(result => {
        event.sender.send("availableCommodity", { commodity: result });
      })
      .catch(e => {
        console.log(e);
        sndMsg.errMsg(event, "", "Unable to query available commodities");
      });
  });
  ipcMain.on("stockOutEntry", (event, data) => {
    let { client, mac } = JSON.parse(
      fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, "utf8")
      
    );
    async.waterfall([
      function (cb) {
        var n = new Date().valueOf();
        data.forEach((el, i, allData)=> {
          el.stockOutID = n;
          delete el.avalable_stock;
          delete el.disp_sub_unit;
          delete el.item_desc;
          delete el.disp_unit;
          el.program_type = el.prog_type;
          delete el.prog_type;
          el.client_id = client;
          if (allData.length - 1 == i) {
            cb(null, allData)
          }
        })
      },
      function (newdata, cb) {
        console.log(newdata)
        knex("tblSiteStock")
          .insert(newdata)
          .then(result => cb(null, result))
          .catch(e=>cb(e));
      }
    ], function (err, result) {
        if (err) {
          console.log(err)
          sndMsg.errMsg(event, '', 'Unable to save stock out')
        } else {
          sndMsg.sucMsg(event,'', 'Record Saved Successfully')
        }
    })
  });
  let newKey = function (data) {
    var n = new Date().valueOf();
    
  }
  ipcMain.on('listAllStockOut', (event, filter) => {
    var _limit = filter.pageSize ? filter.pageSize : 10;
    var _offset = filter.pageIndex == 1 ? 0 : (filter.pageIndex - 1) * _limit;
    console.log(filter)
    async.series({
      data: cb => {
        knex("tblSiteStock")
          .column("stockOutID", "program_type", "upload_status", "stock_release_date","item_name")
          .sum({ totlStock: "quantity_released" })
          .where("program_type", "like", `%${filter.program_type}%`)
          .where("district_id", "like", `%${filter.district_id}%`)
          .where("tehsil_id", "like", `%${filter.tehsil_id}%`)
          .where("site_id", "like", `%${filter.site_id}%`)
          .where("CHW_id", "like", `%${filter.CHW_id}%`)
          .where("CHS_id", "like", `%${filter.CHS_id}%`)
          .where("stock_release_date", "like", `%${filter.stock_release_date}%`)
          .where({ is_deleted: 0 }) 
          .offset(_offset)
          .limit(_limit)
          .groupBy("stockOutID", "program_type", "upload_status", "stock_release_date","item_name")
          .then(result => {
            console.log(result);

            cb(null, result);
          })
          .catch(e => {
            console.log(e)
            cb(e);
          });
      }, itemsCount: (cb) => {
        knex("tblSiteStock")
          // .column("stockOutID", "program_type", "upload_status", "stock_release_date")
          // .sum({ totlStock: "quantity_released" })
          .where("program_type", "like", `%${filter.program_type}%`)
          .where("district_id", "like", `%${filter.district_id}%`)
          .where("tehsil_id", "like", `%${filter.tehsil_id}%`)
          .where("site_id", "like", `%${filter.site_id}%`)
          .where("CHW_id", "like", `%${filter.CHW_id}%`)
          .where("CHS_id", "like", `%${filter.CHS_id}%`)
          .where("stock_release_date", "like", `%${filter.stock_release_date}%`)
          .where({ is_deleted: 0 })
          // .groupBy("stockOutID", "program_type", "upload_status", "stock_release_date")
          .countDistinct({ total: 'stockOutID' })
          .then(result => {
            cb(null, result);
          })
          .catch(e => {
            cb(e);
          });
      }
    }, (err, result) => {
        if (err) {
        console.log(err)
        event.sender.send("listAllStockOut", { err });
        sndMsg.errMsg(event, '', 'Unable to fetch list of distribution')
        } else {
          console.log(result)
        event.sender.send("listAllStockOut", { result });
      }
    });
  });
  ipcMain.on("deleteStockOut", (event, item) => {
    knex("tblSiteStock")
      .where({ stockOutID: item.stockOutID })
      .update({ is_deleted: 1, upload_status: 2 })
      .then(result => {
        console.log(result)
        event.sender.send("deleteStockOut", { result });
        sndMsg.sucMsg(event, "", "Report deleted Successfully");
      })
      .catch(e => {
        console.log(e);

        event.sender.send("deleteStockOut", { e });
        sndMsg.errMsg(event, "", "Unable to delete report");
      });
  });
  ipcMain.on("loadSingleStockOutReport", (event, reportid) => {
    console.log(reportid)
    knex("tblSiteStock")
      .where({ is_deleted: 0 })
      .where({ stockOutID: reportid.stockOutID })
      .then(result => {
        console.log(result)
        event.sender.send("loadSingleStockOutReport", { result });
      })
      .catch(err => {
        console.log(err);

        event.sender.send("loadSingleStockOutReport", { err });        
      });

  });
  ipcMain.on("addNewItemStockOut", (event, item) => {
    let { client, mac } = JSON.parse(
      fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, "utf8")
      
    );
    delete item.disp_sub_unit;
    delete item.disp_unit;
    delete item.item_desc;
    delete item.avalable_stock;
    item.client_id = client;
    item.upload_status = 2;
    if (item.sameDate) {
      delete item.sameDate;
      knex('tblSiteStock')
        .insert(item)
        .then(result => {
          knex('tblSiteStock')
            .where({ stock_out_id: result[0] })
            .then(result => {
              return result
            });
        })
        .then(result => {
          event.sender.send("addNewItemStockOut", { result })
          sndMsg.sucMsg(event,'','Item added successfullty');
        })
        .catch(err => {
          event.sender.send("addNewItemStockOut", { err })
          sndMsg.errMsg(event, '', 'Item not added');
      })        
    } else {
      delete item.sameDate;
      knex("tblSiteStock")
        .update({ stock_release_date: item.stock_release_date, upload_status: 2 })
        .where({ stockOutID: item.stockOutID })
        .then(result => {
          return result
        })
        .then(result => {
          knex('tblSiteStock')
            .insert(item)
            .then(result => {
              return result
            })
        })
        .then(result => {
          knex('tblSiteStock')
            .where({ stock_out_id: result[0] })
            .then(result => {
              return result
            });
        })
        .then(result => {
          event.sender.send("addNewItemStockOut", { result })
          sndMsg.sucMsg(event, '', 'Item added successfullty');
        })
        .catch(err => {
          event.sender.send("addNewItemStockOut", { err })
          sndMsg.errMsg(event, '', 'Item not added');
        })        
    }
  });
  ipcMain.on("updateItemStockOut", (event, item) => {
    delete item.disp_sub_unit;
    delete item.disp_unit;
    delete item.item_desc;
    delete item.avalable_stock;
    if (item.sameDate) {
      delete item.sameDate;  
      knex("tblSiteStock")
        .update({ upload_status: 2 })
        .where({ stockOutID: item.stockOutID })
        .then(result => {
          return result;
        })
        .then(result => {
          return knex('tblSiteStock')
            .update(item)
            .where({ stock_out_id: item.stock_out_id, upload_status: 2 })
        })
        .then(result => {
          console.log(result)
          event.sender.send("updateItemStockOut", { result} );
          sndMsg.sucMsg(event, '', 'Stcok item updated')
        })
        .catch(err => {
          console.log(err)
          event.sender.send("updateItemStockOut", { err });
          sndMsg.errMsg(event, '', 'Stcok item not updated')
        })
      
    } else {
      delete item.sameDate;
      knex("tblSiteStock")
        .update({ stock_release_date: item.stock_release_date, upload_status:2 })
        .where({ stockOutID: item.stockOutID })
        .then(result => {
          return result;
        })
        .then(result => {
          knex("tblSiteStock")
            .update(item)
            .update({upload_status: 2})
            .where({ stock_out_id: item.stock_out_id })
            .then(result => {
              return result;
            });
        })
        .then(result => {
          event.sender.send("updateItemStockOut", { result });
          sndMsg.sucMsg(event, "", "Item added successfullty");
        })
        .catch(err => {
          event.sender.send("updateItemStockOut", { err });
          sndMsg.errMsg(event, "", "Item not added");
        });
    }
  });
  ipcMain.on("removeItemStockOut", (event, item) => {
    knex('tblSiteStock')
      .update({ is_deleted: 1 })
      .where({ stock_out_id: item.stock_out_id })
      .then(result => {
        return result
      })
      .then(result => {
        knex("tblSiteStock")
          .update({ upload_status: 2 })
          .where({ stockOutID: item.stockOutID })
          .then(result => {
            
            return result;
          });
      })
      .then(result => {
        event.sender.send("removeItemStockOut", { result });
      })
      .catch(err => {
        event.sender.send("removeItemStockOut", { err });
      
    })
  });
};
