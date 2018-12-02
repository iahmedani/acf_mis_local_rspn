module.exports.initOtpExitEditV2 = function () {
  (function ($) {
    $.fn.serializeFormJSON = function () {

      var o = {};
      var a = this.serializeArray();
      $.each(a, function () {
        if (o[this.name]) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
        } else {
          o[this.name] = this.value || '';
        }
      });
      return o;
    };
  })(jQuery);
  // $('#myForm').validate();
  $('#exitUpdSubmit').on('click', function (e) {
    $('#exitUpdForm').validate();
    if ($('#exitUpdForm').valid()) {
      var formData = $('#exitUpdForm').serializeFormJSON();
      var exit_date = $('#exit_date').val();
      formData.exit_date = exit_date;
      delete formData.p_name;
      delete formData.gender;
      delete formData.village;
      e.preventDefault();
      ipc.send('otpExitUpdate', formData);
      ipc.removeAllListeners('otpExitUpdate')
      $("#jsGrid").jsGrid("render").done(() => {
        console.log('Js grid updated')
      });

      // location.reload();

    }
    e.preventDefault();
  })

  $(function () {
    var datePickerId = document.getElementById('exit_date');
    datePickerId.max = new Date().toISOString().split("T")[0];
  });
  $(function () {
    var inDays = function (d1, d2) {
      var date1 = new Date(d1);
      var date2 = new Date(d2);
      var t2 = date2.getTime();
      var t1 = date1.getTime();

      return parseInt((t2 - t1) / (24 * 3600 * 1000));
    };
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
    ipc.send('getCommodity');
    ipc.on('commodity', function (evt, com) {
      $('#exit_ration1').children('option:not(:first)').remove();
      $('#exit_ration2').children('option:not(:first)').remove();
      $('#exit_ration3').children('option:not(:first)').remove();
      commodity(com, 'exit_ration1');
      commodity(com, 'exit_ration2');
      commodity(com, 'exit_ration3');
    })
    ipc.send('getProvince');
    ipc.on('province', function (evt, province) {
      $('#ddProvince').children('option:not(:first)').remove();

      // province.province.forEach(el=>{
      // $('#ddProvince').append(`<option value="${el.id}">${el.provinceName}</option>`);

      // })
      prov(province);
    })
    $('#ddProvince').on('change', function () {
      var prov = $(this).val();
      ipc.send('getDistrict', prov)
      ipc.on('district', function (evt, district) {
        $('#ddDistrict').children('option:not(:first)').remove();

        //   district.district.forEach(el=>{
        // $('#ddDistrict').append(`<option value="${el.id}">${el.districtName}</option>`);              
        //   })
        dist(district);
      })
    })
    $('#ddDistrict').on('change', function () {
      var dist = $(this).val();
      ipc.send('getTehsil', dist)
      ipc.on('tehsil', function (evt, tehsil) {
        $('#ddTehsil').children('option:not(:first)').remove();

        //   tehsil.tehsil.forEach(el=>{
        // $('#ddTehsil').append(`<option value="${el.id}">${el.tehsilName}</option>`);              
        //   })
        teh(tehsil);
      })
    })
    $('#ddTehsil').on('change', function () {
      var tehs = $(this).val();
      ipc.send('getUC', tehs)
      ipc.on('uc', function (evt, uc) {
        $('#ddUC').children('option:not(:first)').remove();

        //   uc.uc.forEach(el=>{
        // $('#ddUC').append(`<option value="${el.id}">${el.ucName}</option>`);              
        //   })
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
        //   hh.hh.forEach(el=>{
        // $('#ddHealthHouse').append(`<option value="${el.id}">${el.siteName}</option>`);              
        //   })
        hhListener(hh);
      })
    })
    $('#ddHealthHouse').on('change', function () {
      // var ucs = $('#ddUC').val();
      var h_id = $(this).val();
      ipc.send('getHealthHouseType', h_id)
      ipc.on('hhType', function (evt, hh) {
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
        hhTypeListener(h_id, hh);

      })
    })
  });
  $(function () {

    function getData(cb) {

      ipc.send('get', site_id);
      ipc.on('have', (e, result) => {
        cb(null, result);
      });
    }
    function initExitList() {
      var site_id = $(this).val();
      getData((x, result) => {
        var _supData = {
          loadData: function (filter) {
            return $.grep(result.supervisors, function (client) {
              return (!filter.reg_id || client.reg_id.indexOf(filter.reg_id) > -1) && (!filter.p_name || client.p_name.indexOf(filter.p_name) > -1) && (!filter.f_or_h_name || client.f_or_h_name.indexOf(filter.f_or_h_name) > -1) && (!filter.site_village || client.site_village.indexOf(filter.site_village) > -1);
              // && (filter.Married === undefined || client.Married === filter.Married);
            });
          },

          insertItem: function (insertingClient) {
            // this.clients.push(insertingClient);
          },

          updateItem: function (updatingClient) { },

          deleteItem: function (deletingClient) {
            // var clientIndex = $.inArray(deletingClient, this.clients);
            // this.clients.splice(clientIndex, 1);
            console.log(deletingClient);
          }

        };
        $("#jsGrid").jsGrid({
          height: "500px",
          width: "100%",
          filtering: true,
          // inserting: true,
          editing: true,
          // sorting: true,
          paging: true,
          autoload: true,
          pageLoading: true, // this is the clue
          pageSize: 10,
          pageButtonCount: 5,
          deleteConfirm: "Do you really want to delete client?",
          controller: _supData,
          fields: [
            { name: 'exit_id', type: 'number', visible: false },
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
            }
          ],
        });
      })      
    }


    $('#ddHealthHouse').on('change', function () {
      initExitList();
    })
  })


}