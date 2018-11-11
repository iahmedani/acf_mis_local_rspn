module.exports = (ipcMain, knex, fs, sndMsg) => {
  
  ipcMain.on("supervisorlist", (evt, data) => {
    knex("tblSupervisors")
      .then(result => {
        // console.log(result);
        evt.sender.send('supervisorlist', (result));
      })
      .catch(e => {
        sndMsg.errMsg(evt, '', 'Unable to fetch supervior list, please contact administrator')
        console.log({ msg: "supervisors fetching error", e });
      });
  });
  
  ipcMain.on("getSups", (evt, siteId) => {
    knex("tblSupervisors")
      .where({site:siteId})
      .then(result => {
        // console.log(result);
        evt.sender.send('haveSups', (result));
      })
      .catch(e => {
        sndMsg.errMsg(evt, '', 'Unable to fetch supervior list, please contact administrator')
        console.log({ msg: "supervisors fetching error", e });
      });
  });
  ipcMain.on("addSup", async(evt, data) => {
    data.created_at = new Date(Date.now()).toLocaleDateString();
    data.client_id = await JSON.parse(fs.readFileSync('config.json', 'utf8')).client;
    console.log(data);
    if (!data.id == '') {
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
      delete data.id;
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