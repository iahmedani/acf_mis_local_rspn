module.exports.stockOutUpdate = function () {
  $('#ddProgramType').change(()=>{
    $('.prgChange').val("")
  })
  $(function () {
    ipc.send('getProvince');
    ipc.on('province', function (evt, province) {
      $('#ddProvince').children('option:not(:first)').remove();
      prov(province);
    })
    $('#ddProvince').on('change', function () {
      var prov = $(this).val();
      ipc.send('getDistrict', prov)
      ipc.on('district', function (evt, district) {
        $('#ddDistrict').children('option:not(:first)').remove();

        dist(district);
      })
    })
    $('#ddDistrict').on('change', function () {
      var dist = $(this).val();
      ipc.send('getTehsil', dist)
      ipc.on('tehsil', function (evt, tehsil) {
        $('#ddTehsil').children('option:not(:first)').remove();

        teh(tehsil);
      })
    })
    $('#ddTehsil').on('change', function () {
      var tehs = $(this).val();
      ipc.send('getUC', tehs)
      ipc.on('uc', function (evt, uc) {
        $('#ddUC').children('option:not(:first)').remove();

        ucListener(uc);
      })
    })
    var ucForHH;
    $('#ddUC').on('change', function () {
      var ucs = $(this).val();
      ucForHH = ucs
      ipc.send('getHealthHouse', ucs)
      ipc.on('hh', function (evt, hh) {
        $('#ddHealthHouse').children('option:not(:first)').remove();
        hhListener(hh);
      })
    })
    $("#ddHealthHouse").on("change", function () {
      var siteId = $(this).val();
      // ucForHH = ucs;
      ipc.send("getStaff", siteId);
      ipc.send("getSups", siteId);

      ipc.on("haveStaff", function (evt, staffs) {
        $("#ddStaff_code")
          .children("option:not(:first)")
          .remove();
        staffListener(staffs);
      });
      ipc.on("haveSups", function (evt, _sups) {
        $("#ddSup_code")
          .children("option:not(:first)")
          .remove();
        supListener(_sups);
      });
    });
    $("#ddStaff_code").on("change", function () {
      var staff_code = $(this).val();
      $("#ddStaff_name").val(staff_code);
    });
    $("#ddStaff_name").on("change", function () {
      var staff_code = $(this).val();
      $("#ddStaff_code").val(staff_code);
    });
    $("#ddSup_code").on("change", function () {
      var sup_code = $(this).val();
      $("#ddSup_name").val(sup_code);
    });
    $("#ddSup_name").on("change", function () {
      var sup_code = $(this).val();
      $("#ddSup_code").val(sup_code);
    });
  })
  $(() => {
    // $('.outreach').hide();
    $('#ddProgramType').on('change', function () {
      var val = $(this).val();
      console.log(val)
      if (val == 'outreach') {
        $('.outreach').show();
        $('.outreach input').attr('required', true);
        $('.nsc').show();
        $('.nsc input').attr('required', true);
      } else if (val == 'sc') {
        $('.nsc').hide();
        $('.nsc input').attr('required', false);
        $('.outreach').hide();
        $('.outreach input').attr('required', false);
      } else {
        $('.outreach').hide();
        $('.nsc').show();
        $('.nsc input').attr('required', true);
        $('.outreach input').attr('required', false);

      }
    })
  })
  var data = [];
  let myInsert = (item) => {
    return new Promise((resolve, reject) => {
      var length = data.length + 1;
      item.id = data.length + 1;
      item.prog_type = $("#ddProgramType").val();
      item.stock_release_date = $("#stock_release_date").val();
      item.district_id = $("#ddDistrict").val();
      item.tehsil_id = $("#ddTehsil").val();
      item.site_id = $("#ddHealthHouse").val() || 0;
      item.CHW_id = $("#ddStaff_code").val() || 0;
      item.CHS_id = $("#ddStaff_code").val() || 0;
      item.upload_status = 0;
      $("#stockOutEntryForm").validate();
      if (data.filter(el => el.item_name == item.item_name).length > 0) {
        alert('Same item is not allowed to enter multiple time, if you want to change quantity release please click to edit the line/same item');
      } else {
        
        if ($("#stockOutEntryForm").valid()) {
          data.push(item);
          // console.log(data);
        }
      }

      // data.push(item);
      // console.log(data);
      if (length == data.length && $('#stockOutEntryForm').valid()) {
        resolve(data[data.length]);
      } else {
        reject()
      }
    })
  }
  let delItem = (item) => {
    return new Promise((resolve, reject) => {
      var total = data.length
      data = data.filter(function (single) {
        return single !== item
      })
      console.log(data);

      if (data.length != total) {
        // data.splice(index, 1);
        resolve(data)
      } else {
        reject()
      }
    })
  }
  let updItem = (item) => {
    return new Promise((resolve, reject) => {
      var tempVar = false;
      data.forEach((el, i) => {
        if (el.id == item.id) {
          // console.log('item matched in update')
          data[i] = item;
          tempVar = true
        }
      })

      if (tempVar) {
        // delIndex.splice(index, 1);
        // console.log(data);
        resolve(item)
      } else {
        reject()
      }
    })
  }
  $(() => {
    var sendValue = function (varName, value) {
      // console.log(varName, value)
      var xx = varName.filter(el => el.item == value)
      // console.log(xx)
      return xx;
    }
    ipc.send('getAvailableCommodity');
    ipc.on('availableCommodity', (evt, com) => {
      var Description  = [{ Name: '', item:''}];
      var Unit  = [{ Name: '', item:''}];
      var SubUnit  = [{ Name: '', item:''}];
      var items = [{ Name: ""}];
      var availStock = [{ Name: "", item:''}];
      com.commodity.forEach((el, i) => {
        Description.push({
          Name: el.item_desc,
          item: el.item_name,
        })
        Unit.push({
          Name: el.item_unit,
          item: el.item_name,
        })
        SubUnit.push({
          Name: el.item_sub_unit,
          item: el.item_name,
        })
        items.push({
          Name: el.item_name,
          item: el.item_name,
        })
        availStock.push({
          Name: el.remaining,
           item: el.item_name,
        })
        if (com.commodity.length - 1 == i) {
          stockGrid(Description, Unit, items, SubUnit, availStock);
        }
      })
    })
  
    
    function stockGrid(Description, Unit, items, SubUnit, availStock) {
      $("#stockOutGrid").jsGrid({
        width: "100%",
        height: "400px",
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        controller: {
          loadData: (filter) => {
            return data;
          },
          insertItem: (item) => {
            return myInsert(item)
          },
          updateItem: function (item) {
            // console.log('updateitem clicked', item)
            return updItem(item)
          },

          deleteItem: function (item) {
            return delItem(item);
          },
        },

        fields: [
          {
            name: 'item_name', title: 'Item', type: 'select', items: items, valueField: "Name",
            textField: "Name", valueType: 'string', insertTemplate: function () {
              var descField = this._grid.fields[1];
              var unitField = this._grid.fields[2];
              var subUnitField = this._grid.fields[3];
              var avalable_stockField = this._grid.fields[4];
              var $inertControl = jsGrid.fields.select.prototype.insertTemplate.call(this);
              $inertControl.on('change', function () {
                var itemId = $(this).val();
                descField.items = sendValue(Description, itemId);
                $(".item_desc-insert").empty().append(descField.insertTemplate());
                unitField.items = sendValue(Unit, itemId);
                $(".disp_unit-insert").empty().append(unitField.insertTemplate());
                subUnitField.items = sendValue(SubUnit, itemId);
                $(".disp_sub_unit-insert").empty().append(subUnitField.insertTemplate());
                avalable_stockField.items = sendValue(availStock, itemId);
                $(".avalable_stock-insert").empty().append(avalable_stockField.insertTemplate());

              })
              return $inertControl;
            },
            editTemplate: function (value) {
              var descField = this._grid.fields[1];
              var unitField = this._grid.fields[2];
              var subUnitField = this._grid.fields[3];
              var avalable_stockField = this._grid.fields[4];
              var $editControl = jsGrid.fields.select.prototype.editTemplate.call(this, value);

              var changeItem = function () {
                var editVal = $editControl.val();
                // console.log({editVal: editVal})
                descField.items = sendValue(Description, editVal);
                $(".item_desc-update").empty().append(descField.editTemplate());
                unitField.items = sendValue(Unit, editVal);
                $(".disp_unit-update").empty().append(unitField.editTemplate());
                subUnitField.items = sendValue(SubUnit, editVal);
                $(".disp_sub_unit-update").empty().append(subUnitField.editTemplate());
                avalable_stockField.items = sendValue(availStock, editVal);
                $(".avalable_stock-update").empty().append(avalable_stockField.editTemplate());
              };
              $editControl.on('change', changeItem);
              changeItem();
              return $editControl;
            }
          },
          {
            name: 'item_desc', title: 'Description', type: 'select', items: Description
            , valueField: "Name", valueType: 'string',
            textField: "Name", insertcss: 'item_desc-insert', updatecss: 'item_desc-update', itemTemplate: function (item_desc) {
              return item_desc;
            }
          },
          {
            name: 'disp_unit', title: 'Unit', type: 'select', items: Unit, valueField: "Name", valueType: 'string',
            textField: "Name", insertcss: 'disp_unit-insert', updatecss: 'disp_unit-update', itemTemplate: function (disp_unit) {
              return disp_unit;
            }
          },
          {
            name: 'disp_sub_unit', title: 'Sub Unit', type: 'select', items: SubUnit, valueField: "Name", valueType: 'string',
            textField: "Name", insertcss: 'disp_sub_unit-insert', updatecss: 'disp_sub_unit-update', itemTemplate: function (disp_sub_unit) {
              return disp_sub_unit;
            }
          },
          {
            name: 'avalable_stock', title: 'Avalable Stock', type: 'select', items: availStock, valueField: "Name", valueType: 'decimal',
            textField: "Name", insertcss: 'avalable_stock-insert', updatecss: 'avalable_stock-update', itemTemplate: function (avalable_stock) {
              return avalable_stock;
            }
          },
          // { name: 'avalable_stock', title: 'Avalable Stock', type: 'decimal', default:availabeStock },
          {
            name: 'quantity_released', title: 'Quantity Released', type: 'decimal', validate: ["required", {
              validator: function (value, item) {
                return value > 0 && value <= item.avalable_stock
              }, message: function (value, item) {
                if (value == 0) {
                  return 'Quantity released must be greater than 0'
                } else if (value > item.avalable_stock) {
                  return 'Quantity release cannot be more than available stock';
                } 
              }}] },
          {
            type: "control",
            editButton: false, modeSwitchButton: false
          }
        ],

      });
    }
    
  });
  $(function () {
    var datePickerId = document.getElementById('stock_release_date');
    datePickerId.max = new Date().toISOString().split("T")[0];
  });
  $("#stockOutEntrySubmit").on("click", e => {
    console.log(data);
    // if(data.length>0){

    var stockEntryArr = [];
    data.forEach(el => {
      delete el.id;
      stockEntryArr.push(el);
    });
    console.log(stockEntryArr);
    ipc.send("stockOutEntry", stockEntryArr);
    ipc.removeAllListeners("stockOutEntry");
    // data = [];
    // $('#jsGrid').jsGrid("loadData");
    // $('#scrPlwForm').get(0).reset();
    setTimeout(stockEntryTemplate, 3000);

    // } else {
    //   $('#scrPlwForm').validate();
    // }
    e.preventDefault();
  });
  $(() => {
    // Filtering out the Stock Out
    $('.myFilter').on('change', function () {
      console.log($(this).val())
      var x = {};
      x.program_type = $("#ddProgramType").val() ? $("#ddProgramType").val() : "";
      x.district_id = ($("#ddDistrict").val()) ? $("#ddDistrict").val() : '';
      x.tehsil_id = ($("#ddTehsil").val()) ? $("#ddTehsil").val() : '';
      // x.uc_id = ($("#ddUC").val()) ? $("#ddUC").val() : '';
      x.site_id = ($("#ddHealthHouse").val()) ? $("#ddHealthHouse").val() : '';
      // x.dist_month = ($("#distMonth").val()) ? $("#distMonth").val() : '';
      x.CHW_id = ($("#ddStaff_code").val()) ? $("#ddStaff_code").val() : '';
      x.CHS_id = ($("#ddSup_code").val()) ? $("#ddSup_code").val() : '';
      x.stock_release_date = $("#stock_release_date").val() ? $("#stock_release_date").val() : "";
      // x.dist_month = 

      $("#stockOutList")
        .jsGrid("loadData", x)
        .done(function () {
          console.log("data loaded");
        });
    });
    let stockUpdateList = filter=>{
      return new Promise((resolve, reject) => {
        ipc.send('listAllStockOut', filter);
        ipc.on('listAllStockOut', (e, result) => {
          console.log(result);
          if (result.result.data.length < 1) {
            var s = { data: [], itemsCount: 0 };
            resolve(s)
          } else {
            var s = { data: result.result.data, itemsCount: result.result.itemsCount[0].total };
            if (result.err) {
              reject(result.err)
              ipc.removeAllListeners('listAllStockOut')
            } else {
              resolve(s)
              ipc.removeAllListeners('listAllStockOut')
            }
          }
        })
      })
    }
    let delStockOutEntry = item => {
        return new Promise((resolve, reject) => {
          ipc.send("deleteStockOut", item);
          ipc.on('deleteStockOut', (event, result) => {
            console.log(result)
            if (result.err) {
              reject()
              ipc.removeAllListeners("deleteStockOut");
            } else {
              resolve()
              ipc.removeAllListeners("deleteStockOut");
            }
          })
        })
    };
    let listController = {
      loadData: function (filter) {
        filter.program_type = $("#ddProgramType").val() ? $("#ddProgramType").val() : "";
        filter.district_id = ($("#ddDistrict").val()) ? $("#ddDistrict").val() : '';
        filter.tehsil_id = ($("#ddTehsil").val()) ? $("#ddTehsil").val() : '';
        filter.site_id = ($("#ddHealthHouse").val()) ? $("#ddHealthHouse").val() : '';
        filter.CHW_id = ($("#ddStaff_code").val()) ? $("#ddStaff_code").val() : '';
        filter.CHS_id = ($("#ddSup_code").val()) ? $("#ddSup_code").val() : '';
        filter.stock_release_date = $("#stock_release_date").val() ? $("#stock_release_date").val() : "";

        return stockUpdateList(filter);
      },
      deleteItem: function (item) {
        return delStockOutEntry(item)
      }
    };
// .column("stockOutID", "program_type", "upload_status", "stock_release_date")
    // List of stock
    $("#stockOutList").jsGrid({
      height: "300px",
      width: "100%",
      autoload: true,
      // editting: false,
      // inserting: false,
      // filtering: true,
      paging: true,
      pageLoading: true,
      pageSize: 15,
      pageIndex: 1,
      controller: listController,
      fields: [
        {
          name: "stock_release_date",
          type: "date",
          title: "Stock Release Date"
        },
        {
          name: "stockOutID",
          type: "text",
          title: "Report Id"
        },
        {
          name: "program_type",
          type: "select",
          items: [
            {
              value: "",
              Name: ""
            },
            { value: "sfp", Name: "TSFP" },
            { value: "sfp_Plw", Name: "TSFP-PLW" },
            { value: "otp", Name: "OTP" },
            { value: "sc", Name: "NSC" },
            { value: "outreach", Name: "Out Reach" }
          ],
          title: "Program Type",
          // valueType: "string",
          valueField: "value",
          textField: "Name"
        },{
          title:'Item Name',
          name:'item_name',
          type:'text'
        },
        {
          title:'Total Stock',
          name:'totlStock',
          type:'number'
        },
        {
          name: "upload_status",
          title: "Upload Status",
          type: "select",
          valueType: "number",
          items: [
            { Name: "", value: "" },
            { Name: "Uploaded", value: 1 },
            { Name: "Not Uploaded", value: 0 },
            { Name: "Edited", value: 2 }
          ],
          readOnly: true,
          valueField: "value",
          textField: "Name",
          editing: false,
          inserting: false,
          filtering: false
        },
        {
          type: "control",
          title:'Actions',
          modeSwitchButton: true,
          editButton: false
          // deleteButton: false,
        }
      ]
    });

    let updateGrid = function (reportId) {
      var rData = { stock_release_date:'', program_type:'', items: [], district_id:'', tehsil_id:'', site_id:'', CHW_id:'', CHS_id:'', stockOutID:'' };
      let loadStockReport = reportId => {
        return new Promise((resolve, reject) => {
          ipc.send('loadSingleStockOutReport', reportId);
          ipc.on("loadSingleStockOutReport", (event, result) => {
            console.log(result)
            if (result.err) {
              reject();
              ipc.removeAllListeners("loadSingleStockOutReport");
            } else {
              var data = result.result;
              resolve(data);
              rData.stock_release_date = result.result[0].stock_release_date;
              rData.program_type = result.result[0].program_type;
              rData.items = result.result.map(el => el.item_name);
              rData.district_id = result.result[0].district_id;
              rData.tehsil_id = result.result[0].tehsil_id;
              rData.site_id = result.result[0].site_id;
              rData.CHW_id = result.result[0].CHW_id;
              rData.CHS_id = result.result[0].CHS_id;
              rData.stockOutID = result.result[0].stockOutID;
              ipc.removeAllListeners("loadSingleStockOutReport");
            }
          });
        })
      };
      let insertItem = item => {
        item.stock_release_date = (rData.stock_release_date == $('#stock_release_date-upd').val()) ? rData.stock_release_date : $('#stock_release_date-upd').val();
        item.program_type = rData.program_type;
        item.district_id = rData.district_id;
        item.tehsil_id = rData.tehsil_id;
        item.site_id = rData.site_id;
        item.CHW_id = rData.CHW_id;
        item.CHS_id = rData.CHS_id;
        item.sameDate = rData.stock_release_date == $("#stock_release_date-upd").val();
        item.stockOutID = rData.stockOutID;         
        return new Promise((resolve, reject) => {
          $("#updateStockOutFrm").validate();
          if ($("#updateStockOutFrm").valid()) {
            if (rData.items.filter(el => el === item.item_name).length > 0) {
              alert('Same item is not allowed to enter multiple time, if you want to change quantity release please click to edit the line/same item');
              reject();
            } else {
              ipc.send('addNewItemStockOut', item);
              ipc.on("addNewItemStockOut", (event, result) => {
                if (result.err) {
                  reject();
                  ipc.removeAllListeners("addNewItemStockOut");
                } else {
                  resolve(result.result)
                  ipc.removeAllListeners("addNewItemStockOut");
                }
              });
            }
            
          }
        })
      }
      let updateItem = item => {
        item.stock_release_date = $("#stock_release_date-upd").val();
        item.sameDate = rData.stock_release_date == $("#stock_release_date-upd").val();
        return new Promise((resolve, reject) => {
          $("#updateStockOutFrm").validate();
          if ($("#updateStockOutFrm").valid()) {
            if (rData.items.filter(el => el == item.item_name).length > 1) {
              alert('Same item is not allowed to enter multiple time, if you want to change quantity release please click to edit the line/same item');
              reject();
            } else {
              ipc.send('updateItemStockOut', item);
              ipc.on("updateItemStockOut", (event, result) => {
                if (result.err) {
                  ipc.removeAllListeners("updateItemStockOut");
                  reject();
                } else {
                  resolve(result.result[0])
                  ipc.removeAllListeners("updateItemStockOut");
                }
              });
            }
          }
        })
        
      }
      let deleteItem = item => {
        return new Promise((resolve, reject) => {
          ipc.send("removeItemStockOut", item);
          ipc.on("removeItemStockOut", (event, result) => {
            if (result.err) {
              reject();
              ipc.removeAllListeners("removeItemStockOut");
            } else {
              ipc.removeAllListeners("removeItemStockOut");
              resolve();
            }
          });
        })
      }
      let updateController = {
        loadData: (resportId)=>{
          return loadStockReport(reportId)
        },
        insertItem: (item) => {
          return insertItem(item);
        },
        updateItem: (item) => {
          return updateItem(item);
        },
        deleteItem: (item) => {
          return deleteItem(item);
        }
      }

      var sendValue = function (varName, value) {
        // console.log(varName, value)
        var xx = varName.filter(el => el.item == value)
        // console.log(xx)
        return xx;
      }
      ipc.send('getAvailableCommodity');
      ipc.on('availableCommodity', (evt, com) => {
        var Description = [{ Name: '', item: '' }];
        var Unit = [{ Name: '', item: '' }];
        var SubUnit = [{ Name: '', item: '' }];
        var items = [{ Name: "" }];
        var availStock = [{ Name: "", item: '' }];
        com.commodity.forEach((el, i) => {
          Description.push({
            Name: el.item_desc,
            item: el.item_name,
          })
          Unit.push({
            Name: el.item_unit,
            item: el.item_name,
          })
          SubUnit.push({
            Name: el.item_sub_unit,
            item: el.item_name,
          })
          items.push({
            Name: el.item_name,
            item: el.item_name,
          })
          availStock.push({
            Name: el.remaining,
            item: el.item_name,
          })
          if (com.commodity.length - 1 == i) {
            stockGrid(Description, Unit, items, SubUnit, availStock);
          }
        })
      })


      function stockGrid(Description, Unit, items, SubUnit, availStock) {
        $("#stockOutUpdateGrid").jsGrid({
          width: "100%",
          height: "400px",
          inserting: true,
          editing: true,
          autoload:true,
          // paging: true,
          // pageLoading: true,
          sorting: true,
          // paging: true,
          controller: updateController,
          fields: [
            {
              name: "item_name",
              title: "Item",
              type: "select",
              items: items,
              valueField: "Name",
              textField: "Name",
              valueType: "string",
              insertTemplate: function() {
                var descField = this._grid.fields[1];
                var unitField = this._grid.fields[2];
                var subUnitField = this._grid.fields[3];
                var avalable_stockField = this._grid.fields[4];
                var $inertControl = jsGrid.fields.select.prototype.insertTemplate.call(
                  this
                );
                $inertControl.on("change", function() {
                  var itemId = $(this).val();
                  descField.items = sendValue(Description, itemId);
                  $(".item_desc-insert")
                    .empty()
                    .append(descField.insertTemplate());
                  unitField.items = sendValue(Unit, itemId);
                  $(".disp_unit-insert")
                    .empty()
                    .append(unitField.insertTemplate());
                  subUnitField.items = sendValue(SubUnit, itemId);
                  $(".disp_sub_unit-insert")
                    .empty()
                    .append(subUnitField.insertTemplate());
                  avalable_stockField.items = sendValue(
                    availStock,
                    itemId
                  );
                  $(".avalable_stock-insert")
                    .empty()
                    .append(avalable_stockField.insertTemplate());
                });
                return $inertControl;
              },
              editTemplate: function (value) {
                console.log(this)
                var descField = this._grid.fields[1];
                var unitField = this._grid.fields[2];
                var subUnitField = this._grid.fields[3];
                var avalable_stockField = this._grid.fields[4];
                var avalable_stockField = this._grid.fields[4];
                var quantity_releasedField = jsGrid.fields.decimal.prototype.editTemplate.call(this._grid.fields[5]);
                var $editControl = jsGrid.fields.select.prototype.editTemplate.call(
                  this,
                  value
                );

                var changeItem = function() {
                  var editVal = $editControl.val();
                  // console.log({editVal: editVal})
                  descField.items = sendValue(Description, editVal);
                  $(".item_desc-update")
                    .empty()
                    .append(descField.editTemplate());
                  unitField.items = sendValue(Unit, editVal);
                  $(".disp_unit-update")
                    .empty()
                    .append(unitField.editTemplate());
                  subUnitField.items = sendValue(SubUnit, editVal);
                  $(".disp_sub_unit-update")
                    .empty()
                    .append(subUnitField.editTemplate());
                  // availStock.Name = parseFloat(availStock.Name) + parseFloat(quantity_releasedField.editControl[0].value);
                  console.log(quantity_releasedField);
                  console.log(editVal)
                  avalable_stockField.items = sendValue(
                    availStock,
                    editVal
                  );
                  $(".avalable_stock-update")
                    .empty()
                    .append(avalable_stockField.editTemplate());
                };
                $editControl.on("change", changeItem);
                changeItem();
                return $editControl;
              }
            },
            {
              name: "item_desc",
              title: "Description",
              type: "select",
              items: Description,
              valueField: "Name",
              valueType: "string",
              textField: "Name",
              insertcss: "item_desc-insert",
              updatecss: "item_desc-update",
              itemTemplate: function(item_desc) {
                return item_desc;
              }
            },
            {
              name: "disp_unit",
              title: "Unit",
              type: "select",
              items: Unit,
              valueField: "Name",
              valueType: "string",
              textField: "Name",
              insertcss: "disp_unit-insert",
              updatecss: "disp_unit-update",
              itemTemplate: function(disp_unit) {
                return disp_unit;
              }
            },
            {
              name: "disp_sub_unit",
              title: "Sub Unit",
              type: "select",
              items: SubUnit,
              valueField: "Name",
              valueType: "string",
              textField: "Name",
              insertcss: "disp_sub_unit-insert",
              updatecss: "disp_sub_unit-update",
              itemTemplate: function(disp_sub_unit) {
                return disp_sub_unit;
              }
            },
            {
              name: "avalable_stock",
              title: "Avalable Stock",
              type: "select",
              items: availStock,
              valueField: "Name",
              valueType: "decimal",
              textField: "Name",
              insertcss: "avalable_stock-insert",
              updatecss: "avalable_stock-update",
              itemTemplate: function(avalable_stock) {
                return avalable_stock;
              }
            },
            // { name: 'avalable_stock', title: 'Avalable Stock', type: 'decimal', default:availabeStock },
            {
              name: "quantity_released",
              title: "Quantity Released",
              type: "decimal",
              validate: [
                "required",
                {
                  validator: function(value, item) {
                    return value > 0 && value <= item.avalable_stock;
                  },
                  message: function(value, item) {
                    if (value == 0) {
                      return "Quantity released must be greater than 0";
                    } else if (value > item.avalable_stock) {
                      return "Quantity release cannot be more than available stock";
                    }
                  }
                }
              ]
            },
            {
              type: "control",
              editButton: false,
              modeSwitchButton: false
            }
          ]
        });
      }
    }

  })
}