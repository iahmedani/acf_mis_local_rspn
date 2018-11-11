module.exports = (ipcMain, knex, fs, sndMsg) => {
  ipcMain.on("villagelist", (evt, data) => {
    knex("tblVillages")
      .then(result => {
        console.log(result);
        evt.sender.send("villagelist", result);
      })
      .catch(e => {
        console.log({ msg: "villagelist fetching error", e });
        sndMsg.errMsg(evt, "", "Unable to fetch village list, please contact administrator");
      });
  });
  ipcMain.on("getVillage", (evt, siteId) => {
    knex("tblVillages")
      .where({site: siteId})
      .then(result => {
        console.log(result);
        evt.sender.send("haveVillage", result);
      })
      .catch(e => {
        console.log({ msg: "villagelist fetching error", e });
        sndMsg.errMsg(evt, "", "Unable to fetch village list, please contact administrator");
      });
  });
  ipcMain.on("addVillage", async (evt, data) => {
    data.created_at = new Date(Date.now()).toLocaleDateString();
    data.client_id = await JSON.parse(fs.readFileSync("config.json", "utf8")).client;
    console.log(data);
    if (!data.id == "") {
      knex("tblVillages")
        .update(data)
        .where("id", data.id)
        .then(result => {
          console.log("Village updated");
          sndMsg.sucMsg(evt, "", "Village Updated");
        })
        .catch(e => {
          console.log("Village not updated");
          sndMsg.errMsg(evt, "", "Village not updated");
        });
    } else {
      delete data.id;
      console.log(data);
      knex("tblVillages")
        .insert(data)
        .then(result => {
          console.log("Village added");
          sndMsg.sucMsg(evt, "", "Village added");
        })
        .catch(e => {
          console.log("Village adding failed");
          console.log(e);
          sndMsg.errMsg(evt, "", "Adding Village failed");
        });
    }
  });
};
