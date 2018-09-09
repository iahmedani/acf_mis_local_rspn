module.exports.stockEntry = function () {
  var data = [];
  let myInsert = (item) => {
    return new Promise((resolve, reject) => {
      var length = data.length + 1;
      item.id = data.length + 1;
      item.dn_number = $('#dn_number').val();
      item.dn_date = $('#dn_date').val();
      $('#stockEntryForm').validate();
      if ($('#stockEntryForm').valid()) {

        data.push(item);
        console.log(data);
      }

      // data.push(item);
      // console.log(data);
      if (length == data.length && $('#stockEntryForm').valid()) {
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
          console.log('item matched in update')
          data[i] = item;
          tempVar = true
        }
      })

      if (tempVar) {
        // delIndex.splice(index, 1);
        console.log(data);
        resolve(item)
      } else {
        reject()
      }
    })
  }
  $(() => {
    
    $("#jsGrid").jsGrid({
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
          console.log('updateitem clicked', item)
          return updItem(item)
        },

        deleteItem: function (item) {
          return delItem(item);
        },
      },

      fields: [
        {name:'country_code', title:'Country Code', type:'text'},
        {name:'base_code', title:'Base Code', type:'text'},
        {name:'dept_code', title:'Dept Code', type:'text'},
        {name:'proc_req', title:'Proc: Req: #', type:'text'},
        {name:'proc_line', title:'Proc: Line', type:'text'},
        {name:'item_desc', title:'Description', type:'text'},
        {name:'disp_qty', title:'Quantity', type:'number'},
        {name:'disp_unit', title:'Unit', type:'text'},
        { name: 'rec_qty', title:'Received  Quantity (*)', type:'number'},
        { name: 'rec_obs', title:'Quality, observations', type:'text'},
      {
        type: "control",
      }
      ],

    });
  });
  $(function () {
    var datePickerId = document.getElementById('dn_date');
    datePickerId.max = new Date().toISOString().split("T")[0];
  });
  $('#stockEntrySubmit').on('click', (e) => {
    console.log(data);
    // if(data.length>0){

    var stockEntryArr = [];
    data.forEach(el => {
      delete el.id;
      stockEntryArr.push(el)
    })
    console.log(stockEntryArr)
    ipc.send('stockEntry', (stockEntryArr))
    ipc.removeAllListeners('stockEntry')
    // data = [];
    // $('#jsGrid').jsGrid("loadData");
    // $('#scrPlwForm').get(0).reset();
    setTimeout(stockEntryTemplate, 3000);

    // } else {
    //   $('#scrPlwForm').validate();
    // }
    e.preventDefault();
  })
}