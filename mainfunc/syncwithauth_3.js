module.exports = (ipcMain, knex, fs, sndMsg, async, surl, request, rp) => {
  // console.log('Check update')
  function batchUpdate(table, collection) {
    return knex.transaction(trx => {
      let queries = collection.map(tuple =>
        knex(table)
          .where("id", tuple.id)
          .update("upload_status", 1)
          .transacting(trx)
      );
      return Promise.all(queries)
        .then(() => {
          console.log(`${table}, update  Success`);
          trx.commit;
        })
        .catch(() => {
          console.log(`${table}, update  Failed`);

          trx.rollback;
        });
    });
  }
  function batchUpdateCustom(table, collection, idColName) {
    return knex.transaction(trx => {
      let queries = collection.map(tuple =>
        knex(table)
          .where(idColName, tuple[idColName])
          .update("upload_status", 1)
          .transacting(trx)
      );
      return Promise.all(queries)
        .then(() => {
          console.log(`${table}, update Custom Success`);
          trx.commit;
        })
        .catch(() => {
          console.log(`${table}, update Custom Failed`);

          trx.rollback;
        });
    });
  }
  function batchUpdateUp(table, collection) {
    return knex.transaction(trx => {
      let queries = collection.map(tuple =>
        knex(table)
          .where("id", tuple.id)
          .update("upload_status", 1)
          .update('upload_date', new Date().toJSON().split('T')[0])
          .transacting(trx)
      );
      return Promise.all(queries)
        .then(() => {
          console.log(`${table}, update  Success`);
          trx.commit;
        })
        .catch(() => {
          console.log(`${table}, update  Failed`);

          trx.rollback;
        });
    });
  }
  function batchUpdateCustomUp(table, collection, idColName) {
    return knex.transaction(trx => {
      let queries = collection.map(tuple =>
        knex(table)
          .where(idColName, tuple[idColName])
          .update("upload_status", 1)
          .update('upload_date', new Date().toJSON().split('T')[0])
          .transacting(trx)
      );
      return Promise.all(queries)
        .then(() => {
          console.log(`${table}, update Custom Success`);
          trx.commit;
        })
        .catch(() => {
          console.log(`${table}, update Custom Failed`);

          trx.rollback;
        });
    });
  }

  async function myUpdate(table, collection, idColName) {
    for (single of collection) {
      try {
        await knex(table)
          .where(idColName, single[idColName])
          .update({ upload_status: 1 });
      } catch (error) {
        console.log(error);
      }
    }
  }

  ipcMain.on("updateDB", async () => {
    var surl = await knex("tblConfig");
    surl = surl[0].value;
    const { client, mac } = JSON.parse(
      fs.readFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/config.json`, "utf8")
      
    );
    var headers = { Authorization: `Bearer ${client} ${mac}` };
    async.series(
      {
        province: cb => {
          console.log('Province update called')
          var options = {
            "rejectUnauthorized": false, 
            method: "GET",
            uri: surl + "/getProvince",
            headers,
            // body: result,
            json: true
          };
          request(options, function(err, response, body) {
            console.log(response);
            if (!err) {
              var data = body;
              console.log(data)
              if (data.length > 0) {
                for (el of data){
                  delete el.isActive;
                  knex("tblGeoProvince")
                    .where({
                      id: el.id
                    })
                    .then(result => {
                      console.log(result)
                      if (result.length > 0) {
                        if(result[0].provinceName != el.provinceName){
                          knex('tblGeoProvince')
                          .update('provinceName', el.provinceName)
                          .where({
                            id: el.id
                          })
                          .then(result=>{
                            console.log('Province updated')
                          })
                        }else{
                          console.log("Province Not added as already available");
                        }
                      } else {
                        knex("tblGeoProvince")
                          .insert(el)
                          .then(ret => {
                            console.log(ret);
                          });
                      }
                    })

                    .catch(e => {
                      console.log(e);
                    });
                }

                cb(null, body);
              }
            } else {
              cb(err);
            }
          });
        },
        district: cb => {
          var options = {
            "rejectUnauthorized": false, 
            method: "GET",
            uri: surl + "/getDistrict",
            // body: result,
            headers,
            json: true
          };
          request(options, function(err, response, body) {
            console.log(err, response, body)
            if (!err) {
              // var data = JSON.parse(body);
              console.log(body)
              var data = body;
              console.log(data)

              if (data.length > 0) {
                for (el of data){
                  delete el.isActive;
                  knex("tblGeoDistrict")
                    .where({
                      id: el.id
                    })
                    .then(result => {
                      if (result.length > 0) {
                        if(result[0].districtName != el.districtName){
                          knex('tblGeoDistrict')
                          .update('districtName', el.districtName)
                          .where({
                            id: el.id
                          })
                          .then(result=>{
                            console.log('District name updated')
                          })
                        }else{

                          console.log("District Not added as already available");
                        }
                      } else {
                        knex("tblGeoDistrict")
                          .insert(el)
                          .then(ret => {
                            console.log(ret);
                          });
                      }
                    })

                    .catch(e => {
                      cb(e);
                    });
                }
                // data.forEach(el => {
                  
                // });
                cb(null, body);
              }
            } else {
              cb(err);
            }
          });
        },
        tehsil: cb => {
          var options = {
            "rejectUnauthorized": false, 
            method: "GET",
            uri: surl + "/getTehsil",
            // body: result,
            headers,
            json: true
          };
          request(options, function(err, response, body) {
            if (!err) {
              var data = body;

              // var data = JSON.parse(body);
              if (data.length > 0) {
                for (el of data){
                  delete el.isActive;
                  knex("tblGeoTehsil")
                    .where({
                      id: el.id
                    })
                    .then(result => {
                      if (result.length > 0) {
                        if(result[0].tehsilName != el.tehsilName){
                          knex('tblGeoTehsil')
                          .update('tehsilName', el.tehsilName)
                          .where({
                            id: el.id
                          })
                          .then(result=>{
                            console.log('Tehsil Name updated')
                          })
                        }else{

                          console.log("Tehsil Not added as already available");
                        }
                      } else {
                        knex("tblGeoTehsil")
                          .insert(el)
                          .then(ret => {
                            console.log(ret);
                          });
                      }
                    })

                    .catch(e => {
                      cb(e);
                    });
                }
                // data.forEach(el => {
                  
                // });
                cb(null, body);
              }
            } else {
              cb(err);
            }
          });
        },
        uc: cb => {
          var options = {
            "rejectUnauthorized": false, 
            method: "GET",
            uri: surl + "/getUC",
            // body: result,
            headers,
            json: true
          };
          request(options, function(err, response, body) {
            if (!err) {
              var data = body;

              // var data = JSON.parse(body);
              if (data.length > 0) {
                for (el of data){
                  delete el.isActive;
                  knex("tblGeoUC")
                    .where({
                      id: el.id
                    })
                    .then(result => {
                      if (result.length > 0) {
                        if(result[0].ucName != el.ucName){
                          knex('tblGeoUC')
                          .update('ucName', el.ucName)
                          .where({
                            id: el.id
                          })
                          .then(result=>{
                            console.log('Uc Name updated')
                          })
                        }else{

                          console.log("UC Allready exists");

                        }
                      } else {
                        knex
                          .insert(el)
                          .into("tblGeoUC")
                          .then(ret => {
                            console.log(ret);
                          });
                      }
                    })
                    .catch(e => {
                      console.log(e);
                    });
                }
                // data.forEach(el => {
                  
                // });
                cb(null, body);
              }
            } else {
              cb(err);
            }
          });
        },
        site: cb => {
          var options = {
            "rejectUnauthorized": false, 
            method: "GET",
            uri: surl + "/getSite",
            // body: result,
            headers,
            json: true
          };
          request(options, function(err, response, body) {
            if (!err) {
              var data = body;

              // var data = JSON.parse(body);
              if (data.length > 0) {
                for (el of data){
                  delete el.isActive;

                  knex("tblGeoNutSite")
                    .where({
                      id: el.id
                    })
                    .then(result => {
                      if (result.length > 0) {
                        if(result[0].siteName != el.siteName){
                          knex('tblGeoNutSite')
                          .update('siteName', el.siteName)
                          .where({
                            id: el.id
                          })
                          .then(result=>{
                            console.log( 'Nut site name updated')
                          })

                        }else{

                          console.log("Site already avaialble");
                        }
                      } else {
                        knex("tblGeoNutSite")
                          .insert(el)
                          .then(ret => {
                            console.log(ret);
                          });
                      }
                    })
                    .catch(e => {
                      console.log(e);
                    });
                }
                // data.forEach(el => {
                  
                // });
                cb(null, body);
              }
            } else {
              cb(err);
            }
          });
        },
        itemList: cb => {
          var options = {
            "rejectUnauthorized": false, 
            method: "GET",
            uri: surl + "/getItems",
            // body: result,
            headers,
            json: true
          };
          request(options, function(err, response, body) {
            if (!err) {
              var data = body;

              // var data = JSON.parse(body);
              if (data.length > 0) {
                data.forEach(el => {
                  // delete el.isActive;

                  knex("tblCommodity")
                    .where({
                      id: el.id
                    })
                    .then(result => {
                      if (result.length > 0) {
                        console.log("Commodity already avaialble");
                      } else {
                        knex("tblCommodity")
                          .insert(el)
                          .then(ret => {
                            console.log(ret);
                          });
                      }
                    })
                    .catch(e => {
                      console.log(e);
                    });
                });
                cb(null, body);
              }
            } else {
              cb(err);
            }
          });
        },
        config: cb => {
          var options = {
            "rejectUnauthorized": false, 
            method: "POST",
            uri: surl + "/getConfig",
            headers,
            // body: result,
            json: true
          };
          request(options, function(err, response, body) {
            console.log(body);
            if (!err) {
              var data = body[0];
              knex('tblConfig').whereNot('value', data.value)
                .update('value', data.value)
                .then(cb(null, 'Config Updated'))
                .catch(e=>cb(e))
            } else {
              cb(err);
            }
          });
        },

      },
      function(err, results) {
        if (err) {
          console.log(err);
          syncNew.webContents.send("errUpdDb", {
            error: "DB not updated"
          });
          syncNew.webContents.send("updateDB", "a");
        } else {
          console.log(results);
          syncNew.webContents.send("successUpdDb", {
            msg: "DB updated successfully, App will restart within 3 seconds."
          });
          syncNew.webContents.send("updateDB", "a");
          // app.relaunch();
          // app.exit();
        }
      }
    );
  });

  ipcMain.on("updateServer", async function() {
    const { client, mac } = JSON.parse(
      fs.readFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/config.json`, "utf8")
    );
    var headers = { Authorization: `Bearer ${client} ${mac}` };
    var surl = await knex("tblConfig");
    surl = surl[0].value;
    async.series(
      {
        updateFollowup: cb => {
          knex("tblOtpFollowup")
            .where({
              upload_status: 2
            })
            .then(result => {
              if (result.length > 0) {
                var options = {
                  "rejectUnauthorized": false, 
                  method: "PUT",
                  uri: surl + "/followupv1",
                  headers,
                  body: result,
                  json: true
                };
                // console.log(result)
                request(options, (err, response, body) => {
                  if (err) {
                    cb(err);
                  } else {
                    console.log(typeof body);
                    // body = JSON.parse(body);
                    if (body.success === "Followups Added") {
                      cb(null, body);
                      result.forEach(el => {
                        console.log(el);
                        knex("tblOtpFollowup")
                          .where({
                            followup_id: el.followup_id
                          })
                          .update("upload_status", 1)
                          .update('upload_date', new Date().toJSON().split('T')[0])
                          .then(result => {
                            console.log(result);
                          });
                      });
                    } else {
                      cb(body);
                    }
                  }
                });
              } else {
                cb(null, "Followup Add: No new record");
              }
            })
            .catch(e => {
              cb(e);
            });
        },
        uploadStockOut: cb => {
          console.log("Upload Stock Called");
          knex("tblSiteStock")
            .where({
              upload_status: 0
            })
            .orWhereNull("upload_status")
            .then(result => {
              if (result.length > 0) {
                var options = {
                  "rejectUnauthorized": false, 
                  method: "POST",
                  uri: surl + "/stockOut",
                  headers,
                  body: result,
                  json: true
                };
                // console.log(options.data)
                request(options, async (err, response, body) => {
                  if (err) {
                    console.log(err);
                    cb(err);
                  } else {
                    if (body.success === "StocksOut are uploaded") {
                      cb(null, body);
                      batchUpdateCustomUp("tblSiteStock", result, "stock_out_id");
                      // try {
                      //   batchUpdateCustom
                      // await myUpdate('tblSiteStock', result, 'stock_out_id');

                      // } catch (error) {
                      //   cb(error)
                      // }
                    } else {
                      cb(body);
                    }
                  }
                });
              } else {
                cb(null, "Site Stock Updload: No new record");
              }
            })
            .catch(e => {
              cb(e);
            });
        },
        updataStockOut: cb => {
          console.log("Update StockOut Called");
          knex("tblSiteStock")
            .where({
              upload_status: 2
            })
            .then(result => {
              if (result.length > 0) {
                var options = {
                  "rejectUnauthorized": false, 
                  method: "PUT",
                  uri: surl + "/stockOut",
                  headers,
                  body: result,
                  json: true
                };
                // console.log(options.data)
                request(options, async (err, response, body) => {
                  if (err) {
                    cb(err);
                  } else {
                    if (body.success === "StocksOut are updated") {
                      cb(null, body);
                      batchUpdateCustomUp("tblSiteStock", result, "stock_out_id");

                      // try {
                      //   await myUpdate('tblSiteStock', result, 'stock_out_id')
                      // } catch (error) {
                      //   cb(error)
                      // }
                    } else {
                      cb(body);
                    }
                  }
                });
              } else {
                cb(null, "Site Stock Update: No new record");
              }
            })
            .catch(e => {
              cb(e);
            });
        },
        uploadStockDist: cb => {
          knex("tblStokDistv2")
            .where({
              upload_status: 0
            })
            .orWhereNull("upload_status")
            .then(result => {
              console.log(result)
              if (result.length > 0) {
                var options = {
                  "rejectUnauthorized": false, 
                  method: "POST",
                  uri: surl + "/StockDist",
                  headers,
                  body: result,
                  json: true
                };
                // console.log(options.data)
                request(options, async (err, response, body) => {
                  if (err) {
                    console.log(err);
                    cb(err);
                  } else {
                    if (body.success === "Distributions are uploaded") {
                      cb(null, body);
                      batchUpdateCustomUp("tblStokDistv2", result, "dist_id");
                      
                    } else {
                      cb(body);
                    }
                  }
                });
              } else {
                cb(null, "Distributions Updload: No new record");
              }
            })
            .catch(e => {
              cb(e);
            });
        },
        updataStockDist: cb => {
          console.log("Update StockOut Called");
          knex("tblStokDistv2")
            .where({
              upload_status: 2
            })
            .then(result => {
              if (result.length > 0) {
                var options = {
                  "rejectUnauthorized": false, 
                  method: "PUT",
                  uri: surl + "/StockDist",
                  headers,
                  body: result,
                  json: true
                };
                // console.log(options.data)
                request(options, async (err, response, body) => {
                  if (err) {
                    cb(err);
                  } else {
                    if (body.success === "Distributions are updated") {
                      cb(null, body);
                      batchUpdateCustomUp("tblStokDistv2", result, "dist_id");

                      cb(body);
                    }
                  }
                });
              } else {
                cb(null, "Distributions Update: No new record");
              }
            })
            .catch(e => {
              cb(e);
            });
        },
        uploadVillageList: cb => {
          knex("tblVillages")
            .where({
              upload_status: 0
            })
            .orWhereNull("upload_status")
            .then(result => {
              console.log(result)
              if (result.length > 0) {
                var options = {
                  "rejectUnauthorized": false, 
                  method: "POST",
                  uri: surl + "/VillageList",
                  headers,
                  body: result,
                  json: true
                };
                // console.log(options.data)
                request(options, async (err, response, body) => {
                  if (err) {
                    console.log(err);
                    cb(err);
                  } else {
                    if (body.success === "Villages are uploaded") {
                      cb(null, body);
                      batchUpdate("tblVillages", result);
                      
                    } else {
                      cb(body);
                    }
                  }
                });
              } else {
                cb(null, "Villages Updload: No new record");
              }
            })
            .catch(e => {
              cb(e);
            });
        },
        updataVillageList: cb => {
          knex("tblVillages")
          .where({
            upload_status: 2
          })
          .then(result => {
            console.log(result)
            if (result.length > 0) {
              var options = {
                "rejectUnauthorized": false, 
                method: "PUT",
                uri: surl + "/VillageList",
                headers,
                body: result,
                json: true
              };
              // console.log(options.data)
              request(options, async (err, response, body) => {
                if (err) {
                  console.log(err);
                  cb(err);
                } else {
                  if (body.success === "Villages are updated") {
                    cb(null, body);
                    batchUpdate("tblVillages", result);
                    
                  } else {
                    cb(body);
                  }
                }
              });
            } else {
              cb(null, "Villages Updload: No new record");
            }
          })
          .catch(e => {
            cb(e);
          });
        },
        uploadCHWList: cb => {
          knex("tblLhw")
            .where({
              upload_status: 0
            })
            .orWhereNull("upload_status")
            .then(result => {
              console.log(result)
              if (result.length > 0) {
                var options = {
                  "rejectUnauthorized": false, 
                  method: "POST",
                  uri: surl + "/CHWList",
                  headers,
                  body: result,
                  json: true
                };
                // console.log(options.data)
                request(options, async (err, response, body) => {
                  if (err) {
                    cb(err);
                  } else {
                    if (body.success === "CHW Lists are uploaded") {
                      cb(null, body);
                      batchUpdate("tblLhw", result);
                      
                    } else {
                      cb(body);
                    }
                  }
                });
              } else {
                cb(null, "CHW List Updload: No new record");
              }
            })
            .catch(e => {
              cb(e);
            });
        },
        updataCHWList: cb => {
          knex("tblLhw")
          .where({
            upload_status: 2
          })
          .then(result => {
            console.log(result)
            if (result.length > 0) {
              var options = {
                "rejectUnauthorized": false, 
                method: "PUT",
                  uri: surl + "/CHWList",
                headers,
                body: result,
                json: true
              };
              // console.log(options.data)
              request(options, async (err, response, body) => {
                if (err) {
                  console.log(err);
                  cb(err);
                } else {
                  if (body.success === "CHW Lists are updated") {
                    cb(null, body);
                    batchUpdate("tblLhw", result);
                    
                  } else {
                    cb(body);
                  }
                }
              });
            } else {
              cb(null, "CHW List Updload: No new record");
            }
          })
          .catch(e => {
            cb(e);
          });
        },
        uploadLHSList: cb => {
          knex("tblSupervisors")
            .where({
              upload_status: 0
            })
            .orWhereNull("upload_status")
            .then(result => {
              console.log(result)
              if (result.length > 0) {
                var options = {
                  "rejectUnauthorized": false, 
                  method: "POST",
                  uri: surl + "/LHSList",
                  headers,
                  body: result,
                  json: true
                };
                // console.log(options.data)
                request(options, async (err, response, body) => {
                  if (err) {
                    cb(err);
                  } else {
                    if (body.success === "LHS Lists are uploaded") {
                      cb(null, body);
                      batchUpdate("tblSupervisors", result);
                      
                    } else {
                      cb(body);
                    }
                  }
                });
              } else {
                cb(null, "LHS List Updload: No new record");
              }
            })
            .catch(e => {
              cb(e);
            });
        },
        updataLHSList: cb => {
          knex("tblSupervisors")
          .where({
            upload_status: 2
          })
          .then(result => {
            console.log(result)
            if (result.length > 0) {
              var options = {
                "rejectUnauthorized": false, 
                method: "PUT",
                uri: surl + "/LHSList",
                headers,
                body: result,
                json: true
              };
              // console.log(options.data)
              request(options, async (err, response, body) => {
                if (err) {
                  cb(err);
                } else {
                  if (body.success === "LHS Lists are updated") {
                    cb(null, body);
                    batchUpdate("tblSupervisors", result);
                    
                  } else {
                    cb(body);
                  }
                }
              });
            } else {
              cb(null, "LHS List Updload: No new record");
            }
          })
          .catch(e => {
            cb(e);
          });
        }
      },
      function(err, results) {
        if (err) {
          console.log(err);
          syncNew.webContents.send("err", {
            error: "Server not updated"
          });
          syncNew.webContents.send("updateServer", "a");
        } else {
          console.log(results);
          async.series(
            {
              uploadChScrNew: cb => {
                knex("tblScrChildren")
                  .where({
                    upload_status: 0
                  })
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "POST",
                        uri: surl + "/newChScr",
                        headers,
                        body: result,
                        json: true
                      };
                      // console.log(result)
                      request(options, (err, response, body) => {
                        if (err) {
                          console.log(JSON.stringify(err));
                          cb(err);
                        } else {
                          console.log(typeof body);
                          // body = JSON.parse(body);
                          if (body.success === "Children screening uploaded") {
                            result.forEach(el => {
                              console.log(el);
                              knex("tblScrChildren")
                                .where({
                                  ch_scr_id: el.ch_scr_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])
                                .then(result => {
                                  console.log(result);
                                });
                            });
                          }
                          cb(null, body);
                        }
                      });
                    } else {
                      cb(null, "No new Scrrening record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
              updateChScrNew: cb => {
                knex("tblScrChildren")
                  .where({
                    upload_status: 2
                  })
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "PUT",
                        uri: surl + "/newChScr",
                        headers,
                        body: result,
                        json: true
                      };
                      // console.log(result)
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          console.log(typeof body);
                          // body = JSON.parse(body);
                          if (
                            body.success === "Children Screening record(s) updated"
                          ) {
                            result.forEach(el => {
                              console.log(el);
                              knex("tblScrChildren")
                                .where({
                                  ch_scr_id: el.ch_scr_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])
                                .then(result => {
                                  console.log(result);
                                });
                            });
                          }
                          cb(null, body);
                        }
                      });
                    } else {
                      cb(null, "No new record");
                    }
                  })
      
                  .catch(e => {
                    cb(e);
                  });
              },
              uploadPlwScrNew: cb => {
                knex("tblScrPlw")
                  .where({
                    upload_status: 0
                  })
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "POST",
                        uri: surl + "/newPlwScr",
                        headers,
                        body: result,
                        json: true
                      };
                      // console.log(result)
                      request(options, (err, response, body) => {
                        if (err) {
                          console.log(JSON.stringify(err));
                          cb(err);
                        } else {
                          console.log(typeof body);
                          // body = JSON.parse(body);
                          if (body.success === "PLW screening uploaded") {
                            result.forEach(el => {
                              console.log(el);
                              knex("tblScrPlw")
                                .where({
                                  plw_scr_id: el.plw_scr_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])
                                .then(result => {
                                  console.log(result);
                                });
                            });
                          }
                          cb(null, body);
                        }
                      });
                    } else {
                      cb(null, "No new Scrrening record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
              updatePlwScrNew: cb => {
                knex("tblScrPlw")
                  .where({
                    upload_status: 2
                  })
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "PUT",
                        uri: surl + "/newPlwScr",
                        headers,
                        body: result,
                        json: true
                      };
                      // console.log(result)
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          console.log(typeof body);
                          // body = JSON.parse(body);
                          if (body.success === "PLW Screening record(s) updated") {
                            result.forEach(el => {
                              console.log(el);
                              knex("tblScrPlw")
                                .where({
                                  plw_scr_id: el.plw_scr_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])
                                .then(result => {
                                  console.log(result);
                                });
                            });
                          }
                          cb(null, body);
                        }
                      });
                    } else {
                      cb(null, "No new record");
                    }
                  })
      
                  .catch(e => {
                    cb(e);
                  });
              },
              uploadOtp: cb => {
                knex("tblOtpAdd")
                  .where({
                    upload_status: 0
                  })
                  .orWhereNull("upload_status")
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "POST",
                        uri: surl + "/otpv1",
                        headers,
                        body: result,
                        json: true
                      };
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          if (body.success === "OTP Added") {
                            cb(null, body);
                            result.forEach(el => {
                              knex("tblOtpAdd")
                                .where({
                                  otp_id: el.otp_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])
                                .then(x => {
                                  console.log(x);
                                });
                            });
                          } else {
                            cb(body);
                          }
                        }
                      });
                    } else {
                      cb(null, "OTP Add: No new record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
              updateOtp: cb => {
                knex("tblOtpAdd")
                  .where({
                    upload_status: 2
                  })
                  .orWhereNull("upload_status")
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "PUT",
                        uri: surl + "/otpv1",
                        body: result,
                        headers,
                        json: true
                      };
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          if (body.success === "OTP Updated") {
                            cb(null, body);
                            result.forEach(el => {
                              knex("tblOtpAdd")
                                .where({
                                  otp_id: el.otp_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])
                                .then(x => {
                                  console.log(x);
                                });
                            });
                          } else {
                            cb(body);
                          }
                        }
                      });
                    } else {
                      cb(null, "OTP Update: No new record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
              uploadOtpExit: cb => {
                knex("tblOtpExit")
                  .where({
                    upload_status: 0
                  })
                  .orWhereNull("upload_status")
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "POST",
                        uri: surl + "/otpExitv1",
                        headers,
                        body: result,
                        json: true
                      };
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          if (body.success === "OTP Exit Added") {
                            cb(null, body);
                            result.forEach(el => {
                              knex("tblOtpExit")
                                .where({
                                  exit_id: el.exit_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])

                                .then(x => {
                                  console.log(x);
                                });
                            });
                          } else {
                            cb(body);
                          }
                        }
                      });
                    } else {
                      cb(null, "OTP Exit: No new record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
              updateOtpExit: cb => {
                knex("tblOtpExit")
                  .where({
                    upload_status: 2
                  })
                  .orWhereNull("upload_status")
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "PUT",
                        uri: surl + "/otpExitv1",
                        headers,
                        body: result,
                        json: true
                      };
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          if (body.success === "OTP exit updated") {
                            cb(null, body);
                            result.forEach(el => {
                              knex("tblOtpExit")
                                .where({
                                  exit_id: el.exit_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])
                                .then(x => {
                                  console.log(x);
                                });
                            });
                          } else {
                            cb(body);
                          }
                        }
                      });
                    } else {
                      cb(null, "OTP Exit Update: No new record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
              uploadSession: cb => {
                knex("tblSessions")
                  .where({
                    upload_status: 0
                  })
                  .orWhereNull("upload_status")
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "POST",
                        uri: surl + "/sessionsv1",
                        headers,
                        body: result,
                        json: true
                      };
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          if (body.success === "Sessions uploaded") {
                            cb(null, body);
                            result.forEach(el => {
                              knex("tblSessions")
                                .where({
                                  session_id: el.session_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])
                                .then(x => {
                                  console.log(x);
                                });
                            });
                          } else {
                            cb(body);
                          }
                        }
                      });
                    } else {
                      cb(null, "Session Add: No new record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
              updateSession: cb => {
                knex("tblSessions")
                  .where({
                    upload_status: 2
                  })
                  .orWhereNull("upload_status")
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "PUT",
                        uri: surl + "/sessionsv1",
                        headers,
                        body: result,
                        json: true
                      };
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          if (body.success === "Sessions Updated") {
                            cb(null, body);
                            result.forEach(el => {
                              knex("tblSessions")
                                .where({
                                  session_id: el.session_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])
                                .then(x => {
                                  console.log(x);
                                });
                            });
                          } else {
                            cb(body);
                          }
                        }
                      });
                    } else {
                      cb(null, "Session Update: No new record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
              uploadFollowup: cb => {
                knex("tblOtpFollowup")
                  .where({
                    upload_status: 0
                  })
                  .orWhereNull("upload_status")
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "POST",
                        uri: surl + "/followupv1",
                        headers,
                        body: result,
                        json: true
                      };
                      // console.log(result)
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          console.log(typeof body);
                          // body = JSON.parse(body);
                          if (body.success === "Followups Added") {
                            cb(null, body);
                            result.forEach(el => {
                              console.log(el);
                              knex("tblOtpFollowup")
                                .where({
                                  followup_id: el.followup_id
                                })
                                .update("upload_status", 1)
                                .update('upload_date', new Date().toJSON().split('T')[0])
                                .then(result => {
                                  console.log(result);
                                });
                            });
                          } else {
                            cb(body);
                          }
                        }
                      });
                    } else {
                      cb(null, "Followup Add: No new record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
      
              uploadStockIn: cb => {
                knex("tblStock")
                  .where({
                    upload_status: 0
                  })
                  .orWhereNull("upload_status")
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "POST",
                        uri: surl + "/stockIn",
                        headers,
                        body: result,
                        json: true
                      };
                      // console.log(options.data)
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          if (body.success === "Stocks are uploaded") {
                            cb(null, body);
                            batchUpdateUp("tblStock", result);
                          } else {
                            cb(body);
                          }
                        }
                      });
                    } else {
                      cb(null, "Stock In Upload: No new record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
              updateStochIn: cb => {
                knex("tblStock")
                  .where({
                    upload_status: 2
                  })
                  .then(result => {
                    if (result.length > 0) {
                      var options = {
                        "rejectUnauthorized": false, 
                        method: "PUT",
                        uri: surl + "/stockIn",
                        headers,
                        body: result,
                        json: true
                      };
                      request(options, (err, response, body) => {
                        if (err) {
                          cb(err);
                        } else {
                          if (body.success === "Stocks are updated") {
                            cb(null, body);
                            batchUpdateUp("tblStock", result);
                          } else {
                            cb(body);
                          }
                        }
                      });
                    } else {
                      cb(null, "Stock In Update: No new record");
                    }
                  })
                  .catch(e => {
                    cb(e);
                  });
              },
            },
            function(err, results) {
              if (err) {
                console.log(err);
                syncNew.webContents.send("err", {
                  error: "Server not updated"
                });
                syncNew.webContents.send("updateServer", "a");
              } else {
                console.log(results);
                syncNew.webContents.send("success", {
                  msg: "Server updated successfully"
                });
                syncNew.webContents.send("updateServer", "a");
              }
            }
          );
          // syncNew.webContents.send("success", {
          //   msg: "Server updated successfully"
          // });
          // syncNew.webContents.send("updateServer", "a");
        }
      }
    );
    
  });
};
