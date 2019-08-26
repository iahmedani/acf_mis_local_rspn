module.exports = (ipcMain, knex, fs, sndMsg, async, client, localDate, ) => {
 
  // sending all session of site and not deleted (is_deleted)
  ipcMain.on("getSessionsAll", (event, filter) => {
    var _limit = (filter.pageSize) ? filter.pageSize : 10;
    var _offset = (filter.pageIndex == 1) ? 0 : (filter.pageIndex - 1) * _limit;
    (filter.session_type) ? filter.session_type = filter.session_type : filter.session_type = '';
    (filter.session_location) ? filter.session_location = filter.session_location : filter.session_location = '';
    (filter.CHW_id) ? filter.CHW_id = filter.CHW_id : filter.CHW_id = '';
    (filter.CHS_id) ? filter.CHS_id = filter.CHS_id : filter.CHS_id = '';
    (filter.prog_type) ? filter.prog_type = filter.prog_type : filter.prog_type = '';
    (filter.prog_type == 'otp') ? filter.uc_id = '' : filter.uc_id = filter.uc_id;
    console.log(filter);
    async.series(
      {
        data: cb => {
          knex("vSessionsFullForUpdate")
            .where({ is_deleted: 0 })
            .where('province_id', 'like', `%${filter.province_id}%`)
            .where('district_id', 'like', `%${filter.district_id}%`)
            .where('tehsil_id', 'like', `%${filter.tehsil_id}%`)
            .where('uc_id', 'like', `%${filter.uc_id}%`)
            .where('site_id', 'like', `%${filter.site_id}%`)
            .where("session_type", "like", `%${filter.session_type}%`)
            .where("session_location", "like", `%${filter.session_location}%`)
            .where("CHW_id", "like", `%${filter.CHW_id}%`)
            .where("CHS_id", "like", `%${filter.CHS_id}%`)
            .where("prog_type", "like", `%${filter.prog_type}%`)
            .offset(_offset)
            .limit(_limit)
            .then(result => {
              // console.log(result)
              cb(null, result);
              // event.sender.send("getSessionsAll", { result: result });
            })
            .catch(e => {
              cb(e);
              // event.sender.send("getSessionsAll", { err: e });
            });
        },
        itemsCount: cb => {
          // knex("tblSessions")
          knex("vSessionsFullForUpdate")
            .where({ is_deleted: 0 })
            .where('province_id', 'like', `%${filter.province_id}%`)
            .where('district_id', 'like', `%${filter.district_id}%`)
            .where('tehsil_id', 'like', `%${filter.tehsil_id}%`)
            .where('uc_id', 'like', `%${filter.uc_id}%`)
            .where('site_id', 'like', `%${filter.site_id}%`)
            .where("session_type", "like", `%${filter.session_type}%`)
            .where("session_location", "like", `%${filter.session_location}%`)
            .where("CHW_id", "like", `%${filter.CHW_id}%`)
            .where("CHS_id", "like", `%${filter.CHS_id}%`)
            .where("prog_type", "like", `%${filter.prog_type}%`)
            .count("session_id as total")
            .then(result => cb(null, result))
            .catch(e => cb(e));
        }
      },
      (e, result) => {
        if (e) {
          event.sender.send("getSessionsAll", { err: e });
          // console.log(e)
        } else {
          event.sender.send("getSessionsAll", { result });
          // console.log(result);
        }
      }
    );
  });

  // deleting session (is_deleted = 1)
  // ipcMain.on("deleteSessionsSingle", (event, item) => {
  //   console.log(item)
  //   knex("tblSessions")
  //     .where({ session_id: item.session_id })
  //     .update({ is_deleted: 1 })
  //     .then(result => {
  //       console.log(result)
  //       sndMsg.sucMsg(event, '', `Session with id:${item.session_id} is deleted`);
  //       event.sender.send("deleteSessionsSingle", { result });        
  //     })
  //     .catch(err => {
  //       sndMsg.errMsg(event, "", `Session with id:${item.session_id} could not be deleted, please contact admin`);    
  //       event.sender.send("deleteSessionsSingle", { err });
  //       console.log(err);
        
  //     });
  // });

  // //  Deleting Children Screening (is_deleted = 1 ) in tables tblScrChildren
  ipcMain.on("deleteSessionsSingle", (event, session_id) => {
    console.log(session_id);
    async.series({ delScrCh: cb => {
        knex("tblSessions")
          .where({ session_id})
          .update({ is_deleted: 1 })
          .then(result => cb(null, result))
          .catch(e => cb(e));
      } }, (err, result) => {
      if (err) {
        sndMsg.errMsg(event, "", `Session with id:${session_id} could not be deleted, please contact admin`);
        event.sender.send("deleteSessionsSingle", { err });
        console.log(err);
      } else {
        console.log(result);
        sndMsg.sucMsg(event, "", `Session with id:${session_id} is deleted`);
        event.sender.send("deleteSessionsSingle", { result });
      }
    });
  });

  // NEED WORKOUT
  // // adding session data 
  // function sessionsDataSave(event, item, config, client) {

  //   item.upload_status = 0;
  //   item.client_id = client;
  //   item.created_at = localDate();
  //   item.username = config.usernameL;
  //   item.project_name = config.project_nameL;
  //   item.org_name = config.org_nameL;
  //   console.log({
  //     msg: 'insert Sessions',
  //     data: item
  //   })
  //   knex('tblSessions')
  //     .insert(item)
  //     .then(result => {
  //       console.log({
  //         msg: 'insert record',
  //         ret: result
  //       })
  //       return knex('tblSessions')
  //         .where('session_id', result[0])

  //     })
  //     .then(result => {
  //       console.log({
  //         msg: 'insert return item',
  //         result: result
  //       })
  //       event.sender.send('insertSessionsSingle', ({
  //         result: result
  //       }))
  //     })
  //     .catch(e => {
  //       event.sender.send('insertSessionsSingle', ({
  //         err: e
  //       }))
  //     })
  // }  
  // // adding (inserting) one session 
  // ipcMain.on('insertSessionsSingle', (e, item) => {
  //   sessionsDataSave(e, item, config, client);
  // })

  // updating session data
  function sessionUpdateSave(event, item) {
    console.log(item);
    item.upload_status = 2;
    item.updated_at = localDate();
    knex('tblSessions')
      .update(item)
      .where('session_id', item.session_id)
      .then(result => {
        return knex('tblSessions')
          .where('session_id', item.session_id)
      })
      .then(result => {
        event.sender.send('updateSessionsSingle', ({
          result: result
        }))
      })
      .catch(e => {
        event.sender.send('updateSessionsSingle', ({
          err: e
        }))
      })
  }

  // editing (updating) one session
  ipcMain.on('updateSessionsSingle', (e, item) => {
    sessionUpdateSave(e, item);
  });

};