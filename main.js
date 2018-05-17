const {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} = require('electron');
const url = require('url');
const path = require('path');
var fs = require('fs');
var imran = JSON.parse(fs.readFileSync('settings.json', 'utf8'))
console.log(imran);

var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./acf_mis_local.sqlite3"
  }
});
const request = require('request');

// const bParser = require('body-parser');

// app.use(bParser.json());

//Creating main window
app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    setFullScreen: true
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/html/index.html'),
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
    } else {
      console.log('error');
    }
  })
  // Build main menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);

});

function localDate() {
  var x = new Date().toLocaleDateString();
  // x(Date.now());
  return x;
}
// console.log(localDate());
// Creating Screening : Add Child Window
function scrAddChild() {
  addScrChild = new BrowserWindow({
    width: 800,
    height: 800,
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
          client_id: '999999',
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
          upload_status: '0'
        });
      });
    } else {
      single.client_id = '999999';
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
      single.upload_status = '0';
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
  addScrPlw = new BrowserWindow({
    width: 800,
    height: 800,
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
          client_id: '999999',
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
          upload_status: '0'
        });
      });
    } else {
      single.client_id = '999999';
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
        single.oedema = scrForm.ddYesNoOedema,
        single.no_mm_tabs = scrForm.numMMTablets,
        single.deworming = scrForm.ddYesNoDeworming;
      single.status = scrForm.ddScrPlwStatus;
      single.upload_status = '0';
    }
    if (data.length < 1) {
      knex('Screening')
        .insert(single)
        .then(result => {
          addScrPlw.webContents.send("resultSent", {
            'msg': 'record added'
          });
        })
        .catch(err => {
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

// Creating Screening : Reports
function scrReports() {
  scrReport = new BrowserWindow({
    width: 800,
    height: 800,
    title: 'Screening: Reports'
  });
  scrReport.loadURL(url.format({
    pathname: path.join(__dirname, '/html/scrReports.html'),
    protocol: 'file:',
    slashes: true
  }));
  scrReport.on('close', function () {
    scrReport = null;
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

    knex('Screening')
      .where({
        upload_status: 1
      })
      .then(results => {
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
              } else {
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
          createSyncWindow();
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