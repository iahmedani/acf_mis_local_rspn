var uuid = require('uuid/v4')
module.exports = (ipcMain, knex, fs, sndMsg) => {
  ipcMain.on("stafflist", (evt, data) => {
    knex("tblLhw")
      .then(result => {
        console.log(result);
        evt.sender.send("stafflist", result);
      })
      .catch(e => {
        console.log({
          msg: "stafflist fetching error",
          e
        });
        sndMsg.errMsg(evt, "", "Unable to fetch staff list, please contact administrator");
      });
  });
  ipcMain.on("getStaff", (evt, siteId) => {
    knex("tblLhw")
      .where({
        site: siteId
      })
      .then(result => {
        console.log(result);
        evt.sender.send("haveStaff", result);
      })
      .catch(e => {
        console.log({
          msg: "stafflist fetching error",
          e
        });
        sndMsg.errMsg(evt, "", "Unable to fetch staff list, please contact administrator");
      });
  });
  ipcMain.on("getStaffuc", (evt, uc) => {
    knex("tblLhw")
      .where({
        uc: uc,
        is_deleted: 0
      })
      .then(result => {
        console.log(result);
        evt.sender.send("haveStaffuc", result);
      })
      .catch(e => {
        console.log({
          msg: "stafflist fetching error",
          e
        });
        sndMsg.errMsg(evt, "", "Unable to fetch staff list, please contact administrator");
      });
  });

  ipcMain.on("addStaff", async (evt, data) => {
    data.created_at = new Date(Date.now()).toLocaleDateString();
    data.client_id = await JSON.parse(fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, "utf8")).client;
    console.log(data);
    if (!data.id == "") {
      data.upload_status = 2;
      knex("tblLhw")
        .update(data)
        .where("id", data.id)
        .then(result => {
          console.log("Staff updated");
          sndMsg.sucMsg(evt, "", "Staff Updated");

        })
        .catch(e => {
          console.log("Staff not updated");
          sndMsg.errMsg(evt, "", "Staff not updated");

        });
    } else {
      data.id = uuid();
      console.log(data);
      knex("tblLhw")
        .insert(data)
        .then(result => {
          console.log("Staff added");
          sndMsg.sucMsg(evt, "", "Staff added");

        })
        .catch(e => {
          console.log("Staff adding failed");
          console.log(e);
          sndMsg.errMsg(evt, "", "Adding Staff failed");
        });
    }
  });
}