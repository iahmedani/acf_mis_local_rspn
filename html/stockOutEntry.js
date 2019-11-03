var uuid = require('uuid/v4')
module.exports.stockOutEntry = function () {
  $('#ddProgramType').change(() => {
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
      ipc.on('hh', async function (evt, hh) {
        // console.log(hh)
        $('#site_one').children('option:not(:first)').remove();
        if (hh.hh.length > 1) {
          $('.secondSite').css('display', '')
          $('#site_two').children('option:not(:first)').remove();
          await asyncForEach(hh.hh, async (el) => {
            $('#site_two').append(`<option value="${el.siteName}">${el.siteName}</option>`);
          })
        } else {
          $('.secondSite').css('display', 'none')

        }
        hhListener_siteOne(hh);

      });
      ipc.send("getStaffuc", ucs);
      ipc.send("getSupsuc", ucs);

      ipc.on("haveStaffuc", function (evt, staffs) {
        $("#ddStaff_code")
          .children("option:not(:first)")
          .remove();
        staffListeneruc(staffs);
      });
      ipc.on("haveSupsuc", function (evt, _sups) {
        $("#ddSup_code")
          .children("option:not(:first)")
          .remove();
        supListeneruc(_sups);
      });
    })
    $('#ddUC').on('change', function () {
      var ucs = $(this).val();
      ucForHH = ucs
      if ($('#ddProgramType').val() == 'otp') {
        ipc.send('getHealthHouse', ucs)
        ipc.on('hh', function (evt, hh) {
          $('#ddHealthHouse').children('option:not(:first)').remove();
          hhListener(hh);
        })

      }
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
        $('.noOutreach').hide();

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
      item.uc_id = $("#ddUC").val() || 0;
      item.site_id = $("#ddHealthHouse").val() || 0;
      item.CHW_id = $("#ddStaff_code").val() || 0;
      item.CHS_id = $("#ddSup_code").val() || 0;
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
    function rebuildGrid() {
      var sendValue = function (varName, value) {
        // console.log(varName, value)
        var xx = varName.filter(el => el.item == value)
        // console.log(xx)
        return xx;
      }
      ipc.send('getAvailableCommodity', $('#ddProgramType').val() || '');
      ipc.on('availableCommodity', (evt, com) => {
        var Description = [{
          Name: '',
          item: ''
        }];
        var Unit = [{
          Name: '',
          item: ''
        }];
        var SubUnit = [{
          Name: '',
          item: ''
        }];
        var items = [{
          Name: ""
        }];
        var availStock = [{
          Name: "",
          item: ''
        }];
        if (com.commodity.length > 0) {
          $('.alert-warning').css('display', 'none')
          $('.table-responsive').css('display', '')

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
        } else {
          $('.alert-warning').css('display', '')
          $('.table-responsive').css('display', 'none')
        }
        ipc.removeAllListeners("availableCommodity");
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
            // {name:'country_code', title:'Country Code', type:'text'},
            // {name:'base_code', title:'Base Code', type:'text'},
            // {name:'dept_code', title:'Dept Code', type:'text'},
            // {name:'proc_req', title:'Proc: Req: #', type:'text'},
            // {name:'proc_line', title:'Proc: Line', type:'text'},
            {
              name: 'item_name',
              title: 'Item',
              type: 'select',
              items: items,
              valueField: "Name",
              textField: "Name",
              valueType: 'string',
              insertTemplate: function () {
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
              name: 'item_desc',
              title: 'Description',
              type: 'select',
              items: Description,
              valueField: "Name",
              valueType: 'string',
              textField: "Name",
              insertcss: 'item_desc-insert',
              updatecss: 'item_desc-update',
              itemTemplate: function (item_desc) {
                return item_desc;
              }
            },
            {
              name: 'disp_unit',
              title: 'Unit',
              type: 'select',
              items: Unit,
              valueField: "Name",
              valueType: 'string',
              textField: "Name",
              insertcss: 'disp_unit-insert',
              updatecss: 'disp_unit-update',
              itemTemplate: function (disp_unit) {
                return disp_unit;
              }
            },
            {
              name: 'disp_sub_unit',
              title: 'Sub Unit',
              type: 'select',
              items: SubUnit,
              valueField: "Name",
              valueType: 'string',
              textField: "Name",
              insertcss: 'disp_sub_unit-insert',
              updatecss: 'disp_sub_unit-update',
              itemTemplate: function (disp_sub_unit) {
                return disp_sub_unit;
              }
            },
            {
              name: 'avalable_stock',
              title: 'Avalable Stock',
              type: 'select',
              items: availStock,
              valueField: "Name",
              valueType: 'decimal',
              textField: "Name",
              insertcss: 'avalable_stock-insert',
              updatecss: 'avalable_stock-update',
              itemTemplate: function (avalable_stock) {
                return avalable_stock;
              }
            },
            // { name: 'avalable_stock', title: 'Avalable Stock', type: 'decimal', default:availabeStock },
            {
              name: 'quantity_released',
              title: 'Quantity Released',
              type: 'decimal',
              validate: ["required", {
                validator: function (value, item) {
                  return value > 0 && value <= item.avalable_stock
                },
                message: function (value, item) {
                  if (value == 0) {
                    return 'Quantity released must be greater than 0'
                  } else if (value > item.avalable_stock) {
                    return 'Quantity release cannot be more than available stock';
                  }
                }
              }]
            },
            {
              type: "control",
              editButton: false,
              modeSwitchButton: false
            }
          ],

        });
      }

    }
    rebuildGrid();
    $('#ddProgramType').change(function () {
      rebuildGrid();
    })

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
    // console.log(stockEntryArr);
    ipc.send("stockOutEntry", stockEntryArr);
    ipc.removeAllListeners("stockOutEntry");
    // data = [];
    // $('#jsGrid').jsGrid("loadData");
    // $('#scrPlwForm').get(0).reset();
    setTimeout(stockOutEntryTemplate, 3000);

    // } else {
    //   $('#scrPlwForm').validate();
    // }
    e.preventDefault();
  });
}