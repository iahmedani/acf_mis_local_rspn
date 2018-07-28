    window.$ = window.jQuery = require('jquery');
    require('jquery-validation');
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
    const ipc = require('electron').ipcRenderer;
    $('#myForm').validate();
    $('#myForm').on('submit', function (e) {
      $(this).validate();
      if ($(this).valid()) {
        var formData = $(this).serializeFormJSON();
        e.preventDefault();
        ipc.send('scrAddChild', formData);
        // formData = '';
        // location.reload();
      }
    })

    $(function () {
      //Adding Row
      $('#addMore').on('click', function () {
        var data = $("#tb tr:eq(1)").clone(true).appendTo("#tb");
        data.find("input").val('');
      });
      $(document).on('click', '.remove', function () {
        var trIndex = $(this).closest("tr").index();
        if (trIndex > 1) {
          $(this).closest("tr").remove();
        } else {
          alert("Sorry!! Can't remove first row!");
        }
      });
      var datePickerId = document.getElementById('txtScrChildDate');
      datePickerId.max = new Date().toISOString().split("T")[0];
    });
    $(function(){
      ipc.send('getProvince');
      ipc.on('province', function(evt, province){
        $('#ddProvince').children('option:not(:first)').remove();
        
        // $('#ddProvince').find('option:gt(0)').remove();
        province.province.forEach(el=>{
          $('#ddProvince').append(`<option value="${el.id}">${el.provinceName}</option>`);
        })
        })
        $('#ddProvince').on('change', function(){
          var prov = $(this).val();
          ipc.send('getDistrict', prov )
          ipc.on('district', function(evt, district){
            $('#ddDistrict').children('option:not(:first)').remove();
            district.district.forEach(el=>{
          $('#ddDistrict').append(`<option value="${el.id}">${el.districtName}</option>`);              
            })
          })
        })
        $('#ddDistrict').on('change', function(){
          var dist = $(this).val();
          ipc.send('getTehsil', dist )
          ipc.on('tehsil', function(evt, tehsil){
            $('#ddTehsil').children('option:not(:first)').remove();
            tehsil.tehsil.forEach(el=>{
          $('#ddTehsil').append(`<option value="${el.id}">${el.tehsilName}</option>`);              
            })
          })
        })
        $('#ddTehsil').on('change', function(){
          var tehs = $(this).val();
          ipc.send('getUC', tehs )
          ipc.on('uc', function(evt, uc){
            $('#ddUC').children('option:not(:first)').remove();
            uc.uc.forEach(el=>{
          $('#ddUC').append(`<option value="${el.id}">${el.ucName}</option>`);              
            })
          })
        })
        var ucForHH;
        $('#ddUC').on('change', function(){
          var ucs = $(this).val();
          ucForHH = ucs
          ipc.send('getHealthHouse', ucs )
          ipc.on('hh', function(evt, hh){
            $('#ddHealthHouse').children('option:not(:first)').remove();
            hh.hh.forEach(el=>{
          $('#ddHealthHouse').append(`<option value="${el.id}">${el.siteName}</option>`);              
            })
          })
        })
        $('#ddHealthHouse').on('change', function(){
          // var ucs = $('#ddUC').val();
          var h_id = $(this).val();
          ipc.send('getHealthHouseType', h_id )
          ipc.on('hhType', function(evt, hh){
            // var result = hh.hh.filter(el => el.id == $(this).val());
            if(h_id === ""){
              $('#txtSiteType').val().empty();  
            } else{

              $('#txtSiteType').val(function(){
                var site = [];
                if(hh.hh[0].OTP === 1){
                  site.push('OTP')
                }
                if(hh.hh[0].SFP === 1){
                  site.push('SFP')                
                }
                if(hh.hh[0].SC === 1){
                  site.push('SC')                
                }
                return site;
              })  
            }
            
          })
        })
      })
      ipc.on('scrChAddResp', function(evt, result){
        if(result.msg){
          $('body').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">${result.msg}</div>`)  
    $('.alert').alert()
    $(".alert").fadeTo(3000, 1000).slideUp(500, function(){
    $(".alert").alert('close');
    $().alert('dispose')
      location.reload();
      // error = '';
    })
        } else {
          $('body').append(`<div class="alert alert-warning alert-dismissible fade show" role="alert">${result.err}</div>`)  
    $('.alert').alert()
    $(".alert").fadeTo(3000, 1000).slideUp(500, function(){
    $(".alert").alert('close');
    $().alert('dispose')
      location.reload();
      // error = '';
    })
        }


});