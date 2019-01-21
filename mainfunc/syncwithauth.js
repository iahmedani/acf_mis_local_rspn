module.exports = (ipcMain, knex, fs, sndMsg, async, surl, request) => {
   
    ipcMain.on('updateDB', function () {
        const {client, mac } = JSON.parse(fs.readFileSync( __dirname+'/../config.json', 'utf8'));
        var headers = {'Authorization': `Bearer ${client} ${mac}`};
        async.series({
          province: (cb) => {
            var options = {
              method: 'GET',
              uri: surl + '/getProvince',
              headers,
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
              headers,
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
              headers,
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
              headers,
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
              headers,
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
              headers,
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
        const {client, mac } = JSON.parse(fs.readFileSync( __dirname+'/../config.json', 'utf8'));
        var headers = {'Authorization': `Bearer ${client} ${mac}`};
    async.series({
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
                headers,
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
                headers,
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
                headers,
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
                headers,
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
                headers,
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
                headers,
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
                headers,
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
                headers,
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
                headers,
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
                headers,
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
            .orWhereNull('upload_status')
            .then(result => {
            if (result.length > 0) {
                var options = {
                method: 'POST',
                uri: surl + '/followupv1',
                headers,
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
        // uploadStockIn: (cb)=>{
            
        // }
        // uploadStockRequest: (cb) => {
        // knex('tblStockRequest')
        //     .where({
        //     upload_status: 0
        //     })
        //     .then(result => {
        //     if (result.length > 0) {
        //         var options = {
        //         method: 'POST',
        //         uri: surl + '/stock_reqv1',
        //         headers,
        //         body: result,
        //         json: true
        //         }
        //         // console.log(result)
        //         request(options, (err, response, body) => {
        //         if (err) {
        //             cb(err)
        //         } else {
        //             console.log(typeof body);
        //             // body = JSON.parse(body);
        //             if (body.success === 'Stock Request Added') {
        //             cb(null, body)
        //             result.forEach(el => {
        //                 console.log(el);
        //                 knex('tblStockRequest')
        //                 .where({
        //                     id: el.id
        //                 })
        //                 .update('upload_status', 1)
        //                 .then(result => {
        //                     console.log(result)
        //                 })
        //             })
        //             } else {
        //             cb(body)
        //             }
        //         }
        //         })
        //     } else {
        //         cb(null, 'Stock Request Add: No new record')

        //     }

        //     })
        //     .catch(e => {
        //     cb(e)
        //     })
        // }
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

}