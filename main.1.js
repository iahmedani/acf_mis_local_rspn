const electron = require('electron');
const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  dialog
} = electron;
const firstRunDB = require('./firstRunCreateDb').firstCreateDb;
const url = require('url');
const path = require('path');
var fs = require('fs');
var geo = require('./geoData');
let imran = {};
const log = require('electron-log');
const {
  autoUpdater
} = require("electron-updater");
autoUpdater.autoDownload = false;
// JSON.parse(fs.readFileSync('./config.json', 'utf8'))
// fs.readfilesy


console.log(imran);
var async = require('async');
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: 'acf_mis_local.sqlite3'
    // filename: './acf_mis_local.sqlite3'
  }
});
// const serverUrl = 'http://52.15.65.89:5000';
const serverUrl = 'http://localhost:5000';
console.log(serverUrl)

function localDate() {
  var x = new Date();
  x.setDate(x.getDate());
  return x.toLocaleDateString();
}
let sucMsg = function (event, listenChannel, message) {
  event.sender.send('success', {
    msg: message
  })
  // ipcMain.removeAllListeners(listenChannel)
  ipcMain.removeAllListeners('success')
}

let errMsg = function (event, listenChannel, message) {
  event.sender.send('error', {
    msg: message
  })
  // ipcMain.removeAllListeners(listenChannel)
  ipcMain.removeAllListeners('error')
}
// OTP Admission data save
function otpAddDataSave(event, addOtpData, config, client) {
  //console.log(addFormOtp);
  delete addOtpData.province;
  delete addOtpData.Tehsil;
  delete addOtpData.district;
  delete addOtpData.province;
  delete addOtpData.ddHealthHouseOTP;
  delete addOtpData.uc;
  addOtpData.client_id = client;
  addOtpData.username = config.usernameL;
  addOtpData.org_name = config.org_nameL;
  addOtpData.project_name = config.project_nameL;
  const addFormOtp = addOtpData;
  console.log(addFormOtp);
  knex('tblOtpAdd')
    .insert(addFormOtp)
    .then(result => {
      console.log(result + 'OTP addmision added')
      sucMsg(event, '', 'OTP admission added successfully')
      // addOtp.webContents.send("resultSentOtpAdd", {
      //   'msg': 'records added'
      // });
      var interimData = {
        otp_id: result[0],
        client_id: imran.client,
        muac: addFormOtp.muac,
        weight: addFormOtp.weight,
        ration1: addFormOtp.ration1,
        quantity1: addFormOtp.quantity1,
        ration2: (addFormOtp.ration2 ? addFormOtp.ration2 : ''),
        quantity2: addFormOtp.quantity2,
        ration3: (addFormOtp.ration3 ? addFormOtp.ration3 : ''),
        quantity3: addFormOtp.quantity3,
        curr_date: localDate(),
        created_at: localDate(),
        status: 'open',
        next_followup: function () {
          var myDate = new Date();
          myDate.setDate(myDate.getDate() + (addOtpData.prog_type == 'sfp' ? 14 : 7))
          return myDate.toLocaleDateString();
        }()
      }
      console.log(interimData)
      return knex('tblInterimOtp')
        .insert(interimData)
    })
    .then(result => {
      console.log('interim ID: ', result);
    })
    .catch(e => {
      console.log(e)
      console.log(e + 'OTP add error');
      errMsg(event, '', 'OTP Addmision not added, plz try again or contact admin');
      // addOtp.webContents.send("resultSentOtpAdd", {
      //   'err': 'records not added, plz try again'
      // });
    })
  // addFormOtp = null;
}
// followup interm data share
function followupIntermData(event, site_id) {
  console.log('site_id from html', site_id);
  knex.from('tblOtpAdd')
    .innerJoin('tblInterimOtp', 'tblInterimOtp.otp_id', 'tblOtpAdd.otp_id')
    .where({
      site_id: site_id,
      status: 'open'
    })
    .then(result => {
      // result.location = 'Follow up interim call'
      console.log(result)
      event.sender.send('getInterim', ({
        result: result
      }))
      result = null;
    })
    .catch(e => {
      // e.location = 'Follow up interim call'
      console.log(e);
      event.sender.send('getInterim', ({
        err: e
      }))
    })
}
// adding followup 
function followupAddData(event, item) {
  var interimUpd = {
    muac: item.muac,
    weight: item.weight,
    ration1: item.ration1,
    quantity1: item.quantity1,
    ration2: item.ration2,
    quantity2: item.quantity2,
    ration3: item.ration3,
    quantity3: item.quantity3,
    curr_date: item.followup_date,
    other_com_name: item.other_com_name,
    other_com_qty: item.other_com_qty,
    next_followup: function () {
      var myDate = new Date(item.followup_date);
      myDate.setDate(myDate.getDate() + 15)
      return myDate.toLocaleDateString();
    }(),
    updated_at: localDate()
  }
  var followupData = {
    upload_status: 0,
    otp_id: item.otp_id,
    client_id: imran.client,
    muac: item.muac,
    weight: item.weight,
    ration1: item.ration1,
    quantity1: item.quantity1,
    ration2: item.ration2,
    quantity2: item.quantity2,
    ration3: item.ration3,
    quantity3: item.quantity3,
    curr_date: item.followup_date,
    other_com_name: item.other_com_name,
    other_com_qty: item.other_com_qty,
    next_followup: function () {
      var myDate = new Date(item.followup_date);
      myDate.setDate(myDate.getDate() + 15)
      return myDate.toLocaleDateString();
    }(),
    created_at: localDate()
  }
  console.log('_______________update data______')
  console.log(interimUpd)
  console.log('_______________followup data______')
  console.log(followupData)
  knex.from('tblInterimOtp')
    .where({
      otp_id: item.otp_id
    })
    .update(interimUpd)
    .then(result => {
      console.log(result)
    })
    .catch(e => {
      console.log(e)
    })
  knex.from('tblOtpAdd')
    .innerJoin('tblInterimOtp', 'tblInterimOtp.otp_id', 'tblOtpAdd.otp_id')
    .where({
      'tblInterimOtp.otp_id': item.otp_id,
      status: 'open'
    })
    .then(result => {

      // result.location = 'Follow up interim call'
      console.log(result)
      event.sender.send('addFollowup', ({
        result: result
      }))
    })
    .catch(e => {
      // e.location = 'Follow up interim call'
      console.log(e);
      event.sender.send('addFollowup', ({
        err: e
      }))
    })
  knex('tblOtpFollowup')
    .insert(followupData)
    .then(result => {
      console.log({
        msg: 'Follow up added',
        result: result
      })
    })
    .catch(e => {
      console.log({
        msg: 'Error during followup record add',
        err: e
      })
    })

}

// Exit Update: Edit (update) one record
function exitUpdDataSave(event, data, client) {
  data.client_id = client;
  data.upload_status = 2;
  const otpExitAddData = data;
  console.log(otpExitAddData);

  knex('tblOtpExit')
    .where('otp_id', otpExitAddData.otp_id)
    .update(otpExitAddData)
    .then(result => {
      console.log(result);
      sucMsg(event, "", "Record updated Successfully");
      return knex('tblInterimOtp')
        .where('otp_id', otpExitAddData.otp_id)
        .update({
          status: otpExitAddData.exit_reason
        })
    })
    .then(result => {
      console.log({
        msg: 'interm table updated',
        data: result
      })
    })
    .catch(e => {
      console.log(e);
      errMsg(event, "", "Record not updated, plz try again or contact admin");
    })
}
//Exit Update: Edit (update) one record
ipcMain.on('otpExitUpdate', (e, data) => {
  exitUpdDataSave(e, data, imran.client);
})

// sending all admisions for otp exit
function otpAddDataForExit(event, filter) {
  knex.from('tblOtpAdd')
    .innerJoin('tblInterimOtp', 'tblInterimOtp.otp_id', 'tblOtpAdd.otp_id')
    .where({
      site_id: filter.site_id,
      status: 'open'
    })
    .then(result => {
      event.sender.send('getOtpAll', ({
        result: result
      }))
    })
    .catch(e => {
      event.sender.send('getOtpAll', ({
        err: e
      }))
    })
}
// add OTP Exit 
function otpExitAddDataSave(event, data, client) {
  data.client_id = client;
  data.upload_status = 0;
  const otpExitAddData = data;
  console.log({ location: 'OTP ADD EXIT', data });
  const followup = {
    otp_id: data.otp_id,
    client_id: data.client_id,
    weight: data.exit_weight,
    ration1: (data.exit_ration1) ? data.exit_ration1 : '' ,
    quantity1: (data.exit_quantity1) ? data.exit_quantity1 : '',
    ration2: (data.exit_ration2) ? data.exit_ration2 : '',
    quantity2: (data.exit_quantity2) ? data.exit_quantity2 : '',
    ration3: (data.exit_ration3) ? data.exit_ration3 : '',
    quantity3: (data.exit_quantity3) ? data.exit_quantity3 : '',
    other_com_name: (data.exit_other_com_name) ? data.exit_other_com_name : '',
    other_com_qty: (data.exit_other_com_qty) ? data.exit_other_com_qty : '',
    muac: data.exit_muac,
    status: data.exit_reason,
    curr_date: data.exit_date
  }
  knex('tblOtpExit')
    .insert(data)
    .then(result => {
      console.log(result);
      sucMsg(event, '', 'Patient exit record is saved')
      return knex('tblInterimOtp')
        .where('otp_id', otpExitAddData.otp_id)
        .update({
          status: otpExitAddData.exit_reason
        })
    })
    .then(result => {
      console.log({
        msg: 'interm table updated',
        data: result
      })
      console.log(followup)
      return knex('tblOtpFollowup')
              .insert(followup)
    })
    .then(result => {
      console.log({
        msg: 'followup table updated',
        data: result
      })
    })
    .catch(e => {
      console.log(e);
      errMsg(event, '', 'Patient exit record not saved, plz try again or contact admin')
    })
}

// // sending all session of site 
// function allSessionsData(event, data) {
//   console.log(data);
//   knex('tblSessions')
//     .where('site_id', data)
//     .then(result => {
//       event.sender.send('getSessionsAll', ({
//         result: result
//       }))
//     })
//     .catch(e => {
//       event.sender.send('getSessionsAll', ({
//         err: e
//       }))
//     })
// }
// adding session data 
function sessionsDataSave(event, item, config, client) {

  item.upload_status = 0;
  item.client_id = client;
  item.created_at = localDate();
  item.username = config.usernameL;
  item.project_name = config.project_nameL;
  item.org_name = config.org_nameL;
  console.log({
    msg: 'insert Sessions',
    data: item
  })
  knex('tblSessions')
    .insert(item)
    .then(result => {
      console.log({
        msg: 'insert record',
        ret: result
      })
      return knex('tblSessions')
        .where('session_id', result[0])

    })
    .then(result => {
      console.log({
        msg: 'insert return item',
        result: result
      })
      event.sender.send('insertSessionsSingle', ({
        result: result
      }))
    })
    .catch(e => {
      event.sender.send('insertSessionsSingle', ({
        err: e
      }))
    })
}
// // updating session data
// function sessionUpdateSave(event, item) {
//   item.upload_status = 2;
//   item.updated_at = localDate();
//   knex('tblSessions')
//     .update(item)
//     .where('session_id', item.session_id)
//     .then(result => {
//       return knex('tblSessions')
//         .where('session_id', item.session_id)
//     })
//     .then(result => {
//       event.sender.send('updateSessionsSingle', ({
//         result: result
//       }))
//     })
//     .catch(e => {
//       event.sender.send('updateSessionsSingle', ({
//         err: e
//       }))
//     })
// }
ipcMain.on('stocks', (e, data) => {
  stockMovement(e);
})
function stockMovement(event) {
  knex('v_StockMovement')
    .orderBy('year', 'asc')
    .orderBy('month', 'asc')
    .then(result => {
      mainWindow.webContents.send('stocks', result)
    })
    .catch(e => {
      errMsg(event, '', 'Data Fetch error')
    })
}
ipcMain.on('enterRequest', (event, data)=>{
  stockRequest(event, data);
})
function stockRequest(event, data) {
  data.client_id = client_id;
  knex('tblStockRequest')
    .insert(data)
    .then(result => {
      sucMsg(event, '', 'Stock request email is sent')
    })
    .catch(e => {
      errMsg(event, '', 'Stock Request: Db error ')
    })
}
// ipcMain.on('rusfStock', (e, data) => {
//   rusfStockDetails(e);
// })

// function rusfStockDetails(event) {
  
//   async.series({
//     dist: cb => {
//       knex.select('*').from('v_total_dist')
//         .sum({ distribution: 'distribution' })
//         .groupBy('month','year')
//         .then(result => cb(null, result))
//         .catch(e=>cb(e))
//     },
//     stockIn: cb => {
//       knex.select('item_desc').as('commodity').from('tblStock')
//         .sum({ rec_qty: 'rec_qty' })
//         .where({ item_desc: 'RUTF Sachets' })
//         .groupBy('item_desc')
//         .then(result => cb(null, result))
//         .catch(e => cb(e))     

//     }
//   }, function (err, results) {
//     if (err) {
//         errMsg(event, '', 'Data Fetch error')
//     } else {
//       mainWindow.webContents.send('rusfStock', results);
//       }
//   })
// }

// Save Stock Entry
function stockSave(event, data) {
  console.log(data)
  knex('tblStock')
    .insert(data)
    .then(result => {
      sucMsg(event,'','Stock Entry Save')
    }).catch(e => {
      console.log(e)
      errMsg(event,'','Stock entry db error')
    })
}
ipcMain.on('geoList', (evt, data) => {
  async.series({
    province: (cb) => {
      knex('tblGeoProvince')
        .then(result => {
          cb(null,result)
        })
        .catch(e => {
          cb(e);
        })
    },
    district: (cb) => {
      knex('tblGeoDistrict')
        .then(result => {
          cb(null, result)
        })
        .catch(e => {
          cb(e);
        })
    },
    tehsil: (cb) => {
      knex('tblGeoTehsil')
        .then(result => {
          cb(null, result)
        })
        .catch(e => {
          cb(e);
        })
    },
    uc: (cb) => {
      knex('tblGeoUC')
        .then(result => {
          cb(null, result)
        })
        .catch(e => {
          cb(e);
        })
    },
    site: (cb) => {
      knex('tblGeoNutSite')
        .then(result => {
          cb(null, result)
        })
        .catch(e => {
          cb(e);
        })
    }
  }, (err, results) => {
    evt.sender.send("geoList", (results));
    
  })
})





// Screening Update: Children sending all data
function allScreeningData(event, qry) {
  db.scrChild(qry, (err, result) => {
    event.sender.send('getScrChAll', ({
        err: err,
        result: result,

      })

    )
    console.log(result);
  })
}
// Screening Update: Edit (update) children record
function screeningChUpDataSave(event, data) {
  var chUpd = {
    screening_id: data.screening_id,
    name: data.name,
    upload_status: 2,
    f_or_h_name: data.f_or_h_name,
    muac: data.muac,
    gender: data.gender,
    age: data.age,
    oedema: data.oedema,
    no_mm_sch: data.no_mm_sch,
    deworming: data.deworming,
    status: data.status
  }
  db.updScr(chUpd, function (err, result) {
    console.log('childupdate', result);
    event.sender.send('updScrChSingle', ({
      result,
      err: null
    }))
  })

}
// Screening Update: Plw sending all data
function allScreeningDataPlw(event, qry) {
  db.scrPlw(qry, (err, result) => {
    event.sender.send('getScrPlwAll', ({
      err: err,
      result: result,
    }))
    console.log(result);
  })
}

// Screening Update: Chilren sending all data
function allScrChildrenUpdData(event, qry) {
  db.allScrChildrenData(qry, (err, result) => {
    event.sender.send('allScrChildren', ({
      err: err,
      result: result,
    }))
    // console.log(result);
  })
}
// Screening Update: PLW NEW sending all data
function allScrPlwNewUpdData(event, qry) {
  db.allScrPlwNewData(qry, (err, result) => {
    event.sender.send('allScrPlwNew', ({
      err: err,
      result: result,
    }))
    console.log(result);
  })
}
// Screening Update: Edit (update) plw record
function screeningPlUpdDataSave(event, data) {
  var plwUpd = {
    screening_id: data.screening_id,
    name: data.name,
    f_or_h_name: data.f_or_h_name,
    muac: data.muac,
    upload_status: 2,
    address: data.address,
    age: data.age,
    plw_type: data.plw_type,
    status: data.status
  }
  db.updScr(plwUpd, function (err, result) {
    console.log(result);
    event.sender.send('updScrPlwSingle', ({
      result,
      err: null
    }))
  })
}
// Admission Update: sending all data
function allOtpAddUpdData(event, site_id) {
  knex('tblOtpAdd')
    .where({
      site_id: site_id
    })
    .then(result => {
      event.sender.send('allOtp', ({
        result: result
      }))
    })
    .catch(e => {
      event.send.send('allOtp', ({
        err: e
      }))
    })

}
// // Admission Update: Edit (update) one record
// function otpAddUpdDataSave(event, item) {
//   console.log(item);
//   item.upload_status = 2;
//   knex('tblOtpAdd')
//     .update(item)
//     .where('otp_id', item.otp_id)
//     .then(result => {
//       sucMsg(event, '', 'Record successfully updated')
//       console.log(result);
//     })
//     .catch(e => {
//       console.log(e)
//       errMsg(event, '', 'Record no updated, plz try again or contact admin')
//     })
// }

// Exit Update: sending all data
// function allExitData(event, site_id) {

//   knex.from('tblOtpExit')
//     .innerJoin('tblOtpAdd', 'tblOtpAdd.otp_id', 'tblOtpExit.otp_id')
//     .where({
//       site_id: site_id,
//     })
//     .then(result => {
//       console.log(result)
//       event.sender.send('have', ({
//         result: result
//       }))
//     })
//     .catch(e => {
//       event.sender.send('have', ({
//         err: e
//       }))
//     })
// }
// // Exit Update: Edit (update) one record
// function exitUpdDataSave(event, data, client) {
//   data.client_id = client;
//   data.upload_status = 2;
//   const otpExitAddData = data;
//   console.log(otpExitAddData);

//   knex('tblOtpExit')
//     .where('otp_id', otpExitAddData.otp_id)
//     .update(otpExitAddData)
//     .then(result => {
//       console.log(result);
//       sucMsg(event, '', 'Record updated Successfully')
//       return knex('tblInterimOtp')
//         .where('otp_id', otpExitAddData.otp_id)
//         .update({
//           status: otpExitAddData.exit_reason
//         })
//     })
//     .then(result => {
//       console.log({
//         msg: 'interm table updated',
//         data: result
//       })
//     })
//     .catch(e => {
//       console.log(e);
//       errMsg(event, '', 'Record not updated, plz try again or contact admin')
//     })
// }

// Screening Children Add 
function childrenScrAddSave(event, data, client, username, project) {
  data.client_id = client;
  data.username = username;
  data.project = project;
  data.upload_status = 0;
  knex('tblScrChildren')
    .insert(data)
    .then(result => {
      sucMsg(event, '', 'Record Successfully added')
      console.log('func childrenScrAddSave success', result)
    }).catch(e => {
      errMsg(event, '', 'Record not saved, plz try again or contact admin')
      console.log('func childrenScrAddSave error', e)
    })
}
// Screening PLW Add 
function plwNewScrAddSave(event, data, client, username, project) {
  data.client_id = client;
  data.username = username;
  data.project = project;
  data.upload_status = 0;
  knex('tblScrPlw')
    .insert(data)
    .then(result => {
      sucMsg(event, '', 'Record Successfully added')
      console.log('func childrenScrAddSave success', result)
    }).catch(e => {
      errMsg(event, '', 'Record not saved, plz try again or contact admin')
      console.log('func childrenScrAddSave error', e)
    })
}

// // Screening Children update 
// function childrenScrUpdSave(event, data) {
//   data.upload_status = 2;
//   knex('tblScrChildren')
//     .update(data)
//     .where('ch_scr_id', data.ch_scr_id)
//     .then(result => {
//       sucMsg(event, '', 'Record updated successfully')
//       console.log('func childrenScrUpdSave success', result)
//     }).catch(e => {
//       errMsg(event, '', 'Record not updated, plz try again or contact admin')
//       console.log('func childrenScrUpdSave error', e)
//     })
// }
// // Screening PLW NEW update 
// function plwNewScrUpdSave(event, data) {
//   data.upload_status = 2;
//   knex('tblScrPlw')
//     .update(data)
//     .where('plw_scr_id', data.plw_scr_id)
//     .then(result => {
//       sucMsg(event, '', 'Record updated successfully')
//       console.log('func plwNewScrUpdSave success', result)
//     }).catch(e => {
//       errMsg(event, '', 'Record not updated, plz try again or contact admin')
//       console.log('func plwNewScrUpdSave error', e)
//     })
// }
var db = require('./dbTest');
const request = require('request');

function isEmpty(arg) {
  for (var item in arg) {
    return false;
  }
  return true;
}
// const bParser = require('body-parser');

// app.use(bParser.json());
// first run check
function firstRun() {
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize
  var client_id = imran.client;
  runFirst = new BrowserWindow({
    width,
    height,
    title: 'first Run'
  });

  runFirst.loadURL(url.format({
    pathname: path.join(__dirname, '/html/firstRun.html'),
    protocol: 'file:',
    slashes: true
  }));

  ipcMain.on('firstRun', (e, firstRunInfo) => {
    require('getmac').getMac((e, mac) => {
    console.log(firstRunInfo);
    var usernameL = firstRunInfo.username.toLowerCase();
    usernameL = usernameL.replace(/\s+/g, '');

    var org_nameL = firstRunInfo.org_name.toLowerCase();
    org_nameL = org_nameL.replace(/\s+/g, '');

    var project_nameL = firstRunInfo.project_name.toLowerCase();
    project_nameL = project_nameL.replace(/\s+/g, '');

    var passwordL = firstRunInfo.password.toLowerCase();
    passwordL = passwordL.replace(/\s+/g, '');

    var client = firstRunInfo.client.toLowerCase();
    client = client.replace(/\s+/g, '');
    
    var configInformation = {
      usernameL,
      org_nameL,
      project_nameL,
      passwordL,
      client,
    }
    
      configInformation.mac = mac
      console.log(mac)
    


    
    console.log(configInformation)

      var thisJson = JSON.stringify(configInformation);
      var regData = {
        client_id: client,
        mac:mac
      }
      request({
        url: serverUrl + '/app_register',
        method: 'POST',
        body: {
          client_id: client,
          mac: mac
        },
        json:true
      }, function (err, response, body) {
        console.log(body)
          if(err) {
            runFirst.webContents.send('firstRunResponse', ({
              err:err
            }))
          } else  {
             console.log(body)
            fs.writeFile('config.json', thisJson, 'utf8', (err) => {
              if (err) {
                runFirst.webContents.send('firstRunResponse', ({
                  err: err
                }))
              } else {
                runFirst.webContents.send('firstRunResponse', ({
                  success: 1,
                  msg: 'Your configuration is saved, thanks!!'
                }))
              }
            });
          } 
      })
      
    // fs.writeFile('config.json', thisJson, 'utf8', (err) => {
    //   if (err) {
    //     runFirst.webContents.send('firstRunResponse', ({
    //       err: err
    //     }))
    //   } else {
    //     runFirst.webContents.send('firstRunResponse', ({
    //       success: 1,
    //       msg: 'Your configuration is saved, thanks!!'
    //     }))
    //   }
    //   });
    })
  })

  runFirst.on('closed', function () {
    runFirst = null;
  })

  runFirst.on('close', function () {
    runFirst = null;
  })
}
let mainWindow;

function creatWindow() {
  var config = {};
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width,
    height,
    show: false
  });
  // mainWindow.fullscreen = true;
  fs.stat('config.json', function (err, stat) {
    if (err == null) {
      console.log('File exists');
      mainWindow.once('ready-to-show', () => {
        mainWindow.maximize();
        imran = config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
        mainWindow.show()

      });
    } else if (err.code == 'ENOENT') {
      // file does not exist
      firstRun();
      firstRunDB(knex);
    } else {
      console.log('Some other error: ', err.code);
    }
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/html/index3.html'),
    protocol: 'file:',
    slashes: true
  }));

  ipcMain.on('getProvince', (evt) => {
    geo.provincev2(evt)

    // console.log(ipcMain.getMaxListeners())
  })
  ipcMain.on('getCommodity', (evt, prog_type) => {
    // geo.commodity(evt)
    geo.commodityv2(evt, prog_type);
    // console.log(ipcMain.getMaxListeners())
  })
  ipcMain.on('getCommodityAll', (evt ) => {
    // geo.commodity(evt)
    geo.commodity(evt);
    // console.log(ipcMain.getMaxListeners())
  })
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    geo.districtv2(prov, event);
  });
  ipcMain.on('getTehsil', function (event, dist) {
    geo.tehsilv2(dist, event);
    console.log(dist)
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    geo.ucv2(tehs, event);

  });
  ipcMain.on('getHealthHouse', function (event, ucs) {
    console.log(ucs)
    geo.healthHousev2(ucs, event);
  });
  ipcMain.on('getHealthHouseType', function (event, h_id) {
    console.log(h_id)
    geo.healthHouseTypev2(h_id, event);
  });
  ipcMain.on('nav', function (e, arg) {
    if (arg === 'child') {
      scrAddChild();
    } else if (arg === 'plw') {
      scrAddPlw();
    } else if (arg === 'report') {
      scrReports();
    } else if (arg === 'scrUpdate') {
      myUpdate();
    } else if (arg === 'scrChUpd') {
      scrChUpd();
    } else if (arg === 'scrPlUpd') {
      scrPlUpd();
    } else if (arg === 'otpAdd') {
      otpAdd();
    } else if (arg === 'addVill') {
      addVill();
    } else if (arg === 'addFollowupOtp') {
      // otpExit();
      addFollowupOtp();
    } else if (arg === 'otpExit') {
      otpExit();
      // addFollowupOtp();
    } else if (arg === 'otpAddUpdate') {
      otpAddUpdate();
    } else if (arg === 'otpExitEdit') {
      otpExitEdit();
    } else if (arg === 'sessions') {
      sessions();
    } else if (arg === 'otpReport') {
      otpReports();
    } else if (arg === 'defReport') {
      defReports();
    } else {
      console.log('error');
    }
  })
///////////////TEST PORTION
 
  // ipcMain.on('allOtpExit', (event, filter) => {
  //   console.log(filter);
  //   var _limit = (filter.pageSize) ? filter.pageSize : 10;
  //   var _offset = (filter.pageIndex == 1) ? 0 : (filter.pageIndex - 1) * _limit;
  //   console.log({ _limit, _offset })
  //   // console.log(`%${filter.site_village}%`);
  //   async.series({
  //     data: cb => {
  //       knex("v_otpExitFullForUpdate")
  //         .where("p_name", "like", `%${filter.p_name}%`)
  //         .where("site_village", "like", `%${filter.site_village}%`)
  //         .where("reg_id", "like", `%${filter.reg_id}%`)
  //         .where("province", "like", `%${filter.province}%`)
  //         .where("district_name", "like", `%${filter.district_name}%`)
  //         .where("uc_name", "like", `%${filter.uc_name}%`)
  //         .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
  //         .where("prog_type", "like", `%${filter.prog_type}%`)
  //         // .where('report_month', 'like', `%${filter.report_month}%`)

  //         .where({ is_deleted: 0 })
  //         .limit(_limit)
  //         .offset(_offset)
  //         .then(result => cb(null, result))
  //         .catch(e => cb(e));
  //     },
  //     itemsCount: cb => {
  //       knex("v_otpExitFullForUpdate")
  //         .where("p_name", "like", `%${filter.p_name}%`)
  //         .where("site_village", "like", `%${filter.site_village}%`)
  //         .where("reg_id", "like", `%${filter.reg_id}%`)
  //         .where("province", "like", `%${filter.province}%`)
  //         .where("district_name", "like", `%${filter.district_name}%`)
  //         .where("uc_name", "like", `%${filter.uc_name}%`)
  //         .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
  //         .where("prog_type", "like", `%${filter.prog_type}%`)
  //         .where({ is_deleted: 0 })
  //         .count("exit_id as total")
  //         .then(result => cb(null, result))
  //         .catch(e => cb(e));

  //     }
  //   }, (e, result) => {
  //     if (e) {
  //       event.sender.send("allOtpExit", { err: e });
  //       console.log(e)
  //     } else {
  //       event.sender.send("allOtpExit", { result });
  //       console.log(result);

  //     }
  //   })
  // })
  // ipcMain.on("deleteOtpExit", (event, item) => {
  //   console.log(item);
  //   async.series({
  //     delSOtpExit: cb => {
  //       knex("tblOtpExit")
  //         .where({ exit_id: item.exit_id })
  //         .update({ is_deleted: 1 })
  //         .then(result => {
  //           if (result) {
  //             knex("tblInterimOtp")
  //               .where({ otp_id: item.otp_id })
  //               .update({status: 'open'})
  //               .then(result => {
  //                 cb(null, result)
  //               });
  //           }
  //         }).catch(e=>cb(e))
  //     }
  //   }, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       errMsg(event, "", "Unable to delte record");
  //       event.sender.send("deleteOtpExit", { err });
  //     } else {
  //       sucMsg(event, "", `Patient with id: ${item.exit_id} is sucessfully delted`);
  //       console.log(result)
  //       event.sender.send("deleteOtpExit", { result });
  //     }
  //   });
  // });
  // ipcMain.on('allScrPlw', (event, filter) => {
  //   console.log(filter);
  //   var _limit = (filter.pageSize) ? filter.pageSize : 10;
  //   var _offset = (filter.pageIndex == 1) ? 0 : (filter.pageIndex - 1) * _limit;
  //   console.log({ _limit, _offset })
  //   // console.log(`%${filter.site_village}%`);
  //   async.series({
  //     data: cb => {
  //       knex("v_tblScrPlwFull")
  //         .where('province', 'like', `%${filter.province}%`)
  //         .where('district_name', 'like', `%${filter.district_name}%`)
  //         .where('tehsil_name', 'like', `%${filter.tehsil_name}%`)
  //         .where('uc_name', 'like', `%${filter.uc_name}%`)
  //         .where('report_month', 'like', `%${filter.report_month}%`)
  //         .where('sup_name', 'like', `%${filter.sup_name}%`)
  //         .where('staff_name', 'like', `%${filter.staff_name}%`)
  //         // .where('report_month', 'like', `%${filter.report_month}%`)
          
  //         .where({ is_deleted: 0 })
  //         .limit(_limit)
  //         .offset(_offset)
  //         .then(result => cb(null, result))
  //         .catch(e => cb(e));
  //     },
  //     itemsCount: cb => {
  //       knex("v_tblScrPlwFull")
  //         .where("province", "like", `%${filter.province}%`)
  //         .where("district_name", "like", `%${filter.district_name}%`)
  //         .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
  //         .where("uc_name", "like", `%${filter.uc_name}%`)
  //         .where("report_month", "like", `%${filter.report_month}%`)
  //         .where("sup_name", "like", `%${filter.sup_name}%`)
  //         .where("staff_name", "like", `%${filter.staff_name}%`)
  //         .where({ is_deleted: 0 })
  //         .count("plw_scr_id as total")
  //         .then(result => cb(null, result))
  //         .catch(e => cb(e));

  //     }
  //   }, (e, result) => {
  //     if (e) {
  //       event.sender.send("allScrPlw", { err: e });
  //       console.log(e)
  //     } else {
  //       event.sender.send("allScrPlw", { result });
  //       console.log(result);

  //     }
  //   })
  // })
  // ipcMain.on("deleteScrPlw", (event, plw_scr_id) => {
  //   async.series({
  //     delScrPlw: cb => {
  //       knex("tblScrPlw")
  //         .where({ plw_scr_id: plw_scr_id })
  //         .update({ is_deleted: 1 })
  //         .then(result => cb(null, result))
  //         .catch(e => cb(e));
  //     }
  //   }, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       errMsg(event, "", "Unable to delte record");
  //       event.sender.send("deleteScrPlw", { err });
  //     } else {
  //       sucMsg(event, "", `PLW Screening with id: ${plw_scr_id} is sucessfully delted`);
  //       event.sender.send("deleteScrPlw", { result });
  //     }
  //   });
  // });
  // ipcMain.on('allScrChildren', (event, filter) => {
  //   console.log(filter);
  //   var _limit = (filter.pageSize) ? filter.pageSize : 10;
  //   var _offset = (filter.pageIndex == 1) ? 0 : (filter.pageIndex - 1) * _limit;
  //   console.log({ _limit, _offset })
  //   // console.log(`%${filter.site_village}%`);
  //   async.series({
  //     data: cb => {
  //       knex("v_scrChildFull")
  //         .where('province', 'like', `%${filter.province}%`)
  //         .where('district_name', 'like', `%${filter.district_name}%`)
  //         .where('tehsil_name', 'like', `%${filter.tehsil_name}%`)
  //         .where('uc_name', 'like', `%${filter.uc_name}%`)
  //         .where('report_month', 'like', `%${filter.report_month}%`)
  //         .where('sup_name', 'like', `%${filter.sup_name}%`)
  //         .where('staff_name', 'like', `%${filter.staff_name}%`)
  //         // .where('report_month', 'like', `%${filter.report_month}%`)
          
  //         .where({ is_deleted: 0 })
  //         .limit(_limit)
  //         .offset(_offset)
  //         .then(result => cb(null, result))
  //         .catch(e => cb(e));
  //     },
  //     itemsCount: cb => {
  //       knex("v_scrChildFull")
  //         .where("province", "like", `%${filter.province}%`)
  //         .where("district_name", "like", `%${filter.district_name}%`)
  //         .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
  //         .where("uc_name", "like", `%${filter.uc_name}%`)
  //         .where("report_month", "like", `%${filter.report_month}%`)
  //         .where("sup_name", "like", `%${filter.sup_name}%`)
  //         .where("staff_name", "like", `%${filter.staff_name}%`)
  //         .where({ is_deleted: 0 })
  //         .count("ch_scr_id as total")
  //         .then(result => cb(null, result))
  //         .catch(e => cb(e));

  //     }
  //   }, (e, result) => {
  //     if (e) {
  //       event.sender.send("allScrChildren", { err: e });
  //       console.log(e)
  //     } else {
  //       event.sender.send("allScrChildren", { result });
  //       console.log(result);

  //     }
  //   })
  // })
  // ipcMain.on("deleteScrChildren", (event, ch_scr_id) => {
  //   async.series({
  //     delScrCh: cb => {
  //       knex("tblScrChildren")
  //         .where({ ch_scr_id: ch_scr_id })
  //         .update({ is_deleted: 1 })
  //         .then(result => cb(null, result))
  //         .catch(e => cb(e));
  //     }
  //   }, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       errMsg(event, "", "Unable to delte record");
  //       event.sender.send("deleteScrChildren", { err });
  //     } else {
  //       sucMsg(event, "", `Screening with id: ${ch_scr_id} is sucessfully delted`);
  //       event.sender.send("deleteScrChildren", { result });
  //     }
  //   });
  // });
  
  // ipcMain.on('allOtpTest', (event, filter) => {
  //   console.log(filter);
  //   var _limit = (filter.pageSize) ? filter.pageSize : 10;
  //   var _offset = (filter.pageIndex == 1) ? 0 : (filter.pageIndex - 1) * _limit; 
  //   console.log({_limit,_offset})
  //   // console.log(`%${filter.site_village}%`);
  //   async.series({
  //     data: cb => {
  //       knex("v_otpAddmision1")
  //         .where("p_name", "like", `%${filter.p_name}%`)
  //         .where("site_village", "like", `%${filter.site_village}%`)
  //         .where("reg_id", "like", `%${filter.reg_id}%`)
  //         .where("province", "like", `%${filter.province}%`)
  //         .where("district_name", "like", `%${filter.district_name}%`)
  //         .where("uc_name", "like", `%${filter.uc_name}%`)
  //         .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
  //         .where("prog_type", "like", `%${filter.prog_type}%`)
  //         .where({ is_deleted: 0 })
  //         .limit(_limit)
  //         .offset(_offset)
  //         .then(result => cb(null, result))
  //         .catch(e => cb(e));
  //     },
  //     itemsCount: cb => {
  //       knex("v_otpAddmision1")
  //         .where("p_name", "like", `%${filter.p_name}%`)
  //         .where("site_village", "like", `%${filter.site_village}%`)
  //         .where("reg_id", "like", `%${filter.reg_id}%`)
  //         .where("province", "like", `%${filter.province}%`)
  //         .where("district_name", "like", `%${filter.district_name}%`)
  //         .where("uc_name", "like", `%${filter.uc_name}%`)
  //         .where("tehsil_name", "like", `%${filter.tehsil_name}%`)
  //         .where("prog_type", "like", `%${filter.prog_type}%`)
  //         .where({ is_deleted: 0 })
  //         .count("otp_id as total")
  //         .then(result => cb(null, result))
  //         .catch(e => cb(e));       
      
  //     }
  //   }, (e, result) => {
  //     if (e) {
  //       event.sender.send("allOtpTest", { err: e });
  //     } else {
  //       event.sender.send('allOtpTest', { result })
  //     }
  //   })
  // });

  // ipcMain.on('deleteOtpAdd', (event, otp_id) => {
  //   knex('tblOtpExit')
  //     .where({ otp_id })
  //     .then(result => {
  //       if (result.length > 0) {
  //         errMsg(event, "", `Patient with id: ${otp_id} couldn't be delted as patient is exited. To delete first delete it from exit `);
  //       } else {
  //         async.series({
  //           delFollowup: cb => {
  //             knex('tblOtpFollowup')
  //               .where({ otp_id: otp_id })
  //               .update({ is_deleted: 1 })
  //               .then(result => cb(null, result))
  //               .catch(e => cb(e));
  //           },
  //           delInterim: cb => {
  //             knex("tblInterimOtp")
  //               .where({ otp_id: otp_id })
  //               .update({ is_deleted: 1 })
  //               .then(result => cb(null, result))
  //               .catch(e => cb(e));
  //           },
  //           delAddmision: cb => {
  //             knex('tblOtpAdd')
  //               .where({ otp_id: otp_id })
  //               .update({ is_deleted: 1 })
  //               .then(result => cb(null, result))
  //               .catch(e => cb(e));
  //           }
  //         }, (err, result) => {
  //           if (err) {
  //             console.log(err);
  //             errMsg(event, '', 'Unable to delte record');
  //             event.sender.send("deleteOtpAdd", { err });
  //           } else {
  //             sucMsg(event, '', `Addmision with id: ${otp_id} is sucessfully delted`);
  //             event.sender.send("deleteOtpAdd", { result });
  //           }
  //         })
  //       }
  //     })

  // })

  //Adding Screening - Child
  ipcMain.on('scrChildAdd', (evt, data) => {
    console.log(data);
    knex('Screening')
      .insert(data)
      .then(result => {
        console.log({
          scrChildSucess: result
        })
        sucMsg(evt, 'scrChildAdd', `Screening - Children: ${result.length} records added successfully`)
      })
      .catch(e => {
        console.log({
          scrChildError: e
        })
        errMsg(evt, 'scrChildAdd', `Screening - Children: records not added please check again or contact system admin`)
      })
  });
  //Adding Screening - PLW
  ipcMain.on('scrPlwAdd', (evt, data) => {
    console.log(data);
    knex('Screening')
      .insert(data)
      .then(result => {
        console.log({
          scrPlwSucess: result
        })
        sucMsg(evt, 'scrPlwAdd', `Screening - Plw: ${result.length} records added successfully`)
      })
      .catch(e => {
        console.log({
          scrChildError: result
        })
        errMsg(evt, 'scrPlwAdd', `Screening - Plw: records not added please check again or contact system admin`)
      })
  })
  // Adding OTP Admission
  ipcMain.on('submitOtpAdd', function (event, addOtpData) {
    console.log({
      location: 'otp add, channel submitOtpAdd',
      formData: addOtpData
    })
    otpAddDataSave(event, addOtpData, config, imran.client);
  });

  // Followup interm data for followup add
  ipcMain.on('getInterim', (event, data) => {
    followupIntermData(event, data);
  })
  // follow up adding records;
  ipcMain.on('addFollowup', (e, item) => {
    followupAddData(e, item);
  });
  // sending all admission for exit
  ipcMain.on('getOtpAll', (e, site_id) => {
    otpAddDataForExit(e, site_id);
  });
  // to add exit record
  ipcMain.on('otpExitAdd', (e, data) => {
    console.log(data);
    otpExitAddDataSave(e, data, imran.client);
  })
  // sending all sessions 
  // ipcMain.on('getSessionsAll', (e, data) => {
  //   allSessionsData(e, data);
  // });
  // adding (inserting) one session 
  ipcMain.on('insertSessionsSingle', (e, item) => {
    sessionsDataSave(e, item, config, imran.client);
  })
  // editing (updating) one session
  // ipcMain.on('updateSessionsSingle', (e, item) => {
  //   sessionUpdateSave(e, item);
  // });

  // Screening Update: Children sending data 
  ipcMain.on('getScrChAll', function (e, qry) {
    allScreeningData(e, qry)
  })
  // Screening Update: Children edit (update) record
  ipcMain.on('updScrChSingle', function (e, data) {
    screeningChUpDataSave(e, data);
  })

  // Screening Update: PLW sending data 
  ipcMain.on('getScrPlwAll', function (e, qry) {
    allScreeningDataPlw(e, qry)
  })
  // Screening Update: PLW edit (update) record
  ipcMain.on('updScrPlwSingle', function (e, data) {
    screeningPlUpdDataSave(e, data);
  })

  // Admission Update: sending all data 
  ipcMain.on('allOtp', (e, site_id) => {
    allOtpAddUpdData(e, site_id);
  })
  // // Admission Update: Edit (update) one record
  // ipcMain.on('submitOtpAddUpd', (e, otpAddFormData) => {
  //   console.log(otpAddFormData);
  //   otpAddUpdDataSave(e, otpAddFormData);
  // });

  // Exit Update: sending all data
  ipcMain.on('get', (e, site_id) => {
    allExitData(e, site_id);
  })
  // //Exit Update: Edit (update) one record
  // ipcMain.on('otpExitUpdate', (e, data) => {
  //   exitUpdDataSave(e, data, imran.client);
  // })
  // Stock Entry:
  ipcMain.on('stockEntry', (e, data) => {
    stockSave(e, data);
  })

  // children Screening add Data 
  ipcMain.on('scrChildren', (e, data) => {
    console.log(e);
    childrenScrAddSave(e, data, imran.client, imran.usernameL, imran.project_nameL);
    // (e,data);
  })
  // PLW New Screening add Data 
  ipcMain.on('scrPlwNewAdd', (e, data) => {
    console.log(data);
    plwNewScrAddSave(e, data, imran.client, imran.usernameL, imran.project_nameL, );
    // (e,data);
  })
  // Screening Children summary: all records for Update
  ipcMain.on('allScrChildren', (e, data) => {
    // console.log('data from channel allScrChildren:',data)
    allScrChildrenUpdData(e, data);
  })

  ipcMain.on('allScrPlwNew', (e, data) => {
    console.log('data from html on chanel allScrPlwNew', data)
    allScrPlwNewUpdData(e, data)
  })

  // // children Screening updat Data 
  // ipcMain.on('scrChildrenUpd', (e, data) => {
  //   console.log(data);
  //   childrenScrUpdSave(e, data);
  //   // (e,data);
  // })

  // // PLW New Screening update data
  // ipcMain.on('scrPlwNewUpd', (e, data) => {
  //   plwNewScrUpdSave(e, data);
  // })

  ipcMain.on('scrChildReport', (e, qry) => {
    async.parallel({
      summary: (cb) => {
        db.scrChildReport(qry, (err, result) => {
          if (err) {
            cb(err)
            console.log(err);
          } else {
            cb(null, result)
          }
        })
      },
      single: (cb) => {
        db.allScrChildrenData(qry, (err, result) => {
          if (err) {
            console.log(err);
            cb(err)
          } else {

            cb(null, result)
          }
        })
      }
    }, (err, results) => {
      if (err) {
        errMsg(e, '', 'Report db query error, plz try again or contact admin')
        console.log(err);
      } else {
        console.log(results);

        e.sender.send('scrChildReport', ({
          result: results
        }))
      }
    })
  });

  ipcMain.on('scrPlwNewReport', (e, qry) => {
    async.parallel({
      summary: (cb) => {
        db.scrPlwNewReport(qry, (err, result) => {
          if (err) {
            cb(err)
            console.log(err);
          } else {
            cb(null, result)
          }
        })
      },
      single: (cb) => {
        db.allScrPlwNewData(qry, (err, result) => {
          if (err) {
            cb(err)
            console.log(err);
          } else {
            cb(null, result)
          }
        })
      }
    }, (err, results) => {
      if (err) {
        errMsg(e, '', 'Report db query error, plz try again or contact admin')
        console.log(err);
      } else {
        console.log(results);

        e.sender.send('scrPlwNewReport', ({
          result: results
        }))
      }
    })
  });

  ipcMain.on('addExitReport', (e, qry) => {
    if (isEmpty(qry)) {
      errMsg(e, '', 'Atleast one item need to be selected')
    } else {
      async.parallel({
        add: (cb) => {
          db.AdmissionsReport(qry, (err, result) => {
            if (err) {
              cb(err)
            } else {
              cb(null, result)
            }
          })
        },
        exit: (cb) => {
          db.ExitReport(qry, (err, result) => {
            if (err) {
              cb(err)
            } else {
              cb(null, result)
            }
          })
        },
        addTable: (cb) => {
          db.otpAddTable(qry, (err, result) => {
            if (err) {
              cb(err)
            } else {
              cb(null, result)
            }
          })
        },
        exitTable: (cb) => {
          db.otpExitTable(qry, (err, result) => {
            if (err) {
              cb(err)
            } else {
              cb(null, result)
            }
          })
        }
      }, (err, results) => {
        if (err) {
          console.log(err)
          errMsg(e, '', 'DB error please try again or contact admin')
        } else {
          console.log(results
          )
          e.sender.send('addExitReport', results)
        }
      })
    }
  })
  // Build main menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
}
//Creating main window
app.on('ready', creatWindow);

// function sessions() {
//   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
//   var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
//     var username = config.usernameL;
//     var org_name = config.org_nameL;
//     var project_name = config.project_nameL
//   var client_id = imran.client;
//   session = new BrowserWindow({
//     width, height,
//     title: 'Sessions'
//   });
//   session.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/sessions.html'),
//     protocol: 'file:',
//     slashes: true
//   }));
//   ipcMain.on('ses_getProvince', function (event) {
//     geo.provincev2(event);
//   });
//   ipcMain.on('ses_getDistrict', function (event, prov) {
//     console.log(prov)
//     geo.district(prov, session);
//   });
//   ipcMain.on('ses_getTehsil', function (event, dist) {
//     geo.tehsil(dist, session);
//     console.log(dist)
//   });
//   ipcMain.on('ses_getUC', function (event, tehs) {
//     console.log(tehs)
//     geo.uc(tehs,session);

//   });
//   ipcMain.on('ses_getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     geo.healthHouse(ucs, session);

//   });
//   ipcMain.on('getSessionsAll', (e, data) => {
//     console.log(data);
//     knex('tblSessions')
//       .where('site_id', data)
//       .then(result => {
//         session.webContents.send('getSessionsAll', ({
//           result: result
//         }))
//       })
//       .catch(e => {
//         session.webContents.send('getSessionsAll', ({
//           err: e
//         }))
//       })
//   });
//   ipcMain.on('insertSessionsSingle', (e, item) => {

//     item.upload_status = 0;
//     item.client_id = client_id;
//     item.created_at = localDate();
//     item.username = username;
//     item.project_name = project_name;
//     item.org_name = org_name;
//     console.log({
//       msg: 'insert Sessions',
//       data: item
//     })
//     knex('tblSessions')
//       .insert(item)
//       .then(result => {
//         console.log({
//           msg: 'insert record',
//           ret: result
//         })
//         return knex('tblSessions')
//           .where('session_id', result[0])

//       })
//       .then(result => {
//         console.log({
//           msg: 'insert return item',
//           result: result
//         })
//         session.webContents.send('insertSessionsSingle', ({
//           result: result
//         }))
//       })
//       .catch(e => {
//         session.webContents.send('insertSessionsSingle', ({
//           err: e
//         }))
//       })
//       item = null;
//   });
//   ipcMain.on('updateSessionsSingle', (e, item) => {
//     item.upload_status = 2;
//     item.updated_at = localDate();
//     knex('tblSessions')
//       .update(item)
//       .where('session_id', item.session_id)
//       .then(result => {
//         return knex('tblSessions')
//           .where('session_id', item.session_id)
//       })
//       .then(result => {
//         session.webContents.send('updateSessionsSingle', ({
//           result: result
//         }))
//       })
//       .catch(e => {
//         session.webContents.send('updateSessionsSingle', ({
//           err: e
//         }))
//       })

//       item = null;
//   });
//   session.on('close', function () {
//     var myChan = ['updateSessionsSingle','insertSessionsSingle','getSessionsAll',
//     'ses_getHealthHouse',
//     'ses_getUC',
//     'ses_getTehsil',
//     'ses_getDistrict','ses_getProvince']
//     for (const i in myChan){
//       ipcMain.removeAllListeners(myChan[i])
//       console.log('channel removed ', myChan[i])
//     }
//     session = null;
//   })

// }

// function otpAddUpdate() {
//   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

//   var client = imran.client;
//   otpUpdate = new BrowserWindow({
//     width,
//     height,
//     title: 'Follow-Ups'
//   })
//   otpUpdate.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/otpAddUpd.html'),
//     protocol: 'file:',
//     slashes: true
//   }))

//   ipcMain.on('otpUpd_getProvince', function (event) {
//     geo.province(otpUpdate);
//   });
//   ipcMain.on('otpUpd_getDistrict', function (event, prov) {
//     console.log(prov)
//     geo.district(prov, otpUpdate);
//   });
//   ipcMain.on('otpUpd_getTehsil', function (event, dist) {
//     geo.tehsil(dist, otpUpdate);
//     console.log(dist)
//   });
//   ipcMain.on('otpUpd_getUC', function (event, tehs) {
//     console.log(tehs)
//     geo.uc(tehs,otpUpdate);

//   });
//   ipcMain.on('otpUpd_getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     geo.healthHouse(ucs, otpUpdate);

//   });
//   ipcMain.on('allOtp', (e, site_id) => {
//     knex('tblOtpAdd')
//       .where({
//         site_id: site_id
//       })
//       .then(result => {
//         otpUpdate.webContents.send('allOtp', ({
//           result: result
//         }))
//       })
//       .catch(e => {
//         otpUpdate.webContents.send('allOtp', ({
//           err: e
//         }))
//       })
//       item = '';
//   })
//   ipcMain.on('updateOtp', (e, item) => {
//     console.log(item);
//     item.upload_status = 2;
//     const otp_id_us = item.otp_id;
//     knex('tblOtpAdd')
//       .update(item)
//       .where('otp_id', item.otp_id)
//       .then(result => {
//         console.log(result)
//         console.log('from return result ',item)
//         return knex('tblOtpAdd')
//           .where('otp_id',otp_id_us)
//       })
//       .then(result => {
//         otpUpdate.webContents.send('updateOtp', ({
//           result: result
//         }))
//       })
//       .catch(e => {
//         console.log(e)
//         otpUpdate.webContents.send('updateOtp', ({
//           err: e
//         }))
//       })
//       item = null;
//   })
//   otpUpdate.on('close', function () {
//     var myChan = ['updateOtp','allOtp','otpUpd_getHealthHouse',
//     'otpUpd_getUC',
//     'otpUpd_getTehsil',
//     'otpUpd_getDistrict',
//     'otpExit_getDistrict','otpUpd_getProvince']
//     for (const i in myChan){
//       ipcMain.removeAllListeners(myChan[i])
//       console.log('channel removed ', myChan[i])
//     }
//     otpUpdate = null;
//   })

// }

// function otpExit() {
//   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

//   var client_id = imran.client,
//     exitOtp = new BrowserWindow({
//       height,
//       width,
//       title: 'OTP Exit'
//     })
//   exitOtp.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/otpExit.html'),
//     protocol: 'file:',
//     slashes: true
//   }))
//   ipcMain.on('otpExit_getProvince', function (event) {
//     geo.province(exitOtp);
//   });
//   ipcMain.on('otpExit_getDistrict', function (event, prov) {
//     console.log(prov)
//     geo.district(prov, exitOtp);
//   });
//   ipcMain.on('otpExit_getTehsil', function (event, dist) {
//     geo.tehsil(dist, exitOtp);
//     console.log(dist)
//   });
//   ipcMain.on('otpExit_getUC', function (event, tehs) {
//     console.log(tehs)
//     geo.uc(tehs,exitOtp);

//   });
//   ipcMain.on('otpExit_getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     geo.healthHouse(ucs, exitOtp);

//   });

//   ipcMain.on('getOtpAll', (e, site_id) => {

//     knex.from('tblOtpAdd')
//       .innerJoin('tblInterimOtp', 'tblInterimOtp.otp_id', 'tblOtpAdd.otp_id')
//       .where({
//         site_id: site_id,
//         status: 'open'
//       })
//       .then(result => {
//         exitOtp.webContents.send('getOtpAll', ({
//           result: result
//         }))
//       })
//       .catch(e => {
//         exitOtp.webContents.send('getOtpAll', ({
//           err: e
//         }))
//       })
//   });
//   ipcMain.on('otpExitAdd', (e, data) => {
//     data.client_id = imran.client;
//     data.upload_status = 0;
//     const otpExitAddData= data;
//     knex('tblOtpExit')
//       .insert(data)
//       .then(result => {
//         console.log(result);
//         exitOtp.webContents.send('resultSentOtpExitAdd', ({
//           msg: 'Record saved successfully'
//         }))
//         return knex('tblInterimOtp')
//           .where('otp_id', otpExitAddData.otp_id)
//           .update({
//             status: otpExitAddData.exit_reason
//           })
//       })
//       .then(result => {
//         console.log({
//           msg: 'interm table updated',
//           data: result
//         })
//       })
//       .catch(e => {
//         console.log(e);
//         exitOtp.webContents.send('resultSentOtpExitAdd', ({
//           err: 'Record not saved, error in db'
//         }))
//       })
//       data = null;
//   })
//   exitOtp.on('close', function () {
//     var myChan = ['resultSentOtpExitAdd','otpExitAdd','getOtpAll',
//     'otpExit_getHealthHouse',
//     'otpExit_getTehsil',
//     'otpExit_getUC',
//     'otpExit_getDistrict','otpExit_getProvince']
//     for (const i in myChan){
//       ipcMain.removeAllListeners(myChan[i])
//       console.log('channel removed ', myChan[i])
//     }
//     exitOtp = null;
//   })

// }

// function otpExitEdit() {
//   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

//   var client_id = imran.client,
//     exitOtpEdit = new BrowserWindow({
//       height,
//       width,
//       title: 'OTP Exit'
//     })
//   exitOtpEdit.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/otpExitEdit.html'),
//     protocol: 'file:',
//     slashes: true
//   }))
//   ipcMain.on('otpExitUpd_getProvince', function (event) {
//     geo.province(exitOtpEdit);
//   });
//   ipcMain.on('otpExitUpd_getDistrict', function (event, prov) {
//     console.log(prov)
//     geo.district(prov, exitOtpEdit);
//   });
//   ipcMain.on('otpExitUpd_getTehsil', function (event, dist) {
//     geo.tehsil(dist, exitOtpEdit);
//     console.log(dist)
//   });
//   ipcMain.on('otpExitUpd_getUC', function (event, tehs) {
//     console.log(tehs)
//     geo.uc(tehs,exitOtpEdit);

//   });
//   ipcMain.on('otpExitUpd_getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     geo.healthHouse(ucs, exitOtpEdit);

//   });

//   ipcMain.on('get', (e, site_id) => {

//     knex.from('tblOtpExit')
//       .innerJoin('tblOtpAdd', 'tblOtpAdd.otp_id', 'tblOtpExit.otp_id')
//       .where({
//         site_id: site_id,
//       })
//       .then(result => {
//         console.log(result)
//         exitOtpEdit.webContents.send('have', ({
//           result: result
//         }))
//       })
//       .catch(e => {
//         exitOtpEdit.webContents.send('have', ({
//           err: e
//         }))
//       })
//       site_id = null;
//   });
//   ipcMain.on('otpExitUpdate', (e, data) => {
//     data.client_id = imran.client;
//     data.upload_status = 2;
//     const otpExitAddData = data;
//     console.log(otpExitAddData);

//     knex('tblOtpExit')
//       .where('otp_id', otpExitAddData.otp_id)
//       .update(otpExitAddData)
//       .then(result => {
//         console.log(result);

//         exitOtpEdit.webContents.send('resultSentOtpExitUpd', ({
//           'msg': 'Record updated successfully'
//         }))
//         return knex('tblInterimOtp')
//           .where('otp_id', otpExitAddData.otp_id)
//           .update({
//             status: otpExitAddData.exit_reason
//           })
//       })
//       .then(result => {
//         console.log({
//           msg: 'interm table updated',
//           data: result
//         })
//       })
//       .catch(e => {
//         console.log(e);
//         exitOtpEdit.webContents.send('resultSentOtpExitUpd', ({
//           'err': 'Record not updated, error in db'
//         }))
//       })
//     data = null;  
//   })
//   exitOtpEdit.on('close', function () {
//     var myChan = ['resultSentOtpExitUpd','otpExitUpdate','get',
//     'have',
//     'otpExitUpd_getHealthHouse',
//     'otpExitUpd_getUC',
//     'otpExitUpd_getTehsil','otpExitUpd_getDistrict','otpExitUpd_getProvince']
//     for (const i in myChan){
//       ipcMain.removeAllListeners(myChan[i])
//       console.log('channel removed ', myChan[i])
//     }
//     exitOtpEdit = null;
//   })

// }

// // adding followup records
// function addFollowupOtp() {
//   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

//   var client = imran.client;
//   otpFollowup = new BrowserWindow({
//     width,height,
//     title: 'Follow-Ups'
//   })
//   otpFollowup.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/otpFollowUp.html'),
//     protocol: 'file:',
//     slashes: true
//   }))

//   ipcMain.on('followUp_getProvince', function (event) {
//     geo.province(otpFollowup);
//   });
//   ipcMain.on('followUp_getDistrict', function (event, prov) {
//     console.log(prov)
//     geo.district(prov, otpFollowup);
//   });
//   ipcMain.on('followUp_getTehsil', function (event, dist) {
//     geo.tehsil(dist, otpFollowup);
//     console.log(dist)
//   });
//   ipcMain.on('followUp_getUC', function (event, tehs) {
//     console.log(tehs)
//     geo.uc(tehs,otpFollowup);

//   });
//   ipcMain.on('followUp_getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     geo.healthHouse(ucs, otpFollowup);

//   });

//   // sending data from interm table
//   ipcMain.on('getInterim', (e, data) => {
//     console.log('data from html', data);
//     knex.from('tblOtpAdd')
//       .innerJoin('tblInterimOtp', 'tblInterimOtp.otp_id', 'tblOtpAdd.otp_id')
//       .where({
//         site_id: data,
//         status: 'open'
//       })
//       .then(result => {
//         // result.location = 'Follow up interim call'
//         console.log(result)
//         otpFollowup.webContents.send('getInterim', ({
//           result: result
//         }))
//         result = null;
//       })
//       .catch(e => {
//         // e.location = 'Follow up interim call'
//         console.log(e);
//         otpFollowup.webContents.send('getInterim', ({
//           err: e
//         }))
//       })
//   })
//   // Add follow up
//   ipcMain.on('addFollowup', (e, item) => {
//     var interimUpd = {
//       muac: item.muac,
//       weight: item.weight,
//       ration1: item.ration1,
//       quantity1: item.quantity1,
//       ration2: item.ration2,
//       quantity2: item.quantity2,
//       ration3: item.ration3,
//       quantity3: item.quantity3,
//       curr_date: item.followup_date,
//       next_followup: function () {
//         var myDate = new Date(item.followup_date);
//         myDate.setDate(myDate.getDate() + 15)
//         return myDate.toLocaleDateString();
//       }(),
//       updated_at: localDate()
//     }
//     var followupData = {
//       upload_status: 0,
//       otp_id: item.otp_id,
//       client_id: imran.client,
//       muac: item.muac,
//       weight: item.weight,
//       ration1: item.ration1,
//       quantity1: item.quantity1,
//       ration2: item.ration2,
//       quantity2: item.quantity2,
//       ration3: item.ration3,
//       quantity3: item.quantity3,
//       curr_date: item.followup_date,
//       next_followup: function () {
//         var myDate = new Date(item.followup_date);
//         myDate.setDate(myDate.getDate() + 15)
//         return myDate.toLocaleDateString();
//       }(),
//       created_at: localDate()
//     }
//     console.log('_______________update data______')
//     console.log(interimUpd)
//     console.log('_______________followup data______')
//     console.log(followupData)
//     knex.from('tblInterimOtp')
//       .where({
//         otp_id: item.otp_id
//       })
//       .update(interimUpd)
//       .then(result => {
//         console.log(result)
//       })
//       .catch(e => {
//         console.log(e)
//       })
//     knex.from('tblOtpAdd')
//       .innerJoin('tblInterimOtp', 'tblInterimOtp.otp_id', 'tblOtpAdd.otp_id')
//       .where({
//         'tblInterimOtp.otp_id': item.otp_id,
//         status: 'open'
//       })
//       .then(result => {

//         // result.location = 'Follow up interim call'
//         console.log(result)
//         otpFollowup.webContents.send('addFollowup', ({
//           result: result
//         }))
//       })
//       .catch(e => {
//         // e.location = 'Follow up interim call'
//         console.log(e);
//         otpFollowup.webContents.send('addFollowup', ({
//           err: e
//         }))
//       })
//     knex('tblOtpFollowup')
//       .insert(followupData)
//       .then(result => {
//         console.log({
//           msg: 'Follow up added',
//           result: result
//         })
//       })
//       .catch(e => {
//         console.log({
//           msg: 'Error during followup record add',
//           err: e
//         })
//       })

//       item = null;
//   })
//   otpFollowup.on('close', function () {
//     var myChan = ['addFollowup','getInterim','followUp_getHealthHouse',
//     'followUp_getUC',
//     'followUp_getTehsil',
//     'followUp_getDistrict',
//     'followUp_getProvince']
//     for (const i in myChan){
//       ipcMain.removeAllListeners(myChan[i])
//       console.log('channel removed ', myChan[i])
//     }
//     otpFollowup = null;
//   })

// }

// function addVill() {
//   var client = imran.client;
//   villAdd = new BrowserWindow({
//     width: 800,
//     height: 800,
//     title: 'Add Village'
//   })
//   villAdd.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/addVill.html'),
//     protocol: 'file:',
//     slashes: true
//   }))
//   ipcMain.on('getProvince', function (event) {
//     knex('tblGeoProvince')
//       .then(result => {
//         villAdd.webContents.send('province', ({
//           province: result
//         }));
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   });
//   ipcMain.on('getDistrict', function (event, prov) {
//     console.log(prov)
//     knex('tblGeoDistrict')
//       .where({
//         province_id: prov
//       })
//       .then(result => {
//         villAdd.webContents.send('district', ({
//           district: result
//         }));
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   });
//   ipcMain.on('getTehsil', function (event, dist) {
//     console.log(dist)
//     knex('tblGeoTehsil')
//       .where({
//         district_id: dist
//       })
//       .then(result => {
//         villAdd.webContents.send('tehsil', ({
//           tehsil: result
//         }));
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   });
//   ipcMain.on('getUC', function (event, tehs) {
//     console.log(tehs)
//     knex('tblGeoUC')
//       .where({
//         tehsil_id: tehs
//       })
//       .then(result => {
//         villAdd.webContents.send('uc', ({
//           uc: result
//         }));
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   });
//   ipcMain.on('getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     knex('tblGeoNutSite')
//       .where({
//         uc_id: ucs
//       })
//       .then(result => {
//         villAdd.webContents.send('hh', ({
//           hh: result
//         }));
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   });

//   ipcMain.on('villList', (e, site) => {
//     knex('tblVillage')
//       .then(result => {
//         villAdd.webContents.send('villList', ({
//           result: result
//         }))
//       })
//       .catch(e => {
//         villAdd.webContents.send('villList', ({
//           err: e
//         }))
//       })
//   })

//   ipcMain.on('insertVillage', (e, data) => {
//     console.log(data);
//     var new_vill = {
//       site_id: data.site_id,
//       village: data.item.village
//     }
//     console.log(new_vill);
//     knex('tblVillage')
//       .insert(new_vill)
//       .then(result => {
//         console.log(result[0]);
//         return knex('tblVillage').where('vill_id', result[0])
//       })
//       .then(result => {
//         console.log({
//           r: result,
//           loc: 'tblVillage'
//         })
//         villAdd.webContents.send('insertVillage', ({
//           result: result[0]
//         }))
//       })
//       .catch(e => {
//         console.log({
//           r: e,
//           loc: 'tblVillage'
//         })
//         villAdd.webContents.send('insertVillage', ({
//           err: e
//         }))
//       })

//   })

//   villAdd.on('close', function () {
//     villAdd = null;
//   })


// }


// function localDate() {
//   var x = new Date();
//   x.setDate(x.getDate());
//   return x.toLocaleDateString();
// }
// // console.log(localDate());
// // Creating Screening : Add Child Window
// function scrAddChild() {
//   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

//   var client = imran.client;
//   var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
//     var username = config.usernameL;
//     var org_name = config.org_nameL;
//     var project_name = config.project_nameL
//     console.log(config);

//   addScrChild = new BrowserWindow({
//     width,height,parent:mainWindow,modal:true,show:false,minimizable:false,movable:false,
//     title: 'Screening: Add Child'
//   });
//   // console.log(BrowserWindow.getAllWindows())
//   console.log('main Window:' , mainWindow);
//   addScrChild.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/scrChild.html'),
//     protocol: 'file:',
//     slashes: true
//   }));
//   addScrChild.on('ready-to-show',()=>{
//     addScrChild.maximize();
//     addScrChild.show();
//   })
//   ipcMain.on('scrCh_getProvince', function (event) {
//     geo.province(addScrChild);
//   });
//   ipcMain.on('scrCh_getDistrict', function (event, prov) {
//     console.log(prov)
//     geo.district(prov, addScrChild);
//   });
//   ipcMain.on('scrCh_getTehsil', function (event, dist) {
//     geo.tehsil(dist, addScrChild);
//     console.log(dist)
//   });
//   ipcMain.on('scrCh_getUC', function (event, tehs) {
//     console.log(tehs)
//     geo.uc(tehs,addScrChild);

//   });
//   ipcMain.on('scrCh_getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     geo.healthHouse(ucs, addScrChild);

//   });
//   ipcMain.on('scrCh_getHealthHouseType', function (event, h_id) {
//     geo.healthHouseType(h_id, addScrChild);
//   });

//   ipcMain.on('scrAddChild', function (event, scrForm) {

//     console.log(scrForm)
//     var village = scrForm.txtVillage;
//     var site_id = scrForm.ddHealthHouse;
//     var screening_type = scrForm.scrChildScrType;
//     var screening_date = scrForm.txtScrChildDate;
//     var data_entry_date = localDate();
//     var staff_name = scrForm.txtStaffName;
//     var data = [];
//     var single = {};
//     if (Array.isArray(scrForm.txtScrChildName)) {
//       scrForm.txtScrChildName.forEach((el, i) => {
//         data.push({
//           client_id: client,
//           screening_type: screening_type,
//           screening_date: screening_date,
//           data_entry_date: data_entry_date,
//           site_id: site_id,
//           site_village: village,
//           staff_name: staff_name,
//           name: el,
//           f_or_h_name: scrForm.txtScrChildFather[i],
//           address: scrForm.txtScrChildAddr[i],
//           age: scrForm.numScrChildAge[i],
//           is_plw: 0,
//           gender: scrForm.ddGender[i],
//           muac: scrForm.numMUAC[i],
//           oedema: scrForm.ddYesNoOedema[i],
//           no_mm_sch: scrForm.numMMSche[i],
//           deworming: scrForm.ddYesNoDeworming[i],
//           status: scrForm.ddScrChildStatus[i],
//           upload_status: 0,
//           username: username,
//           org_name: org_name,
//           project_name: project_name
//         });
//       });
//     } else {
//       single.client_id = client;
//       single.screening_type = screening_type;
//       single.screening_date = screening_date;
//       single.data_entry_date = data_entry_date
//       single.site_id = site_id;
//       single.site_village = village;
//       single.staff_name = staff_name;
//       single.name = scrForm.txtScrChildName;
//       single.f_or_h_name = scrForm.txtScrChildFather;
//       single.address = scrForm.txtScrChildAddr;
//       single.age = scrForm.numScrChildAge;
//       single.is_plw = 0,
//         single.gender = scrForm.ddGender,
//         single.muac = scrForm.numMUAC,
//         single.oedema = scrForm.ddYesNoOedema,
//         single.no_mm_sch = scrForm.numMMSche,
//         single.deworming = scrForm.ddYesNoDeworming;
//       single.status = scrForm.ddScrChildStatus;
//       single.upload_status = 0;
//           single.username= username;
//           single.org_name= org_name;
//           single.project_name= project_name;
//     }
//     console.log(data)
//     if (data.length < 1) {
//       console.log(single)
//       knex('Screening')
//         .insert(single)
//         .then(result => {
//           addScrChild.webContents.send("scrChAddResp", {
//             'msg': 'record added'
//           });
//         })
//         .catch(err => {
//           addScrChild.webContents.send("scrChAddResp", {
//             'err': 'eror occured, plz try again'
//           });
//         })
//     } else {
//       console.log(data)

//       knex('Screening')
//         .insert(data)
//         .then(result => {
//           addScrChild.webContents.send("scrChAddResp", {
//             'msg': data.length + ' records added'
//           });
//         })
//         .catch(err => {
//           addScrChild.webContents.send("scrChAddResp", {
//             'err': 'eror occured, plz try again'
//           });
//         })
//     }

//     console.log(scrForm);
//     scrForm = null;
//   });
//   addScrChild.on('close', function () {
//     var myChan = ['scrChAddResp','scrAddChild','scrCh_getProvince',
//     'scrCh_getDistrict',
//     'scrCh_getTehsil',
//     'scrCh_getUC',
//     'scrCh_getHealthHouse',
//     'scrCh_getHealthHouseType']
//     for (const i in myChan){
//       ipcMain.removeAllListeners(myChan[i])
//       console.log('channel removed ', myChan[i])
//     }

//     addScrChild = null;
//   })
// }

// // Creating Screening : Add PLW Window
// function scrAddPlw() {
//   var client = imran.client;
//   var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
//     var username = config.usernameL;
//     var org_name = config.org_nameL;
//     var project_name = config.project_nameL
//   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

//   addScrPlw = new BrowserWindow({
//     width,
//     height,
//     title: 'Screening: Add PLW'
//   });
//   addScrPlw.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/scrPlw.html'),
//     protocol: 'file:',
//     slashes: true
//   }));
//   ipcMain.on('scrPlw_getProvince', function (event) {
//     geo.province(addScrPlw);
//   });
//   ipcMain.on('scrPlw_getDistrict', function (event, prov) {
//     console.log(prov)
//     geo.district(prov, addScrPlw);
//   });
//   ipcMain.on('scrPlw_getTehsil', function (event, dist) {
//     geo.tehsil(dist, addScrPlw);
//     console.log(dist)
//   });
//   ipcMain.on('scrPlw_getUC', function (event, tehs) {
//     console.log(tehs)
//     geo.uc(tehs,addScrPlw);

//   });
//   ipcMain.on('scrPlw_getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     geo.healthHouse(ucs, addScrPlw);

//   });
//   ipcMain.on('scrPlw_getHealthHouseType', function (event, h_id) {
//     geo.healthHouseType(h_id, addScrPlw);
//   });
//   ipcMain.on('scrPlwAdd', function (evenet, scrForm) {
//     var village = scrForm.txtVillage;
//     var site_id = scrForm.ddHealthHouse;
//     var screening_type = scrForm.scrPlwScrType;
//     var screening_date = scrForm.txtScrPlwDate;
//     var data_entry_date = localDate();
//     var staff_name = scrForm.txtStaffName;
//     var data = [];
//     var single = {};
//     if (Array.isArray(scrForm.txtScrPlwName)) {
//       scrForm.txtScrPlwName.forEach((el, i) => {
//         data.push({
//           client_id: client,
//           screening_type: screening_type,
//           screening_date: screening_date,
//           data_entry_date: data_entry_date,
//           site_id: site_id,
//           site_village: village,
//           staff_name: staff_name,
//           name: el,
//           f_or_h_name: scrForm.txtScrPlwHusband[i],
//           address: scrForm.txtScrPlwAddr[i],
//           age: scrForm.numScrPlwAge[i],
//           is_plw: 1,
//           gender: 2,
//           plw_type: scrForm.ddPlwStatus[i],
//           muac: scrForm.numMUAC[i],
//           no_mm_tabs: scrForm.numMMTablets[i],
//           status: scrForm.ddScrPlwStatus[i],
//           upload_status: 0,
//           username: username,
//           org_name: org_name,
//           project_name: project_name
//         });
//       });
//     } else {
//       single.client_id = client;
//       single.screening_type = screening_type;
//       single.screening_date = screening_date;
//       single.data_entry_date = data_entry_date;
//       single.site_id = site_id;
//       single.site_village = village;
//       single.staff_name = staff_name;
//       single.name = scrForm.txtScrPlwName;
//       single.f_or_h_name = scrForm.txtScrPlwHusband;
//       single.address = scrForm.txtScrPlwAddr;
//       single.age = scrForm.numScrPlwAge;
//       single.is_plw = 1,
//         single.gender = 2,
//         single.plw_type = scrForm.ddPlwStatus;
//       single.muac = scrForm.numMUAC,
//         single.no_mm_tabs = scrForm.numMMTablets,
//         single.status = scrForm.ddScrPlwStatus;
//       single.upload_status = 0;
//           single.username= username;
//           single.org_name= org_name;
//           single.project_name= project_name;
//     }
//     if (data.length < 1) {
//       console.log('single plw add')
//       console.log(single);
//       knex('Screening')
//         .insert(single)
//         .then(result => {
//           console.log('plw single', result);
//           addScrPlw.webContents.send("scrPlwResp", {
//             'msg': 'record added'
//           });
//         })
//         .catch(err => {
//           console.log(err);
//           addScrPlw.webContents.send("scrPlwResp", {
//             'err': 'eror occured, plz try again'
//           });
//         })
//     } else {
//       knex('Screening')
//         .insert(data)
//         .then(result => {
//           addScrPlw.webContents.send("scrPlwResp", {
//             'msg': data.length +' records added'
//           });
//         })
//         .catch(err => {
//           addScrPlw.webContents.send("scrPlwResp", {
//             'err': 'eror occured, plz try again'
//           });
//         })
//     }

//     console.log(scrForm)
//     scrForm = null;
//   });



//   addScrPlw.on('close', function () {
//     var myChan = ['scrPlw_getProvince','scrPlw_getDistrict','scrPlw_getTehsil',
//     'scrPlw_getUC',
//     'scrPlw_getHealthHouse',
//     'scrPlw_getHealthHouseType',
//     'scrPlwAdd',
//     'scrPlwResp']
//     for (const i in myChan){
//       ipcMain.removeAllListeners(myChan[i])
//       console.log('channel removed ', myChan[i])
//     }

//     addScrPlw = null;
//   })
// }
// // Creating OTP : Add OTP Window
// function otpAdd() {
//   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
//   var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
//     var username = config.usernameL;
//     var org_name = config.org_nameL;
//     var project_name = config.project_nameL
//   var client = imran.client;
//   addOtp = new BrowserWindow({
//     width,height,
//     title: 'OTP: Addmision'
//   });
//   addOtp.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/otpAdd.html'),
//     protocol: 'file:',
//     slashes: true
//   }));
//   ipcMain.on('addOtp_getProvince', function (event) {
//     geo.province(addOtp);
//   });
//   ipcMain.on('addOtp_getDistrict', function (event, prov) {
//     console.log(prov)
//     geo.district(prov, addOtp);
//   });
//   ipcMain.on('addOtp_getTehsil', function (event, dist) {
//     geo.tehsil(dist, addOtp);
//     console.log(dist)
//   });
//   ipcMain.on('addOtp_getUC', function (event, tehs) {
//     console.log(tehs)
//     geo.uc(tehs,addOtp);

//   });
//   ipcMain.on('addOtp_getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     geo.healthHouse(ucs, addOtp);

//   });

//   ipcMain.on('addOtp_getHealthHouseType', function (event, h_id) {
//     geo.healthHouseType(h_id, addOtp);
//   });


//   ipcMain.on('submitOtpAdd', function (event, addOtpData) {
//     //console.log(addFormOtp);
//     delete addOtpData.province;
//     delete addOtpData.Tehsil;
//     delete addOtpData.district;
//     delete addOtpData.province;
//     delete addOtpData.ddHealthHouseOTP;
//     delete addOtpData.uc;
//     addOtpData.client_id = imran.client;
//     addOtpData.username = username;
//     addOtpData.org_name = org_name;
//     addOtpData.project_name = project_name;
//     const addFormOtp = addOtpData;
//     console.log(addFormOtp);
//     knex('tblOtpAdd')
//       .insert(addFormOtp)
//       .then(result => {
//         console.log(result + 'OTP addmision added')
//         addOtp.webContents.send("resultSentOtpAdd", {
//           'msg': 'records added'
//         });
//         var interimData = {
//           otp_id: result[0],
//           client_id: imran.client,
//           muac: addFormOtp.muac,
//           weight: addFormOtp.weight,
//           ration1: addFormOtp.ration1,
//           quantity1: addFormOtp.quantity1,
//           ration2: addFormOtp.ration2,
//           quantity2: addFormOtp.quantity2,
//           ration3: addFormOtp.ration3,
//           quantity3: addFormOtp.quantity3,
//           curr_date: localDate(),
//           created_at: localDate(),
//           status: 'open',
//           next_followup: function () {
//             var myDate = new Date();
//             myDate.setDate(myDate.getDate() + 15)
//             return myDate.toLocaleDateString();
//           }()
//         }
//         console.log(interimData)
//         return knex('tblInterimOtp')
//           .insert(interimData)
//       })
//       .then(result => {
//         console.log('interim ID: ', result);
//       })
//       .catch(e => {
//         console.log(e + 'OTP add error');
//         addOtp.webContents.send("resultSentOtpAdd", {
//           'err': 'records not added, plz try again'
//         });
//       })
//       // addFormOtp = null;
//   })
//   addOtp.on('close', function () {
//     var myChan = ['addOtp_getProvince','addOtp_getDistrict','addOtp_getTehsil',
//     'addOtp_getUC',
//     'addOtp_getHealthHouse',
//     'addOtp_getHealthHouseType',
//     'submitOtpAdd',
//     'resultSentOtpAdd']
//     for (const i in myChan){
//       ipcMain.removeAllListeners(myChan[i])
//       console.log('channel removed ', myChan[i])
//     }
//     addOtp = null;
//   })

// }

// function myUpdate() {
//   upd = new BrowserWindow({
//     width: 800,
//     height: 800,
//     title: 'Update'
//   })
//   upd.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/myUpdate.html'),
//     protocol: 'file:',
//     slashes: true
//   }));

//   ipcMain.on('getProvince', function (event) {
//     knex('tblGeoProvince')
//       .then(result => {
//         upd.webContents.send('province', ({
//           province: result
//         }));
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   });
//   ipcMain.on('getDistrict', function (event, prov) {
//     console.log(prov)
//     knex('tblGeoDistrict')
//       .where({
//         province_id: prov
//       })
//       .then(result => {
//         upd.webContents.send('district', ({
//           district: result
//         }));
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   });
//   ipcMain.on('getTehsil', function (event, dist) {
//     console.log(dist)
//     knex('tblGeoTehsil')
//       .where({
//         district_id: dist
//       })
//       .then(result => {
//         upd.webContents.send('tehsil', ({
//           tehsil: result
//         }));
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   });
//   ipcMain.on('getUC', function (event, tehs) {
//     console.log(tehs)
//     knex('tblGeoUC')
//       .where({
//         tehsil_id: tehs
//       })
//       .then(result => {
//         upd.webContents.send('uc', ({
//           uc: result
//         }));
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   });
//   ipcMain.on('get', function (e, qry) {
//     db.scrPlw(qry, (err, result) => {
//       upd.webContents.send('get', ({
//           err: err,
//           result: result,

//         })

//       )
//       console.log(result);
//     })
//   })
//   ipcMain.on('update', function (e, data) {
//     var plwUpd = {
//       screening_id: data.screening_id,
//       name: data.name,
//       f_or_h_name: data.f_or_h_name,
//       muac: data.muac,
//       plw_type: data.plw_type,
//       status: data.status
//     }
//     db.updScr(plwUpd, function (err, result) {
//       console.log(result);
//       upd.webContents.send('update', ({
//         result,
//         err: null
//       }))
//     })
//   })
//   upd.on('close', function () {
//     upd = null;
//   })
// }

// function scrPlUpd() {
//   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

//   scrPlUpdate = new BrowserWindow({
//     width,height,
//     title: 'Update'
//   })
//   scrPlUpdate.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/scrPlUpd.html'),
//     protocol: 'file:',
//     slashes: true
//   }));

//   ipcMain.on('scrPlwUpd_getProvince', function (event) {
//     geo.province(scrPlUpd);
//   });
//   ipcMain.on('scrPlwUpd_getDistrict', function (event, prov) {
//     console.log(prov)
//     geo.district(prov, scrPlUpd);
//   });
//   ipcMain.on('scrPlwUpd_getTehsil', function (event, dist) {
//     geo.tehsil(dist, scrPlUpd);
//     console.log(dist)
//   });
//   ipcMain.on('scrPlwUpd_getUC', function (event, tehs) {
//     console.log(tehs)
//     geo.uc(tehs,scrPlUpd);

//   });
//   ipcMain.on('scrPlwUpd_getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     geo.healthHouse(ucs, addOtp);

//   });
//   ipcMain.on('getScrPlwAll', function (e, qry) {
//     db.scrPlw(qry, (err, result) => {
//       scrPlUpdate.webContents.send('getScrPlwAll', ({
//           err: err,
//           result: result,

//         })

//       )
//       console.log(result);
//     })
//   })
//   ipcMain.on('updScrPlwSingle', function (e, data) {
//     var plwUpd = {
//       screening_id: data.screening_id,
//       name: data.name,
//       f_or_h_name: data.f_or_h_name,
//       muac: data.muac,
//       upload_status: 2,
//       address: data.address,
//       age: data.age,
//       plw_type: data.plw_type,
//       status: data.status
//     }
//     db.updScr(plwUpd, function (err, result) {
//       console.log(result);
//       scrPlUpdate.webContents.send('updScrPlwSingle', ({
//         result,
//         err: null
//       }))
//     })
//     data = null;
//   })
//   scrPlUpdate.on('close', function () {
//     var myChan = ['scrPlwUpd_getProvince',
//       'scrPlwUpd_getDistrict',
//       'scrPlwUpd_getTehsil',
//       'scrPlwUpd_getUC',
//       'scrPlwUpd_getHealthHouse',
//       'getScrPlwAll',
//       'updScrPlwSingle']
//     for (const i in myChan){
//       ipcMain.removeAllListeners(myChan[i])
//       console.log('channel removed ', myChan[i])
//     }
//     scrPlUpdate = null;
//   })
// }

// function scrChUpd() {
//   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

//   scrChUpdate = new BrowserWindow({
//     width,height,
//     title: 'Update'
//   })
//   scrChUpdate.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/scrChUpd.html'),
//     protocol: 'file:',
//     slashes: true
//   }));

//   ipcMain.on('scrChUpd_getProvince', function (event) {
//     geo.province(scrChUpdate);
//   });
//   ipcMain.on('scrChUpd_getDistrict', function (event, prov) {
//     console.log(prov)
//     geo.district(prov, scrChUpdate);
//   });
//   ipcMain.on('scrChUpd_getTehsil', function (event, dist) {
//     geo.tehsil(dist, scrChUpdate);
//     console.log(dist)
//   });
//   ipcMain.on('scrChUpd_getUC', function (event, tehs) {
//     console.log(tehs)
//     geo.uc(tehs,scrChUpdate);

//   });
//   ipcMain.on('scrChUpd_getHealthHouse', function (event, ucs) {
//     console.log(ucs)
//     geo.healthHouse(ucs, scrChUpdate);

//   });
//   ipcMain.on('getScrChAll', function (e, qry) {
//     db.scrChild(qry, (err, result) => {
//       scrChUpdate.webContents.send('getScrChAll', ({
//           err: err,
//           result: result,

//         })

//       )
//       console.log(result);
//     })
//   })
//   ipcMain.on('updScrChSingle', function (e, data) {
//     var chUpd = {
//       screening_id: data.screening_id,
//       name: data.name,
//       upload_status: 2,
//       f_or_h_name: data.f_or_h_name,
//       muac: data.muac,
//       gender: data.gender,
//       age: data.age,
//       oedema: data.oedema,
//       no_mm_sch: data.no_mm_sch,
//       deworming: data.deworming,
//       status: data.status
//     }
//     db.updScr(chUpd, function (err, result) {
//       console.log('childupdate', result);
//       scrChUpdate.webContents.send('updScrChSingle', ({
//         result,
//         err: null
//       }))
//     })
//     data = null;
//   })
//   scrChUpdate.on('close', function () {
//     var myChan = ['scrChUpd_getProvince',
//       'scrChUpd_getDistrict',
//       'scrChUpd_getTehsil',
//       'scrChUpd_getUC',
//       'scrChUpd_getHealthHouse',
//       'getScrChAll',
//       'updScrChSingle']
//     for (const i in myChan){
//       ipcMain.removeAllListeners(myChan[i])
//       console.log('channel removed ', myChan[i])
//     }
//     scrPlUpdate = null;
//   })
// }
// Creating Screening : Reports
function scrReports() {
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize

  scrReport = new BrowserWindow({
    width,
    height,
    title: 'Screening: Reports'
  });
  scrReport.loadURL(url.format({
    pathname: path.join(__dirname, '/html/scrReports.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('scrRpt_getProvince', function (event) {
    geo.province(scrReport);
  });
  ipcMain.on('scrRpt_getDistrict', function (event, prov) {
    console.log(prov)
    geo.district(prov, scrReport);
  });
  ipcMain.on('scrRpt_getTehsil', function (event, dist) {
    geo.tehsil(dist, scrReport);
    console.log(dist)
  });
  ipcMain.on('scrRpt_getUC', function (event, tehs) {
    console.log(tehs)
    geo.uc(tehs, scrReport);

  });
  ipcMain.on('scrRpt_getHealthHouse', function (event, ucs) {
    console.log(ucs)
    geo.healthHouse(ucs, scrReport);

  });

  ipcMain.on('data', function (e, arg) {
    var x = arg;
    if (arg === 0) {
      x = null;
    }
    async.parallel({
      summary: (cb) => {
        db.scrSummary(x, (err, res) => cb(err, res));
      },
      plw: (cb) => {
        db.scrPlw(x, (err, res) => cb(err, res))
      },
      child: (cb) => {
        db.scrChild(x, (err, res) => cb(err, res))
      }
    }, (err, results) => {
      console.log(err, results);
      scrReport.webContents.send('data', ({
        data: results
      }))
      results = null;
    })
    // db.test(1, (err, res)=>{
    //   console.log(err, res);
    // })
    // async.parallel({
    //   summary: function(callback){
    //     db.scrSummary(x, (err, result)=>{
    //       callback(err, result)
    //     })
    //   },
    //   plw: function(callback){
    //     db.scrPlw(x, (err, result)=>{
    //     callback(err, result)
    //     })
    //   }
    //   ,
    //   child: function(callback){
    //     db.scrChild(x, (err, result)=>{
    //       callback(err, result)
    //     })
    //   }
    // }, (err, results)=>{
    //   if(err) return console.log(err);
    //   scrReport.webContents.send('data',({
    //   data:results
    //   }))
    // })
    console.log('test scr report' + arg)
  })
  scrReport.on('close', function () {
    var myChan = ['scrRpt_getProvince',
      'scrRpt_getDistrict',
      'scrRpt_getTehsil',
      'scrRpt_getUC',
      'scrRpt_getHealthHouse',
      'data'
    ]
    for (const i in myChan) {
      ipcMain.removeAllListeners(myChan[i])
      console.log('channel removed ', myChan[i])
    }
    scrReport = null;
  })
}

// Creating Screening : Reports
function defReports() {
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize

  reportDef = new BrowserWindow({
    width: 250,
    height: 250,
    title: 'Defauler: Reports'
  });
  reportDef.loadURL(url.format({
    pathname: path.join(__dirname, '/html/defaulter.html'),
    protocol: 'file:',
    slashes: true
  }));


  ipcMain.on('data', function (e, arg) {
    console.log('defaulter report' + arg)
    knex('v_defaulter')
      .then(result => {
        console.log(result);
        reportDef.webContents.send('data', {
          result: result
        })
      })
      .catch(e => {
        console.log(e);
      })

  })


  reportDef.on('close', function () {
    var myChan = ['data']
    for (const i in myChan) {
      ipcMain.removeAllListeners(myChan[i])
      console.log('channel removed ', myChan[i])
    }
    reportDef = null;
  })
}


// Creating Screening : Reports
function otpReports() {
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize

  reportOtp = new BrowserWindow({
    width,
    height,
    title: 'OTP: Reports'
  });
  reportOtp.loadURL(url.format({
    pathname: path.join(__dirname, '/html/otpReportv1.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('otpRpt_getProvince', function (event) {
    geo.province(reportOtp);
  });
  ipcMain.on('otpRpt_getDistrict', function (event, prov) {
    console.log(prov)
    geo.district(prov, reportOtp);
  });
  ipcMain.on('otpRpt_getTehsil', function (event, dist) {
    geo.tehsil(dist, reportOtp);
    console.log(dist)
  });
  ipcMain.on('otpRpt_getUC', function (event, tehs) {
    console.log(tehs)
    geo.uc(tehs, reportOtp);

  });
  ipcMain.on('otpRpt_getHealthHouse', function (event, ucs) {
    console.log(ucs)
    geo.healthHouse(ucs, reportOtp);

  });

  ipcMain.on('data', function (e, arg) {
    var x = arg;
    if (arg === 0) {
      x = null;
    }
    async.parallel({
      add: (cb) => {
        db.otpAdd(x, (err, res) => cb(err, res));
      },
      exit: (cb) => {
        db.otpExit(x, (err, res) => cb(err, res))
      },
      AddTable: (cb) => {
        db.otpAddTable(x, (err, res) => cb(err, res))
      },
      ExitTable: (cb) => {
        db.otpExitTable(x, (err, res) => cb(err, res))
      }
    }, (err, results) => {
      console.log(err, results);
      reportOtp.webContents.send('data', ({
        data: results
      }))
      results = null;
    })
    // db.test(1, (err, res)=>{
    //   console.log(err, res);
    // })
    // async.parallel({
    //   summary: function(callback){
    //     db.scrSummary(x, (err, result)=>{
    //       callback(err, result)
    //     })
    //   },
    //   plw: function(callback){
    //     db.scrPlw(x, (err, result)=>{
    //     callback(err, result)
    //     })
    //   }
    //   ,
    //   child: function(callback){
    //     db.scrChild(x, (err, result)=>{
    //       callback(err, result)
    //     })
    //   }
    // }, (err, results)=>{
    //   if(err) return console.log(err);
    //   scrReport.webContents.send('data',({
    //   data:results
    //   }))
    // })
    console.log('test otp report' + arg)
  })
  reportOtp.on('close', function () {
    var myChan = ['otpRpt_getProvince',
      'otpRpt_getDistrict',
      'otpRpt_getTehsil',
      'otpRpt_getUC',
      'otpRpt_getHealthHouse',
      'data'
    ]
    for (const i in myChan) {
      ipcMain.removeAllListeners(myChan[i])
      console.log('channel removed ', myChan[i])
    }
    reportOtp = null;
  })
}
// Creating Admin : Geo Refference
function createGeoWindow() {
  addScrPlw = new BrowserWindow({
    width: 800,
    height: 800,
    title: 'Screening: Reports'
  });
  addScrPlw.loadURL(url.format({
    pathname: path.join(__dirname, '/html/geo.html'),
    protocol: 'file:',
    slashes: true
  }));

  addScrPlw.on('close', function () {
    addScrPlw = null;
  })
}


// Creating Admin : Geo Refference
function runDemo() {
  demo = new BrowserWindow({
    width: 800,
    height: 800,
    title: 'Demo'
  });
  demo.loadURL(url.format({
    pathname: path.join(__dirname, '/html/demo.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('addDemo', function (event, name) {
    knex.insert({
      yourName: name,
      client_id: '1234'
    }).into('tblDemo').then((ret) => {
      if (ret.length > 0) {
        demo.webContents.send('resultSent', ({
          'msg': 'Successfully added'
        }))
      }
    }).catch((err) => {
      demo.webContents.send('resultSent', ({
        'msg': 'record not added failed'
      }))
    })
  })
  demo.on('close', function () {
    demo = null;
  })
}
/*
// Creating Admin : sync Refference
// function createSyncWindow() {
//   var surl = imran.server;
//   console.log(surl);
//   syncData = new BrowserWindow({
//     width: 800,
//     height: 800,
//     title: 'System: Sync'
//   });
//   syncData.loadURL(url.format({
//     pathname: path.join(__dirname, '/html/sync.html'),
//     protocol: 'file:',
//     slashes: true
//   }));
//   ipcMain.on('updateDB', function () {
//     request(surl + '/getProvince', function (err, response, body) {
//       if (err) {
//         console.log(err)
//       } else {
//         var data = JSON.parse(body);
//         if (data.length > 0) {
//           data.forEach(el => {
//             knex('tblGeoProvince')
//               .where({
//                 id: el.id
//               })
//               .then(result => {
//                 if (result.length > 0) {
//                   console.log('Province Allready exists')
//                 } else {
//                   knex.insert(el)
//                     .into('tblGeoProvince')
//                     .then(ret => {
//                       console.log(ret);

//                     })

//                 }
//               })

//           })
//         } else {
//           syncData.webContents.send("resultSent", {
//             'msg': 'No province to be added'
//           });

//         }


//       }
//     })
//     request(surl + '/getDistrict', function (err, response, body) {
//       if (err) {
//         console.log(err)
//       } else {
//         // var data = JSON.parse(body);
//         var data = JSON.parse(body);
//         if (data.length > 0) {
//           data.forEach(el => {
//             knex('tblGeoDistrict')
//               .where({
//                 id: el.id
//               })
//               .then(result => {
//                 if (result.length > 0) {
//                   console.log('District Allready exists')
//                 } else {
//                   knex.insert(el)
//                     .into('tblGeoDistrict')
//                     .then(ret => {
//                       console.log(ret);

//                     })

//                 }
//               })

//           })
//         } else {
//           syncData.webContents.send("resultSent", {
//             'msg': 'No District to be added'
//           });

//         }
//       }
//     })
//     request(surl + '/getTehsil', function (err, response, body) {
//       if (err) {
//         console.log(err)
//       } else {
//         var data = JSON.parse(body);
//         if (data.length > 0) {
//           data.forEach(el => {
//             knex('tblGeoTehsil')
//               .where({
//                 id: el.id
//               })
//               .then(result => {
//                 if (result.length > 0) {
//                   console.log('Tehsil Allready exists')
//                 } else {
//                   knex.insert(el)
//                     .into('tblGeoTehsil')
//                     .then(ret => {
//                       console.log(ret);

//                     })

//                 }
//               })

//           })
//         } else {
//           syncData.webContents.send("resultSent", {
//             'msg': 'No Tehsil to be added'
//           });

//         }
//       }
//     })
//     request(surl + '/getUC', function (err, response, body) {
//       if (err) {
//         console.log(err)
//       } else {
//         var data = JSON.parse(body);
//         if (data.length > 0) {
//           data.forEach(el => {
//             knex('tblGeoUC')
//               .where({
//                 id: el.id
//               })
//               .then(result => {
//                 if (result.length > 0) {
//                   console.log('UC Allready exists')
//                 } else {
//                   knex.insert(el)
//                     .into('tblGeoUC')
//                     .then(ret => {
//                       console.log(ret);

//                     })

//                 }
//               })

//           })
//         } else {
//           syncData.webContents.send("resultSent", {
//             'msg': 'No UC to be added'
//           });

//         }
//       }
//     })
//     request(surl + '/getSite', function (err, response, body) {
//       if (err) {
//         console.log(err)
//       } else {
//         var data = JSON.parse(body);
//         if (data.length > 0) {
//           data.forEach(el => {
//             knex('tblGeoNutSite')
//               .where({
//                 id: el.id
//               })
//               .then(result => {
//                 if (result.length > 0) {
//                   console.log('Site Allready exists')
//                 } else {
//                   knex.insert(el)
//                     .into('tblGeoNutSite')
//                     .then(ret => {
//                       console.log(ret);

//                     })

//                 }
//               })

//           })
//         } else {
//           syncData.webContents.send("resultSent", {
//             'msg': 'No site to be added'
//           });

//         }

//       }
//     })
//     syncData.webContents.send("resultSent", {
//       'msg': 'sync complete'
//     });
//   });
//   ipcMain.on('updateServer', function () {
//     console.log('sync clicked')
//     knex('Screening')
//       .where({
//         upload_status: 0
//       })
//       .then(results => {
//         if (results.length < 1) {
//           syncData.webContents.send("resultSent", {
//             'msg': 'Server already updated'
//           });
//         }
//         if (results) {
//           results.forEach(el => {
//             var options = {
//               method: 'POST',
//               uri: surl + '/screening',
//               body: el,
//               json: true
//             }
//             request(options, function (err, response, body) {
//               if (err) {
//                 console.log(err)
//                 body = JSON.parse(body);

//               } else if (body.msg === 'Child record added' || body.msg === 'PLW record added') {
//                 console.log(body);
//                 knex('Screening')
//                   .where({
//                     screening_id: el.screening_id
//                   })
//                   .update({
//                     upload_status: 1
//                   })
//                   .then(result => {
//                     console.log(result);
//                     syncData.webContents.send("resultSent", {
//                       'msg': body.msg
//                     });

//                   })
//                   .catch(err => {
//                     console.log(err);
//                   })
//               }
//             })
//           })

//         }
//       })
//     knex('Screening')
//       .where({
//         upload_status: 2
//       })
//       .then(results => {
//         if (results.length < 1) {
//           syncData.webContents.send("resultSent", {
//             'msg': 'Server already updated'
//           });
//         }
//         if (results) {
//           results.forEach(el => {
//             var options = {
//               method: 'POST',
//               uri: surl + '/update_screening',
//               body: el,
//               json: true
//             }
//             request(options, function (err, response, body) {
//               if (err) {
//                 console.log(err)
//                 body = JSON.parse(body);
//               } else if (body.msg === 'Child record updated' || body.msg === 'PLW record updated') {
//                 console.log(body);
//                 knex('Screening')
//                   .where({
//                     screening_id: el.screening_id
//                   })
//                   .update({
//                     upload_status: 1
//                   })
//                   .then(result => {
//                     syncData.webContents.send("resultSent", {
//                       'msg': body.msg
//                     });
//                     console.log(result);
//                   })
//                   .catch(err => {
//                     console.log(err);
//                   })
//               }
//             })
//           })

//         }
//       })
//     //Update server with new OTP addmision
//     knex('tblOtpAdd')
//       .where({
//         upload_status: 0
//       })
//       .orWhereNull('upload_status')
//       .then(result => {
//         if (result.length < 1) {
//           syncData.webContents.send("resultSent", {
//             'msg': 'Server already updated with OTP Addmision'
//           });
//         } else {
//           result.forEach(el => {
//             var options = {
//               method: 'POST',
//               uri: surl + '/otpAdd',
//               body: el,
//               json: true
//             }
//             request(options, function (err, response, body) {
//               console.log(body);
//               if (err) {
//                 console.log(err)
//               } else if (body.msg === 'OTP Admission Added') {
//                 knex('tblOtpAdd')
//                   .where({
//                     otp_id: el.otp_id
//                   })
//                   .update({
//                     upload_status: 1
//                   })
//                   .then(result => {
//                     syncData.webContents.send("resultSent", {
//                       'msg': body.msg
//                     });
//                     console.log(result);
//                   })
//                   .catch(err => {
//                     console.log(err);
//                   })
//               }
//             })
//           })
//         }

//       })

//     //Update server with update OTP addmision
//     knex('tblOtpAdd')
//       .where({
//         upload_status: 2
//       })
//       .then(result => {
//         if (result.length < 1) {
//           syncData.webContents.send("resultSent", {
//             'msg': 'Server already updated with OTP Addmision'
//           });
//         } else {
//           result.forEach(el => {
//             var options = {
//               method: 'PUT',
//               uri: surl + '/otpAdd',
//               body: el,
//               json: true
//             }
//             request(options, function (err, response, body) {
//               if (err) {
//                 console.log(err)
//                 // body = JSON.parse(body);
//               } else if (body.msg === 'OTP Admission Updated') {
//                 console.log(body);
//                 knex('tblOtpAdd')
//                   .where({
//                     otp_id: el.otp_id
//                   })
//                   .update({
//                     upload_status: 1
//                   })
//                   .then(result => {
//                     syncData.webContents.send("resultSent", {
//                       'msg': body.msg
//                     });
//                     console.log(result);
//                   })
//                   .catch(err => {
//                     console.log(err);
//                   })
//               }
//             })
//           })
//         }

//       })

//     //Update server with OTP Exit;
//     knex('tblOtpExit')
//     .where({
//       upload_status: 0
//     })
//     .orWhereNull('upload_status')
//     .then(result => {
//       if (result.length < 1) {
//         syncData.webContents.send("resultSent", {
//           'msg': 'Server already updated with OTP Exits'
//         });
//       } else {
//         result.forEach(el => {
//           var options = {
//             method: 'POST',
//             uri: surl + '/otpExit',
//             body: el,
//             json: true
//           }
//           request(options, function (err, response, body) {
//             console.log(response);
//             // console.log(body);
//             if (err) console.log(err)
//             if (body) {
//               console.log(body);
//               knex('tblOtpExit')
//                 .where({
//                   otp_id: el.otp_id
//                 })
//                 .update({
//                   upload_status: 1
//                 })
//                 .then(result => {
//                   syncData.webContents.send("resultSent", {
//                     'msg': body.msg
//                   });
//                   console.log(result);
//                 })
//                 .catch(err => {
//                   console.log(err);
//                 })
//             }
//           })
//         })
//       }

//     })

//   // Update server with update OTP addmision
//   knex('tblOtpExit')
//     .where({
//       upload_status: 2
//     })
//     .then(result => {
//       if (result.length < 1) {
//         syncData.webContents.send("resultSent", {
//           'msg': 'Server already updated with OTP Addmision'
//         });
//       } else {
//         result.forEach(el => {
//           var options = {
//             method: 'PUT',
//             uri: surl + '/otpExit',
//             body: el,
//             json: true
//           }
//           request(options, function (err, response, body) {
//             if (err) {
//               console.log(err)
//               // body = JSON.parse(body);
//             } else if (body) {
//               // .msg === 'OTP Admission Updated')
//               // console.log(body);
//               knex('tblOtpExit')
//                 .where({
//                   otp_id: el.otp_id
//                 })
//                 .update({
//                   upload_status: 1
//                 })
//                 .then(result => {
//                   syncData.webContents.send("resultSent", {
//                     'msg': body.msg
//                   });
//                   console.log(result);
//                 })
//                 .catch(err => {
//                   console.log(err);
//                 })
//             }
//           })
//         })
//       }

//     })

//   knex('tblSessions')
//       .where({upload_status:0})
//       .orWhereNull('upload_status')
//       .then(result=>{
//         if( result.length < 1){
//           syncData.webContents.send("resultSent", {
//             'msg': 'Server already updated with Sessions'
//           });
//         } else {
//           result.forEach(el => {
//             var options = {
//               method: 'POST',
//               uri: surl + '/sessions',
//               body: el,
//               json: true
//             }
//             request(options, function (err, response, body) {
//               if (err) {
//                 console.log(err)
//                 // body = JSON.parse(body);
//               } else if (body){
//               // .msg === 'Session Added') {
//                 console.log(body);
//                 knex('tblSessions')
//                   .where({
//                     session_id: el.session_id
//                   })
//                   .update({
//                     upload_status: 1
//                   })
//                   .then(result => {
//                     syncData.webContents.send("resultSent", {
//                       'msg': body.msg
//                     });
//                     console.log(result);
//                   })
//                   .catch(err => {
//                     console.log(err);
//                   })
//               }
//             })
//           })
//         }
//       })


//   knex('tblSessions')
//       .where({upload_status:2})
//       .then(result=>{
//         if( result.length < 1){
//           syncData.webContents.send("resultSent", {
//             'msg': 'Server already updated with Sessions'
//           });
//         } else {
//           result.forEach(el => {
//             var options = {
//               method: 'PUT',
//               uri: surl + '/sessions',
//               body: el,
//               json: true
//             }
//             request(options, function (err, response, body) {
//               if (err) {
//                 console.log(err)
//                 // body = JSON.parse(body);
//               } else if (body){
//               // .msg === 'Session Updated') {
//                 console.log(body);
//                 knex('tblSessions')
//                   .where({
//                     session_id: el.session_id
//                   })
//                   .update({
//                     upload_status: 1
//                   })
//                   .then(result => {
//                     syncData.webContents.send("resultSent", {
//                       'msg': body.msg
//                     });
//                     console.log(result);
//                   })
//                   .catch(err => {
//                     console.log(err);
//                   })
//               }
//             })
//           })
//         }
//       })

//       knex('otpFollowup')
//       .where({upload_status:0})
//       .orWhereNull('upload_status')
//       .then(result=>{
//         if( result.length < 1){
//           syncData.webContents.send("resultSent", {
//             'msg': 'Server already updated with followups'
//           });
//         } else {
//           result.forEach(el => {
//             var options = {
//               method: 'POST',
//               uri: surl + '/sessions',
//               body: el,
//               json: true
//             }
//             request(options, function (err, response, body) {
//               if (err) {
//                 console.log(err)
//                 // body = JSON.parse(body);
//               } else if (body){
//               // .msg === 'Followup Added') {
//                 console.log(body);
//                 knex('otpFollowup')
//                   .where({
//                     followup_id: el.followup_id
//                   })
//                   .update({
//                     upload_status: 1
//                   })
//                   .then(result => {
//                     syncData.webContents.send("resultSent", {
//                       'msg': body.msg
//                     });
//                     console.log(result);
//                   })
//                   .catch(err => {
//                     console.log(err);
//                   })
//               }
//             })
//           })
//         }
//       })
//   })
//   syncData.on('close', function () {
//     syncData = null;
//   })
// }
*/
const mac = '01:02:03:0a:0b:0c';
const appKey = 'A4C74FBD-2375-496E-97BA-C4C3E4D3F868';
// Creating Admin : sync Refference
function newSync() {
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize

  console.log(imran);
  var surl = serverUrl;
  console.log(surl);
  syncNew = new BrowserWindow({
    width,
    height,
    title: 'System: Sync'
  });
  syncNew.loadURL(url.format({
    pathname: path.join(__dirname, '/html/newSync.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('updateDB', function () {
    async.series({
      province: (cb) => {
        var options = {
          method: 'GET',
          uri: surl + '/getProvince',
          headers: {
            'Authorization': `Bearer ${imran.client} ${imran.mac}`
          },
          // body: result,
          json: true
        }
        request(options, function (err, response, body) {
          console.log(body)
          if (!err) {
            var data = body;
            if (data.length > 0) {
              data.forEach(el => {
                delete el.isActive;
                knex('tblGeoProvince')
                  .where({
                    id: el.id
                  })
                  .then(result => {
                    if (result.length > 0) {
                      console.log('Province Not added as already available')
                    } else {
                      knex('tblGeoProvince')
                        .insert(el)
                        .then(ret => {
                          console.log(ret);
                        })

                    }
                  })

                  .catch(e => {
                    console.log(e)
                  })
              })
              cb(null, body)
            }
          } else {
            cb(err)
          }
        })
      },
      district: (cb) => {
        var options = {
          method: 'GET',
          uri: surl + '/getDistrict',
          // body: result,
          headers: {
            'Authorization': `Bearer ${imran.client} ${imran.mac}`
          },
          json: true
        }
        request(options, function (err, response, body) {
          if (!err) {
            // var data = JSON.parse(body);
            var data = body;
            if (data.length > 0) {
              
              data.forEach(el => {
                delete el.isActive;
                knex('tblGeoDistrict')
                  .where({
                    id: el.id
                  })
                  .then(result => {
                    if (result.length > 0) {

                      console.log('District Not added as already available')
                    } else {
                      knex('tblGeoDistrict')
                        .insert(el)
                        .then(ret => {
                          console.log(ret)
                        })
                    }
                  })

                  .catch(e => {
                    cb(e)
                  })
              })
              cb(null, body);
            }
          } else {
            cb(err)
          }
        })
      },
      tehsil: (cb) => {
        var options = {
          method: 'GET',
          uri: surl + '/getTehsil',
          // body: result,
          headers: {
            'Authorization': `Bearer ${imran.client} ${imran.mac}`
          },
          json: true
        }
        request(options, function (err, response, body) {
          if (!err) {
            var data = body;

            // var data = JSON.parse(body);
            if (data.length > 0) {
              data.forEach(el => {
                delete el.isActive;
                knex('tblGeoTehsil')
                  .where({
                    id: el.id
                  })
                  .then(result => {
                    if (result.length > 0) {
                      console.log('Tehsil Not added as already available')
                    } else {
                      knex('tblGeoTehsil')
                        .insert(el)
                        .then(ret => {
                          console.log(ret)
                        })
                    }
                  })

                  .catch(e => {
                    cb(e)
                  })
              })
              cb(null, body);
            }
          } else {
            cb(err)

          }
        })
      },
      uc: (cb) => {
        var options = {
          method: 'GET',
          uri: surl + '/getUC',
          // body: result,
          headers: {
            'Authorization': `Bearer ${imran.client} ${imran.mac}`
          },
          json: true
        }
        request(options, function (err, response, body) {
          if (!err) {
            var data = body;

            // var data = JSON.parse(body);
            if (data.length > 0) {

              data.forEach(el => {
                delete el.isActive;
                knex('tblGeoUC')
                  .where({
                    id: el.id
                  })
                  .then(result => {
                    if (result.length > 0) {
                      console.log('UC Allready exists')
                    } else {
                      knex.insert(el)
                        .into('tblGeoUC')
                        .then(ret => {
                          console.log(ret);

                        })

                    }
                  })
                  .catch(e => {
                    console.log(e)
                  })

              })
              cb(null, body)
            }
          } else {
            cb(err)
          }
        })
      },
      site: (cb) => {
        var options = {
          method: 'GET',
          uri: surl + '/getSite',
          // body: result,
          headers: {
            'Authorization': `Bearer ${imran.client} ${imran.mac}`
          },
          json: true
        }
        request(options, function (err, response, body) {
          if (!err) {
            var data = body;

            // var data = JSON.parse(body);
            if (data.length > 0) {

              data.forEach(el => {
                delete el.isActive;

                knex('tblGeoNutSite')
                  .where({
                    id: el.id
                  })
                  .then(result => {
                    if (result.length > 0) {
                      console.log('Site already avaialble')
                    } else {
                      knex('tblGeoNutSite')
                        .insert(el)
                        .then(ret => {
                          console.log(ret)
                        })
                    }
                  })
                  .catch(e => {
                    console.log(e)
                  })

              })
              cb(null, body);
            }
          } else {
            cb(err)
          }
        })
      },
      itemList: (cb) => {
        var options = {
          method: 'GET',
          uri: surl + '/getItems',
          // body: result,
          headers: {
            'Authorization': `Bearer ${imran.client} ${imran.mac}`
          },
          json: true
        }
        request(options, function (err, response, body) {
          if (!err) {
            var data = body;

            // var data = JSON.parse(body);
            if (data.length > 0) {

              data.forEach(el => {
                // delete el.isActive;

                knex('tblCommodity')
                  .where({
                    id: el.id
                  })
                  .then(result => {
                    if (result.length > 0) {
                      console.log('Commodity already avaialble')
                    } else {
                      knex('tblCommodity')
                        .insert(el)
                        .then(ret => {
                          console.log(ret)
                        })
                    }
                  })
                  .catch(e => {
                    console.log(e)
                  })

              })
              cb(null, body);
            }
          } else {
            cb(err)
          }
        })
      }
    }, function (err, results) {
      if (err) {
        console.log(err)
        syncNew.webContents.send('errUpdDb', {
          error: 'DB not updated'
        })
        syncNew.webContents.send('updateDB', 'a')
      } else {
        console.log(results)
        syncNew.webContents.send('successUpdDb', {
          msg: 'DB updated successfully, App will restart within 3 seconds.'
        })
        syncNew.webContents.send('updateDB', 'a')
        // app.relaunch();
        // app.exit();
      }
    })
  });

  ipcMain.on('updateServer', function () {
    async.series({
      uploadScr: (cb) => {
        knex('Screening')
          .where({
            upload_status: 0
          })
          .then(result => {
            if (result.length > 0) {

              var options = {
                method: 'POST',
                uri: surl + '/scrv1',
                body: result,
                json: true
              }
              // console.log(result)
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  console.log(typeof body);
                  // body = JSON.parse(body);
                  if (body.success === 'SCR Added') {
                    result.forEach(el => {
                      console.log(el);
                      knex('Screening')
                        .where({
                          screening_id: el.screening_id
                        })
                        .update('upload_status', 1)
                        .then(result => {
                          console.log(result)
                        })
                    })
                  }
                  cb(null, body)
                }
              })
            } else {
              cb(null, 'No new Scrrening record')
            }
          })
          .catch(e => {
            cb(e)
          })
      },
      updateScr: (cb) => {
        knex('Screening')
          .where({
            upload_status: 2
          })
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'PUT',
                uri: surl + '/scrv1',
                body: result,
                json: true
              }
              // console.log(result)
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  console.log(typeof body);
                  // body = JSON.parse(body);
                  if (body.success === 'SCR Updated') {
                    result.forEach(el => {
                      console.log(el);
                      knex('Screening')
                        .where({
                          screening_id: el.screening_id
                        })
                        .update('upload_status', 1)
                        .then(result => {
                          console.log(result)
                        })
                    })
                  }
                  cb(null, body)
                }
              })
            } else {
              cb(null, 'No new record')
            }

          })

          .catch(e => {
            cb(e)
          })
      },
      uploadChScrNew: (cb) => {
        knex('tblScrChildren')
          .where({
            upload_status: 0
          })
          .then(result => {
            if (result.length > 0) {

              var options = {
                method: 'POST',
                uri: surl + '/newChScr',
                body: result,
                json: true
              }
              // console.log(result)
              request(options, (err, response, body) => {
                if (err) {
                  console.log(JSON.stringify(err));
                  cb(err)
                } else {
                  console.log(typeof body);
                  // body = JSON.parse(body);
                  if (body.success === 'Children screening uploaded') {
                    result.forEach(el => {
                      console.log(el);
                      knex('tblScrChildren')
                        .where({
                          ch_scr_id: el.ch_scr_id
                        })
                        .update('upload_status', 1)
                        .then(result => {
                          console.log(result)
                        })
                    })
                  }
                  cb(null, body)
                }
              })
            } else {
              cb(null, 'No new Scrrening record')
            }
          })
          .catch(e => {
            cb(e)
          })
      },
      updateChScrNew: (cb) => {
        knex('tblScrChildren')
          .where({
            upload_status: 2
          })
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'PUT',
                uri: surl + '/newChScr',
                body: result,
                json: true
              }
              // console.log(result)
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  console.log(typeof body);
                  // body = JSON.parse(body);
                  if (body.success === 'Children Screening record(s) updated') {
                    result.forEach(el => {
                      console.log(el);
                      knex('tblScrChildren')
                        .where({
                          ch_scr_id: el.ch_scr_id
                        })
                        .update('upload_status', 1)
                        .then(result => {
                          console.log(result)
                        })
                    })
                  }
                  cb(null, body)
                }
              })
            } else {
              cb(null, 'No new record')
            }

          })

          .catch(e => {
            cb(e)
          })
      },
      uploadPlwScrNew: (cb) => {
        knex('tblScrPlw')
          .where({
            upload_status: 0
          })
          .then(result => {
            if (result.length > 0) {

              var options = {
                method: 'POST',
                uri: surl + '/newPlwScr',
                body: result,
                json: true
              }
              // console.log(result)
              request(options, (err, response, body) => {
                if (err) {
                  console.log(JSON.stringify(err));
                  cb(err)
                } else {
                  console.log(typeof body);
                  // body = JSON.parse(body);
                  if (body.success === 'PLW screening uploaded') {
                    result.forEach(el => {
                      console.log(el);
                      knex('tblScrPlw')
                        .where({
                          plw_scr_id: el.plw_scr_id
                        })
                        .update('upload_status', 1)
                        .then(result => {
                          console.log(result)
                        })
                    })
                  }
                  cb(null, body)
                }
              })
            } else {
              cb(null, 'No new Scrrening record')
            }
          })
          .catch(e => {
            cb(e)
          })
      },
      updatePlwScrNew: (cb) => {
        knex('tblScrPlw')
          .where({
            upload_status: 2
          })
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'PUT',
                uri: surl + '/newPlwScr',
                body: result,
                json: true
              }
              // console.log(result)
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  console.log(typeof body);
                  // body = JSON.parse(body);
                  if (body.success === 'PLW Screening record(s) updated') {
                    result.forEach(el => {
                      console.log(el);
                      knex('tblScrPlw')
                        .where({
                          plw_scr_id: el.plw_scr_id
                        })
                        .update('upload_status', 1)
                        .then(result => {
                          console.log(result)
                        })
                    })
                  }
                  cb(null, body)
                }
              })
            } else {
              cb(null, 'No new record')
            }

          })

          .catch(e => {
            cb(e)
          })
      },
      uploadOtp: (cb) => {
        knex('tblOtpAdd')
          .where({
            upload_status: 0
          })
          .orWhereNull('upload_status')
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'POST',
                uri: surl + '/otpv1',
                body: result,
                json: true
              }
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  if (body.success === 'OTP Added') {
                    cb(null, body);
                    result.forEach(el => {
                      knex('tblOtpAdd')
                        .where({
                          otp_id: el.otp_id
                        })
                        .update('upload_status', 1)
                        .then(x => {
                          console.log(x)
                        })
                    })
                  } else {
                    cb(body);
                  }
                }
              })
            } else {
              cb(null, 'OTP Add: No new record')
            }

          })
          .catch(e => {
            cb(e)
          })
      },
      updateOtp: (cb) => {
        knex('tblOtpAdd')
          .where({
            upload_status: 2
          })
          .orWhereNull('upload_status')
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'PUT',
                uri: surl + '/otpv1',
                body: result,
                json: true
              }
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  if (body.success === 'OTP Updated') {
                    cb(null, body);
                    result.forEach(el => {
                      knex('tblOtpAdd')
                        .where({
                          otp_id: el.otp_id
                        })
                        .update('upload_status', 1)
                        .then(x => {
                          console.log(x)
                        })
                    })
                  } else {
                    cb(body);
                  }
                }
              })
            } else {
              cb(null, 'OTP Update: No new record')
            }

          })
          .catch(e => {
            cb(e)
          })
      },
      uploadOtpExit: (cb) => {
        knex('tblOtpExit')
          .where({
            upload_status: 0
          })
          .orWhereNull('upload_status')
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'POST',
                uri: surl + '/otpExitv1',
                body: result,
                json: true
              }
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  if (body.success === 'OTP Exit Added') {
                    cb(null, body);
                    result.forEach(el => {
                      knex('tblOtpExit')
                        .where({
                          exit_id: el.exit_id
                        })
                        .update('upload_status', 1)
                        .then(x => {
                          console.log(x)
                        })
                    })
                  } else {
                    cb(body);
                  }
                }
              })
            } else {
              cb(null, 'OTP Exit: No new record')
            }

          })
          .catch(e => {
            cb(e)
          })
      },
      updateOtpExit: (cb) => {
        knex('tblOtpExit')
          .where({
            upload_status: 2
          })
          .orWhereNull('upload_status')
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'PUT',
                uri: surl + '/otpExitv1',
                body: result,
                json: true
              }
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  if (body.success === 'OTP exit updated') {
                    cb(null, body);
                    result.forEach(el => {
                      knex('tblOtpExit')
                        .where({
                          exit_id: el.exit_id
                        })
                        .update('upload_status', 1)
                        .then(x => {
                          console.log(x)
                        })
                    })
                  } else {
                    cb(body);
                  }
                }
              })
            } else {
              cb(null, 'OTP Exit Update: No new record')
            }

          })
          .catch(e => {
            cb(e)
          })
      },
      uploadSession: (cb) => {
        knex('tblSessions')
          .where({
            upload_status: 0
          })
          .orWhereNull('upload_status')
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'POST',
                uri: surl + '/sessionsv1',
                body: result,
                json: true
              }
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  if (body.success === 'Sessions uploaded') {
                    cb(null, body);
                    result.forEach(el => {
                      knex('tblSessions')
                        .where({
                          session_id: el.session_id
                        })
                        .update('upload_status', 1)
                        .then(x => {
                          console.log(x)
                        })
                    })
                  } else {
                    cb(body);
                  }
                }
              })
            } else {
              cb(null, 'Session Add: No new record')
            }

          })
          .catch(e => {
            cb(e)
          })
      },
      updateSession: (cb) => {
        knex('tblSessions')
          .where({
            upload_status: 2
          })
          .orWhereNull('upload_status')
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'PUT',
                uri: surl + '/sessionsv1',
                body: result,
                json: true
              }
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  if (body.success === 'Sessions Updated') {
                    cb(null, body);
                    result.forEach(el => {
                      knex('tblSessions')
                        .where({
                          session_id: el.session_id
                        })
                        .update('upload_status', 1)
                        .then(x => {
                          console.log(x)
                        })
                    })
                  } else {
                    cb(body);
                  }
                }
              })
            } else {
              cb(null, 'Session Update: No new record')
            }

          })
          .catch(e => {
            cb(e)
          })
      },
      uploadFollowup: (cb) => {
        knex('tblOtpFollowup')
          .where({
            upload_status: 0
          })
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'POST',
                uri: surl + '/followupv1',
                body: result,
                json: true
              }
              // console.log(result)
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  console.log(typeof body);
                  // body = JSON.parse(body);
                  if (body.success === 'Followups Added') {
                    cb(null, body)
                    result.forEach(el => {
                      console.log(el);
                      knex('tblOtpFollowup')
                        .where({
                          followup_id: el.followup_id
                        })
                        .update('upload_status', 1)
                        .then(result => {
                          console.log(result)
                        })
                    })
                  } else {
                    cb(body)
                  }
                }
              })
            } else {
              cb(null, 'Followup Add: No new record')

            }

          })
          .catch(e => {
            cb(e)
          })
      },
      uploadStockRequest: (cb) => {
        knex('tblStockRequest')
          .where({
            upload_status: 0
          })
          .then(result => {
            if (result.length > 0) {
              var options = {
                method: 'POST',
                uri: surl + '/stock_reqv1',
                body: result,
                json: true
              }
              // console.log(result)
              request(options, (err, response, body) => {
                if (err) {
                  cb(err)
                } else {
                  console.log(typeof body);
                  // body = JSON.parse(body);
                  if (body.success === 'Stock Request Added') {
                    cb(null, body)
                    result.forEach(el => {
                      console.log(el);
                      knex('tblStockRequest')
                        .where({
                          id: el.id
                        })
                        .update('upload_status', 1)
                        .then(result => {
                          console.log(result)
                        })
                    })
                  } else {
                    cb(body)
                  }
                }
              })
            } else {
              cb(null, 'Stock Request Add: No new record')

            }

          })
          .catch(e => {
            cb(e)
          })
      },
    }, function (err, results) {
      if (err) {
        syncNew.webContents.send('err', {
          error: 'Server not updated'
        })
        syncNew.webContents.send('updateServer', 'a')
        console.log(err)
      } else {
        console.log(results)
        syncNew.webContents.send('success', {
          msg: 'Server updated successfully'
        })
        syncNew.webContents.send('updateServer', 'a')

      }
    })
  })
  syncNew.on('close', function () {
    var myChan = ['err', 'success',
      'updateServer',
      'errUpdDb',
      'successUpdDb',
      'updateDB'
    ]
    for (const i in myChan) {
      ipcMain.removeAllListeners(myChan[i])
      console.log('channel removed ', myChan[i])
    }
    syncNew = null;
  })
}

// console.log({
//   node_env : process.env
// })
// process.env.NODE_ENV = 'production';
// Create menu template
const mainMenuTemplate = [
  // Each object is a dropdown
  {
    label: 'File',
    submenu: [{
      label: 'Quit',
      accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
      click() {
        app.quit();
      }
    }]
  },
  // {
  //   label: 'Screening',
  //   submenu: [{
  //       label: 'Add Child',
  //       click() {
  //         scrAddChild();
  //       }
  //     },
  //     {
  //       label: 'Add PLW',
  //       click() {
  //         scrAddPlw();
  //       }
  //     },
  //     {
  //       label: 'Reports',
  //       click() {
  //         scrReports();
  //       }
  //     },
  //     {
  //       label: 'Demo',
  //       click() {
  //         runDemo();
  //       }
  //     }
  //   ]
  // },
  {
    label: 'Admin',
    submenu: [
      // {
      //   label: 'Geo Refference',
      //   click() {
      //     createGeoWindow();
      //   }
      // },
      {
        label: 'Sync',
        click() {
          newSync();
          // createSyncWindow();
        }
      }
    ]
  },
  {
    label: 'View',
    submenu: [{
        role: 'reload'
      },
      {
        role: 'forcereload'
      },
       { role: 'toggledevtools'}
      ,
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  }
];



app.on('window-all-closed', () => {
  mainWindow = null;
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// External files;

var clientMessages = {
  sucMsg,
  errMsg
};

require("./mainfunc/supervisors")(ipcMain, knex, fs, clientMessages);
require("./mainfunc/stafflist")(ipcMain, knex, fs, clientMessages);
require("./mainfunc/villagelist")(ipcMain, knex, fs, clientMessages);
// Managing OTP EXIT Update and Delete
require("./mainfunc/otpExitUpd")(ipcMain, knex, fs, clientMessages, async);
// Managing OTP Addmision Update and delete
require("./mainfunc/otpAddUpd")(ipcMain, knex, fs, clientMessages, async);
// Managing PLW Screening  Update and delete
require("./mainfunc/scrPlwUpd")(ipcMain, knex, fs, clientMessages, async);
// Managing Children Screening  Update and delete
require("./mainfunc/scrChUpd")(ipcMain, knex, fs, clientMessages, async);
// Managing Sessions Add, Update and delete
require("./mainfunc/sessions")(ipcMain, knex, fs, clientMessages, async, imran.client, localDate);
// Managing Sessions Report
require("./mainfunc/sessionReport")(ipcMain, knex, fs, clientMessages, async, imran.client, localDate);
// Managing Site Stock out
require("./mainfunc/siteStockOut")(ipcMain, knex, fs, clientMessages, async);
// Managing Stock Distribution
require("./mainfunc/stockDist")(ipcMain, knex, fs, clientMessages, async);
// Managing Dashboard
// require("./mainfunc/dashboard")(ipcMain, knex, fs, clientMessages, async);
require("./mainfunc/dashboard")(ipcMain, knex, fs, clientMessages, async);
// Managing OTP Add and Exit Report
require("./mainfunc/otpAddExitReport")(ipcMain, knex, fs, clientMessages, async);
