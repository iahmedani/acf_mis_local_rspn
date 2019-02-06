const {knex} = require('../dbTest');

module.exports.initOtpExit = function (){

  $(function () {
    var inDays = function (d1, d2) {
      var date1 = new Date(d1);
      var date2 = new Date(d2);
      var t2 = date2.getTime();
      var t1 = date1.getTime();

      return parseInt((t2 - t1) / (24 * 3600 * 1000));
    };
    $(function() {
      var datePickerId = document.getElementById("exit_date");
      datePickerId.max = new Date().toISOString().split("T")[0];
    });
    $('#exit_date').on('change', function () {
      console.log('clicked')
      var days = inDays($('#add_date').val(), $(this).val());
      console.log(days)
      $('#days_in_program').empty();
      $('#days_in_program').val(days);
      var gKgDay = (($('#exit_weight').val() - $('#add_weight').val()) * 1000) / days
      $('#weight_gain').empty();
      $('#weight_gain').val(gKgDay);
    })
    // ipc.send("getCommodityAll");
    // ipc.on('commodityAll', function (evt, com) {
    //   $('#exit_ration1').children('option:not(:first)').remove();
    //   $('#exit_ration2').children('option:not(:first)').remove();
    //   $('#exit_ration3').children('option:not(:first)').remove();
    //   commodity(com, 'exit_ration1');
    //   commodity(com, 'exit_ration2');
    //   commodity(com, 'exit_ration3');
    // })
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
      
    });
    $('#ddHealthHouse').on('change', function(e){
      // $('#').jsGrid.
      // loadData with custom filter
      var filter={};
         filter.site_id =  $('#ddHealthHouse').val()
         $("#otpExitGrid").jsGrid("loadData", { site_id: filter}).done(function() {
          console.log("data loaded");
        });
// $("#otpExitGrid").jsGrid("loadData", { site_id: $(this).val()}).done(function() {
//   console.log("data loaded");
// });
    })

    let xx = (site_id)=>{
      return new Promise((resolve, reject)=>{
        ipc.send('getOtpAll', site_id);
        ipc.on('getOtpAll', (e, result)=>{
          if(result.err){
            reject(result.err)
            ipc.removeAllListeners('getOtpAll')
          }else{           
                  var s = {
                    data: result.result,
                    itemsCount: result.result.length
                  }
                  console.log(s)
            resolve(s)
            ipc.removeAllListeners('getOtpAll')
          }
        })
      })
    }
    
  function _dataGrid(){
      $("#otpExitGrid").jsGrid({
        height: "300px",
        width: "100%",
        // filtering: true,
        editing: true,
        sorting: false,
        paging: true,
        autoload: true,
        pageLoading: true, // this is the clue
        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete client?",
        controller: {
          loadData: function (filter) {
            // console.log(filter)
            filter.site_id = ($('#ddHealthHouse').val()) ? $('#ddHealthHouse').val(): ''
            // console.log('loaddata', site_id)
            return xx(filter);
          },
          updateItem: function (item) {
            console.log('update')
            console.log(item);
            return addFollowup(item);
          }
        },
        fields: [{
            name: "reg_id",
            title: "Reg #",
            type: "text",
            width: 50,
            editing: false,
          }, {
            name: "p_name",
            title: "Name",
            type: "text",
            width: 100,
            editing: false,
          }, {
            name: "f_or_h_name",
            title: "Husband Name",
            type: "text",
            width: 100,
            editing: false,
          }, {
            name: "site_village",
            title: "Village",
            type: "text",
            width: 100,
            editing: false,
          },
        //   {type: 'control',
        //     f  
        // } 
        ],
    
        rowClass: function(item, itemIndex) {
          // console.log(item)
          var date1 = new Date(item.curr_date);
                var date2 = new Date();
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                // console.log(diffDays)
          return diffDays > 21 ? 'bg-red': '';
          // itemIndex%2==0 ? 'bg-red' : 'bg-green';
      },
        rowClick: function(args){
          this.editItem(args.item);
          var data = args.item;
          $("#exitAddForm").trigger('reset');
          $('#p_name').val(data.p_name);
          $('#gender').val(data.gender);
          $('#village').val(data.site_village);
          $('#otp_id').val(data.otp_id);
          $('#add_weight').val(data.weight);
          $('#add_date').val(data.reg_date); 
          console.log(args.item);
          ipc.send("getCommodity", data.prog_type);
          ipc.on('commodity', function (evt, com) {
            $('#exit_ration1').children('option:not(:first)').remove();
            $('#exit_ration2').children('option:not(:first)').remove();
            $('#exit_ration3').children('option:not(:first)').remove();
            commodity(com, 'exit_ration1');
            commodity(com, 'exit_ration2');
            commodity(com, 'exit_ration3');
          })
        }
        
      });
    };

    _dataGrid();
      


  
    $('#exitAddForm').on('submit',  (e)=> {
      e.preventDefault();
      $('#exitAddForm').validate();
      if ($('#exitAddForm').valid() ) {
        var formData = $('#exitAddForm').serializeFormJSON();
        // console.log(formData)
        // var exit_date = $('#exit_date').val();
        // formData.exit_date = exit_date;
        delete formData.p_name;
        delete formData.gender;
        delete formData.village;
        ipc.send('otpExitAdd', formData);
        ipc.removeAllListeners('otpExitAdd');
        $("#exitAddForm").trigger('reset');
        var filter={};
         filter.site_id =  $('#ddHealthHouse').val()
        //  $("#otpExitGrid").jsGrid("reset");
        // _dataGrid();
         $("#otpExitGrid").jsGrid("render").done(function() {
          console.log("rendering completed and data loaded");
      });
        //  _dataGrid();
        //  $("#otpExitGrid").jsGrid("loadData", { site_id: filter}).done(function() {
        //   console.log("data loaded");
        // });
      //   $("#otpExitGrid").jsGrid("render").done(function() {
      //     console.log("rendering completed and data loaded");
      // });
        // $("#jsGrid").jsGrid("refresh")     
      }
    })

}
  