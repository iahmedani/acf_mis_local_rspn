

module.exports.initOtpFollowUp = function (){

  $(function () {
    var datePickerId = document.getElementById('followup_date');
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
    
    let getInterimData = (site_id) => {        
      return new Promise((resolve, reject) => {
        ipc.send('getInterim', site_id);
        ipc.on('getInterim', (e, result) => {
          var s = {
            data: result.result,
            itemsCount: result.result.length
          }
          if (result.err) {
            reject(result.err)
            ipc.removeAllListeners('getInterim')
          } else {
            resolve(s)
            ipc.removeAllListeners('getInterim')
          }
        })
      })
    }
    let addFollowup = (item) => {
      return new Promise((resolve, reject) => {
        $('#addFollowupForm').validate();
        if($('#addFollowupForm').valid()){
          item.followup_date = $('#followup_date').val();
          // delete item.next_followup;
          ipc.send('addFollowup', item);
          ipc.on('addFollowup', (e, result) => {
            if (result.err) {
              reject(result.err)
              ipc.removeAllListeners('addFollowup')
            } else {
              resolve(result.result[0])
              ipc.removeAllListeners('addFollowup')
            }
          })
        } else {
          reject();
        }
      })
    }
    $('#ddHealthHouse').on('change', function () {
      var site_id = $(this).val();
      console.log('site_id', site_id);
      var commodity = [{
        Name: 'Choose',
        value: 'none'
      }, {
        Name: 'RUTF Sachets',
        value: 'RUTF Sachets'
      }, {
        Name: 'Amoxicillin',
        value: 'Amoxicillin'
      }, {
        Name: 'Folic Acid',
        value: 'Folic Acid'
      }, {
        Name: 'MM Sachets',
        value: 'MM Sachets'
      }, {
        Name: 'MM Tablets',
        value: 'MM Tablets'
      }, {
        Name: 'Mebendazole',
        value: 'Mebendazole'
      }, {
        Name: 'Meteronidazole',
        value: 'Meteronidazole'
      }, {
        Name: 'Paracetamol',
        value: 'Paracetamol'
      }, {
        Name: 'Chloroquine',
        value: 'Chloroquine'
      }, {
        Name: 'Zinc',
        value: 'Zinc'
      }, {
        Name: 'Tertacycline',
        value: 'Tertacycline'
      }, {
        Name: 'Benzyl Benzoate',
        value: 'Benzyl Benzoate'
      }, {
        Name: 'IYCF Cups & Spoons',
        value: 'IYCF_Cups_and_Spoons'
      }]
      

      $("#jsGrid").jsGrid({
        height: "500px",
        width: "100%",
        // filtering: true,
        // inserting: true,
        editing: true,
        // sorting: true,
        paging: true,
        autoload: true,
        pageLoading: true, // this is the clue
        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete client?",
        controller: {
          loadData: function (filter) {
            console.log('loaddata', site_id)
            return getInterimData(site_id);
          },
          updateItem: function (item) {
            console.log('update')
            // item.followup_date = $('#followup_date').val();
            console.log(item);
            return addFollowup(item);
          }
        },
        fields: [
          // {
          //   name: "otp_id",
          //   title: "ID",
          //   type: "number",
          //   width: 30,
          //   editing: false
          // },
           {
            name: "reg_id",
            title: "Reg #",
            type: "text",
            width: 50,
            editing: false
          }, {
            name: "p_name",
            title: "Name",
            type: "text",
            width: 100,
            editing: false
          }, {
            name: "f_or_h_name",
            title: "Husband Name",
            type: "text",
            width: 100,
            editing: false
          }, {
            name: "site_village",
            title: "Village",
            type: "text",
            width: 100,
            editing: false
          },
          {
            name: "weight",
            title: "Weight",
            type: "number",
            width: 50,
            editing: true,
            validate: "required"
          }, {
            name: 'ration1',
            title: 'Ration-1',
            type: 'select',
            items: commodity,
            valueField: 'value',
            textField: 'Name',
            width: 80,
            validate: "required"
          }, {
            name: 'quantity1',
            title: 'Qty-1',
            type: 'number',
            width: 40,
            validate:{
              validator: "min",
             param:0
            }
          }, {
            name: 'ration2',
            title: 'Ration-2',
            type: 'select',
            items: commodity,
            valueField: 'value',
            textField: 'Name',
            width: 80,
            validate: "required"
          }, {
            name: 'quantity2',
            title: 'Qty-2',
            type: 'number',
            width: 40,
            validate:{
              validator: "min",
             param:0
            }
          }, {
            name: 'ration3',
            title: 'Ration-3',
            type: 'select',
            items: commodity,
            valueField: 'value',
            textField: 'Name',
            width: 80,
            validate: "required"
          }, {
            name: 'quantity3',
            title: 'Qty-3',
            type: 'number',
            width: 50,
            validate:{
              validator: "min",
             param:0
            }
          },{
              name:'next_followup',
              type: 'date',
              title:'Next Follow Up',
            editing: false,
            align:'right'

            }, {
            type: "control",
            deleteButton: false,
          }
        ]
      });
    })

}
