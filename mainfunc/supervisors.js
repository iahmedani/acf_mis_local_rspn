var uuid = require('uuid/v4')
module.exports = (ipcMain, knex, fs, sndMsg) => {

  ipcMain.on("supervisorlist", (evt, data) => {
    knex("tblSupervisors")
      // .where({is_deleted:0})
      .then(result => {
        // console.log(result);
        evt.sender.send('supervisorlist', (result));
      })
      .catch(e => {
        sndMsg.errMsg(evt, '', 'Unable to fetch supervior list, please contact administrator')
        console.log({
          msg: "supervisors fetching error",
          e
        });
      });
  });

  ipcMain.on("getSups", (evt, siteId) => {
    knex("tblSupervisors")
      .where({
        site: siteId
      })
      .then(result => {
        // console.log(result);
        evt.sender.send('haveSups', (result));
      })
      .catch(e => {
        sndMsg.errMsg(evt, '', 'Unable to fetch supervior list, please contact administrator')
        console.log({
          msg: "supervisors fetching error",
          e
        });
      });
  });
  ipcMain.on("getSupsuc", (evt, uc) => {
    knex("tblSupervisors")
      .where({
        uc: uc,
        is_deleted: 0
      })
      .then(result => {
        // console.log(result);
        evt.sender.send('haveSupsuc', (result));
      })
      .catch(e => {
        sndMsg.errMsg(evt, '', 'Unable to fetch supervior list, please contact administrator')
        console.log({
          msg: "supervisors fetching error",
          e
        });
      });
  });
  ipcMain.on("addSup", async (evt, data) => {
    data.created_at = new Date(Date.now()).toLocaleDateString();
    data.client_id = await JSON.parse(fs.readFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/config.json`, 'utf8')).client;
    console.log(data);
    if (!data.id == '') {
      data.upload_status = 2;
      knex('tblSupervisors')
        .update(data)
        .where('id', data.id)
        .then(result => {
          console.log('Supervisor updated')
          sndMsg.sucMsg(evt, '', 'Supervisor Updated')
        })
        .catch(e => {
          console.log("Supervisor not updated");
          sndMsg.errMsg(evt, '', 'Supervisor not updated');
        });
    } else {
      data.id = uuid();
      console.log(data);
      knex("tblSupervisors")
        .insert(data)
        .then(result => {
          console.log('Supervisor added')
          sndMsg.sucMsg(evt, "", "Supervisor Added");

        })
        .catch(e => {
          console.log('Supervisor adding failed');
          sndMsg.errMsg(evt, "", "Adding supervisor failed");

          console.log(e)
        })
    }
  });
}