module.exports = (ipcMain, knex, fs, sndMsg, async, client, localDate, ) => {

  // sending all session of site and not deleted (is_deleted)
  ipcMain.on("getSessionsAllReport", (event, filter) => {
    console.log(filter);
    if (filter.startDate && filter.endDate) {
      async.series({
          data: cb => {
            knex("vSessionForReportNew")
              .where({
                is_deleted: 0
              })
              .where('prog_type', 'like', `%${filter.prog_type}%`)
              .where('province_id', 'like', `%${filter.province_id}%`)
              .where('district_id', 'like', `%${filter.district_id}%`)
              .where('tehsil_id', 'like', `%${filter.tehsil_id}%`)
              .where('uc_id', 'like', `%${filter.uc_id}%`)
              .where('site_id', 'like', `%${filter.site_id}%`)
              .where('CHS_id', 'like', `%${filter.CHS_id}%`)
              .where('CHW_id', 'like', `%${filter.CHW_id}%`)
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
            event.sender.send("getSessionsAllReport", {
              err: e
            });
            console.log(e)
          } else {
            event.sender.send("getSessionsAllReport", {
              result
            });
            console.log(result);
          }
        }
      );
    } else {
      async.series({
          data: cb => {
            knex("vSessionForReportNew")
              .where({
                is_deleted: 0
              })
              .where('prog_type', 'like', `%${filter.prog_type}%`)
              .where('province_id', 'like', `%${filter.province_id}%`)
              .where('district_id', 'like', `%${filter.district_id}%`)
              .where('tehsil_id', 'like', `%${filter.tehsil_id}%`)
              .where('uc_id', 'like', `%${filter.uc_id}%`)
              .where('site_id', 'like', `%${filter.site_id}%`)
              .where('CHS_id', 'like', `%${filter.CHS_id}%`)
              .where('CHW_id', 'like', `%${filter.CHW_id}%`)
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
            event.sender.send("getSessionsAllReport", {
              err: e
            });
            console.log(e)
          } else {
            event.sender.send("getSessionsAllReport", {
              result
            });
            console.log(result);
          }
        }
      );
    }
  });

  ipcMain.on("getSessionsSummary", (event, filter) => {
    console.log(filter);
    if (filter.startDate && filter.endDate) {
      async.series({
          data: cb => {
            knex("vSessionForReportNew")
              .select('prog_type', 'session_type')
              .sum({
                total_session: 'total_session'
              })
              .sum({
                grp_sessions: 'grp_sessions'
              })
              .sum({
                ind_session: 'ind_session'
              })
              .sum({
                male_participants: 'male_participants'
              })
              .sum({
                female_participants: 'female_participants'
              })
              .sum({
                pragnent: 'pragnent'
              })
              .sum({
                lactating: 'lactating'
              })
              .sum({
                new_participants: 'new_participants'
              })
              .sum({
                old_participants: 'old_participants'
              })
              .where({
                is_deleted: 0
              })
              .where('prog_type', 'like', `%${filter.prog_type}%`)
              .where('province_id', 'like', `%${filter.province_id}%`)
              .where('district_id', 'like', `%${filter.district_id}%`)
              .where('tehsil_id', 'like', `%${filter.tehsil_id}%`)
              .where('uc_id', 'like', `%${filter.uc_id}%`)
              .where('site_id', 'like', `%${filter.site_id}%`)
              .where('CHS_id', 'like', `%${filter.CHS_id}%`)
              .where('CHW_id', 'like', `%${filter.CHW_id}%`)
              .whereBetween("session_date", [filter.startDate, filter.endDate])
              .groupBy('prog_type', 'session_type')
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
            event.sender.send("getSessionsSummary", {
              err: e
            });
            console.log(e)
          } else {
            event.sender.send("getSessionsSummary", {
              result
            });
            console.log(result);
          }
        }
      );
    } else {
      async.series({
          data: cb => {
            knex("vSessionForReportNew")
              .select('prog_type', 'session_type')
              .sum({
                total_session: 'total_session'
              })
              .sum({
                grp_sessions: 'grp_sessions'
              })
              .sum({
                ind_session: 'ind_session'
              })
              .sum({
                male_participants: 'male_participants'
              })
              .sum({
                female_participants: 'female_participants'
              })
              .sum({
                pragnent: 'pragnent'
              })
              .sum({
                lactating: 'lactating'
              })
              .sum({
                new_participants: 'new_participants'
              })
              .sum({
                old_participants: 'old_participants'
              })
              .where({
                is_deleted: 0
              })
              .where('prog_type', 'like', `%${filter.prog_type}%`)
              .where('province_id', 'like', `%${filter.province_id}%`)
              .where('district_id', 'like', `%${filter.district_id}%`)
              .where('tehsil_id', 'like', `%${filter.tehsil_id}%`)
              .where('uc_id', 'like', `%${filter.uc_id}%`)
              .where('site_id', 'like', `%${filter.site_id}%`)
              .where('CHS_id', 'like', `%${filter.CHS_id}%`)
              .where('CHW_id', 'like', `%${filter.CHW_id}%`)
              .groupBy('prog_type', 'session_type')
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
            event.sender.send("getSessionsSummary", {
              err: e
            });
            console.log(e)
          } else {
            event.sender.send("getSessionsSummary", {
              result
            });
            console.log(result);
          }
        }
      );
    }
  });

  ipcMain.on('getAddSitesByDistrict', (e, dist_id) => {

    knex('v_geo')
      .select('site_name')
      .where({
        district_id: dist_id
      })
      .then(r => {
        e.sender.send('getAddSitesByDistrict', {
          r
        })
      }).catch(e => {
        e.sender.send('getAddSitesByDistrict', {
          err: e
        })
      })

  })
};