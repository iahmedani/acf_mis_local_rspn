module.exports = (ipcMain, knex, fs, sndMsg, async, client, localDate, ) => {

  // sending all session of site and not deleted (is_deleted)
  ipcMain.on("getSessionsAllReport", (event, filter) => {
    console.log(filter);
    if (filter.startDate && filter.endDate) {
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
              .whereBetween("session_date", [filter.startDate, filter.endDate])
              .then(result => {
                cb(null, result);
                // event.sender.send("getSessionsAll", { result: result });
              })
              .catch(e => {
                cb(e);
                // event.sender.send("getSessionsAll", { err: e });
              });
          }
        },
        (e, result) => {
          if (e) {
            event.sender.send("getSessionsAllReport", { err: e });
            console.log(e)
          } else {
            event.sender.send("getSessionsAllReport", { result });
            console.log(result);
          }
        }
      );
    } else {
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
              .then(result => {
                cb(null, result);
                // event.sender.send("getSessionsAll", { result: result });
              })
              .catch(e => {
                cb(e);
                // event.sender.send("getSessionsAll", { err: e });
              });
          }
        },
        (e, result) => {
          if (e) {
            event.sender.send("getSessionsAllReport", { err: e });
            console.log(e)
          } else {
            event.sender.send("getSessionsAllReport", { result });
            console.log(result);
          }
        }
      );
    }   
  });

};