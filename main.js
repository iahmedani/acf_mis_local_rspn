const electron = require('electron');
const {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} = electron;
const url = require('url');
const path = require('path');
var fs = require('fs');
var imran = JSON.parse(fs.readFileSync('./settings.json', 'utf8'))
console.log(imran);
var async = require('async');
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: 'acf_mis_local.sqlite3'


    // filename: './acf_mis_local.sqlite3'
  }
});
console.log()
var db = require('./dbTest');
const request = require('request');

// const bParser = require('body-parser');

// app.use(bParser.json());

//Creating main window
app.on('ready', () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  let mainWindow = new BrowserWindow({
    width, height
  });
  // mainWindow.fullscreen = true;
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/html/index2.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });
  ipcMain.on('mainWindowLoaded', function () {
    mainWindow.webContents.send('msg', 'Message from main app');
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
  // Build main menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);

});

function sessions() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  var client_id = imran.client;
  session = new BrowserWindow({
    width, height,
    title: 'Sessions'
  });
  session.loadURL(url.format({
    pathname: path.join(__dirname, '/html/sessions.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        session.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        session.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        session.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        session.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouse', function (event, ucs) {
    console.log(ucs)
    knex('tblGeoNutSite')
      .where({
        uc_id: ucs
      })
      .then(result => {
        session.webContents.send('hh', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('get', (e, data) => {
    console.log(data);
    knex('tblSessions')
      .where('site_id', data)
      .then(result => {
        session.webContents.send('get', ({
          result: result
        }))
      })
      .catch(e => {
        session.webContents.send('get', ({
          err: e
        }))
      })
  });
  ipcMain.on('insert', (e, item) => {
    item.upload_status = 0;
    item.client_id = client_id;
    item.created_at = localDate();
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
        session.webContents.send('insert', ({
          result: result
        }))
      })
      .catch(e => {
        session.webContents.send('insert', ({
          err: e
        }))
      })
  });
  ipcMain.on('update', (e, item) => {
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
        session.webContents.send('update', ({
          result: result
        }))
      })
      .catch(e => {
        session.webContents.send('update', ({
          err: e
        }))
      })
  });

}

function otpAddUpdate() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  var client = imran.client;
  otpUpdate = new BrowserWindow({
    width,
    height,
    title: 'Follow-Ups'
  })
  otpUpdate.loadURL(url.format({
    pathname: path.join(__dirname, '/html/otpAddUpd.html'),
    protocol: 'file:',
    slashes: true
  }))

  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        otpUpdate.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        otpUpdate.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        otpUpdate.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        otpUpdate.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouse', function (event, ucs) {
    console.log(ucs)
    knex('tblGeoNutSite')
      .where({
        uc_id: ucs
      })
      .then(result => {
        otpUpdate.webContents.send('hh', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('allOtp', (e, site_id) => {
    knex('tblOtpAdd')
      .where({
        site_id: site_id
      })
      .then(result => {
        otpUpdate.webContents.send('allOtp', ({
          result: result
        }))
      })
      .catch(e => {
        otpUpdate.webContents.send('allOtp', ({
          err: e
        }))
      })
  })
  ipcMain.on('updateOtp', (e, item) => {
    console.log(item);
    item.upload_status = 2;
    knex('tblOtpAdd')
      .update(item)
      .where('otp_id', item.otp_id)
      .then(result => {
        console.log(result)
        return knex('tblOtpAdd')
          .where('otp_id', item.otp_id)
      })
      .then(result => {
        otpUpdate.webContents.send('updateOtp', ({
          result: result
        }))
      })
      .catch(e => {
        console.log(e)
        otpUpdate.webContents.send('updateOtp', ({
          err: e
        }))
      })
  })
}

function otpExit() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  var client_id = imran.client,
    exitOtp = new BrowserWindow({
      height,
      width,
      title: 'OTP Exit'
    })
  exitOtp.loadURL(url.format({
    pathname: path.join(__dirname, '/html/otpExit.html'),
    protocol: 'file:',
    slashes: true
  }))
  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        exitOtp.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        exitOtp.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        exitOtp.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        exitOtp.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouse', function (event, ucs) {
    console.log(ucs)
    knex('tblGeoNutSite')
      .where({
        uc_id: ucs
      })
      .then(result => {
        exitOtp.webContents.send('hh', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });

  ipcMain.on('get', (e, site_id) => {

    knex.from('tblOtpAdd')
      .innerJoin('tblInterimOtp', 'tblInterimOtp.otp_id', 'tblOtpAdd.otp_id')
      .where({
        site_id: site_id,
        status: 'open'
      })
      .then(result => {
        exitOtp.webContents.send('have', ({
          result: result
        }))
      })
      .catch(e => {
        exitOtp.webContents.send('have', ({
          err: e
        }))
      })
  });
  ipcMain.on('otpExit', (e, data) => {
    data.client_id = imran.client;
    data.upload_status = 0;
    knex('tblSessions')
      .insert(data)
      .then(result => {
        console.log(result);

        exitOtp.webContents.send('resultSent', ({
          msg: 'Record saved successfully'
        }))
        return knex('tblInterimOtp')
          .where('otp_id', data.otp_id)
          .update({
            status: data.exit_reason
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
        exitOtp.webContents.send('resultSent', ({
          msg: 'Record not saved, error in db'
        }))
      })

  })

}

function otpExitEdit() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  var client_id = imran.client,
    exitOtpEdit = new BrowserWindow({
      height,
      width,
      title: 'OTP Exit'
    })
  exitOtpEdit.loadURL(url.format({
    pathname: path.join(__dirname, '/html/otpExitEdit.html'),
    protocol: 'file:',
    slashes: true
  }))
  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        exitOtpEdit.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        exitOtpEdit.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        exitOtpEdit.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        exitOtpEdit.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouse', function (event, ucs) {
    console.log(ucs)
    knex('tblGeoNutSite')
      .where({
        uc_id: ucs
      })
      .then(result => {
        exitOtpEdit.webContents.send('hh', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });

  ipcMain.on('get', (e, site_id) => {

    knex.from('tblOtpAdd')
      .innerJoin('tblOtpExit', 'tblOtpExit.otp_id', 'tblOtpAdd.otp_id')
      .where({
        site_id: site_id,
      })
      .then(result => {
        exitOtpEdit.webContents.send('have', ({
          result: result
        }))
      })
      .catch(e => {
        exitOtpEdit.webContents.send('have', ({
          err: e
        }))
      })
  });
  ipcMain.on('otpExit', (e, data) => {
    data.client_id = imran.client;
    data.upload_status = 2;
    knex('tblOtpExit')
      .where('otp_id', data.otp_id)
      .update(data)
      .then(result => {
        console.log(result);

        exitOtpEdit.webContents.send('resultSent', ({
          msg: 'Record updated successfully'
        }))
        return knex('tblInterimOtp')
          .where('otp_id', data.otp_id)
          .update({
            status: data.exit_reason
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
        exitOtpEdit.webContents.send('resultSent', ({
          msg: 'Record not updated, error in db'
        }))
      })

  })

}

function addFollowupOtp() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  var client = imran.client;
  otpFollowup = new BrowserWindow({
    width,height,
    title: 'Follow-Ups'
  })
  otpFollowup.loadURL(url.format({
    pathname: path.join(__dirname, '/html/otpFollowUp.html'),
    protocol: 'file:',
    slashes: true
  }))

  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        otpFollowup.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        otpFollowup.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        otpFollowup.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        otpFollowup.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouse', function (event, ucs) {
    console.log(ucs)
    knex('tblGeoNutSite')
      .where({
        uc_id: ucs
      })
      .then(result => {
        otpFollowup.webContents.send('hh', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });

  // sending data from interm table
  ipcMain.on('getInterim', (e, data) => {
    console.log('data from html', data);
    knex.from('tblOtpAdd')
      .innerJoin('tblInterimOtp', 'tblInterimOtp.otp_id', 'tblOtpAdd.otp_id')
      .where({
        site_id: data,
        status: 'open'
      })
      .then(result => {
        // result.location = 'Follow up interim call'
        console.log(result)
        otpFollowup.webContents.send('getInterim', ({
          result: result
        }))
      })
      .catch(e => {
        // e.location = 'Follow up interim call'
        console.log(e);
        otpFollowup.webContents.send('getInterim', ({
          err: e
        }))
      })
  })
  // Add follow up
  ipcMain.on('addFollowup', (e, item) => {
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
      next_followup: function () {
        var myDate = new Date();
        myDate.setDate(myDate.getDate() + 15)
        return myDate.toLocaleDateString();
      }()
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
      curr_date: localDate(),
      next_followup: function () {
        var myDate = new Date();
        myDate.setDate(myDate.getDate() + 15)
        return myDate.toLocaleDateString();
      }()
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
        otpFollowup.webContents.send('addFollowup', ({
          result: result
        }))
      })
      .catch(e => {
        // e.location = 'Follow up interim call'
        console.log(e);
        otpFollowup.webContents.send('addFollowup', ({
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


  })
}

function addVill() {
  var client = imran.client;
  villAdd = new BrowserWindow({
    width: 800,
    height: 800,
    title: 'Add Village'
  })
  villAdd.loadURL(url.format({
    pathname: path.join(__dirname, '/html/addVill.html'),
    protocol: 'file:',
    slashes: true
  }))
  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        villAdd.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        villAdd.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        villAdd.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        villAdd.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouse', function (event, ucs) {
    console.log(ucs)
    knex('tblGeoNutSite')
      .where({
        uc_id: ucs
      })
      .then(result => {
        villAdd.webContents.send('hh', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });

  ipcMain.on('villList', (e, site) => {
    knex('tblVillage')
      .then(result => {
        villAdd.webContents.send('villList', ({
          result: result
        }))
      })
      .catch(e => {
        villAdd.webContents.send('villList', ({
          err: e
        }))
      })
  })

  ipcMain.on('insertVillage', (e, data) => {
    console.log(data);
    var new_vill = {
      site_id: data.site_id,
      village: data.item.village
    }
    console.log(new_vill);
    knex('tblVillage')
      .insert(new_vill)
      .then(result => {
        console.log(result[0]);
        return knex('tblVillage').where('vill_id', result[0])
      })
      .then(result => {
        console.log({
          r: result,
          loc: 'tblVillage'
        })
        villAdd.webContents.send('insertVillage', ({
          result: result[0]
        }))
      })
      .catch(e => {
        console.log({
          r: e,
          loc: 'tblVillage'
        })
        villAdd.webContents.send('insertVillage', ({
          err: e
        }))
      })

  })

}


function localDate() {
  var x = new Date();
  x.setDate(x.getDate());
  return x.toLocaleDateString();
}
// console.log(localDate());
// Creating Screening : Add Child Window
function scrAddChild() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  var client = imran.client;

  addScrChild = new BrowserWindow({
    width,height,
    title: 'Screening: Add Child'
  });
  addScrChild.loadURL(url.format({
    pathname: path.join(__dirname, '/html/scrChild.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        addScrChild.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        addScrChild.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        addScrChild.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        addScrChild.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouse', function (event, ucs) {
    console.log(ucs)
    knex('tblGeoNutSite')
      .where({
        uc_id: ucs
      })
      .then(result => {
        addScrChild.webContents.send('hh', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouseType', function (event, h_id) {
    knex('tblGeoNutSite')
      .where({
        id: h_id
      })
      .then(result => {
        addScrChild.webContents.send('hhType', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });

  ipcMain.on('submitFormChild', function (evenet, scrForm) {
    var village = scrForm.txtVillage;
    var site_id = scrForm.ddHealthHouse;
    var screening_type = scrForm.scrChildScrType;
    var screening_date = scrForm.txtScrChildDate;
    var data_entry_date = localDate();
    var staff_name = scrForm.txtStaffName;
    var data = [];
    var single = {};
    if (Array.isArray(scrForm.txtScrChildName)) {
      scrForm.txtScrChildName.forEach((el, i) => {
        data.push({
          client_id: client,
          screening_type: screening_type,
          screening_date: screening_date,
          data_entry_date: data_entry_date,
          site_id: site_id,
          site_village: village,
          staff_name: staff_name,
          name: el,
          f_or_h_name: scrForm.txtScrChildFather[i],
          address: scrForm.txtScrChildAddr[i],
          age: scrForm.numScrChildAge[i],
          is_plw: 0,
          gender: scrForm.ddGender[i],
          muac: scrForm.numMUAC[i],
          oedema: scrForm.ddYesNoOedema[i],
          no_mm_sch: scrForm.numMMSche[i],
          deworming: scrForm.ddYesNoDeworming[i],
          status: scrForm.ddScrChildStatus[i],
          upload_status: 0
        });
      });
    } else {
      single.client_id = client;
      single.screening_type = screening_type;
      single.screening_date = screening_date;
      single.data_entry_date = data_entry_date
      single.site_id = site_id;
      single.site_village = village;
      single.staff_name = staff_name;
      single.name = scrForm.txtScrChildName;
      single.f_or_h_name = scrForm.txtScrChildFather;
      single.address = scrForm.txtScrChildAddr;
      single.age = scrForm.numScrChildAge;
      single.is_plw = 0,
        single.gender = scrForm.ddGender,
        single.muac = scrForm.numMUAC,
        single.oedema = scrForm.ddYesNoOedema,
        single.no_mm_sch = scrForm.numMMSche,
        single.deworming = scrForm.ddYesNoDeworming;
      single.status = scrForm.ddScrChildStatus;
      single.upload_status = 0;
    }
    if (data.length < 1) {
      knex('Screening')
        .insert(single)
        .then(result => {
          addScrChild.webContents.send("resultSent", {
            'msg': 'record added'
          });
        })
        .catch(err => {
          addScrChild.webContents.send("resultSent", {
            'msg': 'eror occured, plz try again'
          });
        })
    } else {
      knex('Screening')
        .insert(data)
        .then(result => {
          addScrChild.webContents.send("resultSent", {
            'msg': 'records added'
          });
        })
        .catch(err => {
          addScrChild.webContents.send("resultSent", {
            'msg': 'eror occured, plz try again'
          });
        })
    }

    console.log(scrForm);
  });
  addScrChild.on('close', function () {
    addScrChild = null;
  })
}

// Creating Screening : Add PLW Window
function scrAddPlw() {
  var client = imran.client;
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  addScrPlw = new BrowserWindow({
    width,
    height,
    title: 'Screening: Add PLW'
  });
  addScrPlw.loadURL(url.format({
    pathname: path.join(__dirname, '/html/scrPlw.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        addScrPlw.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        addScrPlw.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        addScrPlw.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        addScrPlw.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouse', function (event, ucs) {
    console.log(ucs)
    knex('tblGeoNutSite')
      .where({
        uc_id: ucs
      })
      .then(result => {
        addScrPlw.webContents.send('hh', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouseType', function (event, h_id) {
    knex('tblGeoNutSite')
      .where({
        id: h_id
      })
      .then(result => {
        addScrPlw.webContents.send('hhType', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('submitFormPlw', function (evenet, scrForm) {
    var village = scrForm.txtVillage;
    var site_id = scrForm.ddHealthHouse;
    var screening_type = scrForm.scrPlwScrType;
    var screening_date = scrForm.txtScrPlwDate;
    var data_entry_date = localDate();
    var staff_name = scrForm.txtStaffName;
    var data = [];
    var single = {};
    if (Array.isArray(scrForm.txtScrPlwName)) {
      scrForm.txtScrPlwName.forEach((el, i) => {
        data.push({
          client_id: client,
          screening_type: screening_type,
          screening_date: screening_date,
          data_entry_date: data_entry_date,
          site_id: site_id,
          site_village: village,
          staff_name: staff_name,
          name: el,
          f_or_h_name: scrForm.txtScrPlwHusband[i],
          address: scrForm.txtScrPlwAddr[i],
          age: scrForm.numScrPlwAge[i],
          is_plw: 1,
          gender: 2,
          plw_type: scrForm.ddPlwStatus[i],
          muac: scrForm.numMUAC[i],
          no_mm_tabs: scrForm.numMMTablets[i],
          status: scrForm.ddScrPlwStatus[i],
          upload_status: 0
        });
      });
    } else {
      single.client_id = client;
      single.screening_type = screening_type;
      single.screening_date = screening_date;
      single.data_entry_date = data_entry_date;
      single.site_id = site_id;
      single.site_village = village;
      single.staff_name = staff_name;
      single.name = scrForm.txtScrPlwName;
      single.f_or_h_name = scrForm.txtScrPlwHusband;
      single.address = scrForm.txtScrPlwAddr;
      single.age = scrForm.numScrPlwAge;
      single.is_plw = 1,
        single.gender = 2,
        single.plw_type = scrForm.ddPlwStatus;
      single.muac = scrForm.numMUAC,
        single.no_mm_tabs = scrForm.numMMTablets,
        single.status = scrForm.ddScrPlwStatus;
      single.upload_status = 0;
    }
    if (data.length < 1) {
      console.log('single plw add')
      console.log(single);
      knex('Screening')
        .insert(single)
        .then(result => {
          console.log('plw single', result);
          addScrPlw.webContents.send("resultSent", {
            'msg': 'record added'
          });
        })
        .catch(err => {
          console.log(err);
          addScrPlw.webContents.send("resultSent", {
            'msg': 'eror occured, plz try again'
          });
        })
    } else {
      knex('Screening')
        .insert(data)
        .then(result => {
          addScrPlw.webContents.send("resultSent", {
            'msg': 'records added'
          });
        })
        .catch(err => {
          addScrPlw.webContents.send("resultSent", {
            'msg': 'eror occured, plz try again'
          });
        })
    }

    console.log(scrForm);
  });



  addScrPlw.on('close', function () {
    addScrPlw = null;
  })
}
// Creating OTP : Add OTP Window
function otpAdd() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  var client = imran.client;
  addOtp = new BrowserWindow({
    width,height,
    title: 'Screening: Add PLW'
  });
  addOtp.loadURL(url.format({
    pathname: path.join(__dirname, '/html/otpAdd.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        addOtp.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        addOtp.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        addOtp.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        addOtp.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getHealthHouse', function (event, ucs) {
    console.log(ucs)
    knex('tblGeoNutSite')
      .where({
        uc_id: ucs
      })
      .then(result => {
        addOtp.webContents.send('hh', ({
          hh: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });

  ipcMain.on('submitOtpAdd', function (evenet, addFormOtp) {
    //console.log(addFormOtp);
    delete addFormOtp.province;
    delete addFormOtp.Tehsil;
    delete addFormOtp.district;
    delete addFormOtp.province;
    delete addFormOtp.ddHealthHouseOTP;
    delete addFormOtp.uc;
    addFormOtp.client_id = imran.client;
    console.log(addFormOtp);
    knex('tblOtpAdd')
      .insert(addFormOtp)
      .then(result => {
        console.log(result + 'OTP addmision added')
        addOtp.webContents.send("resultSent", {
          'msg': 'records added'
        });
        var interimData = {
          otp_id: result[0],
          client_id: imran.client,
          muac: addFormOtp.muac,
          weight: addFormOtp.weight,
          ration1: addFormOtp.ration1,
          quantity1: addFormOtp.quantity1,
          ration2: addFormOtp.ration2,
          quantity2: addFormOtp.quantity2,
          ration3: addFormOtp.ration3,
          quantity3: addFormOtp.quantity3,
          curr_date: localDate(),
          status: 'open',
          next_followup: function () {
            var myDate = new Date();
            myDate.setDate(myDate.getDate() + 15)
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
        console.log(e + 'OTP add error');
        addOtp.webContents.send("resultSent", {
          'msg': 'records not added, plz try again'
        });
      })
  })

}

function myUpdate() {
  upd = new BrowserWindow({
    width: 800,
    height: 800,
    title: 'Update'
  })
  upd.loadURL(url.format({
    pathname: path.join(__dirname, '/html/myUpdate.html'),
    protocol: 'file:',
    slashes: true
  }));

  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        upd.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        upd.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        upd.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        upd.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('get', function (e, qry) {
    db.scrPlw(qry, (err, result) => {
      upd.webContents.send('get', ({
          err: err,
          result: result,

        })

      )
      console.log(result);
    })
  })
  ipcMain.on('update', function (e, data) {
    var plwUpd = {
      screening_id: data.screening_id,
      name: data.name,
      f_or_h_name: data.f_or_h_name,
      muac: data.muac,
      plw_type: data.plw_type,
      status: data.status
    }
    db.updScr(plwUpd, function (err, result) {
      console.log(result);
      upd.webContents.send('update', ({
        result,
        err: null
      }))
    })
  })
  upd.on('close', function () {
    upd = null;
  })
}

function scrPlUpd() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  scrPlUpdate = new BrowserWindow({
    width,height,
    title: 'Update'
  })
  scrPlUpdate.loadURL(url.format({
    pathname: path.join(__dirname, '/html/scrPlUpd.html'),
    protocol: 'file:',
    slashes: true
  }));

  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        scrPlUpdate.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        scrPlUpdate.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        scrPlUpdate.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        scrPlUpdate.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('get', function (e, qry) {
    db.scrPlw(qry, (err, result) => {
      scrPlUpdate.webContents.send('get', ({
          err: err,
          result: result,

        })

      )
      console.log(result);
    })
  })
  ipcMain.on('update', function (e, data) {
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
      scrPlUpdate.webContents.send('update', ({
        result,
        err: null
      }))
    })
  })
  scrPlUpdate.on('close', function () {
    scrPlUpdate = null;
  })
}

function scrChUpd() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  scrChUpdate = new BrowserWindow({
    width,height,
    title: 'Update'
  })
  scrChUpdate.loadURL(url.format({
    pathname: path.join(__dirname, '/html/scrChUpd.html'),
    protocol: 'file:',
    slashes: true
  }));

  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        scrChUpdate.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        scrChUpdate.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        scrChUpdate.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        scrChUpdate.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('get', function (e, qry) {
    db.scrChild(qry, (err, result) => {
      scrChUpdate.webContents.send('get', ({
          err: err,
          result: result,

        })

      )
      console.log(result);
    })
  })
  ipcMain.on('update', function (e, data) {
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
      scrChUpdate.webContents.send('update', ({
        result,
        err: null
      }))
    })
  })
  scrChUpdate.on('close', function () {
    scrPlUpdate = null;
  })
}
// Creating Screening : Reports
function scrReports() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  scrReport = new BrowserWindow({
    width,height,
    title: 'Screening: Reports'
  });
  scrReport.loadURL(url.format({
    pathname: path.join(__dirname, '/html/scrReports.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        scrReport.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        scrReport.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        scrReport.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        scrReport.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
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
    scrReport = null;
  })
}

// Creating Screening : Reports
function defReports() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  reportDef = new BrowserWindow({
    width:250,height:250,
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
      .then(result=>{
        console.log(result);
        reportDef.webContents.send('data',{result: result})
      })
      .catch(e=>{
        console.log(e);
      })

    })
    
 
    reportDef.on('close', function () {
      reportDef = null;
  })
}


// Creating Screening : Reports
function otpReports() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  reportOtp = new BrowserWindow({
    width,height,
    title: 'OTP: Reports'
  });
  reportOtp.loadURL(url.format({
    pathname: path.join(__dirname, '/html/otpReportv1.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('getProvince', function (event) {
    knex('tblGeoProvince')
      .then(result => {
        reportOtp.webContents.send('province', ({
          province: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getDistrict', function (event, prov) {
    console.log(prov)
    knex('tblGeoDistrict')
      .where({
        province_id: prov
      })
      .then(result => {
        reportOtp.webContents.send('district', ({
          district: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getTehsil', function (event, dist) {
    console.log(dist)
    knex('tblGeoTehsil')
      .where({
        district_id: dist
      })
      .then(result => {
        reportOtp.webContents.send('tehsil', ({
          tehsil: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
  });
  ipcMain.on('getUC', function (event, tehs) {
    console.log(tehs)
    knex('tblGeoUC')
      .where({
        tehsil_id: tehs
      })
      .then(result => {
        reportOtp.webContents.send('uc', ({
          uc: result
        }));
      })
      .catch(err => {
        console.log(err);
      })
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

// Creating Admin : sync Refference
function createSyncWindow() {
  var surl = imran.server;
  console.log(surl);
  syncData = new BrowserWindow({
    width: 800,
    height: 800,
    title: 'System: Sync'
  });
  syncData.loadURL(url.format({
    pathname: path.join(__dirname, '/html/sync.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('updateDB', function () {
    request(surl + '/getProvince', function (err, response, body) {
      if (err) {
        console.log(err)
      } else {
        var data = JSON.parse(body);
        if (data.length > 0) {
          data.forEach(el => {
            knex('tblGeoProvince')
              .where({
                id: el.id
              })
              .then(result => {
                if (result.length > 0) {
                  console.log('Province Allready exists')
                } else {
                  knex.insert(el)
                    .into('tblGeoProvince')
                    .then(ret => {
                      console.log(ret);

                    })

                }
              })

          })
        } else {
          syncData.webContents.send("resultSent", {
            'msg': 'No province to be added'
          });

        }


      }
    })
    request(surl + '/getDistrict', function (err, response, body) {
      if (err) {
        console.log(err)
      } else {
        // var data = JSON.parse(body);
        var data = JSON.parse(body);
        if (data.length > 0) {
          data.forEach(el => {
            knex('tblGeoDistrict')
              .where({
                id: el.id
              })
              .then(result => {
                if (result.length > 0) {
                  console.log('District Allready exists')
                } else {
                  knex.insert(el)
                    .into('tblGeoDistrict')
                    .then(ret => {
                      console.log(ret);

                    })

                }
              })

          })
        } else {
          syncData.webContents.send("resultSent", {
            'msg': 'No District to be added'
          });

        }
      }
    })
    request(surl + '/getTehsil', function (err, response, body) {
      if (err) {
        console.log(err)
      } else {
        var data = JSON.parse(body);
        if (data.length > 0) {
          data.forEach(el => {
            knex('tblGeoTehsil')
              .where({
                id: el.id
              })
              .then(result => {
                if (result.length > 0) {
                  console.log('Tehsil Allready exists')
                } else {
                  knex.insert(el)
                    .into('tblGeoTehsil')
                    .then(ret => {
                      console.log(ret);

                    })

                }
              })

          })
        } else {
          syncData.webContents.send("resultSent", {
            'msg': 'No Tehsil to be added'
          });

        }
      }
    })
    request(surl + '/getUC', function (err, response, body) {
      if (err) {
        console.log(err)
      } else {
        var data = JSON.parse(body);
        if (data.length > 0) {
          data.forEach(el => {
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

          })
        } else {
          syncData.webContents.send("resultSent", {
            'msg': 'No UC to be added'
          });

        }
      }
    })
    request(surl + '/getSite', function (err, response, body) {
      if (err) {
        console.log(err)
      } else {
        var data = JSON.parse(body);
        if (data.length > 0) {
          data.forEach(el => {
            knex('tblGeoNutSite')
              .where({
                id: el.id
              })
              .then(result => {
                if (result.length > 0) {
                  console.log('Site Allready exists')
                } else {
                  knex.insert(el)
                    .into('tblGeoNutSite')
                    .then(ret => {
                      console.log(ret);

                    })

                }
              })

          })
        } else {
          syncData.webContents.send("resultSent", {
            'msg': 'No site to be added'
          });

        }

      }
    })
    syncData.webContents.send("resultSent", {
      'msg': 'sync complete'
    });
  });
  ipcMain.on('updateServer', function () {
    console.log('sync clicked')
    knex('Screening')
      .where({
        upload_status: 0
      })
      .then(results => {
        if (results.length < 1) {
          syncData.webContents.send("resultSent", {
            'msg': 'Server already updated'
          });
        }
        if (results) {
          results.forEach(el => {
            var options = {
              method: 'POST',
              uri: surl + '/screening',
              body: el,
              json: true
            }
            request(options, function (err, response, body) {
              if (err) {
                console.log(err)
                body = JSON.parse(body);

              } else if (body.msg === 'Child record added' || body.msg === 'PLW record added') {
                console.log(body);
                knex('Screening')
                  .where({
                    screening_id: el.screening_id
                  })
                  .update({
                    upload_status: 1
                  })
                  .then(result => {
                    console.log(result);
                    syncData.webContents.send("resultSent", {
                      'msg': body.msg
                    });

                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            })
          })

        }
      })
    knex('Screening')
      .where({
        upload_status: 2
      })
      .then(results => {
        if (results.length < 1) {
          syncData.webContents.send("resultSent", {
            'msg': 'Server already updated'
          });
        }
        if (results) {
          results.forEach(el => {
            var options = {
              method: 'POST',
              uri: surl + '/update_screening',
              body: el,
              json: true
            }
            request(options, function (err, response, body) {
              if (err) {
                console.log(err)
                body = JSON.parse(body);
              } else if (body.msg === 'Child record updated' || body.msg === 'PLW record updated') {
                console.log(body);
                knex('Screening')
                  .where({
                    screening_id: el.screening_id
                  })
                  .update({
                    upload_status: 1
                  })
                  .then(result => {
                    syncData.webContents.send("resultSent", {
                      'msg': body.msg
                    });
                    console.log(result);
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            })
          })

        }
      })
    //Update server with new OTP addmision
    knex('tblOtpAdd')
      .where({
        upload_status: 0
      })
      .orWhereNull('upload_status')
      .then(result => {
        if (result.length < 1) {
          syncData.webContents.send("resultSent", {
            'msg': 'Server already updated with OTP Addmision'
          });
        } else {
          result.forEach(el => {
            var options = {
              method: 'POST',
              uri: surl + '/otpAdd',
              body: el,
              json: true
            }
            request(options, function (err, response, body) {
              console.log(body);
              if (err) {
                console.log(err)
              } else if (body.msg === 'OTP Admission Added') {
                knex('tblOtpAdd')
                  .where({
                    otp_id: el.otp_id
                  })
                  .update({
                    upload_status: 1
                  })
                  .then(result => {
                    syncData.webContents.send("resultSent", {
                      'msg': body.msg
                    });
                    console.log(result);
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            })
          })
        }

      })

    //Update server with update OTP addmision
    knex('tblOtpAdd')
      .where({
        upload_status: 2
      })
      .then(result => {
        if (result.length < 1) {
          syncData.webContents.send("resultSent", {
            'msg': 'Server already updated with OTP Addmision'
          });
        } else {
          result.forEach(el => {
            var options = {
              method: 'PUT',
              uri: surl + '/otpAdd',
              body: el,
              json: true
            }
            request(options, function (err, response, body) {
              if (err) {
                console.log(err)
                // body = JSON.parse(body);
              } else if (body.msg === 'OTP Admission Updated') {
                console.log(body);
                knex('tblOtpAdd')
                  .where({
                    otp_id: el.otp_id
                  })
                  .update({
                    upload_status: 1
                  })
                  .then(result => {
                    syncData.webContents.send("resultSent", {
                      'msg': body.msg
                    });
                    console.log(result);
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            })
          })
        }

      })

    //Update server with OTP Exit;
    knex('tblOtpExit')
    .where({
      upload_status: 0
    })
    .orWhereNull('upload_status')
    .then(result => {
      if (result.length < 1) {
        syncData.webContents.send("resultSent", {
          'msg': 'Server already updated with OTP Exits'
        });
      } else {
        result.forEach(el => {
          var options = {
            method: 'POST',
            uri: surl + '/otpExit',
            body: el,
            json: true
          }
          request(options, function (err, response, body) {
            console.log(response);
            // console.log(body);
            if (err) console.log(err)
            if (body) {
              console.log(body);
              knex('tblOtpExit')
                .where({
                  otp_id: el.otp_id
                })
                .update({
                  upload_status: 1
                })
                .then(result => {
                  syncData.webContents.send("resultSent", {
                    'msg': body.msg
                  });
                  console.log(result);
                })
                .catch(err => {
                  console.log(err);
                })
            }
          })
        })
      }

    })

  // Update server with update OTP addmision
  knex('tblOtpExit')
    .where({
      upload_status: 2
    })
    .then(result => {
      if (result.length < 1) {
        syncData.webContents.send("resultSent", {
          'msg': 'Server already updated with OTP Addmision'
        });
      } else {
        result.forEach(el => {
          var options = {
            method: 'PUT',
            uri: surl + '/otpExit',
            body: el,
            json: true
          }
          request(options, function (err, response, body) {
            if (err) {
              console.log(err)
              // body = JSON.parse(body);
            } else if (body) {
              // .msg === 'OTP Admission Updated')
              // console.log(body);
              knex('tblOtpExit')
                .where({
                  otp_id: el.otp_id
                })
                .update({
                  upload_status: 1
                })
                .then(result => {
                  syncData.webContents.send("resultSent", {
                    'msg': body.msg
                  });
                  console.log(result);
                })
                .catch(err => {
                  console.log(err);
                })
            }
          })
        })
      }

    })
  
  knex('tblSessions')
      .where({upload_status:0})
      .orWhereNull('upload_status')
      .then(result=>{
        if( result.length < 1){
          syncData.webContents.send("resultSent", {
            'msg': 'Server already updated with Sessions'
          });
        } else {
          result.forEach(el => {
            var options = {
              method: 'POST',
              uri: surl + '/sessions',
              body: el,
              json: true
            }
            request(options, function (err, response, body) {
              if (err) {
                console.log(err)
                // body = JSON.parse(body);
              } else if (body){
              // .msg === 'Session Added') {
                console.log(body);
                knex('tblSessions')
                  .where({
                    session_id: el.session_id
                  })
                  .update({
                    upload_status: 1
                  })
                  .then(result => {
                    syncData.webContents.send("resultSent", {
                      'msg': body.msg
                    });
                    console.log(result);
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            })
          })
        }
      })


  knex('tblSessions')
      .where({upload_status:2})
      .then(result=>{
        if( result.length < 1){
          syncData.webContents.send("resultSent", {
            'msg': 'Server already updated with Sessions'
          });
        } else {
          result.forEach(el => {
            var options = {
              method: 'PUT',
              uri: surl + '/sessions',
              body: el,
              json: true
            }
            request(options, function (err, response, body) {
              if (err) {
                console.log(err)
                // body = JSON.parse(body);
              } else if (body){
              // .msg === 'Session Updated') {
                console.log(body);
                knex('tblSessions')
                  .where({
                    session_id: el.session_id
                  })
                  .update({
                    upload_status: 1
                  })
                  .then(result => {
                    syncData.webContents.send("resultSent", {
                      'msg': body.msg
                    });
                    console.log(result);
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            })
          })
        }
      })

      knex('otpFollowup')
      .where({upload_status:0})
      .orWhereNull('upload_status')
      .then(result=>{
        if( result.length < 1){
          syncData.webContents.send("resultSent", {
            'msg': 'Server already updated with followups'
          });
        } else {
          result.forEach(el => {
            var options = {
              method: 'POST',
              uri: surl + '/sessions',
              body: el,
              json: true
            }
            request(options, function (err, response, body) {
              if (err) {
                console.log(err)
                // body = JSON.parse(body);
              } else if (body){
              // .msg === 'Followup Added') {
                console.log(body);
                knex('otpFollowup')
                  .where({
                    followup_id: el.followup_id
                  })
                  .update({
                    upload_status: 1
                  })
                  .then(result => {
                    syncData.webContents.send("resultSent", {
                      'msg': body.msg
                    });
                    console.log(result);
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            })
          })
        }
      })
  })
  syncData.on('close', function () {
    syncData = null;
  })
}

// Creating Admin : sync Refference
function newSync() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  var surl = imran.server;
  console.log(surl);
  syncNew = new BrowserWindow({
    width, height,
    title: 'System: Sync'
  });
  syncNew.loadURL(url.format({
    pathname: path.join(__dirname, '/html/newSync.html'),
    protocol: 'file:',
    slashes: true
  }));
  ipcMain.on('updateDB', function () {
    async.series({
      province: (cb)=>{
        request(surl + '/getProvince', function (err, response, body) {
          console.log(body)
          if (!err) {
            var data = JSON.parse(body);
            if (data.length > 0) {
              data.forEach(el => {
                knex('tblGeoProvince')
                  .where({
                    id: el.id
                  })
                  .then(result=>{
                    if(result.length > 0){
                      console.log('Province Not added as already available')
                    } else {
                    knex('tblGeoProvince')
                    .insert(el)
                    .then(ret => {
                      console.log(ret);
                  })

                    }
                  })
                  
                  .catch(e=>{
                   console.log(e)
                  })    
                })
                cb(null, body)
            }    
          } else{
            cb(err)
          }
        })
      },
      district: (cb)=>{
        request(surl + '/getDistrict', function (err, response, body) {
          if (!err)  {
            // var data = JSON.parse(body);
            var data = JSON.parse(body);
            if (data.length > 0) {
              data.forEach(el => {
                knex('tblGeoDistrict')
                  .where({
                    id: el.id
                  })
                  .then(result=>{
                    if(result.length >0){

                      console.log('District Not added as already available')
                    }else{
                      knex('tblGeoDistrict')
                        .insert(el)
                        .then(ret=>{
                         console.log(ret)
                        })
                    }
                  })
                  
                  .catch(e=>{
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
      tehsil: (cb)=>{
        request(surl + '/getTehsil', function (err, response, body) {
          if (!err)  {
            var data = JSON.parse(body);
            if (data.length > 0) {
              data.forEach(el => {
                knex('tblGeoTehsil')
                  .where({
                    id: el.id
                  })
                  .then(result=>{
                    if(result.length >0){
                    console.log('Tehsil Not added as already available')
                    } else{
                knex('tblGeoTehsil')
                .insert(el)
                .then(ret=>{
                  console.log(ret)
                })
                    }
                  })
                  
                  .catch(e=>{
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
      uc:(cb)=>{
        request(surl + '/getUC', function (err, response, body) {
          if (!err) {
            var data = JSON.parse(body);
            if (data.length > 0) {
              data.forEach(el => {
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
                  .catch(e=>{
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
      site: (cb)=>{
        request(surl + '/getSite', function (err, response, body) {
          if (!err)  {
            var data = JSON.parse(body);
            if (data.length > 0) {
              data.forEach(el => {
                knex('tblGeoNutSite')
                  .where({
                    id: el.id
                  })
                  .then(result=>{
                    if(result.length >0){
                      console.log('Site already avaialble')
                    } else {
                knex('tblGeoNutSite')
                      .insert(el)
                      .then(ret=>{
                        console.log(ret)
                      })
                    }
                  })                  
                  .catch(e=>{
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
    }, function(err, results){
      if(err){
        console.log(err)
        syncNew.webContents.send('error', {error:'DB not updated'})
        syncNew.webContents.send('updateDB', 'a')
      } else {
        console.log(results)
        syncNew.webContents.send('success', {msg: 'DB updated successfully'})
        syncNew.webContents.send('updateDB', 'a')
      }
    })
  });

  ipcMain.on('updateServer', function () {
    async.series({
      uploadScr: (cb)=>{
        knex('Screening')
          .where({upload_status:0})
          .then(result=>{
            var options = {
              method: 'POST',
              uri: surl + '/scrv1',
              body: result,
              json: true
            }
            // console.log(result)
            request(options, (err, response, body)=>{
              if(err){
                cb(err)
              } else {
                console.log(typeof body);
                // body = JSON.parse(body);
                if(body.success === 'SCR Added'){
                  result.forEach(el=>{
                    console.log(el);
                     knex('Screening')
                      .where({screening_id: el.screening_id})
                      .update('upload_status', 1)
                      .then(result=>{
                        console.log(result)
                      })
                  })
                }
                cb(null, body)
              }
            })
          })
          
          .catch(e=>{
            cb(e)
          })
      },
      updateScr: (cb)=>{
        knex('Screening')
          .where({upload_status:2})
          .then(result=>{
            var options = {
              method: 'PUT',
              uri: surl + '/scrv1',
              body: result,
              json: true
            }
            // console.log(result)
            request(options, (err, response, body)=>{
              if(err){
                cb(err)
              } else {
                console.log(typeof body);
                // body = JSON.parse(body);
                if(body.success === 'SCR Updated'){
                  result.forEach(el=>{
                    console.log(el);
                     knex('Screening')
                      .where({screening_id: el.screening_id})
                      .update('upload_status', 1)
                      .then(result=>{
                        console.log(result)
                      })
                  })
                }
                cb(null, body)
              }
            })
          })
          
          .catch(e=>{
            cb(e)
          })
      },
      uploadOtp: (cb)=>{
        knex('tblOtpAdd')
          .where({upload_status: 0})
          .orWhereNull('upload_status')
          .then(result=>{
            var options = {
              method: 'POST',
              uri: surl + '/otpv1',
              body: result,
              json: true
            }
            request(options, (err, response, body)=>{
              if(err){
                cb(err)
              } else {
                if(body.success === 'OTP Added'){
                  cb(null, body);
                  result.forEach(el=>{
                    knex('tblOtpAdd')
                        .where({opt_id: el.otp_id})
                        .update('upload_status',1)
                        .then(x=>{
                          console.log(x)
                        })
                  })
                } else {
                  cb(body);
                }
              }
            })
          })
          .catch(e=>{
            cb(e)
          })
      },
      updateOtp: (cb)=>{
        knex('tblOtpAdd')
          .where({upload_status: 2})
          .orWhereNull('upload_status')
          .then(result=>{
            var options = {
              method: 'PUT',
              uri: surl + '/otpv1',
              body: result,
              json: true
            }
            request(options, (err, response, body)=>{
              if(err){
                cb(err)
              } else {
                if(body.success === 'OTP Updated'){
                  cb(null, body);
                  result.forEach(el=>{
                    knex('tblOtpAdd')
                        .where({opt_id: el.otp_id})
                        .update('upload_status',1)
                        .then(x=>{
                          console.log(x)
                        })
                  })
                } else {
                  cb(body);
                }
              }
            })
          })
          .catch(e=>{
            cb(e)
          })
      },
      uploadOtpExit: (cb)=>{
        knex('tblOtpExit')
          .where({upload_status: 0})
          .orWhereNull('upload_status')
          .then(result=>{
            var options = {
              method: 'POST',
              uri: surl + '/otpExitv1',
              body: result,
              json: true
            }
            request(options, (err, response, body)=>{
              if(err){
                cb(err)
              } else {
                if(body.success === 'OTP Exit Added'){
                  cb(null, body);
                  result.forEach(el=>{
                    knex('tblOtpExit')
                        .where({opt_id: el.otp_id})
                        .update('upload_status',1)
                        .then(x=>{
                          console.log(x)
                        })
                  })
                } else {
                  cb(body);
                }
              }
            })
          })
          .catch(e=>{
            cb(e)
          })
      },
      updateOtpExit: (cb)=>{
        knex('tblOtpExit')
          .where({upload_status: 2})
          .orWhereNull('upload_status')
          .then(result=>{
            var options = {
              method: 'PUT',
              uri: surl + '/otpExitv1',
              body: result,
              json: true
            }
            request(options, (err, response, body)=>{
              if(err){
                cb(err)
              } else {
                if(body.success === 'OTP exit updated'){
                  cb(null, body);
                  result.forEach(el=>{
                    knex('tblOtpExit')
                        .where({opt_id: el.otp_id})
                        .update('upload_status',1)
                        .then(x=>{
                          console.log(x)
                        })
                  })
                } else {
                  cb(body);
                }
              }
            })
          })
          .catch(e=>{
            cb(e)
          })
      },
      uploadSession: (cb)=>{
        knex('tblSessions')
          .where({upload_status: 0})
          .orWhereNull('upload_status')
          .then(result=>{
            var options = {
              method: 'POST',
              uri: surl + '/sessionsv1',
              body: result,
              json: true
            }
            request(options, (err, response, body)=>{
              if(err){
                cb(err)
              } else {
                if(body.success === 'Sessions uploaded'){
                  cb(null, body);
                  result.forEach(el=>{
                    knex('tblSessions')
                        .where({session_id: el.session_id})
                        .update('upload_status',1)
                        .then(x=>{
                          console.log(x)
                        })
                  })
                } else {
                  cb(body);
                }
              }
            })
          })
          .catch(e=>{
            cb(e)
          })
      },
      updateSession: (cb)=>{
        knex('tblSessions')
          .where({upload_status: 2})
          .orWhereNull('upload_status')
          .then(result=>{
            var options = {
              method: 'PUT',
              uri: surl + '/sessionsv1',
              body: result,
              json: true
            }
            request(options, (err, response, body)=>{
              if(err){
                cb(err)
              } else {
                if(body.success === 'Sessions Updated'){
                  cb(null, body);
                  result.forEach(el=>{
                    knex('tblSessions')
                        .where({session_id: el.session_id})
                        .update('upload_status',1)
                        .then(x=>{
                          console.log(x)
                        })
                  })
                } else {
                  cb(body);
                }
              }
            })
          })
          .catch(e=>{
            cb(e)
          })
      },
      uploadFollowup: (cb)=>{
        knex('tblOtpFollowup')
          .where({upload_status:0})
          .then(result=>{
            var options = {
              method: 'POST',
              uri: surl + '/followupv1',
              body: result,
              json: true
            }
            // console.log(result)
            request(options, (err, response, body)=>{
              if(err){
                cb(err)
              } else {
                console.log(typeof body);
                // body = JSON.parse(body);
                if(body.success === 'Followups Added'){
                  cb(null, body)
                  result.forEach(el=>{
                    console.log(el);
                     knex('Screening')
                      .where({followup_id: el.followup_id})
                      .update('upload_status', 1)
                      .then(result=>{
                        console.log(result)
                      })
                  })
                } else {
                  cb(body)
                }
              }
            })
          })          
          .catch(e=>{
            cb(e)
          })
      },
    }, function(err, results){
      if(err){
        syncNew.webContents.send('error', {error:'Server not updated'})
        syncNew.webContents.send('updateServer','a')
        console.log(err)
      } else{
        console.log(results)
        syncNew.webContents.send('success', {msg: 'DB updated successfully'})
        syncNew.webContents.send('updateServer','a')

      }
    })
  })
  syncNew.on('close', function () {
    syncNew = null;
  })
}



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
  }, {
    label: 'View',
    submenu: [{
        role: 'reload'
      },
      {
        role: 'forcereload'
      },
      {
        role: 'toggledevtools'
      },
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



app.on("window-all-closed", () => {
  app.quit()
})