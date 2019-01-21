module.exports = (ipcMain, knex, fs, sndMsg, async) => {
  console.log('dashboard')
  ipcMain.on('newDashboard', (event, data) => {
    async.series({
      scrChildren: (cb) => {
        knex("tblScrChildren")
          .sum({normal_girls_623:'normal_girls_623'})
          .sum({normal_boys_623:"normal_boys_623"})
          .sum({normal_girls_2459:"normal_girls_2459"})
          .sum({ normal_boys_2459:"normal_boys_2459"})
          .sum({ sam_with_comp_girls_623:"sam_with_comp_girls_623"})
          .sum({ sam_with_comp_boys_623:"sam_with_comp_boys_623"})
          .sum({ sam_with_comp_girls_2459:"sam_with_comp_girls_2459"})
          .sum({ sam_with_comp_boys_2459:"sam_with_comp_boys_2459"})
          .sum({ sam_without_comp_girls_623: "sam_without_comp_girls_623" })
          .sum({ sam_without_comp_boys_623:"sam_without_comp_boys_623"})
          .sum({ sam_without_comp_girls_2459:"sam_without_comp_girls_2459"})
          .sum({ sam_without_comp_boys_2459: "sam_without_comp_boys_2459"})
          .sum({ mam_girls_623:"mam_girls_623"})
          .sum({ mam_boys_623:"mam_boys_623"})
          .sum({ mam_girls_2459:"mam_girls_2459"})
          .sum({ mam_boys_2459:"mam_boys_2459"})
          .where({ is_deleted: 0 })
          .then(result => {
            // console.log(result);
            cb(null, result);
          })
          .catch(e => {
            cb(e);
          });
      }, scrPlw: function (cb) {
        knex("tblScrPlw")
          .where({ is_deleted: 0 })
          .sum({ muac_gt_21_pragnent:"muac_gt_21_pragnent"})
          .sum({ muac_gt_21_lactating:"muac_gt_21_lactating"})
          .sum({ muac_le_21_pragnent: "muac_le_21_pragnent" })
          .sum({ muac_le_21_lactating:"muac_le_21_lactating"})
          .then(result => {
            cb(null, result);
          })
          .catch(e => {
            cb(e);
          });
      }, comDist: function (cb) {
        knex("tblStokDistv2")
          .column("item_name")
          .where({ is_deleted: 0 })
          .sum({ total: "distributed" })
          .groupBy("item_name")
          .then(result => {
            cb(null, result);
          })
          .catch(e => {
            cb(e);
          });
      }, addProg: function (cb) {
        knex("tblOtpAdd")
          .column("prog_type")
          .where({ is_deleted: 0 })
          .count({ total: "otp_id" })
          .groupBy("prog_type")
          .then(result => {
            cb(null, result);
          })
          .catch(e => {
            cb(e);
          });
      }, progIndicators: function (cb) {
        knex("tblOtpExit")
          .column("exit_reason")
          .where({ is_deleted: 0 })
          .count({ total: "exit_id" })
          .groupBy("exit_reason")
          .then(result => {
            cb(null, result);
          })
          .catch(e => {
            cb(e);
          });
      }
    }, (err, result) => {
        if (err) {
          // console.log(err)
          sndMsg.errMsg(event,'', 'Unable to fech data' )
        } else {
          // console.log(result)
          event.sender.send("newDashboard", {result});
        }
    })
  })
  ipcMain.on('test', (event) => {
    event.sender.send('test', { result: 'imran' })
  })
}
