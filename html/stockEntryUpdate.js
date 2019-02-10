module.exports.stockEntryUpdate = function () {
  $(function () {
    var datePickerId = document.getElementById('dn_date');
    datePickerId.max = new Date().toISOString().split("T")[0];
  });
  var data = ipc.sendSync('getStockInNotUsed');
  $('#stockInList').jsGrid({
    width: "100%",
    height: "250px",
    data: data,
    fields:[
      {
      name:'dn_number',
      title: 'DN Number',
      type:'text'
      },
      {
        name:'dn_date',
        title: 'DN Date',
        type:'text'
      },
      {
        name:'total_recieved',
        title:'Total Recieved',
        type:'number'
      }
    ],
    rowClick: ({item, itemIndex, event})=>{
      $('#dn_number').val(item.dn_number)
      $('#dn_date').val(item.dn_date)
      update(item);
    }
  })

  function update(data){
    // console.log(data)
    // var data = ipc.sendSync('getStockInReport');
    let delUpdItem = (item)=>{
      return new Promise((resolve, reject)=>{
        var check = ipc.sendSync('deleletStockInItem', item.id)
        if(check){
          $("#stockInList").jsGrid("render").done(function() {
            console.log("rendering completed and data loaded");
        });
          resolve()
          // $('#stockInList').jsGrid('loadData')
        
        }else{
          reject()
        }
      })
    }
    $('#stockInUpdate').jsGrid(
      {
        width: "100%",
        height: "250px",
        editing:true,
        autoload:true,
        controller: {
          loadData: (filter)=>{
            return ipc.sendSync('getStockInReportForUpdate', data.dn_number);
          },
          updateItem: (item)=>{
            return ipc.sendSync('updateStockInItem', item)
          },
          deleteItem: (item)=>{
            return delUpdItem(item)
          }
        },
        fields:[
          {
            name:'item_name',
            title:'Item Name',
            type: 'text',
            editing: false
          },
          {
            name:'item_desc',
            title:'Description',
            type: 'text',
            editing: false
          },
          { name: 'disp_qty', title: 'Quantity Dispatched', type: 'decimal' ,validate: "required" },
          { name: 'rec_qty', title: 'Received  Quantity (*)', type: 'decimal',validate: "required"  },
          { name: 'rec_obs', title: 'Quality, observations', type: 'text' },
          { name: 'lost_and_damage', title: 'Lost and Damage Qty', type: 'decimal', validate: "required"  },
          { name: 'expiry_date', title: 'Expiry Date', type: 'date' , validate: "required" },
          {
            type: "control",
            editButton: true, deleteButton: true, modeSwitchButton: false
          }

        ]
      }
    )
  }

}