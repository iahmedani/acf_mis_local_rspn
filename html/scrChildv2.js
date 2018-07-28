
module.exports.initGrid = function createGrid(){
  var data = [];
  let myInsert = (item) => {
    return new Promise((resolve, reject) => {
      var length = data.length + 1;
      item.id = data.length + 1;
      item.site_id = $('#ddHealthHouse').val();
      item.site_village = $('#txtVillage').val();
      item.staff_name = $('#txtStaffName').val();
      item.screening_type = $('#scrChildScrType').val();
      item.screening_date = $('#txtScrChildDate').val();
      item.is_plw = 0;
      $('#scrChildForm').validate();
      if($('#scrChildForm').valid()){
        data.push(item);
        console.log(data);
      }
      if (length == data.length && $('#scrChildForm').valid()) {
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
      // autoload:true,
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
  
      fields: [{name:'id',title:'Sr #',width:20},{
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
          name: "gender",
          title: "Gender",
          type: "select",
          items: Gender,
          valueField: 'id',
          textField: 'Name',
          width: 50
        },
        {
          name: "oedema",
          title: "Oedema",
          type: "select",
          items: yNo,
          valueField: 'id',
          textField: 'Name',
          width: 50
        },
        {
          name: "deworming",
          title: "Deworming",
          type: "select",
          items: yNo,
          valueField: 'id',
          textField: 'Name',
          width: 80
        }, {
          name: "muac",
          title: "MUAC",
          type: "number",
          width: 50
        }, {
          name: "no_mm_sch",
          title: "MM Sch",
          type: "number",
          width: 50
        }, {
          name: "age",
          title: "Age",
          type: "number",
          width: 50
        }, {
          name: "status",
          title: "Status",
          type: "select",
          items: plStatus,
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
        // $('#ddProvince').append(`<option value="${el.id}">${el.provinceName}</option>`);

      // })
      prov(province);
      })
      $('#ddProvince').on('change', function(){
        var prov = $(this).val();
        ipc.send('getDistrict', prov )
        ipc.on('district', function(evt, district){
          $('#ddDistrict').children('option:not(:first)').remove();
          
        //   district.district.forEach(el=>{
        // $('#ddDistrict').append(`<option value="${el.id}">${el.districtName}</option>`);              
        //   })
        dist(district);
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
        teh(tehsil);
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
        ucListener(uc);
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
        hhListener(hh);
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
          hhTypeListener(h_id,hh);
          
        })
      })
    })
  $('#scrChildSubmit').on('click', (e)=>{
    console.log(data);
    $('#scrChildForm').validate();

    var scrChildFinished = [];
    // if(data.length > 0){
      data.forEach(el=>{
        delete el.id;
        scrChildFinished.push(el) })
      console.log(scrChildFinished)
      ipc.send('scrChildAdd', (scrChildFinished))
      ipc.removeAllListeners('scrChildAdd')

      data = [];
      // // $('#jsGrid').jsGrid("destroy");
      // $('#jsGrid').jsGrid("render").done(()=>{
      //   console.log('Reload success full');
      //   $('#jsGrid').jsGrid("loadData");
      // })
      // $('#scrChildForm').get(0).reset();
      // // location.reload();
      setTimeout(addScrChildTemplate, 3000);
      // addScrChildTemplate()
    e.preventDefault();
  })
}