module.exports.initScrPlw = function(){
  var data = [];
let myInsert = (item) => {
  return new Promise((resolve, reject) => {
    var length = data.length + 1;
    item.id = data.length + 1;
    item.is_plw = 1;
    item.site_id = $('#ddHealthHouse').val();
      item.site_village = $('#txtVillage').val();
      item.staff_name = $('#txtStaffName').val();
      item.screening_type = $('#scrChildScrType').val();
      item.screening_date = $('#txtScrChildDate').val();
      $('#scrPlwForm').validate();
      if($('#scrPlwForm').valid()){

        data.push(item);
        console.log(data);
      }
    
    // data.push(item);
    // console.log(data);
    if (length == data.length && $('#scrPlwForm').valid()) {
      resolve(data[data.length]);
    } else {
      reject()
    }
  })
}
let delItem = (item) => {
  return new Promise((resolve, reject) => {
    var total = data.length
    data = data.filter(function(single) { 
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
    data.forEach((el, i)=>{
      if( el.id == item.id){
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


  var Gender = [{
      Name: '',
      id: 0,
    }, {
      Name: 'Male',
      id: 1
    },
    {
      Name: 'Female',
      id: 2
    }
  ];
  var yNo = [{
    Name: 'No',
    id: 0,
  }, {
    Name: 'Yes',
    id: 1
  }];

  var plStatus = [{
    Name: '',
    id: 0,
  }, {
    Name: 'Normal',
    id: 1
  }, {
    Name: 'MAM',
    id: 2

  }, {
    Name: 'SAM',
    id: 3
  }]
  var plStatus = [{
    Name: '',
    id: 0,
  }, {
    Name: 'Normal',
    id: 1
  }, {
    Name: 'MAM',
    id: 2

  }, {
    Name: 'SAM',
    id: 3
  }]
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

    fields: [{name:'id',title:'Sr #', width:20},{
        name: "name",
        title: "Name",
        type: "text",
        width: 100,
        validate: ['required',{validator: 'rangeLength', param:[2,50],message:function(value, item) {
          return "The name should minimun 2 letter or maximun 50. Entered name is \"" + value.length + "\" is out of specified range."}} ]
      }, {
        name: "f_or_h_name",
        title: "Husband Name",
        type: "text",
        width: 100
      }, {
        name: "address",
        title: "Address",
        type: "text",
        width: 100
      }, {
        name: "age",
        title: "Age (yrs)",
        type: "number",
        width: 50
      },
      {
        name: "plw_type",
        title: "Status(P/L)",
        type: "select",
        items: [{Name:'',id:''},{Name:'P',id:2},{Name:'L',id:2}],
        valueField: 'id',
        textField: 'Name',
        width: 50
      },
       {
        name: "muac",
        title: "MUAC",
        type: "number",
        width: 50
      }, {
        name: "no_mm_tabs",
        title: "# MM Tabs",
        type: "number",
        width: 50
      }, {
        name: "status",
        title: "Status",
        type: "select",
        items: [{Name:'',id:''},{Name:'Normal', id:1},{Name:'MAM', id:2}],
        valueField: 'id',
        textField: 'Name',
        width: 80
      },
      {
        type: "control",
        // deleteButton: false,
      }
    ],

  });
});
$(function () {
  var datePickerId = document.getElementById('txtScrChildDate');
  datePickerId.max = new Date().toISOString().split("T")[0];
});
$(function(){
  ipc.send('getProvince');
  ipc.on('province', function(evt, province){
    $('#ddProvince').children('option:not(:first)').remove();
    // province.province.forEach(el=>{
    // })
    prov(province);
    // $('#ddProvince').find('option:gt(0)').remove();
    // province.province.forEach(el=>{
    //   $('#ddProvince').append(`<option value="${el.id}">${el.provinceName}</option>`);
    // })
    })
    $('#ddProvince').on('change', function(){
      var prov = $(this).val();
      ipc.send('getDistrict', prov )
      ipc.on('district', function(evt, district){
        $('#ddDistrict').children('option:not(:first)').remove();
      //   district.district.forEach(el=>{
      // $('#ddDistrict').append(`<option value="${el.id}">${el.districtName}</option>`);              
      //   })
      // prov();
    dist(district);
    // teh();
    // ucListener();
    // hhListener();
    // hhTypeListener();
      })
    })
    $('#ddDistrict').on('change', function(){
      var dist = $(this).val();
      ipc.send('getTehsil', dist )
      ipc.on('tehsil', function(evt, tehsil){
        $('#ddTehsil').children('option:not(:first)').remove();
      //   tehsil.tehsil.forEach(el=>{
      // $('#ddTehsil').append(`<option value="${el.id}">${el.tehsilName}</option>`);              
      //   })
    //   prov();
    // dist();
    teh(tehsil);
    // ucListener();
    // hhListener();
    // hhTypeListener();
      })
    })
    $('#ddTehsil').on('change', function(){
      var tehs = $(this).val();
      ipc.send('getUC', tehs )
      ipc.on('uc', function(evt, uc){
        $('#ddUC').children('option:not(:first)').remove();
      //   uc.uc.forEach(el=>{
      // $('#ddUC').append(`<option value="${el.id}">${el.ucName}</option>`);              
      //   })
    //   prov();
    // dist();
    // teh();
    ucListener(uc);
    // hhListener();
    // hhTypeListener();
      })
    })
    var ucForHH;
    $('#ddUC').on('change', function(){
      var ucs = $(this).val();
      ucForHH = ucs
      ipc.send('getHealthHouse', ucs )
      ipc.on('hh', function(evt, hh){
        $('#ddHealthHouse').children('option:not(:first)').remove();
      //   hh.hh.forEach(el=>{
      // $('#ddHealthHouse').append(`<option value="${el.id}">${el.siteName}</option>`);              
      //   })
    //   prov();
    // dist();
    // teh();
    // ucListener();
    hhListener(hh);
    // hhTypeListener();
      })
    })
    $('#ddHealthHouse').on('change', function(){
      // var ucs = $('#ddUC').val();
      var h_id = $(this).val();
      ipc.send('getHealthHouseType', h_id )
      ipc.on('hhType', function(evt, hh){
        // var result = hh.hh.filter(el => el.id == $(this).val());
        // if(h_id === ""){
        //   $('#txtSiteType').val().empty();  
        // } else{

        //   $('#txtSiteType').val(function(){
        //     var site = [];
        //     if(hh.hh[0].OTP === 1){
        //       site.push('OTP')
        //     }
        //     if(hh.hh[0].SFP === 1){
        //       site.push('SFP')                
        //     }
        //     if(hh.hh[0].SC === 1){
        //       site.push('SC')                
        //     }
        //     return site;
        //   })  
        // }
    //     prov();
    // dist();
    // teh();
    // ucListener();
    // hhListener();
    hhTypeListener(h_id,hh);
      })
    })
  })
  $('#scrPlwSubmit').on('click', (e)=>{
    console.log(data);
    // if(data.length>0){

      var scrPlwFinished = [];
      data.forEach(el=>{
        delete el.id;
        scrPlwFinished.push(el) })
      console.log(scrPlwFinished)
      ipc.send('scrPlwAdd', (scrPlwFinished))
      ipc.removeAllListeners('scrPlwAdd')
      data = [];
      // $('#jsGrid').jsGrid("loadData");
      // $('#scrPlwForm').get(0).reset();
      setTimeout(addScrPlwTemplate, 3000);

    // } else {
    //   $('#scrPlwForm').validate();
    // }
    e.preventDefault();
  })
}