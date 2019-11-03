var uuid = require('uuid/v4');
module.exports.stockEntry = function () {
  let data = new Array;
  $(function () {
    var datePickerId = document.getElementById('dn_date');
    datePickerId.max = new Date().toISOString().split("T")[0];
  });
  // console.log('stock Entry')
  let myInsert = (item) => {
    console.log(item)
    return new Promise((resolve, reject) => {
      var length = data.length + 1;
      item.id = data.length + 1;
      item.dn_number = $('#dn_number').val();
      item.dn_date = $('#dn_date').val();
      $('#stockEntryForm').validate();
      if ($('#stockEntryForm').valid()) {
        var __x = data.filter(el => el.item_name == item.item_name && el.expiry_date == item.expiry_date)
        if (__x.length < 1) {

          data.push(item);
        } else {
          alert('Error: Duplicate Items are not allowed')
        }

      }
      // console.log(data);
      // data.push(item);
      // console.log(data);
      if (length == data.length && $('#stockEntryForm').valid() && __x.length < 1) {
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
      var __x = data.filter(el => el.item_name == item.item_name && el.expiry_date == item.expiry_date)

      if (tempVar && __x.length < 1) {
        // delIndex.splice(index, 1);
        // console.log(data);
        resolve(item)
      } else {
        alert('Duplicate Item is not allowed')
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
    ipc.send("getCommodityAll", );
    ipc.on('commodityAll', (evt, com) => {
      var Description = [{
        Name: '',
        Id: 0,
        item: ''
      }];
      var Unit = [{
        Name: '',
        Id: 0,
        item: ''
      }];
      var SubUnit = [{
        Name: '',
        Id: 0,
        item: ''
      }];
      var items = [{
        Name: "",
        Id: 0,
      }];
      com.commodity.forEach((el, i) => {
        Description.push({
          Name: el.item_desc,
          Id: el.id,
          item: el.item_name
        })
        Unit.push({
          Name: el.item_unit,
          Id: el.id,
          item: el.item_name
        })
        SubUnit.push({
          Name: el.item_sub_unit,
          Id: el.id,
          item: el.item_name
        })
        items.push({
          Name: el.item_name,
          Id: el.id,
        })
        if (com.commodity.length - 1 == i) {
          stockGrid(Description, Unit, items, SubUnit);
        }
      })
      ipc.removeAllListeners("commodityAll");
    })
    // var items = [
    //   { Name: "", Id: 0, },
    //   { Name: "RUTF", Id: 1,  },
    //   { Name: "Test", Id: 2,  }
    // ];
    // // sendValue(items, 1);
    // var Unit = [
    //   { Name: '', Id: 0 , item: ''},
    //   { Name: 'Carton', Id: 1, item:'RUTF'},
    //   { Name: 'Kg', Id: 2 , item:'Test'}
    // ];
    // var Description = [
    //   {
    //     Name: '', Id: 0,item:''
    //   },
    //   { Name: 'Test1', Id: 1,item:'RUTF' },
    //   { Name: 'Test2', Id: 2,item:'Test' }
    // ];
    // var SubUnit = [
    //   {
    //     Name: '', Id: 0,item:''
    //   },
    //   {
    //     Name: 'Sch', Id: 1,item:'RUTF'
    //   },
    //   {
    //     Name: 'Tab', Id: 2,item:'Test'
    //   }
    // ]
    // // var itemId = '';

    function stockGrid(Description, Unit, items, SubUnit) {
      $("#jsGridStockInEntry").jsGrid({
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
              var $inertControl = jsGrid.fields.select.prototype.insertTemplate.call(this);
              $inertControl.on('change', function () {
                var itemId = $(this).val();
                descField.items = sendValue(Description, itemId);
                $(".item_desc-insert").empty().append(descField.insertTemplate());
                unitField.items = sendValue(Unit, itemId);
                $(".disp_unit-insert").empty().append(unitField.insertTemplate());
                subUnitField.items = sendValue(SubUnit, itemId);
                $(".disp_sub_unit-insert").empty().append(subUnitField.insertTemplate());

              })
              return $inertControl;
            },
            editTemplate: function (value) {
              var descField = this._grid.fields[1];
              var unitField = this._grid.fields[2];
              var subUnitField = this._grid.fields[3];
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
            name: 'disp_qty',
            title: 'Quantity Dispatched',
            type: 'decimal',
            validate: "required"
          },
          {
            name: 'rec_qty',
            title: 'Received  Quantity (*)',
            type: 'decimal',
            validate: "required"
          },
          {
            name: 'rec_obs',
            title: 'Quality, observations',
            type: 'text'
          },
          {
            name: 'lost_and_damage',
            title: 'Lost and Damage Qty',
            type: 'decimal',
            validate: "required"
          },
          {
            name: 'expiry_date',
            title: 'Expiry Date',
            type: 'date',
            validate: "required"
          },
          {
            type: "control",
            editButton: false,
            modeSwitchButton: false
          }
        ],

      });
    }

  });

  $('#stockEntrySubmit').on('click', async (e) => {
    // console.log(data);
    // if(data.length>0){

    e.preventDefault();
    var stockEntryArr = [];
    for (stock of data) {
      delete stock.id;
      stockEntryArr.push(stock);
    }
    // console.log(stockEntryArr)
    await ipc.send('stockEntry', (stockEntryArr))
    await ipc.removeAllListeners('stockEntry')
    // data = [];
    // $('#jsGrid').jsGrid("loadData");
    // $('#scrPlwForm').get(0).reset();
    setTimeout(stockEntryTemplate, 3000);

    // } else {
    //   $('#scrPlwForm').validate();
    // }
  })
}